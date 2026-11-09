import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session.js";
import { canUseCandidateFeatures } from "../../../domains/candidate/access.js";
import { RecommendedVacancies } from "../../../components/candidate/recommended.jsx";
export const dynamic = "force-dynamic";
export default async function RecommendedPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=%2Frecommended");
  if (!canUseCandidateFeatures(user)) redirect("/employers");
  return <RecommendedVacancies />;
}
