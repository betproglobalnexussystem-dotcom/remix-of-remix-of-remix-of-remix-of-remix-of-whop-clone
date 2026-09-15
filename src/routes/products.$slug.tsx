import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$slug")({
  head: () => ({
    meta: [
      { title: "Store | MAGEYE" },
      {
        name: "description",
        content: "Product details for the MAGEYE store.",
      },
      { property: "og:title", content: "Store | MAGEYE" },
      {
        property: "og:description",
        content: "Product details for the MAGEYE store.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();

  return (
    <section className="wrap" style={{ padding: "72px 0", maxWidth: 720 }}>
      <h1 className="h1">Store not connected</h1>
      <p style={{ marginTop: 16 }}>
        The product <strong>{slug}</strong> is served by the store account,
        which isn&apos;t linked to this site yet.
      </p>
      <p style={{ marginTop: 16 }}>
        <Link className="btn-gold" to="/">
          Back to home
        </Link>
      </p>
    </section>
  );
}
