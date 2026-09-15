import { useEffect, useState } from "react";
import airtelLogo from "../assets/airtel-money.png.asset.json";
import googlePayLogo from "../assets/google-pay-official.webp.asset.json";
import mtnLogo from "../assets/mtn-momo.png.asset.json";
import paypalLogo from "../assets/paypal-official.webp.asset.json";
import cardLogos from "../assets/visa-mastercard-official.png.asset.json";
import { getRegionByIp } from "../lib/geo.functions";
import { createWhopCheckout } from "../lib/whop.functions";
import { useContent } from "../lib/admin-store";
import {
	type PaymentMethod,
	type Region,
	detectRegion,
	writeSubscription,
} from "../lib/subscription";

type Props = {
	open: boolean;
	title?: string;
	onClose?: () => void;
	onActivated?: () => void;
};

type Method = {
	id: PaymentMethod;
	name: string;
	logos: string[];
	currency: "UGX" | "USD";
};

/** Mobile Money charges in shillings; every card/wallet method charges in USD. */
const METHODS: Method[] = [
	{
		id: "mobile-money",
		name: "Mobile Money (MTN / Airtel)",
		logos: [mtnLogo.url, airtelLogo.url],
		currency: "UGX",
	},
	{
		id: "card",
		name: "Credit/debit card",
		logos: [cardLogos.url],
		currency: "USD",
	},
	{ id: "paypal", name: "PayPal", logos: [paypalLogo.url], currency: "USD" },
	{
		id: "google-pay",
		name: "Google Pay",
		logos: [googlePayLogo.url],
		currency: "USD",
	},
	{ id: "whop", name: "Whop", logos: [], currency: "USD" },
];

const UGX_MONTH = 5000;
const USD_MONTH = 5.99;

function money(currency: "UGX" | "USD", amount: number) {
	return currency === "UGX"
		? `UGX ${amount.toLocaleString("en-UG")}`
		: `USD ${amount.toFixed(2)}`;
}

/** Floating subscription panel — region is detected from the visitor IP. */
export function SubscribeModal({ open, title, onClose, onActivated }: Props) {
	const [region, setRegion] = useState<Region>("INTL");
	const [country, setCountry] = useState<string | null>(null);
	const [method, setMethod] = useState<PaymentMethod>("card");
	const [pending, setPending] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const content = useContent();

	useEffect(() => {
		if (!open) return;
		const guess = detectRegion();
		setRegion(guess);
		setMethod(guess === "UG" ? "mobile-money" : "card");
		let cancelled = false;
		getRegionByIp()
			.then((res) => {
				if (cancelled) return;
				setRegion(res.region);
				setCountry(res.country);
				setMethod(res.region === "UG" ? "mobile-money" : "card");
			})
			.catch(() => {
				/* keep browser-based guess */
			});
		return () => {
			cancelled = true;
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose?.();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	const selected = METHODS.find((item) => item.id === method) ?? METHODS[1]!;
	const currency = selected.currency;
	const amount = currency === "UGX" ? UGX_MONTH : USD_MONTH;
	const price = money(currency, amount);

	function activate() {
		writeSubscription({
			active: true,
			region,
			method,
			startedAt: Date.now(),
		});
		onActivated?.();
	}

	return (
		<div className="sub-float" role="dialog" aria-modal="true">
			<div className="sub-float-backdrop" onClick={() => onClose?.()} />
			<div className="sub-float-card">
				<header className="sub-float-head">
					<h2 className="serif">Review subscription and pay</h2>
					{onClose ? (
						<button
							type="button"
							className="sub-float-close"
							onClick={onClose}
							aria-label="Close"
						>
							×
						</button>
					) : null}
				</header>

				<div className="sub-float-grid">
					<div className="sub-float-left">
						<p className="kicker">Payment details</p>
						<div className="sub-float-methods">
							{METHODS.map((item) => (
								<button
									type="button"
									key={item.id}
									className={
										method === item.id
											? "sub-float-method is-active"
											: "sub-float-method"
									}
									onClick={() => {
										setMethod(item.id);
										setPending(false);
									}}
								>
								<span className="sub-float-radio" aria-hidden="true" />
									<span
										className={`sub-float-logos sub-float-logos--${item.id}`}
										aria-hidden="true"
									>
										{item.logos.map((logo) => (
											<img key={logo} src={logo} alt="" loading="lazy" />
										))}
										{item.logos.length === 0 ? (
											<span className="sub-float-whop">W</span>
										) : null}
									</span>
									<span className="sub-float-name">{item.name}</span>
									<span className="sub-float-cur">{item.currency}</span>
								</button>
							))}
						</div>

						{method === "mobile-money" ? (
							<div className="sub-float-fields">
								<p className="kicker">Mobile Money number</p>
								<input type="tel" placeholder="07XX XXX XXX" />
							</div>
						) : method === "card" ? (
							<div className="sub-float-fields">
								<p className="kicker">Card details</p>
								<div className="sub-float-card-row">
									<input type="text" placeholder="Card number" />
									<input type="text" placeholder="MM/YY" />
									<input type="text" placeholder="CVC" />
								</div>
							</div>
						) : null}

						<p className="sub-float-note">
							Billing region:{" "}
							<strong>{region === "UG" ? "Uganda" : country || "International"}</strong>{" "}
							· Mobile Money is charged in shillings, all other methods in US
							dollars.
						</p>
					</div>

					<aside className="sub-float-right">
						<p className="sub-float-plan">
							<strong>MAGEYE Streaming</strong>
							<span>Monthly · 1 viewer</span>
						</p>
						<div className="sub-float-line">
							<span>1 membership</span>
							<span>{price} /month</span>
						</div>
						<div className="sub-float-line">
							<span>Total for 1 month</span>
							<span>{price}</span>
						</div>
						<div className="sub-float-due">
							<span>Amount due</span>
							<strong>{price}</strong>
						</div>
						<button
							type="button"
							className="btn-gold sub-float-pay"
							onClick={() => setPending(true)}
						>
							Pay {price} now
						</button>
						{pending ? (
							<div className="sub-float-pending">
								<p>
									{selected.name} is not connected yet. Once your keys are added
									this button opens the real checkout for {price} per month.
								</p>
								<button type="button" className="btn-ghost" onClick={activate}>
									Grant test access for now
								</button>
							</div>
						) : (
							<p className="sub-float-small">
								Renews every month. Cancel any time. Streaming only — films are
								never downloadable.
							</p>
						)}
					</aside>
				</div>
			</div>
		</div>
	);
}
