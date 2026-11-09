"use client";
import { useState } from "react";
import Link from "next/link";
import { translate } from "../../i18n/index.js";
export function RegistrationForm({
  initialRole,
  googleEnabled,
  initialError,
  initialLogin = false,
}) {
  const [accountType, setAccountType] = useState(initialRole);
  const [login, setLogin] = useState(initialLogin);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(initialError);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: login ? "login" : "register",
          accountType,
          name: login ? undefined : data.get("name"),
          email: data.get("email"),
          password: data.get("password"),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw Error(result.error || translate("registration.failed"));
      window.location.assign("/?registered=1");
    } catch (error) {
      setError(error.message || translate("registration.failed"));
      setBusy(false);
    }
  }
  return (
    <div className="candidate-app registration-app">
      <header className="candidate-header">
        <Link className="candidate-brand" href="/">
          {translate("brand.logo")}
        </Link>
        <Link href="/">{translate("registration.home")}</Link>
      </header>
      <main className="registration-card candidate-card">
        <h1>
          {login
            ? translate("registration.login")
            : translate("registration.title")}
        </h1>
        {!login && (
          <fieldset disabled={busy} className="registration-roles">
            <legend>{translate("registration.role")}</legend>
            <label>
              <input
                type="radio"
                name="accountType"
                value="candidate"
                checked={accountType === "candidate"}
                onChange={() => setAccountType("candidate")}
              />
              {translate("registration.candidate")}
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="employer"
                checked={accountType === "employer"}
                onChange={() => setAccountType("employer")}
              />
              {translate("registration.employer")}
            </label>
          </fieldset>
        )}
        <form action="/api/auth/google" method="post">
          <input type="hidden" name="accountType" value={accountType} />
          <button
            className="registration-google"
            disabled={!googleEnabled || busy}
            type="submit"
          >
            {translate("registration.google")}
          </button>
        </form>
        {!googleEnabled && (
          <p className="candidate-meta">
            {translate("registration.googleUnavailable")}
          </p>
        )}
        <p className="registration-divider">
          {translate("registration.orEmail")}
        </p>
        <form onSubmit={submit}>
          <fieldset disabled={busy} className="registration-fields">
            {!login && (
              <label>
                {translate("registration.name")}
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                />
              </label>
            )}
            <label>
              {translate("registration.email")}
              <input
                name="email"
                required
                type="email"
                maxLength={254}
                autoComplete="email"
              />
            </label>
            <label>
              {translate("registration.password")}
              <input
                name="password"
                required
                type="password"
                minLength={12}
                maxLength={128}
                autoComplete={login ? "current-password" : "new-password"}
              />
            </label>
            <p className="candidate-meta">
              {translate("registration.passwordHint")}
            </p>
            <button className="candidate-primary" type="submit">
              {busy
                ? translate("registration.wait")
                : login
                  ? translate("registration.login")
                  : translate("registration.submit")}
            </button>
          </fieldset>
        </form>
        {error && (
          <p className="registration-error" role="alert">
            {error}
          </p>
        )}
        <button
          type="button"
          className="registration-toggle"
          disabled={busy}
          onClick={() => {
            setLogin(!login);
            setError("");
          }}
        >
          {login
            ? translate("registration.createInstead")
            : translate("registration.loginInstead")}
        </button>
      </main>
    </div>
  );
}
