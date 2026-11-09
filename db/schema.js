// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import { sqliteTable, text, integer, uniqueIndex, index } from "drizzle-orm/sqlite-core";

let h = sqliteTable("jobs", {
    id: text("id").primaryKey(),
    ownerId: text("owner_id").notNull(),
    title: text("title").notNull(),
    company: text("company").notNull(),
    occupation: text("occupation").notNull(),
    category: text("category").notNull(),
    country: text("country").notNull().default("UA"),
    city: text("city").notNull(),
    arrangement: text("arrangement").notNull(),
    schedule: text("schedule").notNull(),
    salaryMin: integer("salary_min").notNull(),
    salaryMax: integer("salary_max").notNull(),
    currency: text("currency").notNull().default("UAH"),
    experience: text("experience").notNull(),
    description: text("description").notNull(),
    requirements: text("requirements").notNull(),
    benefits: text("benefits").notNull().default(""),
    status: text("status").notNull().default("active"),
    createdAt: text("created_at").notNull(),
    expiresAt: text("expires_at").notNull(),
    sourceUrl: text("source_url"),
    sourceId: text("source_id"),
    moderationStatus: text("moderation_status").notNull().default("approved"),
    moderationReason: text("moderation_reason").notNull().default("")
  }, a => [index("jobs_active_expiry").on(a.status, a.expiresAt), index("jobs_owner").on(a.ownerId), index("jobs_created").on(a.createdAt)]),
  i = sqliteTable("profiles", {
    userId: text("user_id").primaryKey(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    city: text("city").notNull(),
    occupation: text("occupation").notNull(),
    salary: integer("salary").notNull(),
    experience: text("experience").notNull(),
    skills: text("skills").notNull(),
    about: text("about").notNull(),
    schedule: text("schedule").notNull(),
    specialties: text("specialties").notNull().default("{}"),
    workHistory: text("work_history").notNull().default("[]"),
    education: text("education").notNull().default("[]"),
    updatedAt: text("updated_at").notNull()
  }),
  j = sqliteTable("applications", {
    id: text("id").primaryKey(),
    jobId: text("job_id").notNull().references(() => h.id),
    candidateId: text("candidate_id").notNull(),
    profileSnapshot: text("profile_snapshot").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: text("created_at").notNull()
  }, a => [uniqueIndex("application_candidate_job").on(a.jobId, a.candidateId), index("applications_candidate").on(a.candidateId)]),
  k = sqliteTable("favorites", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    jobId: text("job_id").notNull()
  }, a => [uniqueIndex("favorite_user_job").on(a.userId, a.jobId)]),
  l = sqliteTable("saved_searches", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    filters: text("filters").notNull(),
    createdAt: text("created_at").notNull()
  }),
  m = sqliteTable("reports", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    jobId: text("job_id").notNull(),
    reason: text("reason").notNull(),
    createdAt: text("created_at").notNull(),
    status: text("status").notNull().default("open"),
    resolvedAt: text("resolved_at")
  }),
  n = sqliteTable("accounts", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: integer("created_at").notNull(),
    accountType: text("account_type").notNull().default("candidate"),
    role: text("role").notNull().default("user"),
    emailVerifiedAt: integer("email_verified_at")
  }),
  o = sqliteTable("sessions", {
    tokenHash: text("token_hash").primaryKey(),
    userId: text("user_id").notNull().references(() => n.id),
    expiresAt: integer("expires_at").notNull()
  }, a => [index("sessions_user").on(a.userId)]),
  p = sqliteTable("auth_attempts", {
    key: text("key").primaryKey(),
    count: integer("count").notNull(),
    expiresAt: integer("expires_at").notNull()
  }),
  q = sqliteTable("password_resets", {
    tokenHash: text("token_hash").primaryKey(),
    userId: text("user_id").notNull().references(() => n.id),
    expiresAt: integer("expires_at").notNull(),
    createdAt: integer("created_at").notNull()
  }, a => [index("password_resets_user").on(a.userId)]),
  r = sqliteTable("moderation_events", {
    id: text("id").primaryKey(),
    actorId: text("actor_id").notNull(),
    jobId: text("job_id").notNull(),
    action: text("action").notNull(),
    reason: text("reason").notNull(),
    createdAt: text("created_at").notNull()
  });
export { n as accounts };
export { j as applications };
export { p as authAttempts };
export { k as favorites };
export { h as jobs };
export { r as moderationEvents };
export { q as passwordResets };
export { i as profiles };
export { m as reports };
export { l as searches };
export { o as sessions };
