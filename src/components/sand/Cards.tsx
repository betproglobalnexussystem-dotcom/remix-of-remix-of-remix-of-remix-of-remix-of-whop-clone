import { Link } from "@tanstack/react-router";
import type { Article, Course, EventItem, Film, Podcast } from "../../data/catalog";
import { exploreHref } from "../../data/catalog";

function PlayIcon() {
  return (
    <span className="play" aria-hidden>
      <svg viewBox="0 0 54 54" fill="none">
        <circle cx="27" cy="27" r="26" stroke="white" strokeWidth="1.4" />
        <path d="M22 16L40 27L22 38V16Z" fill="white" />
      </svg>
    </span>
  );
}

export function EventCard({ item }: { item: EventItem | Course }) {
  return (
    <Link to="/event/$slug" params={{ slug: item.slug }} className="event-card">
      <div className="thumb">
        <img src={item.image} alt="" />
        <span className="badge">{item.badge}</span>
      </div>
      <h3>{item.title}</h3>
      {item.date ? <p className="meta">{item.date}</p> : null}
      <p className="excerpt">{item.excerpt}</p>
    </Link>
  );
}

export function FilmCard({ film, portrait }: { film: Film; portrait?: boolean }) {
  return (
    <Link
      to={film.upcoming ? "/films/$slug" : "/watch/$slug"}
      params={{ slug: film.slug }}
      className="film-card"
    >
      <div className={portrait ? "thumb portrait" : "thumb"}>
        <img src={film.image} alt="" />
        {film.upcoming ? (
          <span className="badge badge-soon">Coming Soon</span>
        ) : (
          <>
            <PlayIcon />
            <span className="watch-now">
              Watch
              <br />
              Now
            </span>
          </>
        )}
      </div>
      <h3>{film.title}</h3>
      {portrait ? null : (
        <>
          {film.duration ? <p className="meta">{film.duration}</p> : null}
          <p className="excerpt">{film.excerpt}</p>
        </>
      )}
    </Link>
  );
}

export function ExploreCard({ item }: { item: Article }) {
  return (
    <a href={exploreHref(item)} className="explore-card">
      <div className="thumb">
        <img src={item.image} alt="" />
        <span className="badge">{item.category}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="excerpt">{item.excerpt}</p>
    </a>
  );
}

export function PodcastCard({ item }: { item: Podcast }) {
  return (
    <Link to="/audio/$slug" params={{ slug: item.slug }} className="media-card">
      <div className="thumb" style={{ aspectRatio: "1 / 1" }}>
        <img src={item.image} alt="" />
      </div>
      <p className="kicker">{item.category}</p>
      <h3>{item.title}</h3>
      <p className="excerpt">{item.excerpt}</p>
      <p className="meta">{item.hosts}</p>
    </Link>
  );
}

export function TopicIcons({
  topics,
}: {
  topics: readonly { slug: string; label: string; icon: string }[];
}) {
  return (
    <div className="topic-icons">
      {topics.map((topic) => (
        <a key={topic.slug} href={`/article/category/${topic.slug}`}>
          <img src={topic.icon} alt="" width={140} height={140} />
          {topic.label}
        </a>
      ))}
    </div>
  );
}
