import { safeAuthReturnTo } from "./auth-redirect.js";
import { OAuth2Client, CodeChallengeMethod } from "google-auth-library";
import {
  createHash,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { getSqlite } from "../db/connection.js";
const hash = (value) => createHash("sha256").update(value).digest("hex");
export const googleFlowCookie = "pratsia_google_state";
export function googleConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.PRATSIA_ORIGIN,
  );
}
export function googleClient() {
  if (!googleConfigured()) throw Error("google-unavailable");
  const origin = new URL(process.env.PRATSIA_ORIGIN);
  if (
    origin.protocol !== "https:" &&
    !["localhost", "127.0.0.1"].includes(origin.hostname)
  )
    throw Error("google-unavailable");
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    new URL("/api/auth/google/callback", origin).href,
  );
}
export async function beginGoogleFlow(accountType, returnTo = "/") {
  if (!["candidate", "employer"].includes(accountType))
    throw Error("invalid-role");
  const client = googleClient();
  const { codeVerifier, codeChallenge } =
    await client.generateCodeVerifierAsync();
  const state = randomBytes(32).toString("hex");
  const nonce = randomBytes(32).toString("hex");
  const db = getSqlite();
  db.prepare("DELETE FROM oauth_flows WHERE expires_at<=?").run(Date.now());
  db.prepare(
    "INSERT INTO oauth_flows (state_hash,verifier,nonce,account_type,expires_at,return_to) VALUES (?,?,?,?,?,?)",
  ).run(
    hash(state),
    codeVerifier,
    nonce,
    accountType,
    Date.now() + 600000,
    safeAuthReturnTo(returnTo),
  );
  return {
    state,
    url: client.generateAuthUrl({
      scope: ["openid", "email", "profile"],
      state,
      nonce,
      code_challenge: codeChallenge,
      code_challenge_method: CodeChallengeMethod.S256,
      prompt: "select_account",
    }),
  };
}
export function consumeGoogleFlow(state, cookie) {
  if (
    typeof state !== "string" ||
    typeof cookie !== "string" ||
    !/^[a-f0-9]{64}$/.test(state) ||
    cookie.length !== state.length ||
    !timingSafeEqual(Buffer.from(state), Buffer.from(cookie))
  )
    throw Error("invalid-state");
  const row = getSqlite()
    .prepare("DELETE FROM oauth_flows WHERE state_hash=? RETURNING *")
    .get(hash(state));
  if (!row || row.expires_at <= Date.now()) throw Error("invalid-state");
  return row;
}
export function googleAccount(payload, accountType, nonce) {
  if (
    !payload ||
    payload.nonce !== nonce ||
    !payload.sub ||
    payload.email_verified !== true ||
    typeof payload.email !== "string" ||
    !["candidate", "employer"].includes(accountType)
  )
    throw Error("invalid-identity");
  const email = payload.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw Error("invalid-identity");
  const db = getSqlite();
  db.exec("BEGIN IMMEDIATE");
  try {
    const existing = db
      .prepare(
        "SELECT account_id FROM oauth_identities WHERE provider='google' AND subject=?",
      )
      .get(payload.sub);
    if (existing) {
      db.exec("COMMIT");
      return existing.account_id;
    }
    // Linking an existing password account requires proving ownership separately.
    if (db.prepare("SELECT id FROM accounts WHERE email=?").get(email))
      throw Error("account-exists");
    const id = randomUUID();
    const name = String(payload.name || email.split("@")[0]).slice(0, 100);
    db.prepare(
      "INSERT INTO accounts(id,email,name,password_hash,created_at,account_type,email_verified_at) VALUES (?,?,?,?,?,?,?)",
    ).run(id, email, name, "oauth:google", Date.now(), accountType, Date.now());
    db.prepare("INSERT INTO oauth_identities VALUES ('google',?,?)").run(
      payload.sub,
      id,
    );
    db.exec("COMMIT");
    return id;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
