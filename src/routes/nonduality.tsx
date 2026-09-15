import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";

export const Route = createFileRoute("/nonduality")({
  component: NondualityPage,
  head: () => ({
    meta: [{ title: "Nonduality - MAGEYE" }],
  }),
});

function NondualityPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Nonduality</h1>
      </section>
      <article className="page-copy">
        <p>
          Nonduality has as many facets as there are human endeavors. Mystics
          describe the nondual experience in many ways, as loving, expansive,
          blissful and unitive, lacking any sense of separation. More than just
          a feeling, the experience conveys deep and liberating insights into
          the truth of life and death, self and world.
        </p>
        <p>
          Philosophers speak of reality as unencumbered by the dualistic
          oppositions we so often get lost in. Scientists, after centuries of
          analytic reductionism, are converging with the nondual view, seeing
          the whole as more than the sum of its parts.
        </p>
        <p>
          World religions teach nonduality in their esoteric branches, including
          Jewish Kabbalah, Islamic Sufism, Christian Mysticism, Hindu
          Advaita-Vedanta, Kashmir Shaivism, Buddhist Shentong, Madhyamaka or
          Zen, and Taoism. Many indigenous and shamanistic teachings are also
          nondual in essence.
        </p>
        <p>
          The arts celebrate and cultivate the experience of nonduality. We hold
          the space for these conversations across science, spirituality, and
          culture.
        </p>
      </article>
      <SiteEnd />
    </>
  );
}
