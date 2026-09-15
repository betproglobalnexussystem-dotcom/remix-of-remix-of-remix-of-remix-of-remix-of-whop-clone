import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteEnd } from "../components/layout/SiteEnd";
import { FilmCard } from "../components/sand/Cards";
import { FILMS, UPCOMING_FILMS } from "../data/catalog";
import filmsHero from "../assets/films-hero.jpg.asset.json";

export const Route = createFileRoute("/films/")({
  component: FilmsPage,
  head: () => ({ meta: [{ title: "Films - MAGEYE" }] }),
});

function FilmsPage() {
  const regular = FILMS.filter((film) => !film.upcoming);
  const [count, setCount] = useState(6);
  const visible = regular.slice(0, count);
  return (
    <>
      <section
        className="page-hero hero-photo"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 20, 28, 0.68), rgba(12, 20, 28, 0.68)), url("${filmsHero.url}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1>Films</h1>
          <p>
            A collection of films by Hassan Mageye exploring African stories,
            cultural identity, and character-driven drama.
          </p>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap">
          <p className="kicker">Upcoming Films</p>
          <div className="media-grid films-upcoming">
            {UPCOMING_FILMS.map((film) => (
              <FilmCard key={film.slug} film={film} />
            ))}
          </div>
        </div>
        <div className="wrap media-grid films-portrait">
          {visible.map((film) => (
            <FilmCard key={film.slug} film={film} portrait />
          ))}
        </div>
        {count < regular.length ? (
          <div className="load-more">
            <button
              type="button"
              className="btn-dark"
              onClick={() => setCount((value) => value + 6)}
            >
              Load More
            </button>
          </div>
        ) : null}
      </section>
      <section className="section">
        <div className="wrap partner">
          <h2>Partner with Us</h2>
          <p>
            We welcome investors, producers, distributors, organizations, and
            creative collaborators interested in our upcoming projects. Explore
            our current productions below and reach out to learn more about
            opportunities to get involved.
          </p>
          <h3>Interested in getting involved?</h3>
          <p>
            Contact us to learn more about our projects and current
            opportunities for collaboration.
          </p>
          <a className="btn-gold" href="mailto:info@mageye.com">
            Get in Touch
          </a>
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
