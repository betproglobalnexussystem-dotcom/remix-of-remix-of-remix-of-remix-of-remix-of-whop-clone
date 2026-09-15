import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { EventCard } from "../components/sand/Cards";
import { EVENTS } from "../data/catalog";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({ meta: [{ title: "Events - MAGEYE" }] }),
});

function EventsPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <h1>Events</h1>
          <p>
            Community gatherings, live conversations, and film premieres with
            the SAND community.
          </p>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {EVENTS.map((item) => (
            <EventCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
