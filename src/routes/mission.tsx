import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { IMG } from "../data/site";

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
      <article className="page-copy">
        <h1>Mission</h1>
        <p>
          At SAND, we explore who we are beyond ultimate truths, binary
          thinking, and individual awakening while acknowledging humanity as a
          mere part of the intricate web of life.
        </p>
        <h2>Land Acknowledgement</h2>
        <p>
          We acknowledge that our headquarters are on Coastal Miwok and Southern
          Pomo Land in Sebastopol, CA, and we thank the past, current, and
          future Indigenous stewards of this territory.
        </p>
        <h2>Perspective</h2>
        <p>
          In our view, the disconnect from Earth-based, indigenous wisdom began
          in the very early days of humankind, when male-dominated religions
          replaced fertility goddess worship as the prevalent cultural vehicle
          and started pitting humanity against its natural environment.
          Separation was born: me vs you, us vs them, human vs nature.
        </p>
        <p>
          Much later, with the Scientific Revolution, the liberation of science
          from religion resulted in tremendous technological advances, but it
          also led to the fragmentation of knowledge, and to a science no longer
          engaged with the big questions of what it means to be human, to be
          conscious, and interconnected.
        </p>
        <p>
          We also recognize that at the heart of the climate, political, and
          socioeconomic crises we face today lie the story of separation and the
          deep intergenerational trauma we carry.
        </p>
        <h2>Purpose</h2>
        <p>
          At SAND we envision a humanity firmly rooted in the truth of our
          interconnectedness. We see Earth as a living being and we hold life,
          in all its shapes and forms, as intelligent, sacred and complete.
        </p>
        <p>
          We promote a spirituality honoring both the absolute/transcendent and
          the relative/immanent aspects of consciousness—ultimately one and the
          same. In these times of crisis, we need to be initiated into radical
          compassion, care and love for all life.
        </p>
      </article>
      <SiteEnd />
    </>
  );
}
