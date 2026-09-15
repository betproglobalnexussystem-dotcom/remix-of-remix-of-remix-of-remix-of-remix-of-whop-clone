import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { PageBody } from "../components/sand/PageBody";

export const Route = createFileRoute("/nonduality")({
  component: NondualityPage,
  head: () => ({
    meta: [{ title: "Nonduality - MAGEYE" }],
  }),
});

function NondualityPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Nonduality</h1>
      </section>
      <PageBody pageId="nonduality" />
      <SiteEnd />
    </>
  );
}
