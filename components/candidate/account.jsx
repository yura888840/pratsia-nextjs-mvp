"use client";
import Link from "next/link";
import { translate } from "../../i18n/index.js";
import { CandidateWorkspace } from "./workspace.jsx";
import { useCandidate } from "./context.jsx";
const labels = {
  profile: translate("account.resumes"),
  saved: translate("account.favorites"),
  applications: translate("account.applications"),
};
export function CandidateAccount({ section }) {
  const { favorites, applications } = useCandidate();
  return (
    <div className="candidate-account">
      <aside className="candidate-account-sidebar">
        <h2>{translate("account.title")}</h2>
        <nav aria-label={translate("account.navigation")}>
          {["profile", "saved", "applications"].map((key) => (
            <Link
              key={key}
              href={`/account?section=${key}`}
              aria-current={section === key ? "page" : undefined}
            >
              {labels[key]}
              {key === "saved"
                ? ` (${favorites.length})`
                : key === "applications"
                  ? ` (${applications.length})`
                  : ""}
            </Link>
          ))}
        </nav>
        <Link className="candidate-account-search" href="/search">
          {translate("account.backToSearch")}
        </Link>
      </aside>
      <div className="candidate-account-content">
        <CandidateWorkspace view={section} />
      </div>
    </div>
  );
}
