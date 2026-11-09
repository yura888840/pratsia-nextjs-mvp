import { redirect } from "next/navigation";
import { safeAuthReturnTo } from "../../../lib/auth-redirect.js";
import { getCurrentUser } from "../../../lib/session.js";
export const dynamic = "force-dynamic";
export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const returnTo = safeAuthReturnTo(params.returnTo);
  const user = await getCurrentUser();
  if (user)
    redirect(user.accountType === "candidate" ? returnTo : "/employers");
  redirect(
    `/register?mode=login&accountType=candidate&returnTo=${encodeURIComponent(returnTo)}`,
  );
}
