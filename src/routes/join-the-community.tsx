import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { JOIN_FAQS } from "../data/pages";
import { ANNUAL_PLAN_ID, IMG, MONTHLY_PLAN_ID } from "../data/site";

export const Route = createFileRoute("/join-the-community")({
  component: JoinPage,
  head: () => ({
    meta: [
      { title: "Join the Community - MAGEYE" },
    ],
  }),
});

const BENEFITS = [
  {
    title: "Overview",
    text: "Exclusive access to a growing library of recorded teachings, interviews, podcasts and courses.",
  },
  {
    title: "Courses",
    text: "Over 50 courses with spiritual teachers, therapists, scientists, philosophers. New courses added every month",
  },
  {
    title: "Video Library",
    text: "More than 100 unique video interviews curated by topics",
  },
  {
    title: "Community Gatherings",
    text: "Monthly live and recorded community conversations with special guests",
  },
  {
    title: "Member Discounts",
    text: "Discounts on all current events and webinars",
  },
  {
    title: "Podcast Extras",
    text: "Full unedited recordings of podcast conversations with downloadable audio",
  },
  {
    title: "Film Library",
    text: "Movies to watch together",
  },
  {
    title: "Community",
    text: "Access to the worldwide online community where you can connect, reflect and practice together",
  },
];

function JoinPage() {
  return (
    <>
      <section className="join-hero">
        <img src={IMG.joinHero1} alt="" />
        <img src={IMG.joinHero2} alt="" />
        <img src={IMG.joinHero3} alt="" />
        <img src={IMG.joinCouple} alt="" />
        <h1>Join a Global Community</h1>
      </section>

      <section className="wrap feature-3">
        <div>
          <h3>Participate in events and conversations</h3>
          <p>
            Enjoy online courses, webinars, interviews, community conversations,
            movies and more…
          </p>
        </div>
        <div>
          <h3>Explore a multitude of topics</h3>
          <p>
            Physical Sciences, spiritual traditions, living universe, love &
            relationships, society, sacred action, arts and more.
          </p>
        </div>
        <div>
          <h3>Find connection and community</h3>
          <p>
            Discover support and inspiration in a thriving community guided by
            spiritual teachers, wisdom keepers, scientists, visionaries… and
            you!
          </p>
        </div>
      </section>

      <section className="wrap grid-2" style={{ alignItems: "center", paddingBottom: 64 }}>
        <img src={IMG.joinCouple} alt="" />
        <img src={IMG.joinFlowers} alt="" />
      </section>

      <section className="wrap grid-2" style={{ alignItems: "center", paddingBottom: 80 }}>
        <img src={IMG.vector} alt="" style={{ maxWidth: 280, margin: "0 auto" }} />
        <div>
          <h2>Join our mission</h2>
          <p>
            MAGEYE is a nonprofit organization. We would love to
            have you as part of our community! Your support will be fully
            devoted to our mission: to explore beyond ultimate truths, binary
            thinking, and individual awakening while in deep reverence of the
            beauty, complexity, pain, and great mystery that weave the infinite
            cycles of existence.
          </p>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap" style={{ textAlign: "center" }}>
          <img src={IMG.joinMockup} alt="Membership library" style={{ margin: "0 auto 32px", maxWidth: 640 }} />
          <h2>Member Benefits</h2>
          <div style={{ textAlign: "left", maxWidth: 720, margin: "32px auto 0" }}>
            {BENEFITS.map((item) => (
              <div key={item.title} style={{ marginBottom: 22 }}>
                <h3 style={{ fontSize: 24, margin: "0 0 4px" }}>{item.title}</h3>
                <p style={{ margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="price-wrap"
        style={{ backgroundImage: `url(${IMG.joinDrops})` }}
      >
        <h2>Choose your membership</h2>
        <div className="price-grid">
          <div className="price-card">
            <h3>Monthly membership</h3>
            <div className="price">$15</div>
            <p>per month</p>
            <a className="btn-gold" href={`/checkout/${MONTHLY_PLAN_ID}`}>
              Join Now ›
            </a>
          </div>
          <div className="price-card">
            <h3>Annual membership</h3>
            <div className="strike">$180</div>
            <div className="price">$150</div>
            <p>per year</p>
            <a className="btn-gold" href={`/checkout/${ANNUAL_PLAN_ID}`}>
              Join Now ›
            </a>
          </div>
        </div>
        <p>
          Already a member?{" "}
          <Link to="/library" style={{ color: "var(--gold)" }}>
            Access your Library »
          </Link>
        </p>
      </section>

      <section className="section">
        <div className="wrap faq">
          <h2 style={{ textAlign: "center" }}>Frequent Asked Questions</h2>
          {JOIN_FAQS.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <SiteEnd />
    </>
  );
}
