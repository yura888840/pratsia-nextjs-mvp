// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as e from "node:crypto";
import * as nativeModule1 from "node:util";
import * as connection from "../db/connection.js";
let d;
let f = nativeModule1;
let h = (0, f.promisify)(e.scrypt),
  i = a => (0, e.createHash)("sha256").update(a).digest("hex");
async function hashPassword(a) {
  let b = (0, e.randomBytes)(16).toString("hex"),
    c = await h(a, b, 64, {
      N: 32768,
      r: 8,
      p: 1,
      maxmem: 0x4000000
    });
  return `scrypt$32768$${b}$${c.toString("hex")}`;
}
async function verifyPassword(a, b) {
  try {
    let [c, d, f, g] = b.split("$");
    if ("scrypt" !== c || 32768 !== Number(d) || !f || g?.length !== 128) return false;
    let i = await h(a, f, 64, {
      N: 32768,
      r: 8,
      p: 1,
      maxmem: 0x4000000
    });
    return (0, e.timingSafeEqual)(i, Buffer.from(g, "hex"));
  } catch {
    return false;
  }
}
function checkRateLimit(a, b, c) {
  let d = (0, connection.getSqlite)(),
    e = Date.now();
  return d.prepare("DELETE FROM auth_attempts WHERE expires_at < ?").run(e), d.prepare("INSERT INTO auth_attempts(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1").run(a, e + c), d.prepare("SELECT count FROM auth_attempts WHERE key=?").get(a).count <= b;
}
function emailRateLimitKey(a) {
  return "email:" + i(a);
}
function createSession(a) {
  let b = (0, e.randomBytes)(32).toString("hex"),
    c = Date.now() + 6048e5,
    d = (0, connection.getSqlite)();
  return d.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now()), d.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES (?,?,?)").run(i(b), a, c), {
    token: b,
    expiresAt: c
  };
}
function getSession(a) {
  if ("string" != typeof a || !/^[a-f0-9]{64}$/.test(a)) return null;
  let b = (0, connection.getSqlite)().prepare("SELECT a.id,a.email,a.name,a.role,a.email_verified_at FROM sessions s JOIN accounts a ON a.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").get(i(a), Date.now());
  return b ? {
    userId: String(b.id),
    email: String(b.email),
    displayName: String(b.name),
    isAdmin: "admin" === b.role && null !== b.email_verified_at
  } : null;
}
function deleteSession(a) {
  "string" == typeof a && (0, connection.getSqlite)().prepare("DELETE FROM sessions WHERE token_hash=?").run(i(a));
}
async function authenticate(a, b) {
  let c = (0, connection.getSqlite)().prepare("SELECT id,password_hash FROM accounts WHERE email=?").get(a);
  return d ??= hashPassword((0, e.randomBytes)(32).toString("hex")), (await verifyPassword(b, c ? String(c.password_hash) : await d)) && c ? String(c.id) : null;
}
async function registerAccount(a, b, c) {
  let d = await hashPassword(c),
    f = (0, e.randomUUID)();
  return (0, connection.getSqlite)().prepare("INSERT INTO accounts(id,email,name,password_hash,created_at) VALUES (?,?,?,?,?)").run(f, a, b, d, Date.now()), f;
}
function createPasswordReset(a) {
  let b = (0, connection.getSqlite)(),
    c = Date.now();
  b.prepare("DELETE FROM password_resets WHERE expires_at<=?").run(c);
  let d = b.prepare("SELECT id FROM accounts WHERE email=?").get(a);
  if (!d) return null;
  let f = (0, e.randomBytes)(32).toString("hex");
  return b.prepare("INSERT INTO password_resets(token_hash,user_id,expires_at,created_at) VALUES (?,?,?,?)").run(i(f), d.id, c + 18e5, c), f;
}
function deletePasswordReset(a) {
  (0, connection.getSqlite)().prepare("DELETE FROM password_resets WHERE token_hash=?").run(i(a));
}
async function completePasswordReset(a, b) {
  if ("string" != typeof a || !/^[a-f0-9]{64}$/.test(a) || "string" != typeof b || b.length < 12 || b.length > 128) return false;
  let c = (0, connection.getSqlite)();
  if (!c.prepare("SELECT user_id FROM password_resets WHERE token_hash=? AND expires_at>?").get(i(a), Date.now())) return false;
  let d = await hashPassword(b);
  c.exec("BEGIN IMMEDIATE");
  try {
    let b = c.prepare("SELECT user_id FROM password_resets WHERE token_hash=? AND expires_at>?").get(i(a), Date.now());
    if (!b) return c.exec("ROLLBACK"), false;
    return c.prepare("UPDATE accounts SET password_hash=?,email_verified_at=? WHERE id=?").run(d, Date.now(), b.user_id), c.prepare("DELETE FROM sessions WHERE user_id=?").run(b.user_id), c.prepare("DELETE FROM password_resets WHERE user_id=?").run(b.user_id), c.exec("COMMIT"), true;
  } catch (a) {
    throw c.exec("ROLLBACK"), a;
  }
}
export { authenticate };
export { completePasswordReset };
export { checkRateLimit };
export { createSession };
export { deletePasswordReset };
export { emailRateLimitKey };
export { createPasswordReset };
export { getSession };
export { registerAccount };
export { deleteSession };
