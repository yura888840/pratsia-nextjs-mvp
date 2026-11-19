import { normalizeSearchFilters } from "../vacancies/search-filters.js";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../core/auth/session.js";
import {
  canUseCandidateFeatures,
  protectedCandidateViews,
} from "../access.js";
import { CandidateWorkspace } from "../components/workspace.jsx";
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
      searchFilters={normalizeSearchFilters(params)}
      query={typeof params.q === "string" ? params.q : ""}
      city={typeof params.city === "string" ? params.city : ""}
    />
  );
}
