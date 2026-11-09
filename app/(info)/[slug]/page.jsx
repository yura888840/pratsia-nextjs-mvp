import Link from "next/link";
import { notFound } from "next/navigation";
import { informationPages } from "../../../components/site-footer/pages.js";
import { translate } from "../../../i18n/index.js";
export function generateStaticParams() { return Object.keys(informationPages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: Object.hasOwn(informationPages, slug) ? informationPages[slug].title : undefined };
}
export default async function InformationPage({ params }) {
  const { slug } = await params;
  if (!Object.hasOwn(informationPages, slug)) notFound();
  const page = informationPages[slug];
  return <div className="site-info">
    <header className="site-info-header"><Link className="site-footer-brand" href="/">{translate("brand.logo")}</Link><Link href="/">{translate("footer.back")}</Link></header>
    <main className="site-info-main">
      <p className="site-info-label">{translate("footer.version")}</p>
      <h1>{page.title}</h1>
      {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {slug === "resume-guide" && <Link className="site-info-action" href="/cv-welcome">{translate("candidate.createResume")}</Link>}
      {["post-vacancy", "resume-search", "services"].includes(slug) && <Link className="site-info-action" href="/employers">{translate("entry.employerSite")}</Link>}
    </main>
  </div>;
}
