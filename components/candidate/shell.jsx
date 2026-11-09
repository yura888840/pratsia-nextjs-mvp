"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { tabLabels } from "./labels.js";
import { translate } from "../../i18n/index.js";
import { useCandidate } from "./context.jsx";
export function CandidateShell({ children, userName }) {
  const params = useSearchParams();
  const isAccount = usePathname() === "/account";
  const view = params.get("view") || "search";
  const { favorites, isCandidate } = useCandidate();
  return (
    <div className="candidate-app">
      <header className="candidate-header">
        <Link className="candidate-brand" href="/">
          {translate("brand.logo")}
        </Link>
        <span>{translate("candidate.forCandidates")}</span>
        {!userName && (
          <Link href="/register?accountType=candidate">
            {translate("candidate.createResume")}
          </Link>
        )}
        {userName ? (
          <div className="candidate-user-menu">
            <Link className="candidate-user-name" href="/account">
              {userName}
            </Link>
            <button
              type="button"
              onClick={async () => {
                const response = await fetch("/api/auth", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ action: "logout" }),
                });
                if (response.ok) window.location.assign("/");
              }}
            >
              {translate("registration.logout")}
            </button>
          </div>
        ) : (
          <Link
            className="candidate-register"
            href="/register?accountType=candidate"
          >
            {translate("registration.submit")}
          </Link>
        )}
      </header>
      <div className="candidate-container">
        <section
          className="candidate-search"
          aria-label={translate("candidate.search")}
        >
          <h1>{translate("candidate.headline")}</h1>
          <form
            action="/"
            method="get"
            key={`${params.get("q") || ""}:${params.get("city") || ""}`}
          >
            <label>
              <span>{translate("candidate.searchLabel")}</span>
              <input
                name="q"
                defaultValue={params.get("q") || ""}
                placeholder={translate("candidate.searchPlaceholder")}
              />
            </label>
            <label>
              <span>{translate("candidate.city")}</span>
              <input
                name="city"
                defaultValue={params.get("city") || ""}
                placeholder={translate("candidate.anyCity")}
              />
            </label>
            <button className="candidate-primary" type="submit">
              {translate("candidate.search")}
            </button>
          </form>
        </section>
        {!isAccount && (
          <nav
            className="candidate-nav"
            aria-label={translate("candidate.navigation")}
          >
            {(isCandidate ? ["search"] : ["search", "saved"]).map((key) => (
              <Link
                key={key}
                href={key === "search" ? "/" : `/?view=${key}`}
                aria-current={view === key ? "page" : undefined}
              >
                {tabLabels[key]}
                {key === "saved" ? ` (${favorites.length})` : ""}
              </Link>
            ))}
            {isCandidate && (
              <Link href="/account">{translate("account.title")}</Link>
            )}
            {!userName && (
              <Link href="/register?accountType=candidate">
                {translate("candidate.createResume")}
              </Link>
            )}
          </nav>
        )}
        <p className="candidate-notice">{translate("candidate.demoNotice")}</p>
        <main id="candidate-content">{children}</main>
        <footer className="candidate-footer">
          {translate("candidate.footer")}
        </footer>
      </div>
    </div>
  );
}
