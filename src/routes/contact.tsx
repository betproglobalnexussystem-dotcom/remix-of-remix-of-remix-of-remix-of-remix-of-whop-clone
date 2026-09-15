import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteEnd } from "../components/layout/SiteEnd";
import hassanPhoto from "../assets/hassan-contact.avif.asset.json";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: "Contact Us - MAGEYE" }],
  }),
});

const TOPICS = [
  "Film Screenings",
  "Distribution",
  "Press & Media",
  "Partnerships",
  "Production Inquiries",
  "Other",
];

function ContactPage() {
  const [done, setDone] = useState(false);
  return (
    <>
      <img src={hassanPhoto.url} alt="Hassan Mageye" style={{ width: "100%", maxHeight: 280, objectFit: "cover", objectPosition: "center 20%" }} />
      <article className="page-copy">
        <h1>We’d love to hear from you!</h1>
        <div className="contact-layout">
          <aside className="contact-details">
            <h2>Contact</h2>
            <p className="contact-name">Hassan Mageye</p>
            <p className="contact-roles">Writer · Director · Producer</p>
            <p>
              For film screenings, distribution, press, partnerships, and
              production inquiries.
            </p>
            <p>
              <a className="contact-email" href="mailto:mageyeglobalworks@gmail.com">
                mageyeglobalworks@gmail.com
              </a>
            </p>
            <div className="contact-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            </div>
          </aside>
          {done ? (
            <p className="thanks">Thank you. Your message has been received.</p>
          ) : (
            <form
              className="contact-form contact-form--full"
              onSubmit={(event) => {
                event.preventDefault();
                setDone(true);
              }}
            >
              <div className="form-row">
                <input name="first" placeholder="First name" required />
                <input name="last" placeholder="Last name" required />
              </div>
              <input name="email" type="email" placeholder="Email" required />
              <input name="phone" type="tel" placeholder="Phone (optional)" />
              <input name="organization" placeholder="Organization / Company (optional)" />
              <select name="topic" required defaultValue="">
                <option value="" disabled>
                  What is your inquiry about?
                </option>
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <input name="subject" placeholder="Subject" required />
              <textarea name="message" rows={7} placeholder="Your message" required />
              <button className="btn-gold" type="submit">
                Send Message
              </button>
            </form>
          )}
        </div>
      </article>
      <SiteEnd />
    </>
  );
}
