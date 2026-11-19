import { safeAuthReturnTo } from "../../../core/auth/auth-redirect.js";
import { RegistrationForm } from "../../../common/registration/registration-form.jsx";
import { googleConfigured } from "../../../core/auth/google-auth.js";
import { translate } from "../../../common/i18n/index.js";
import "../../../applicant/styles/candidate.css";
import "./registration.css";
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };
export default async function RegistrationPage({ searchParams }) {
  const params = await searchParams;
  const error =
    params.error === "account-exists"
      ? translate("registration.accountExists")
      : params.error
        ? translate("registration.googleFailed")
        : "";
  return (
    <RegistrationForm
      returnTo={safeAuthReturnTo(params.returnTo)}
      initialLogin={params.mode === "login"}
      initialRole={params.accountType === "employer" ? "employer" : "candidate"}
      googleEnabled={googleConfigured()}
      initialError={error}
    />
  );
}
