"use client";

import { translate } from "../../../i18n/index.js";
import { AuthForm } from "../auth/auth-form.jsx";
function EmployerAccess({
  isPlatformLoading,
  loadPlatformState,
  platformError,
  platformState,
}) {
  return (
    <section className="dashboard">
      <div className="page-heading">
        <h1>{translate("app.platform.vkhid_dlya_robotodavtsiv")}</h1>
      </div>
      {isPlatformLoading ? (
        <p role="status">{translate("app.platform.zavantazhuyemo")}</p>
      ) : platformError ? (
        <p role="alert">{platformError}</p>
      ) : platformState.user ? (
        <div className="profile-card">
          <p>
            {translate(
              "app.platform.kabinet_dostupnyy_lyshe_robotodavtsyam_vy_uviyshly_yak_shukach_roboty",
            )}
          </p>
          <a href="/">{translate("app.platform.do_poshuku_vakansiy")}</a>
        </div>
      ) : (
        <div className="profile-card">
          <AuthForm
            defaultAccountType="employer"
            initialMode={
              typeof window !== "undefined" &&
              new URLSearchParams(window.location.search).has("register")
                ? "register"
                : "login"
            }
            onSuccess={loadPlatformState}
          />
        </div>
      )}
    </section>
  );
}
export { EmployerAccess };
