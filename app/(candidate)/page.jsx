import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/session.js";
import {
  canUseCandidateFeatures,
  protectedCandidateViews,
} from "../../domains/candidate/access.js";
import { CandidateWorkspace } from "../../components/candidate/workspace.jsx";
export const dynamic = "force-dynamic";
export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const view = ["search", "saved", "applications", "profile"].includes(
    params.view,
  )
    ? params.view
    : "search";
  if (view !== "search") {
    const user = await getCurrentUser();
    if (canUseCandidateFeatures(user)) redirect(`/account?section=${view}`);
  }
  if (protectedCandidateViews.includes(view)) {
    const user = await getCurrentUser();
    if (!canUseCandidateFeatures(user))
      redirect(user ? "/" : "/register?accountType=candidate");
  }
  return (
    <CandidateWorkspace
      view={view}
      quickFilter={typeof params.filter === "string" ? params.filter : ""}
      query={typeof params.q === "string" ? params.q : ""}
      city={typeof params.city === "string" ? params.city : ""}
    />
  );
}
