import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { COURSES, FILMS } from "../data/catalog";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
  head: () => ({
    meta: [{ title: "My Library - MAGEYE" }],
  }),
});

function LibraryPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <h1>My Library</h1>
          <p>
            Membership unlocks films, courses, gatherings, and the podcast
            extras. Join MAGEYE to access the full library.
          </p>
          <Link className="btn-gold" to="/join-the-community">
            Join MAGEYE
          </Link>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {FILMS.slice(0, 3).map((film) => (
            <Link key={film.slug} to="/films/$slug" params={{ slug: film.slug }}>
              <img src={film.image} alt="" />
              <h3 className="serif">{film.title}</h3>
            </Link>
          ))}
          {COURSES.slice(0, 3).map((course) => (
            <Link key={course.slug} to="/event/$slug" params={{ slug: course.slug }}>
              <img src={course.image} alt="" />
              <h3 className="serif">{course.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
