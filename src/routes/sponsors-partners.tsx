import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteEnd } from "../components/layout/SiteEnd";

export const Route = createFileRoute("/sponsors-partners")({
  component: PartnersPage,
  head: () => ({
    meta: [{ title: "Partners - MAGEYE" }],
  }),
});

function PartnersPage() {
  const [done, setDone] = useState(false);
  return (
    <>
      <section className="page-hero">
        <h1>Partners</h1>
      </section>
      <article className="page-copy">
        <h2>Interested in becoming a partner?</h2>
        <p>
          We welcome investors, producers, distributors, organizations, and
          creative collaborators interested in our upcoming projects. Send us a
          message below and tell us how you’d like to get involved.
        </p>
        {done ? (
          <p className="thanks">Thank you. Your message has been received.</p>
        ) : (
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            <input name="first" placeholder="First name" required />
            <input name="last" placeholder="Last name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="organization" placeholder="Organization / Company" />
            <input name="subject" placeholder="Subject" required />
            <textarea
              name="message"
              rows={6}
              placeholder="Tell us about your interest in partnering with us"
              required
            />
            <button className="btn-gold" type="submit">
              Get in Touch
            </button>
          </form>
        )}
      </article>
      <SiteEnd />
    </>
  );
}
