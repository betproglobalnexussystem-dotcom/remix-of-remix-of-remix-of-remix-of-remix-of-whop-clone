import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";
import { DONATE_PLAN_ID, IMG } from "../data/site";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [{ title: "Donate - MAGEYE" }],
  }),
});

function DonatePage() {
  return (
    <>
      <img src={IMG.donateHero} alt="" style={{ width: "100%", maxHeight: 360, objectFit: "cover" }} />
      <article className="page-copy">
        <h1>Donate</h1>
        <p>
          MAGEYE is a registered nonprofit organization. Your
          gift helps us deepen this work, support the communities featured in
          our films, and grow a global field of relational learning, repair, and
          reciprocity.
        </p>
        <p>
          SAND is a 501(c)3 nonprofit charity. Our Tax ID number is 46-3354584.
        </p>
        <p>
          Donations are tax-deductible to the extent permitted by law. Currently
          in the US, even taxpayers who do not itemize can deduct $1,000 for
          individuals and $2,000 for couples.
        </p>
        <p>
          <em>Thank you for walking with us.</em>
        </p>
        <h2>To Donate Online</h2>
        <p>
          <a className="btn-gold" href={`/checkout/${DONATE_PLAN_ID}`}>
            Donate
          </a>
        </p>
        <h2>Prefer to send a check?</h2>
        <p>
          Please make it payable to:
          <br />
          <strong>Science and Nonduality</strong>
          <br />
          1251 Gold Ridge rd.
          <br />
          Sebastopol, CA 95472
        </p>
      </article>
      <SiteEnd donate={false} />
    </>
  );
}
