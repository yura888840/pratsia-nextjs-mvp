"use client";

import { useState } from "react";
import { translate } from "../../../i18n/index.js";
import { PasswordField } from "./password-field.jsx";
import { LoaderCircleIcon, ArrowRightIcon } from "../shared/icons.jsx";
function AuthForm({
  onSuccess,
  resetToken,
  onRecoveryComplete,
  defaultAccountType = "candidate",
  initialMode = "register",
}) {
  const [authMode, setAuthMode] = useState(resetToken ? "reset" : initialMode);
  const [authError, setAuthError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  function changeAuthMode(nextMode) {
    setAuthMode(nextMode);
    setAuthError("");
    setStatusMessage("");
  }
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitting(true);
        setAuthError("");
        setStatusMessage("");
        try {
          const isRecoveryAction =
            "request" === authMode || "reset" === authMode;
          if (
            "reset" === authMode &&
            formData.get("password") !== formData.get("confirm")
          )
            throw Error(translate("app.platform.paroli_ne_zbihayutsya"));
          const authPayload =
            "request" === authMode
              ? {
                  action: "request",
                  email: formData.get("email"),
                }
              : "reset" === authMode
                ? {
                    action: "complete",
                    token: resetToken,
                    password: formData.get("password"),
                  }
                : {
                    action: authMode,
                    email: formData.get("email"),
                    password: formData.get("password"),
                    ...("register" === authMode
                      ? {
                          name: formData.get("name"),
                          accountType: formData.get("accountType"),
                        }
                      : {}),
                  };
          const response = await fetch(
            isRecoveryAction ? "/api/auth/recovery" : "/api/auth",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(authPayload),
            },
          );
          const responseData = await response.json();
          if (!response.ok) throw Error(responseData.error);
          {
            if (isRecoveryAction) {
              if ("reset" === authMode) {
                setAuthMode("login");
                onRecoveryComplete?.();
              }
              setStatusMessage(
                responseData.message ||
                  translate("app.platform.zapyt_vykonano"),
              );
            } else {
              await onSuccess();
            }
          }
        } catch (error) {
          setAuthError(
            error instanceof Error
              ? error.message
              : translate("app.platform.ne_vdalosya_vykonaty_zapyt"),
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className={"form-body"}>
        <div className={"auth-tabs"}>
          <button
            type={"button"}
            className={
              "register" === authMode ? "primary small" : "outline small"
            }
            onClick={() => changeAuthMode("register")}
          >
            {translate("auth.register")}
          </button>
          <button
            type={"button"}
            className={"login" === authMode ? "primary small" : "outline small"}
            onClick={() => changeAuthMode("login")}
          >
            {translate("app.platform.u_mene_ye_akaunt")}
          </button>
        </div>
        <p className={"form-intro"}>
          {"register" === authMode
            ? translate(
                "app.platform.zberihay_vakansiyi_nadsylay_rezyume_ta_znakhod_lyudey_dlya_svoyeyi_komandy",
              )
            : "request" === authMode
              ? translate(
                  "app.platform.vkazhy_poshtu_svoho_akauntu_nadishlemo_posylannya_dlya_novoho_parolya",
                )
              : "reset" === authMode
                ? translate(
                    "app.platform.vstanovy_novyy_parol_pislya_zminy_poperedni_seansy_bude_zaversheno",
                  )
                : translate("app.platform.uviydy_do_svoho_kabinetu_pratsi")}
        </p>
        {"register" === authMode && (
          <label className="field">
            {translate("auth.accountType")}
            <select name="accountType" defaultValue={defaultAccountType}>
              <option value="candidate">{translate("auth.candidate")}</option>
              <option value="employer">{translate("auth.employer")}</option>
            </select>
          </label>
        )}
        {"register" === authMode && (
          <label className={"field"}>
            {translate("auth.name")}
            <input
              name={"name"}
              required={true}
              minLength={2}
              maxLength={100}
              autoComplete={"name"}
            />
          </label>
        )}
        {"reset" !== authMode && (
          <label className={"field"}>
            {translate("auth.email")}
            <input
              name={"email"}
              type={"email"}
              required={true}
              maxLength={254}
              autoComplete={"email"}
            />
          </label>
        )}
        {"request" !== authMode && (
          <PasswordField
            name={"password"}
            label={
              "reset" === authMode
                ? translate("app.platform.novyy_parol")
                : translate("auth.password")
            }
            autoComplete={
              "login" === authMode ? "current-password" : "new-password"
            }
            key={authMode}
          />
        )}
        {"reset" === authMode && (
          <PasswordField
            name={"confirm"}
            label={translate("app.platform.povtory_novyy_parol")}
            autoComplete={"new-password"}
          />
        )}
        {"login" === authMode && (
          <button
            type={"button"}
            className={"occupation-field-button"}
            onClick={() => changeAuthMode("request")}
          >
            {translate("app.platform.zabuv_parol")}
          </button>
        )}
        {statusMessage && (
          <p className={"inline-note"} role={"status"}>
            {statusMessage}
          </p>
        )}
        {authError && (
          <p className={"form-error"} role={"alert"}>
            {authError}
          </p>
        )}
      </div>
      <div className={"form-footer"}>
        <span className={"muted"}>
          {"request" === authMode
            ? translate("app.platform.posylannya_diye_30_khvylyn")
            : translate("app.platform.bezkoshtovno_na_starti")}
        </span>
        <button className={"primary"} disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircleIcon className={"spin"} size={17} />
          ) : "register" === authMode ? (
            translate("auth.register")
          ) : "request" === authMode ? (
            translate("app.platform.nadislaty_posylannya")
          ) : "reset" === authMode ? (
            translate("app.platform.zminyty_parol")
          ) : (
            translate("auth.login")
          )}
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </form>
  );
}
export { AuthForm };
