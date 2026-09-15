import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { ExploreCard } from "../components/sand/Cards";
import { ARTICLES, EXPLORE, PODCASTS } from "../data/catalog";
import { TOPIC_CATEGORIES } from "../data/site";

export const Route = createFileRoute("/article/tag/$tag")({
  component: TagPage,
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.tag} - MAGEYE`,
      },
    ],
  }),
});

function TagPage() {
  const { tag } = Route.useParams();
  const topic = TOPIC_CATEGORIES.find((item) => item.slug === tag);
  const label = topic?.label ?? tag.replace(/-/g, " ");
  const articles = [
    ...ARTICLES.filter(
      (item) =>
        item.tag === tag ||
        item.category.toLowerCase().includes(label.toLowerCase().split(" ")[0] ?? ""),
    ),
    ...EXPLORE.filter((item) =>
      item.category.toLowerCase().includes(label.toLowerCase().split(" ")[0] ?? ""),
    ),
  ];
  const unique = articles.filter(
    (item, index, list) => list.findIndex((entry) => entry.slug === item.slug) === index,
  );
  const extras = PODCASTS.filter((item) =>
    item.category.toLowerCase().includes(label.toLowerCase().split(" ")[0] ?? ""),
  ).map((item) => ({
    slug: item.slug,
    title: item.title,
    category: item.category,
    author: item.hosts,
    excerpt: item.excerpt,
    image: item.image,
    kind: "podcast" as const,
  }));
  const list = unique.length ? unique : [...unique, ...extras];
  const shown = list.length ? list : extras.length ? extras : EXPLORE.slice(0, 6);

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
