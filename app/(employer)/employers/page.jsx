import Link from "next/link";
import { translate } from "../../../i18n/index.js";
export default function EmployerHomePage() {
  return (
    <section className="employer-site-hero">
      <p className="employer-site-eyebrow">
        {translate("entry.employerLabel")}
      </p>
      <h1>{translate("entry.headline")}</h1>
      <p>{translate("entry.intro")}</p>
      <Link
        className="employer-site-primary"
        href="/register?accountType=employer"
      >
        {translate("entry.start")}
      </Link>
    </section>
  );
}
