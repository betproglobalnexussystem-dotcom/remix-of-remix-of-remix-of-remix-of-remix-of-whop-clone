import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { courseBySlug, eventBySlug } from "../data/catalog";

export const Route = createFileRoute("/event/$slug")({
  component: EventDetailPage,
  loader: ({ params }) => {
    const item = eventBySlug(params.slug) ?? courseBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? "Event"} - MAGEYE`,
      },
    ],
  }),
});

function EventDetailPage() {
  const item = Route.useLoaderData();
  return (
    <>
      <div className="detail-hero">
        <img src={item.image} alt={item.title} />
      </div>
      <article className="detail-body">
        {"badge" in item ? <p className="kicker">{item.badge}</p> : null}
        <h1 className="serif" style={{ fontSize: 44 }}>
          {item.title}
        </h1>
        {"date" in item && item.date ? <p className="meta">{item.date}</p> : null}
        <p>{item.excerpt}</p>
        <p>
          Members receive access to live gatherings and the recording library.
          Join to register and keep the conversation going.
        </p>
        <Link className="btn-gold" to="/join-the-community">
          Join MAGEYE
        </Link>
      </article>
      <SiteEnd />
    </>
  );
}
