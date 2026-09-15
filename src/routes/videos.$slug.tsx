import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { articleBySlug, filmBySlug } from "../data/catalog";

export const Route = createFileRoute("/videos/$slug")({
  component: VideoPage,
  loader: ({ params }) => {
    const item = filmBySlug(params.slug) ?? articleBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? "Video"} - MAGEYE`,
      },
    ],
  }),
});

function VideoPage() {
  const item = Route.useLoaderData();
  return (
    <>
      <div className="detail-hero">
        <img src={"image" in item ? item.image : ""} alt="" />
      </div>
      <article className="detail-body">
        <h1 className="serif" style={{ fontSize: 44 }}>
          {item.title}
        </h1>
        <p>{"excerpt" in item ? item.excerpt : null}</p>
        <Link className="btn-gold" to="/join-the-community">
          Join MAGEYE to Watch
        </Link>
      </article>
      <SiteEnd />
    </>
  );
}
