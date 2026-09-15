import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { ExploreCard } from "../components/sand/Cards";
import { ARTICLES } from "../data/catalog";

export const Route = createFileRoute("/articles")({
  component: ArticlesPage,
  head: () => ({
    meta: [{ title: "Articles - MAGEYE" }],
  }),
});

function ArticlesPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Articles</h1>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {ARTICLES.map((item) => (
            <ExploreCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
