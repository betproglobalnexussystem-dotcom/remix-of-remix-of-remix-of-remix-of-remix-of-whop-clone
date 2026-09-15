import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { addMessage } from "../lib/admin-store";
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
              const data = new FormData(event.currentTarget);
              const value = (key: string) => String(data.get(key) ?? "").trim();
              addMessage({
                kind: "partner",
                name: `${value("first")} ${value("last")}`.trim(),
                email: value("email"),
                subject: value("subject"),
                body: [
                  value("message"),
                  value("organization") ? `Organization: ${value("organization")}` : "",
                ]
                  .filter(Boolean)
                  .join("\n\n"),
              });
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
            <Link to="/contact" className="btn-gold" style={{ textAlign: "center", marginTop: 12, textDecoration: "none" }}>
              Contact Us
            </Link>
          </form>
        )}
      </article>
      <SiteEnd />
    </>
  );
}
