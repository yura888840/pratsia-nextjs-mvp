import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
const dir = mkdtempSync(path.join(tmpdir(), "pratsia-google-"));
process.env.PRATSIA_DATA_DIR = dir;
process.env.PRATSIA_ORIGIN = "http://localhost:3000";
process.env.GOOGLE_CLIENT_ID = "test-client";
process.env.GOOGLE_CLIENT_SECRET = "test-secret";
const { migrate } = await import("../scripts/migrate-local.mjs");
const { getSqlite } = await import("../db/connection.js");
const { beginGoogleFlow, consumeGoogleFlow, googleAccount } =
  await import("../lib/google-auth.js");
const { registerAccount, createSession, getSession, authenticate } =
  await import("../lib/auth.js");
test("Google flows bind role, expire, require browser state and cannot be replayed; identities preserve role and refuse implicit email linking", async () => {
  try {
    migrate();
    migrate();
    const flow = await beginGoogleFlow("employer", "/recommended");
    const url = new URL(flow.url);
    assert.equal(url.searchParams.get("code_challenge_method"), "S256");
    assert.throws(
      () => consumeGoogleFlow(flow.state, "a".repeat(64)),
      /invalid-state/,
    );
    const consumed = consumeGoogleFlow(flow.state, flow.state);
    assert.equal(consumed.account_type, "employer");
    assert.equal(consumed.return_to, "/recommended");
    assert.throws(
      () => consumeGoogleFlow(flow.state, flow.state),
      /invalid-state/,
    );
    const expired = await beginGoogleFlow("candidate");
    getSqlite().prepare("UPDATE oauth_flows SET expires_at=0").run();
    assert.throws(
      () => consumeGoogleFlow(expired.state, expired.state),
      /invalid-state/,
    );
    await assert.rejects(beginGoogleFlow("admin"), /invalid-role/);
    const payload = {
      sub: "google-subject",
      email: "Google@example.invalid",
      name: "Google User",
      email_verified: true,
      nonce: consumed.nonce,
    };
    assert.throws(
      () => googleAccount(payload, "employer", "wrong-nonce"),
      /invalid-identity/,
    );
    assert.throws(
      () =>
        googleAccount(
          { ...payload, email_verified: false },
          "employer",
          consumed.nonce,
        ),
      /invalid-identity/,
    );
    const id = googleAccount(payload, "employer", consumed.nonce);
    assert.equal(getSession(createSession(id).token).accountType, "employer");
    assert.equal(googleAccount(payload, "candidate", consumed.nonce), id);
    assert.equal(
      await authenticate(payload.email.toLowerCase(), "any-password"),
      null,
    );
    await registerAccount(
      "password@example.invalid",
      "Password User",
      "test-password-2026",
    );
    assert.throws(
      () =>
        googleAccount(
          {
            ...payload,
            sub: "different-subject",
            email: "password@example.invalid",
          },
          "candidate",
          consumed.nonce,
        ),
      /account-exists/,
    );
    assert.equal(
      getSqlite().prepare("SELECT count(*) AS n FROM oauth_identities").get().n,
      1,
    );
  } finally {
    getSqlite().close();
    rmSync(dir, { recursive: true, force: true });
  }
});
