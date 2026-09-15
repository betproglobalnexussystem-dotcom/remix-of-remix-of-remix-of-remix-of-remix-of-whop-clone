import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { TEAM } from "../data/pages";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [{ title: "Team - MAGEYE" }],
  }),
});

function TeamPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Team</h1>
      </section>
      <article className="page-copy">
        {TEAM.map((person) => (
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
