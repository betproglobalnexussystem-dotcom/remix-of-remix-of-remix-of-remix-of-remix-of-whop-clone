import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { articleBySlug, podcastBySlug } from "../data/catalog";

export const Route = createFileRoute("/article/$slug")({
  component: ArticlePage,
  loader: ({ params }) => {
    const item = articleBySlug(params.slug) ?? podcastBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? "Article"} - MAGEYE`,
      },
    ],
  }),
});

function ArticlePage() {
  const item = Route.useLoaderData();
  return (
    <>
      <div className="detail-hero">
        <img src={item.image} alt="" />
      </div>
      <article className="detail-body">
        <p className="kicker">{"category" in item ? item.category : "Article"}</p>
        <h1 className="serif" style={{ fontSize: 44 }}>
          {item.title}
        </h1>
        <p className="meta">
          {"author" in item ? item.author : "hosts" in item ? item.hosts : null}
        </p>
        <p>{item.excerpt}</p>
      </article>
      <SiteEnd />
    </>
  );
}
