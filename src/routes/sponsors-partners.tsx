import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";

export const Route = createFileRoute("/sponsors-partners")({
  component: PartnersPage,
  head: () => ({
    meta: [{ title: "Partners - MAGEYE" }],
  }),
});

function PartnersPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Partners</h1>
      </section>
      <article className="page-copy">
        <h2>Interested in becoming a partner?</h2>
        <p>
          SAND collaborates with other organizations who operate in the field of
          consciousness, spirituality, ecology, and healing. Please write from
          the Contact page with any specific questions.
        </p>
        <p>We look forward to hearing from you!</p>
      </article>
      <SiteEnd />
    </>
  );
}
