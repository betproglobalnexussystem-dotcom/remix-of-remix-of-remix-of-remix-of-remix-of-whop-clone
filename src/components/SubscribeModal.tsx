import { useEffect, useState } from "react";
import airtelLogo from "../assets/airtel-money.png.asset.json";
import googlePayLogo from "../assets/google-pay-official.webp.asset.json";
import mtnLogo from "../assets/mtn-momo.png.asset.json";
import paypalLogo from "../assets/paypal-official.webp.asset.json";
import cardLogos from "../assets/visa-mastercard-official.png.asset.json";
import {
	WhopCheckoutEmbed,
	WhopExpressCheckoutButton,
} from "@whop/checkout/react";
import { getDeviceIdentity } from "../lib/device";
import { getRegionByIp } from "../lib/geo.functions";
import { useContent } from "../lib/admin-store";
import { checkoutReturnUrl, WHOP_STREAMING_PLAN_ID } from "../lib/whop";
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
	const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const content = useContent();

	// Silent device login: the generated address is used for the Whop receipt
	// so the visitor never has to type an email at checkout.
	useEffect(() => {
		setEmail(getDeviceIdentity()?.email);
	}, []);


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
	const plan = content.plans.find(
		(item) => item.id === (currency === "UGX" ? "ug" : "intl"),
	);
	const amount =
		plan?.amount ?? (currency === "UGX" ? UGX_MONTH : USD_MONTH);
	const price = plan?.priceLabel || money(currency, amount);

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
						{method === "mobile-money" ? (
							<button
								type="button"
								className="btn-gold sub-float-pay"
								onClick={() => {
									setError("Mobile Money will be available when your provider is connected.");
									setPending(true);
								}}
							>
								Pay {price} now
							</button>
						) : email ? (
							<div className="sub-float-whop-pay">
								<WhopExpressCheckoutButton
									planId={WHOP_STREAMING_PLAN_ID}
									returnUrl={checkoutReturnUrl(window.location.pathname)}
									methods={["apple_pay", "google_pay", "paypal"]}
									theme="light"
									themeOptions={{ accentColor: "gold" }}
									prefill={{ email }}
									adaptivePricing
									onComplete={(_planId, receiptId) => activate(receiptId)}
									onPaymentError={(paymentError) => {
										setError(
											paymentError.message || "Payment could not be completed.",
										);
										setPending(true);
									}}
								/>
								<WhopCheckoutEmbed
									planId={WHOP_STREAMING_PLAN_ID}
									returnUrl={checkoutReturnUrl(window.location.pathname)}
									theme="light"
									adaptivePricing
									hideEmail
									hideAddressForm
									hidePrice
									prefill={{ email }}
									themeOptions={{
										accentColor: "gold",
										borderRadius: 6,
										buttonText: `Pay ${price}`,
									}}
									styles={{ container: { paddingX: 0, paddingY: 0 } }}
									onComplete={(_id, receiptId) =>
										activate(typeof receiptId === "string" ? receiptId : undefined)
									}
									onPaymentError={(paymentError) => {
										setError(
											paymentError.message || "Payment could not be completed.",
										);
										setPending(true);
									}}
									fallback={<div className="loader" />}
								/>
							</div>
						) : (
							<div className="sub-float-whop-pay">
								<div className="loader" />
							</div>
						)}
						{pending ? (
							<div className="sub-float-pending">
								<p>
									{error ??
										`Checkout for ${selected.name} could not be opened right now.`}
								</p>
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
