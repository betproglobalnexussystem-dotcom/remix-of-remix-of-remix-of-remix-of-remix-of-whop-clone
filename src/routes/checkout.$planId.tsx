import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/checkout/$planId")({
  head: () => ({
    meta: [
      { title: "Checkout | MAGEYE" },
      {
        name: "description",
        content: "Complete your MAGEYE purchase.",
      },
      { property: "og:title", content: "Checkout | MAGEYE" },
      {
        property: "og:description",
        content: "Complete your MAGEYE purchase.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { planId } = Route.useParams();
  const [returnUrl, setReturnUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const requested = search.get("redirect");
    const redirect = requested?.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/films";
    const url = new URL("/checkout/complete", window.location.origin);
    url.searchParams.set("redirect", redirect);
    setReturnUrl(url.toString());
  }, []);

  const validPlan = /^plan_[A-Za-z0-9]+$/.test(planId);

  return (
    <main className="checkout-page">
      <header className="checkout-page__header">
        <Link to="/" className="checkout-page__brand">MAGEYE</Link>
        <Link to="/" className="checkout-page__back">Cancel</Link>
      </header>
      <section className="checkout-page__content">
        <p className="kicker">Secure payment</p>
        <h1 className="serif">Complete your purchase</h1>
        <p>Pay securely with the payment methods available for your device and country.</p>
        {validPlan && returnUrl ? (
          <div className="checkout-page__embed">
            <WhopCheckoutEmbed
              planId={planId}
              returnUrl={returnUrl}
              theme="light"
              adaptivePricing
              collectPhoneNumbers="optional"
              themeOptions={{ accentColor: "gold", borderRadius: 6 }}
              styles={{ container: { paddingX: 0 } }}
              fallback={<div className="loader" />}
              onPaymentError={(paymentError) =>
                setError(paymentError.message || "Payment could not be completed.")
              }
            />
          </div>
        ) : (
          <p className="checkout-page__error">This payment link is invalid.</p>
        )}
        {error ? <p className="checkout-page__error" role="alert">{error}</p> : null}
      </section>
    </main>
  );
}
