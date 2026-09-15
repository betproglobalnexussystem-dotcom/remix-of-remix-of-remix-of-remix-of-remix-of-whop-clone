import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { EventCard } from "../components/sand/Cards";
import { COURSES } from "../data/catalog";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
  head: () => ({
    meta: [{ title: "Courses - MAGEYE" }],
  }),
});

function CoursesPage() {
  return (
    <>
      <section className="page-hero">
        <div>
          <h1>Courses</h1>
          <p>
            From quantum physics to meditation, inter-generational trauma, or
            indigenous wisdom, SAND courses deepen our understanding of
            reality, consciousness, and the interconnection of all things.
          </p>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {COURSES.map((item) => (
            <EventCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
