import { useEffect, useState } from "react";
import { getRegionByIp } from "../lib/geo.functions";
import {
	PAYMENT_METHODS,
	type PaymentMethod,
	type Region,
	detectRegion,
	planFor,
	writeSubscription,
} from "../lib/subscription";

type Props = {
	open: boolean;
	title?: string;
	onClose?: () => void;
	onActivated?: () => void;
};

/** Floating subscription panel — region is detected from the visitor IP. */
export function SubscribeModal({ open, title, onClose, onActivated }: Props) {
	const [region, setRegion] = useState<Region>("INTL");
	const [country, setCountry] = useState<string | null>(null);
	const [method, setMethod] = useState<PaymentMethod | null>(null);

	useEffect(() => {
		if (!open) return;
		setRegion(detectRegion());
		let cancelled = false;
		getRegionByIp()
			.then((res) => {
				if (cancelled) return;
				setRegion(res.region);
				setCountry(res.country);
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
	const plan = planFor(region);

	function activate() {
		writeSubscription({
			active: true,
			region,
			...(method ? { method } : {}),
			startedAt: Date.now(),
		});
		onActivated?.();
	}

	return (
		<div className="sub-float" role="dialog" aria-modal="true">
			<div className="sub-float-backdrop" onClick={() => onClose?.()} />
			<div className="sub-float-card">
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
				<p className="kicker">Membership</p>
				<h2 className="serif" style={{ margin: "6px 0 10px", fontSize: 30 }}>
					{title ? `Subscribe to watch ${title}` : "Subscribe to watch"}
				</h2>
				<p style={{ margin: 0 }}>
					{region === "UG"
						? "Uganda plan detected from your location."
						: "International plan based on your location."}
					{country ? ` (${country})` : ""}
				</p>

				<div className="sub-float-price">
					<strong>{plan.label}</strong>
					<span>{plan.period}</span>
				</div>

				<div className="sub-float-methods">
					{PAYMENT_METHODS.map((item) => (
						<button
							type="button"
							key={item.id}
							className={
								method === item.id
									? "sub-float-method is-active"
									: "sub-float-method"
							}
							onClick={() => setMethod(item.id)}
						>
							<strong>{item.name}</strong>
							<span>{item.blurb}</span>
						</button>
					))}
				</div>

				{method ? (
					<div className="sub-float-pending">
						<p style={{ margin: "0 0 10px" }}>
							Payment is not connected yet. Once your keys are added this will
							open the real {method === "mobile-money" ? "Mobile Money" : method === "paypal" ? "PayPal" : "Whop"}{" "}
							checkout for {plan.label} {plan.period}.
						</p>
						<button type="button" className="btn-ghost" onClick={activate}>
							Grant test access for now
						</button>
					</div>
				) : (
					<p style={{ fontSize: 14, opacity: 0.75 }}>
						Choose a payment method to continue.
					</p>
				)}
			</div>
		</div>
	);
}
