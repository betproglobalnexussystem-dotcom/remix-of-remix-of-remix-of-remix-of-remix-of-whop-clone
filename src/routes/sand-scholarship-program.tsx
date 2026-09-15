import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { DONATE_PLAN_ID } from "../data/site";

export const Route = createFileRoute("/sand-scholarship-program")({
  component: ScholarshipPage,
  head: () => ({
    meta: [{ title: "Scholarship Program - MAGEYE" }],
  }),
});

function ScholarshipPage() {
  return (
    <>
      <section className="page-hero">
        <h1>SAND Scholarship Program</h1>
      </section>
      <article className="page-copy">
        <p>
          SAND is committed to making our programs accessible to as many people
          as possible, from all income levels and backgrounds. To that end, we
          are offering 200-300 partial and full scholarships for each of our
          programs and gatherings. We are particularly interested in supporting
          historically marginalized communities.
        </p>
        <p>
          This scholarship program is part of our larger commitment to
          anti-racism and equity. We prioritize applications from Black,
          Indigenous, and other people of color as well as those wishing to join
          from less economically developed or otherwise marginalized countries
          (global south). We ask that you honor those intentions and only apply
          if a scholarship is truly needed.
        </p>
        <p>
          When reviewing applications, we consider your connection to the topic
          and presenter, how you will share the experience with your community,
          financial need, previous awards, event capacity, and available funds.
        </p>
        <p>
          SAND is a nonprofit organization. If you are in a position to do so,
          please consider helping us create more scholarship opportunities by
          donating to the scholarship fund.
        </p>
        <a className="btn-gold" href={`/checkout/${DONATE_PLAN_ID}`}>
          Donate
        </a>
      </article>
      <SiteEnd />
    </>
  );
}
