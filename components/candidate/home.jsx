import { BannerArt } from "./banner-art.jsx";
import Link from "next/link";
import { translate } from "../../i18n/index.js";
export function CandidateHome() {
  return (
    <section className="candidate-home-banners" aria-labelledby="home-banner-heading">
      <h2 id="home-banner-heading">{translate("homeBanners.heading")}</h2>
      <div className="candidate-banner-grid">
        <article className="candidate-promo candidate-promo-resume">
          <BannerArt kind="resume" />
          <h3>{translate("homeBanners.resumeTitle")}</h3>
          <p>{translate("homeBanners.resumeText")}</p>
          <Link href="/cv-welcome">{translate("candidate.createResume")} <span aria-hidden="true">→</span></Link>
        </article>
        <article className="candidate-promo candidate-promo-remote">
          <BannerArt kind="remote" />
          <h3>{translate("homeBanners.remoteTitle")}</h3>

          <Link href="/search?filter=remote">{translate("homeBanners.remoteAction")} <span aria-hidden="true">→</span></Link>
        </article>
        <article className="candidate-promo candidate-promo-start">
          <BannerArt kind="start" />
          <h3>{translate("guestSearch.noExperience")}</h3>
          <Link href="/search?filter=noExperience">{translate("candidate.search")} <span aria-hidden="true">→</span></Link>
        </article>
      </div>
    </section>
  );
}
