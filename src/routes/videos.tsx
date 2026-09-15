import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { FilmCard } from "../components/sand/Cards";
import { FILMS } from "../data/catalog";

export const Route = createFileRoute("/videos")({
  component: VideosPage,
  head: () => ({
    meta: [{ title: "Videos - MAGEYE" }],
  }),
});

function VideosPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Videos</h1>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {FILMS.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
