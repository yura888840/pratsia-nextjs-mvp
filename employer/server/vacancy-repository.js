import { and, desc, eq, sql } from "drizzle-orm";
import { jobs } from "../../core/db/schema.js";
import { getSqlite } from "../../core/db/connection.js";

export function listOwnedVacancies(db, ownerId) {
  return db.select().from(jobs).where(eq(jobs.ownerId, ownerId)).orderBy(desc(jobs.createdAt));
}

function companyName(ownerId, fallback) {
  return getSqlite().prepare("SELECT name FROM companies WHERE owner_id=?").get(ownerId)?.name || fallback;
}

function ownedVacancy(ownerId, id) {
  return and(eq(jobs.id, id), eq(jobs.ownerId, ownerId));
}

export function isBlockedVacancy(ownerId, id) {
  return Boolean(getSqlite().prepare(
    "SELECT id FROM jobs WHERE id=? AND owner_id=? AND moderation_status='blocked'",
  ).get(id, ownerId));
}

const expiresInThirtyDays = () => new Date(Date.now() + 30 * 86400000).toISOString();

export async function publishVacancy(db, ownerId, data) {
  const [{ count }] = await db.select({ count: sql`count(*)` }).from(jobs)
    .where(and(eq(jobs.ownerId, ownerId), eq(jobs.status, "active")));
  if (count >= 100) return null;
  const id = crypto.randomUUID();
  await db.insert(jobs).values({
    ...data, id, ownerId, company: companyName(ownerId, data.company),
    moderationStatus: "pending", country: "UA", currency: "UAH", status: "active",
    createdAt: new Date().toISOString(), expiresAt: expiresInThirtyDays(),
  });
  return id;
}

export async function editVacancy(db, ownerId, id, data) {
  const updated = await db.update(jobs).set({
    ...data, company: companyName(ownerId, data.company), moderationStatus: "pending", moderationReason: "",
  }).where(ownedVacancy(ownerId, id)).returning({ id: jobs.id });
  return updated.length > 0;
}

export async function setVacancyStatus(db, ownerId, id, status) {
  const changes = status === "active"
    ? { status, expiresAt: expiresInThirtyDays(), moderationStatus: "pending" }
    : { status };
  const updated = await db.update(jobs).set(changes).where(ownedVacancy(ownerId, id)).returning({ id: jobs.id });
  return updated.length > 0;
}
