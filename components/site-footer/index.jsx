"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translate } from "../../i18n/index.js";
import { informationPages } from "./pages.js";
import { footerConfig } from "./config.js";
const infoLink = (slug) => ({ href: `/${slug}`, label: informationPages[slug].title });
const columns = [
  { title: translate("footer.candidate"), links: [
    { href: "/search", label: translate("footer.find") },
    { href: "/cv-welcome", label: translate("footer.resume") }, infoLink("resume-guide") ] },
  { title: translate("footer.employer"), links: [infoLink("post-vacancy"), infoLink("resume-search"), infoLink("services")] },
  { title: translate("footer.project"), links: [infoLink("about"), infoLink("brand"), infoLink("support")] },
];
export function SiteFooter({ year }) {
  const config = footerConfig(usePathname());
  if (config.hidden) return null;
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-language">
          <Link className="site-footer-brand" href="/">{translate("brand.logo")}</Link>
          <p className="site-footer-language-label"><span aria-hidden="true">🇺🇦</span> {translate("footer.language")}</p>
          <p>{translate("footer.thanks")}</p>
        </div>
        {(config.columns || columns).map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
            <ul>{column.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
          </nav>
        ))}
        {config.showMobile && <div className="site-footer-mobile">
          <span aria-hidden="true" className="site-footer-phone">▯</span>
          <h2>{translate("footer.mobile")}</h2>
          <p>{translate("footer.mobileText")}</p>
          <Link href="/mobile-app">{informationPages["mobile-app"].title} →</Link>
        </div>}
      </div>
      <div className="site-footer-bottom">
        <p>{translate("footer.copyright", { year })}</p>
        <p>{config.note || translate("footer.notice")}</p>
        <nav aria-label={translate("info.terms.title")}>
          {["privacy", "terms", "offer", "ethics"].map((slug) => <Link key={slug} href={`/${slug}`}>{informationPages[slug].title}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
