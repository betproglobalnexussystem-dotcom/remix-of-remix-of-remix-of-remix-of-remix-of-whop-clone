import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { EventCard, ExploreCard } from "../components/sand/Cards";
import { SiteEnd } from "../components/layout/SiteEnd";
import {
  EVENTS,
  EXPLORE,
  FILMS,
  HERO_SLIDES,
} from "../data/catalog";

const AWARDS = [
  {
    image: "/awards/uganda-film-festival.png",
    eyebrow: "BEST FILM IN AN INDIGENOUS LANGUAGE",
    title: "Uganda Film Festival",
    year: "2025",
    alt: "Gold Uganda Film Festival award trophy",
  },
  {
    image: "/awards/mashariki-film-festival.png",
    eyebrow: "SPECIAL MENTION",
    title: "Mashariki African Film Festival",
    year: "2025",
    alt: "Mashariki African Film Festival award trophy",
  },
  {
    image: "/awards/silicon-valley-film-festival.png",
    eyebrow: "OFFICIAL SELECTION",
    title: "Silicon Valley African Film Festival",
    year: "2025",
    alt: "Silicon Valley African Film Festival award trophy",
  },
  {
    image: "/awards/academy-awards.png",
    eyebrow: "UGANDA SUBMISSION · BEST INTERNATIONAL FEATURE",
    title: "Academy Awards",
    year: "98TH EDITION",
    alt: "Academy Awards trophy",
  },
];

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [{ title: "MAGEYE" }],
  }),
});

function HomePage() {
  const [slide, setSlide] = useState(0);
  const [eventStart, setEventStart] = useState(0);
  const [exploreStart, setExploreStart] = useState(0);
  const [filmRailPosition, setFilmRailPosition] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });
  const filmRailRef = useRef<HTMLDivElement>(null);
  const posters = FILMS.slice(0, 7);
  const series = FILMS.filter((film) =>
    [
      "mauri",
      "the-eternal-song",
      "sila",
      "little-singer",
      "kato-dreams-of-dark-earth",
      "in-the-circle-of-life",
      "if-an-owl-calls-your-name",
    ].includes(film.slug),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const rail = filmRailRef.current;
    if (!rail) return;

    const updateFilmRailPosition = () => {
      setFilmRailPosition({
        canScrollLeft: rail.scrollLeft > 4,
        canScrollRight: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
      });
    };

    updateFilmRailPosition();
    const frame = window.requestAnimationFrame(updateFilmRailPosition);
    rail.addEventListener("scroll", updateFilmRailPosition, { passive: true });
    window.addEventListener("resize", updateFilmRailPosition);

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", updateFilmRailPosition);
      window.removeEventListener("resize", updateFilmRailPosition);
    };
  }, [posters.length]);

  const scrollFilms = (direction: number) => {
    const rail = filmRailRef.current;
    if (!rail) return;

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    if (maxScrollLeft <= 0) return;

    const nextScrollLeft =
      direction > 0
        ? Math.min(maxScrollLeft, rail.scrollLeft + rail.clientWidth - 40)
        : Math.max(0, rail.scrollLeft - rail.clientWidth + 40);

    rail.scrollLeft = nextScrollLeft;
  };

  const visibleEvents = EVENTS.slice(eventStart, eventStart + 3);
  const visibleExplore = EXPLORE.slice(exploreStart, exploreStart + 3);

  return (
    <>
      <section className="hero">
        {HERO_SLIDES.map((item, index) => (
          <a
            key={item.title}
            href={item.href}
            className={index === slide ? "hero-slide is-on" : "hero-slide"}
            aria-hidden={index !== slide}
          >
            <picture>
              <source media="(max-width: 700px)" srcSet={item.mobile} />
              <img src={item.desktop} alt={item.title} />
            </picture>
          </a>
        ))}
        <div className="hero-dots">
          {HERO_SLIDES.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === slide ? "is-on" : ""}
              aria-label={item.title}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="wrap founder-profile" id="meet-creator">
        <div className="founder-profile__media">
          <img src="/hassan-mageye.png" alt="Hassan Mageye" />
        </div>
        <div className="founder-profile__copy">
          <div className="kicker">Meet the creator</div>
          <h1>Hassan Mageye</h1>
          <p>
            Hassan Mageye is a Ugandan-American writer, director and producer
            whose filmmaking career spans more than a decade. He studied Mass
            Communication at Makerere University and moved from an early
            interest in journalism toward filmmaking. His work has focused on
            African stories, cultural identity, social themes and
            character-driven drama. Hassan Mageye currently resides in
            California.
          </p>
          <Link className="btn-gold" to="/join-the-community">
            Join MAGEYE
          </Link>
        </div>
        <div className="founder-profile__films">
          <div className="section-head">
            <div className="kicker">Films</div>
          </div>
          <div className="poster-rail-shell">
            <button
              type="button"
              className={`poster-rail-arrow poster-rail-arrow--prev ${
                filmRailPosition.canScrollLeft ? "" : "is-disabled"
              }`}
              aria-label="Previous films"
              aria-controls="founder-film-rail"
              aria-disabled={!filmRailPosition.canScrollLeft}
              onClick={() => scrollFilms(-1)}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <div className="poster-rail" id="founder-film-rail" ref={filmRailRef}>
              {posters.map((film) => (
                <Link
                  key={film.slug}
                  to="/films/$slug"
                  params={{ slug: film.slug }}
                >
                  <img src="/hassan-mageye.png" alt={`${film.title} poster`} />
                  <span>{film.title}</span>
                </Link>
              ))}
            </div>
            <button
              type="button"
              className={`poster-rail-arrow poster-rail-arrow--next ${
                filmRailPosition.canScrollRight ? "" : "is-disabled"
              }`}
              aria-label="Next films"
              aria-controls="founder-film-rail"
              aria-disabled={!filmRailPosition.canScrollRight}
              onClick={() => scrollFilms(1)}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap-wide">
          <div className="section-head">
            <div className="kicker">Explore</div>
            <div className="arrow-row">
              <button
                type="button"
                aria-label="Previous stories"
                onClick={() =>
                  setExploreStart((value) => Math.max(0, value - 1))
                }
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next stories"
                onClick={() =>
                  setExploreStart((value) =>
                    Math.min(EXPLORE.length - 3, value + 1),
                  )
                }
              >
                →
              </button>
            </div>
          </div>
          <div className="carousel">
            {visibleExplore.map((item) => (
              <ExploreCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap learn" id="learn-together">
        <div>
          <div className="split-media">
            <img
              src="/learn-together-crew.jpg"
              alt="Film crew working in a forest"
            />
            <img
              src="/learn-together-production.jpg"
              alt="Production team filming in the countryside"
            />
          </div>
        </div>
        <div>
          <div className="kicker">PRODUCTION SERVICES</div>
          <h2>Bring Your Production to Life</h2>
          <p>
            Planning to shoot a film, documentary, commercial, music video, or
            other production in Africa or Santa Rosa, California?
          </p>
          <p>
            We can help coordinate the local support you need to get your
            production moving.
          </p>
          <div className="production-services-list" aria-label="Production services">
            <Link className="production-service-chip" to="/contact">
              LOCATIONS
            </Link>
            <Link className="production-service-chip" to="/contact">
              LOCAL CREW
            </Link>
            <Link className="production-service-chip" to="/contact">
              PERMIT COORDINATION
            </Link>
            <Link className="production-service-chip" to="/contact">
              PRODUCTION SUPPORT
            </Link>
          </div>
          <div className="production-actions">
            <Link className="btn-dark" to="/contact">
              PLAN YOUR SHOOT →
            </Link>
            <Link className="btn-ghost" to="/contact">
              BOOK A SCREENING
            </Link>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap-wide">
          <div className="section-head">
            <div className="kicker">Events</div>
            <div className="arrow-row">
              <button
                type="button"
                aria-label="Previous events"
                onClick={() =>
                  setEventStart((value) => Math.max(0, value - 1))
                }
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next events"
                onClick={() =>
                  setEventStart((value) =>
                    Math.min(EVENTS.length - 3, value + 1),
                  )
                }
              >
                →
              </button>
            </div>
          </div>
          <div className="carousel">
            {visibleEvents.map((item) => (
              <EventCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap welcome" style={{ paddingTop: 72 }}>
        <div>
          <h2 className="serif" style={{ fontSize: 56, margin: 0 }}>
            Films
          </h2>
          <p>
            Our vision for <em>The Eternal Song</em> documentary series is to
            honor Indigenous resilience, illuminate sacred wisdom held for
            humanity and Earth, and invite healing across communities facing
            trauma and colonial erasure.
          </p>
          <p>
            Over the next two years, we will release a total of 12 full-length
            films featuring different indigenous traditions. Each film opens a
            portal into the ancestral wisdom of these cultures, calling us to
            remember, grieve, heal, and act.
          </p>
        </div>
        <div className="poster-rail">
          {series.map((film) => (
            <Link
              key={film.slug}
              to="/films/$slug"
              params={{ slug: film.slug }}
            >
              <img src={film.poster ?? film.image} alt={film.title} />
              <span>{film.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap partner">
          <div className="kicker">Partner with us</div>
          <h2 className="serif">Partner with Us</h2>
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

      <section className="awards" id="awards">
        <div className="awards-inner">
          <div className="awards-kicker">SELECTED RECOGNITION · MAGEYE · 2025</div>
          <h2 className="awards-title">
            Winning <span>&amp; awards.</span>
          </h2>
          <div className="awards-grid">
            {AWARDS.map((award) => (
              <article className="award-card" key={award.title}>
                <div className="award-card__image">
                  <img src={award.image} alt={award.alt} />
                </div>
                <div className="award-card__eyebrow">{award.eyebrow}</div>
                <h3>{award.title}</h3>
                <div className="award-card__year">{award.year}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteEnd />
    </>
  );
}
