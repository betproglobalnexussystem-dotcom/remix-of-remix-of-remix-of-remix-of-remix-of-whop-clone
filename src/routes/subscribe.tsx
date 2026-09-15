import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteEnd } from "../components/layout/SiteEnd";
import {
	PAYMENT_METHODS,
	activateFromReturnUrl,
	type PaymentMethod,
	type Region,
	detectRegion,
	planFor,
	readSubscription,
	writeSubscription,
} from "../lib/subscription";
import { getRegionByIp } from "../lib/geo.functions";
import { useContent } from "../lib/admin-store";
import { WHOP_STREAMING_PLAN_ID } from "../lib/whop";

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
	const search = typeof window !== "undefined" ? window.location.search : "";
	const redirect = new URLSearchParams(search).get("redirect") ?? "";
	const [region, setRegion] = useState<Region>("INTL");
	const [method, setMethod] = useState<PaymentMethod | null>(null);
	const [pending, setPending] = useState(false);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const guess = detectRegion();
		setRegion(guess);
		activateFromReturnUrl(guess);
		setActive(Boolean(readSubscription()));
		getRegionByIp()
			.then((res) => setRegion(res.region))
			.catch(() => {});
	}, []);

	const content = useContent();
	const setting = content.plans.find(
		(item) => item.id === (region === "UG" ? "ug" : "intl"),
	);
	const basePlan = planFor(region);
	const plan = setting
		? { ...basePlan, label: setting.priceLabel, period: setting.period }
		: basePlan;
	const methods = PAYMENT_METHODS.filter((item) => {
		const match = content.payments.find((entry) => entry.id === item.id);
		return match ? match.enabled : true;
	}).map((item) => {
		const match = content.payments.find((entry) => entry.id === item.id);
		return match ? { ...item, name: match.name, blurb: match.blurb } : item;
	});

	function start(id: PaymentMethod) {
		setMethod(id);
		if (id !== "mobile-money") {
			const planId = setting?.whopPlanId || WHOP_STREAMING_PLAN_ID;
			const next = redirect || "/films";
			window.location.assign(`/checkout/${planId}?redirect=${encodeURIComponent(next)}`);
			return;
		}
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
							{setting ? `${setting.label} plan` : region === "UG" ? "Uganda plan" : "International plan"}
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
						{methods.map((item) => (
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
							<h3 style={{ marginTop: 0 }}>Mobile Money is coming soon</h3>
							<p>
								Mobile Money will be available when your Uganda payment provider is connected.
							</p>
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
