import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { IMG } from "../data/site";
import { PageBody } from "../components/sand/PageBody";

export const Route = createFileRoute("/mission")({
  component: MissionPage,
  head: () => ({
    meta: [{ title: "Mission - MAGEYE" }],
  }),
});

function MissionPage() {
  return (
    <>
      <img src={IMG.missionHero} alt="" style={{ width: "100%", maxHeight: 360, objectFit: "cover" }} />
      <PageBody pageId="mission" fallbackTitle="Mission" />
      <SiteEnd />
    </>
  );
}
