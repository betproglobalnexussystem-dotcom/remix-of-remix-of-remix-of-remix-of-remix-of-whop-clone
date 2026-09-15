import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ARTICLES,
  COURSES,
  EVENTS,
  FILMS,
  PODCASTS,
  exploreHref,
} from "../../data/catalog";
import { NAV, POPULAR_TOPICS } from "../../data/site";
import brandLogo from "../../assets/sanyuka-african-ent-logo.png.asset.json";

type Hit = { href: string; title: string; kind: string };

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [] as Hit[];
    const all: Hit[] = [
      ...FILMS.map((item) => ({
        href: `/films/${item.slug}`,
        title: item.title,
        kind: "Film",
      })),
      ...EVENTS.map((item) => ({
        href: `/event/${item.slug}`,
        title: item.title,
        kind: "Event",
      })),
      ...COURSES.map((item) => ({
        href: `/event/${item.slug}`,
        title: item.title,
        kind: "Course",
      })),
      ...PODCASTS.map((item) => ({
        href: `/audio/${item.slug}`,
        title: item.title,
        kind: "Podcast",
      })),
      ...ARTICLES.map((item) => ({
        href: exploreHref(item),
        title: item.title,
        kind: "Article",
      })),
    ];
    return all.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  function closeAll() {
    setSearchOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <button
          type="button"
          className="hamburger"
          aria-label="Open menu"
          onClick={() => {
            setMobileOpen((open) => !open);
            setSearchOpen(false);
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="logo" onClick={closeAll}>
          <img src={brandLogo.url} alt="Sanyuka African Entertainment" />
        </Link>
        <nav className="nav-main" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.to}
              href={item.to}
              data-active={pathname.startsWith(item.to) ? "true" : "false"}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Search"
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileOpen(false);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <Link to="/library" className="hide-sm" onClick={closeAll}>
            MY LIBRARY
          </Link>
          <Link to="/join-the-community" className="btn-gold" onClick={closeAll}>
            JOIN MAGEYE
          </Link>
        </div>
      </div>

      {searchOpen ? (
        <div className="search-panel">
          <div className="search-inner">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search films, events, courses, podcasts…"
              aria-label="Search"
            />
            {hits.length > 0 ? (
              <div className="search-hits">
                {hits.map((hit) => (
                  <a key={hit.href} href={hit.href} onClick={closeAll}>
                    <small>{hit.kind}</small>
                    {hit.title}
                  </a>
                ))}
              </div>
            ) : null}
            <div className="popular">Popular Topics</div>
            <div className="popular-list">
              {POPULAR_TOPICS.map((topic) => (
                <a key={topic.to} href={topic.to} onClick={closeAll}>
                  {topic.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="mobile-panel">
          <nav className="nav-main" style={{ display: "grid", gap: 16 }}>
            {NAV.map((item) => (
              <a key={item.to} href={item.to} onClick={closeAll}>
                {item.label}
              </a>
            ))}
            <Link to="/library" onClick={closeAll}>
              MY LIBRARY
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
