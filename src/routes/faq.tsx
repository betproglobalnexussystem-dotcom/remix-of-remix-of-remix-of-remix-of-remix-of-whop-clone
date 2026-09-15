import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { FAQS } from "../data/pages";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [{ title: "FAQ - MAGEYE" }],
  }),
});

function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Frequently Asked Questions</h1>
      </section>
      <section className="wrap faq" style={{ paddingBottom: 80 }}>
        {FAQS.map((item) => (
          <details key={item.q} open>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
      <SiteEnd />
    </>
  );
}
