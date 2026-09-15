import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
  head: () => ({
    meta: [{ title: "Testimonials - MAGEYE" }],
  }),
});

function TestimonialsPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Testimonials</h1>
      </section>
      <article className="page-copy">
        <p>
          “SAND has been a rare gathering place where science, spirituality, and
          social healing can sit in the same circle.”
        </p>
        <p>
          “The films and community conversations keep opening doors I did not
          know I needed.”
        </p>
        <p>
          Members, speakers, and partners share how SAND’s work has accompanied
          their practice, research, and community care.
        </p>
      </article>
      <SiteEnd />
    </>
  );
}
