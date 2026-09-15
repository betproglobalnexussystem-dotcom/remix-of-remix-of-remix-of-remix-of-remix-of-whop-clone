import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { useContent } from "../lib/admin-store";

export const Route = createFileRoute("/board")({
  component: BoardPage,
  head: () => ({
    meta: [{ title: "Board - MAGEYE" }],
  }),
});

function BoardPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Board</h1>
      </section>
      <article className="page-copy">
        {useContent().board.map((person) => (
          <section key={person.name}>
            <h2>{person.name}</h2>
            <p className="meta">{person.role}</p>
            <p>{person.bio}</p>
          </section>
        ))}
      </article>
      <SiteEnd />
    </>
  );
}
