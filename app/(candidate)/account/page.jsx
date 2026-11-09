import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session.js";
import { canUseCandidateFeatures } from "../../../domains/candidate/access.js";
import { CandidateAccount } from "../../../components/candidate/account.jsx";
export const dynamic = "force-dynamic";
export default async function AccountPage({ searchParams }) {
  const user = await getCurrentUser();
  if (!canUseCandidateFeatures(user))
    redirect(user ? "/" : "/register?accountType=candidate");
  const params = await searchParams;
  const section = ["profile", "saved", "applications"].includes(params.section)
    ? params.section
    : "profile";
  return <CandidateAccount section={section} />;
}
