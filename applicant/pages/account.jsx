import { redirect } from "next/navigation";
import { getCurrentUser } from "../../core/auth/session.js";
import { canUseCandidateFeatures } from "../access.js";
import { CandidateAccount } from "../components/account.jsx";
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
