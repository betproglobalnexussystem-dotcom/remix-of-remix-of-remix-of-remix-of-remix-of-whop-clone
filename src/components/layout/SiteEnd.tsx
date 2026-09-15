import { DONATE_PLAN_ID, IMG } from "../../data/site";



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
  return <>{donate ? <DonateBand /> : null}</>;
}
