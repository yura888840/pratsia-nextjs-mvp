import { redirect } from "next/navigation";
import { getCurrentUser } from "../../core/auth/session.js";
import { canUseCandidateFeatures } from "../access.js";
import { RecommendedVacancies } from "../components/recommended.jsx";
export default async function RecommendedPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Frecommended");
  if (!canUseCandidateFeatures(user)) redirect("/employers");
  return <RecommendedVacancies />;
}
