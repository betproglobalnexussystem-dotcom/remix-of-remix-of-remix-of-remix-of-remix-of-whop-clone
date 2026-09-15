import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteEnd } from "../components/layout/SiteEnd";
import { FilmCard } from "../components/sand/Cards";
import { FILMS } from "../data/catalog";

export const Route = createFileRoute("/films")({
  component: FilmsPage,
  head: () => ({ meta: [{ title: "Films - MAGEYE" }] }),
});

function FilmsPage() {
  const [count, setCount] = useState(6);
  const visible = FILMS.slice(0, count);
  return (
    <>
      <section className="page-hero">
        <div>
          <h1>Films</h1>
          <p>
            Our library of SAND-produced original films at the intersection of
            spirituality, science, social healing, and the arts.
          </p>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {visible.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
        {count < FILMS.length ? (
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
      <SiteEnd />
    </>
  );
}
