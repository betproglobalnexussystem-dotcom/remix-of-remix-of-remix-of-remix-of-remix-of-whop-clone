import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/collections/$label")({
  head: () => ({
    meta: [
      { title: "Collections | MAGEYE" },
      {
        name: "description",
        content: "Browse MAGEYE store collections.",
      },
      { property: "og:title", content: "Collections | MAGEYE" },
      {
        property: "og:description",
        content: "Browse MAGEYE store collections.",
      },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { label } = Route.useParams();

  return (
    <section className="wrap" style={{ padding: "72px 0", maxWidth: 720 }}>
      <h1 className="h1">{label} collection</h1>
      <p style={{ marginTop: 16 }}>
        Products come from the store account, which isn&apos;t linked to this
        site yet, so there&apos;s nothing to show here.
      </p>
      <p style={{ marginTop: 16 }}>
        <Link className="btn-gold" to="/">
          Back to home
        </Link>
      </p>
    </section>
  );
}
