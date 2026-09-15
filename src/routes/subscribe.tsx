import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteEnd } from "../components/layout/SiteEnd";
import {
	PAYMENT_METHODS,
	type PaymentMethod,
	type Region,
	detectRegion,
	planFor,
	readSubscription,
	writeSubscription,
} from "../lib/subscription";

export const Route = createFileRoute("/subscribe")({
	component: SubscribePage,
	head: () => ({
		meta: [
			{ title: "Subscribe to Watch - MAGEYE" },
			{
				name: "description",
				content:
					"Subscribe to stream MAGEYE films: UGX 5,000 in Uganda or USD 5.99 elsewhere, paid by Mobile Money, PayPal or Whop.",
			},
			{ property: "og:title", content: "Subscribe to Watch - MAGEYE" },
			{
				property: "og:description",
				content:
					"UGX 5,000 in Uganda, USD 5.99 worldwide. Mobile Money, PayPal or Whop.",
			},
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
	}),
});

function SubscribePage() {
	const navigate = useNavigate();
	const search = typeof window !== "undefined" ? window.location.search : "";
	const redirect = new URLSearchParams(search).get("redirect") ?? "";
	const [region, setRegion] = useState<Region>("INTL");
	const [method, setMethod] = useState<PaymentMethod | null>(null);
	const [pending, setPending] = useState(false);
	const [active, setActive] = useState(false);

	useEffect(() => {
		setRegion(detectRegion());
		setActive(Boolean(readSubscription()));
	}, []);

	const plan = planFor(region);

	function start(id: PaymentMethod) {
		setMethod(id);
		setPending(true);
	}

	function activate() {
		writeSubscription({
			active: true,
			region,
			...(method ? { method } : {}),
			startedAt: Date.now(),
		});
		setActive(true);
		if (redirect) window.location.assign(redirect);
	}

	return (
		<>
			<section className="section">
				<div className="wrap" style={{ maxWidth: 900 }}>
					<p className="kicker">Membership</p>
					<h1 className="serif" style={{ fontSize: 46, margin: "8px 0 12px" }}>
						Subscribe to watch
					</h1>
					<p style={{ maxWidth: 620 }}>
						Streaming access to every released MAGEYE film. Cancel any time —
						playback is streaming only and never downloadable.
					</p>

					<div
						style={{
							display: "flex",
							gap: 10,
							margin: "28px 0 8px",
							flexWrap: "wrap",
						}}
					>
						<button
							type="button"
							onClick={() => setRegion("UG")}
							className={region === "UG" ? "btn-gold" : "btn-ghost"}
						>
							I am in Uganda
						</button>
						<button
							type="button"
							onClick={() => setRegion("INTL")}
							className={region === "INTL" ? "btn-gold" : "btn-ghost"}
						>
							Other country
						</button>
					</div>

					<div
						style={{
							border: "1px solid rgba(0,0,0,.12)",
							borderRadius: 14,
							padding: 28,
							marginTop: 18,
							background: "rgba(255,255,255,.6)",
						}}
					>
						<h2 className="serif" style={{ margin: 0, fontSize: 28 }}>
							{region === "UG" ? "Uganda plan" : "International plan"}
						</h2>
						<div style={{ fontSize: 42, fontWeight: 700, marginTop: 8 }}>
							{plan.label}
						</div>
						<p style={{ marginTop: 4 }}>{plan.period}</p>
					</div>

					<h2 className="serif" style={{ marginTop: 40, fontSize: 28 }}>
						Choose how to pay
					</h2>
					<div
						style={{
							display: "grid",
							gap: 16,
							gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
							marginTop: 16,
						}}
					>
						{PAYMENT_METHODS.map((item) => (
							<div
								key={item.id}
								style={{
									border:
										method === item.id
											? "2px solid var(--gold)"
											: "1px solid rgba(0,0,0,.12)",
									borderRadius: 14,
									padding: 20,
								}}
							>
								<h3 style={{ margin: "0 0 6px", fontSize: 20 }}>{item.name}</h3>
								<p style={{ margin: "0 0 16px", fontSize: 15 }}>{item.blurb}</p>
								<button
									type="button"
									className="btn-gold"
									onClick={() => start(item.id)}
								>
									Pay {plan.label}
								</button>
							</div>
						))}
					</div>

					{pending ? (
						<div
							style={{
								marginTop: 32,
								padding: 22,
								borderRadius: 14,
								border: "1px dashed var(--gold)",
							}}
						>
							<h3 style={{ marginTop: 0 }}>Waiting for payment connection</h3>
							<p>
								{method === "mobile-money"
									? "Mobile Money"
									: method === "paypal"
										? "PayPal"
										: "Whop"}{" "}
								is not connected yet. Once the account keys are added, this
								button will open the real checkout for {plan.label}{" "}
								{plan.period}.
							</p>
							<button type="button" className="btn-ghost" onClick={activate}>
								Grant test access for now
							</button>
						</div>
					) : null}

					{active ? (
						<p style={{ marginTop: 28 }}>
							Your access is active.{" "}
							<Link to="/films" style={{ color: "var(--gold)" }}>
								Browse films »
							</Link>
						</p>
					) : null}
				</div>
			</section>
			<SiteEnd />
		</>
	);
}
