import Link from "next/link";
import { getCurrentUser } from "../../../lib/session.js";
import { canUseCandidateFeatures } from "../../../domains/candidate/access.js";
import { translate } from "../../../i18n/index.js";
export const dynamic = "force-dynamic";
export default async function CvWelcomePage() {
  const user = await getCurrentUser();
  const href = canUseCandidateFeatures(user)
    ? "/account?section=profile"
    : "/register?accountType=candidate&returnTo=%2Faccount%3Fsection%3Dprofile";
  return (
    <section className="cv-welcome">
      <div className="cv-welcome-copy">
        <h1>
          {translate("cvWelcome.heading")}
          <span>{translate("cvWelcome.accent")}</span>
        </h1>
        <p>{translate("cvWelcome.intro")}</p>
        <Link className="cv-welcome-create" href={href}>
          {translate("candidate.createResume")}
        </Link>
        <div className="cv-welcome-note">
          <span className="cv-welcome-avatar" aria-hidden="true">
            {translate("cvWelcome.cv")}
          </span>
          <p>{translate("cvWelcome.note")}</p>
        </div>
      </div>
      <div className="cv-welcome-art" aria-hidden="true">
        <div className="cv-welcome-orbit" />
        <div className="cv-welcome-document">
          <div className="cv-document-top">
            <span>{translate("cvWelcome.cv")}</span>
            <div>
              <i />
              <i />
            </div>
          </div>
          {[0, 1, 2, 3].map((key) => (
            <div className="cv-document-section" key={key}>
              <b />
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className="cv-welcome-envelope">
          <span />
        </div>
        <span className="cv-welcome-spark cv-spark-one" />
        <span className="cv-welcome-spark cv-spark-two" />
      </div>
    </section>
  );
}
