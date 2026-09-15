import { useState } from "react";
import { DONATE_PLAN_ID, IMG } from "../../data/site";

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section
      className="newsletter"
      style={{ backgroundImage: `url(${IMG.contactHero})` }}
    >
      <div>
        <h2>Newsletter</h2>
        <p>
          Sign up to receive news and updates from MAGEYE.
          <br />
          Your details are strictly confidential and never shared.
        </p>
        {done ? (
          <p className="thanks">Thank you. We’ll be in touch.</p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            <input name="first" placeholder="First Name" required />
            <input name="last" placeholder="Last Name" required />
            <input name="email" type="email" placeholder="Email Address" required />
            <button className="btn-sign" type="submit">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export function DonateBand() {
  return (
    <section className="donate-band">
      <h2>
        Support MAGEYE
        <br />
        with a Donation
      </h2>
      <p>
        MAGEYE is a registered nonprofit organization. Your gift
        helps us deepen this work, support the communities featured in our films,
        and grow a global field of relational learning, repair, and reciprocity.
        Donations can be made online or by check
        <br />
        <strong>Thank you for walking with us.</strong>
      </p>
      <a className="btn-gold" href={`/checkout/${DONATE_PLAN_ID}`}>
        Donate
      </a>
    </section>
  );
}

export function SiteEnd({ donate = true }: { donate?: boolean }) {
  return (
    <>
      <Newsletter />
      {donate ? <DonateBand /> : null}
    </>
  );
}
