import { createFileRoute, Link } from "@tanstack/react-router";

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
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { planId } = Route.useParams();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f6f5f0",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <h1 className="h1">Payments not connected</h1>
        <p style={{ marginTop: 16 }}>
          Plan <strong>{planId}</strong> needs the payment account to be linked
          before checkout can run here.
        </p>
        <p style={{ marginTop: 24 }}>
          <Link className="btn-gold" to="/">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
