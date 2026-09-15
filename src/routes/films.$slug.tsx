import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { filmBySlug } from "../data/catalog";

export const Route = createFileRoute("/films/$slug")({
  component: FilmDetailPage,
  loader: ({ params }) => {
    const film = filmBySlug(params.slug);
    if (!film) throw notFound();
    return film;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? "Film"} - MAGEYE`,
      },
    ],
  }),
});

function FilmDetailPage() {
  const film = Route.useLoaderData();
  return (
    <>
      <div className="detail-hero">
        <img src={film.poster ?? film.image} alt={film.title} />
      </div>
      <article className="detail-body">
        <p className="kicker">Film</p>
        <h1 className="serif" style={{ fontSize: 48 }}>
          {film.title}
        </h1>
        {film.duration ? <p className="meta">{film.duration}</p> : null}
        {film.land ? <p className="meta">{film.land}</p> : null}
        <p>{film.excerpt}</p>
        <p>
          Join MAGEYE to watch this film and the growing library of original
          documentaries, conversations, and courses.
        </p>
        {film.upcoming ? (
          <Link className="btn-gold" to="/join-the-community">
            Join MAGEYE to Watch
          </Link>
        ) : (
          <Link className="btn-gold" to="/watch/$slug" params={{ slug: film.slug }}>
            Watch Now
          </Link>
        )}
      </article>
      <SiteEnd />
    </>
  );
}
