import {
  FOOTER_ABOUT,
  FOOTER_COMMUNITY,
  FOOTER_LEGAL,
} from "../../data/site";
import brandLogo from "../../assets/sanyuka-african-ent-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <img className="footer-brand-logo" src={brandLogo.url} alt="Sanyuka African Entertainment" />
          <p>
            At SAND, we explore who we are beyond ultimate truths, binary
            thinking, and individual awakening while acknowledging humanity as a
            mere part of the intricate web of life.
          </p>
          <p>
            SAND is a nonprofit organization under section 501.c.3 of the US tax
            code. Its headquarters are on the unceded ancestral territories of
            Coastal Miwok and Southern Pomo Land in Sebastopol, CA. We thank the
            past, current, and future Indigenous stewards of this territory.
          </p>
        </div>
        <div>
          <h4>About</h4>
          {FOOTER_ABOUT.map((item) => (
            <a key={item.to} href={item.to}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <h4>Community</h4>
          {FOOTER_COMMUNITY.map((item) => (
            <a key={item.to} href={item.to}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <div>
          <div className="footer-legal">
            {FOOTER_LEGAL.map((item, index) => (
              <span key={item.to}>
                {index > 0 ? " | " : null}
                <a href={item.to}>{item.label}</a>
              </span>
            ))}
          </div>
          <div>All Rights Reserved © {new Date().getFullYear()} MAGEYE</div>
        </div>
        <img className="footer-logo" src={brandLogo.url} alt="Sanyuka African Entertainment" />
      </div>
    </footer>
  );
}
