import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { PodcastCard } from "../components/sand/Cards";
import { useContent } from "../lib/admin-store";
import { IMG } from "../data/site";

export const Route = createFileRoute("/podcast")({
  component: PodcastPage,
  head: () => ({
    meta: [{ title: "Podcast - MAGEYE" }],
  }),
});

function PodcastPage() {
  return (
    <>
      <section className="page-hero" style={{ background: "#fff" }}>
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <img src={IMG.podcastCover} alt="SAND podcast" />
          <div>
            <h1>Podcast</h1>
            <p>
              Conversations at the intersection of spirituality, science, social
              healing, and the arts.
            </p>
          </div>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap media-grid">
          {useContent().podcasts.map((item) => (
            <PodcastCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
