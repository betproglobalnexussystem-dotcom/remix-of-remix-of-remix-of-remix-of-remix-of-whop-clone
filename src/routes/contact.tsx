import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteEnd } from "../components/layout/SiteEnd";
import { IMG } from "../data/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: "Contact Us - MAGEYE" }],
  }),
});

function ContactPage() {
  const [done, setDone] = useState(false);
  return (
    <>
      <img src={IMG.contactHero} alt="" style={{ width: "100%", maxHeight: 280, objectFit: "cover" }} />
      <article className="page-copy">
        <h1>We’d love to hear from you!</h1>
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
            <input name="subject" placeholder="Subject" required />
            <textarea name="comments" rows={6} placeholder="Comments" required />
            <button className="btn-gold" type="submit">
              Submit
            </button>
          </form>
        )}
      </article>
      <SiteEnd />
    </>
  );
}
