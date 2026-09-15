import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { podcastBySlug } from "../data/catalog";

export const Route = createFileRoute("/audio/$slug")({
  component: AudioPage,
  loader: ({ params }) => {
    const item = podcastBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? "Podcast"} - MAGEYE`,
      },
    ],
  }),
});

function AudioPage() {
  const item = Route.useLoaderData();
  return (
    <>
      <article className="detail-body">
        <img src={item.image} alt="" style={{ width: 280, marginBottom: 24 }} />
        <p className="kicker">{item.category}</p>
        <h1 className="serif" style={{ fontSize: 44 }}>
          {item.title}
        </h1>
        <p className="meta">{item.hosts}</p>
        <p>{item.excerpt}</p>
        <Link className="btn-gold" to="/join-the-community">
          Listen with membership
        </Link>
      </article>
      <SiteEnd />
    </>
  );
}
