import { RegistrationForm } from "../../../components/registration/registration-form.jsx";
import { googleConfigured } from "../../../lib/google-auth.js";
import { translate } from "../../../i18n/index.js";
import "../../(candidate)/candidate.css";
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
      initialLogin={params.mode === "login"}
      initialRole={params.accountType === "employer" ? "employer" : "candidate"}
      googleEnabled={googleConfigured()}
      initialError={error}
    />
  );
}
