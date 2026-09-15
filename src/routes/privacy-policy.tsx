import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPage,
  head: () => ({
    meta: [{ title: "Privacy Policy - MAGEYE" }],
  }),
});

function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Privacy Policy</h1>
      </section>
      <article className="page-copy">
        <p>
          This privacy notice discloses the privacy practices for SAND. It
          applies solely to information collected by this website.
        </p>
        <h2>Information Collection, Use, and Sharing</h2>
        <p>
          We only collect information that you voluntarily give us via forms or
          other direct contact. We will not sell or rent this information to
          anyone. We use it to respond to you regarding the reason you contacted
          us, and to fulfill membership, donations, and event registration.
        </p>
        <h2>Your Access to and Control Over Information</h2>
        <p>
          You may opt out of future contacts at any time. Contact us to see,
          change, or delete data we have about you, or to share a concern about
          our use of your data.
        </p>
        <h2>Security</h2>
        <p>
          When you submit sensitive information via the website, your
          information is protected both online and offline. Checkout is handled
          on Whop over HTTPS.
        </p>
      </article>
      <SiteEnd />
    </>
  );
}
