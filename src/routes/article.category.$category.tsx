import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { ExploreCard } from "../components/sand/Cards";
import { ARTICLES, EXPLORE, PODCASTS } from "../data/catalog";
import { TOPIC_CATEGORIES } from "../data/site";

export const Route = createFileRoute("/article/category/$category")({
  component: CategoryPage,
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.category} - MAGEYE`,
      },
    ],
  }),
});

function CategoryPage() {
  const { category } = Route.useParams();
  const topic = TOPIC_CATEGORIES.find((item) => item.slug === category);
  const label = topic?.label ?? category.replace(/-/g, " ");
  const needle = label.toLowerCase().split("&")[0]?.trim() ?? "";
  const fromArticles = [...ARTICLES, ...EXPLORE].filter((item) =>
    item.category.toLowerCase().includes(needle.split(" ")[0] ?? ""),
  );
  const fromPodcasts = PODCASTS.filter((item) =>
    item.category.toLowerCase().includes(needle.split(" ")[0] ?? ""),
  ).map((item) => ({
    slug: item.slug,
    title: item.title,
    category: item.category,
    author: item.hosts,
    excerpt: item.excerpt,
    image: item.image,
    kind: "podcast" as const,
  }));
  const unique = [...fromArticles, ...fromPodcasts].filter(
    (item, index, list) => list.findIndex((entry) => entry.slug === item.slug) === index,
  );
  const shown = unique.length ? unique : EXPLORE;

  return (
    <>
      <section className="page-hero">
        <div>
          <h1>{label}</h1>
          <p>Articles, poems, videos, and podcasts in this topic.</p>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {shown.map((item) => (
            <ExploreCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
