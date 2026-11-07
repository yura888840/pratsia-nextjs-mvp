"use client";

import { useState } from "react";
import { translate } from "../../../i18n/index.js";
import * as jsxRuntime from "react/jsx-runtime";
import { EyeOffIcon, EyeIcon } from "../shared/icons.jsx";
function PasswordField({ name, label, autoComplete }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <div className={"field"}>
      <label htmlFor={`auth-${name}`}>{label}</label>
      <div className={"password-input"}>
        <input
          id={`auth-${name}`}
          name={name}
          type={isPasswordVisible ? "text" : "password"}
          required={true}
          minLength={12}
          maxLength={128}
          autoComplete={autoComplete}
          spellCheck={false}
          autoCapitalize={"none"}
        />
        <button
          type={"button"}
          className={"password-toggle"}
          aria-label={
            isPasswordVisible
              ? translate("app.platform.prykhovaty_parol")
              : translate("app.platform.pokazaty_parol")
          }
          aria-pressed={isPasswordVisible}
          aria-controls={`auth-${name}`}
          onClick={() => setPasswordVisible((wasVisible) => !wasVisible)}
        >
          {isPasswordVisible
            ? (0, jsxRuntime.jsx)(EyeOffIcon, {
                size: 18,
              })
            : (0, jsxRuntime.jsx)(EyeIcon, {
                size: 18,
              })}
          <span>
            {isPasswordVisible
              ? translate("app.platform.prykhovaty")
              : translate("app.platform.pokazaty")}
          </span>
        </button>
      </div>
      {"password" === name && (
        <small>{translate("app.platform.vid_12_symvoliv")}</small>
      )}
    </div>
  );
}
export { PasswordField };
