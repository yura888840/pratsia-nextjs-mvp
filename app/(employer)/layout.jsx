import Link from "next/link";
import { translate } from "../../i18n/index.js";
import "../_shared/role-layout.css";
import "./employer.css";
export default function EmployerLayout({ children }) {
  return (
    <div className="employer-site">
      <header className="employer-site-header">
        <Link className="employer-site-brand" href="/employers">
          {translate("brand.logo")}
        </Link>
        <Link className="employer-site-outline" href="/register?accountType=employer">
          {translate("entry.start")}
        </Link>
        <nav aria-label={translate("entry.guestMenu")}>
          <Link href="/register?mode=login&accountType=employer">
            {translate("registration.login")}
          </Link>
          <Link
            href="/register?accountType=employer"
          >
            {translate("registration.submit")}
          </Link>
          <Link href="/">{translate("entry.candidateSite")}</Link>
        </nav>
      </header>
      <main className="employer-site-main">{children}</main>

    </div>
  );
}
