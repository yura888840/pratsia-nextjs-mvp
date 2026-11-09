"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { GuestSearch } from "./guest-search.jsx";
import { tabLabels } from "./labels.js";
import { translate } from "../../i18n/index.js";
import { useCandidate } from "./context.jsx";
export function CandidateShell({ children, userName }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const isAccount = pathname === "/account";
  const isWelcome = pathname === "/cv-welcome";
  const guestHome = !userName && pathname === "/";
  const view = params.get("view") || "search";
  const { favorites, isCandidate } = useCandidate();
  return (
    <div
      className={`candidate-app ${isWelcome ? "candidate-welcome-page" : ""}`}
    >
      <header className="candidate-header">
        <Link className="candidate-brand" href="/">
          {translate("brand.logo")}
        </Link>
        {!userName && (
          <nav
            className="candidate-entry-menu"
            aria-label={translate("entry.guestMenu")}
          >
            <Link href="/login">{translate("registration.login")}</Link>
            <Link href="/register?accountType=candidate">
              {translate("registration.submit")}
            </Link>
            <Link href="/employers">{translate("entry.employerSite")}</Link>
          </nav>
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
          <nav
            className="candidate-guest-menu"
            aria-label={translate("entry.guestMenu")}
          >
            <Link
              className="candidate-recommended"
              href="/login?returnTo=%2Frecommended"
            >
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M7 10v11H3V10h4Zm0 0 5-7c1-1 3 0 2 3l-1 4h6c1 0 2 1 1.7 2L19 20c-.2.7-1 1-2 1H7" />
              </svg>
              {translate("recommendations.link")}
            </Link>
            <Link className="candidate-create-resume" href="/cv-welcome">
              {translate("candidate.createResume")}
            </Link>
          </nav>
        )}
      </header>
      <div className="candidate-container">
        {!isWelcome && (
          <>
            <section
              className="candidate-search"
              aria-label={translate("candidate.search")}
            >
              <h1>{translate("candidate.headline")}</h1>
              {guestHome ? (
                <GuestSearch
                  query={params.get("q") || ""}
                  city={params.get("city") || ""}
                  filter={params.get("filter") || ""}
                />
              ) : (
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
              )}
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
                    aria-current={
                      pathname !== "/recommended" && view === key
                        ? "page"
                        : undefined
                    }
                  >
                    {tabLabels[key]}
                    {key === "saved" ? ` (${favorites.length})` : ""}
                  </Link>
                ))}
                {isCandidate && (
                  <Link
                    href="/recommended"
                    aria-current={
                      pathname === "/recommended" ? "page" : undefined
                    }
                  >
                    {translate("recommendations.link")}
                  </Link>
                )}
                {isCandidate && (
                  <Link href="/account">{translate("account.title")}</Link>
                )}
                {!userName && (
                  <Link href="/cv-welcome">
                    {translate("candidate.createResume")}
                  </Link>
                )}
              </nav>
            )}
            <p className="candidate-notice">
              {translate("candidate.demoNotice")}
            </p>
          </>
        )}
        <main id="candidate-content">{children}</main>
        <footer className="candidate-footer">
          {translate("candidate.footer")}{" "}
          <Link href="/employers">{translate("entry.employerSite")}</Link>
        </footer>
      </div>
    </div>
  );
}
