import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { detectRegion, writeSubscription } from "../lib/subscription";

export const Route = createFileRoute("/checkout/complete")({
	component: CheckoutCompletePage,
	head: () => ({
		meta: [
			{ title: "Payment Complete | MAGEYE" },
			{ name: "description", content: "Your MAGEYE payment result." },
			{ property: "og:title", content: "Payment Complete | MAGEYE" },
			{ property: "og:description", content: "Your MAGEYE payment result." },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary" },
		],
	}),
});

function safeRedirect(value: string | null) {
	return value?.startsWith("/") && !value.startsWith("//") ? value : "/films";
}

function CheckoutCompletePage() {
	const params = useMemo(() => {
		if (typeof window === "undefined") return new URLSearchParams();
		return new URLSearchParams(window.location.search);
	}, []);
	const success = params.get("status") === "success";
	const redirect = safeRedirect(params.get("redirect"));

	useEffect(() => {
		if (!success) return;
		writeSubscription({
			active: true,
			region: detectRegion(),
			method: "whop",
			startedAt: Date.now(),
		});
	}, [success]);

	return (
		<main className="checkout-result">
			<section className="checkout-result__card">
				<p className="kicker">Whop checkout</p>
				<h1 className="serif">
					{success ? "Your subscription is active" : "Payment was not completed"}
				</h1>
				<p>
					{success
						? "Thank you. You can now continue to the MAGEYE film library."
						: "No charge was confirmed. You can return and try the secure checkout again."}
				</p>
				<a className="btn-gold" href={success ? redirect : "/subscribe"}>
					{success ? "Continue watching" : "Try payment again"}
				</a>
				<Link to="/" className="checkout-result__home">
					Back to MAGEYE
				</Link>
			</section>
		</main>
	);
}