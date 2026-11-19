import { translate } from "../i18n/index.js";
export function WelcomeIllustration() {
  return (
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
  );
}
