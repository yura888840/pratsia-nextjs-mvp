import Link from "next/link";
import { translate } from "../../../i18n/index.js";
import { WelcomeIllustration } from "../../../components/welcome-illustration.jsx";
export default function EmployerHomePage() {
  return (
    <section className="cv-welcome">
      <div className="cv-welcome-copy">
        <p className="employer-site-eyebrow">{translate("entry.employerLabel")}</p>
        <h1>{translate("entry.headline")}</h1>
        <p>{translate("entry.intro")}</p>
        <Link className="cv-welcome-create" href="/register?accountType=employer">
          {translate("entry.start")}
        </Link>
      </div>
      <WelcomeIllustration />
    </section>
  );
}
