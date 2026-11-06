// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import * as d from "../vendor/recovered/module-5574.js";
import * as e from "../vendor/recovered/module-2917.js";
import * as f from "../vendor/recovered/module-4982.js";
import * as g from "../vendor/recovered/module-8.js";
let h = (0, d.D)("jobs", {
    id: (0, e.Qq)("id").primaryKey(),
    ownerId: (0, e.Qq)("owner_id").notNull(),
    title: (0, e.Qq)("title").notNull(),
    company: (0, e.Qq)("company").notNull(),
    occupation: (0, e.Qq)("occupation").notNull(),
    category: (0, e.Qq)("category").notNull(),
    country: (0, e.Qq)("country").notNull().default("UA"),
    city: (0, e.Qq)("city").notNull(),
    arrangement: (0, e.Qq)("arrangement").notNull(),
    schedule: (0, e.Qq)("schedule").notNull(),
    salaryMin: (0, f.nd)("salary_min").notNull(),
    salaryMax: (0, f.nd)("salary_max").notNull(),
    currency: (0, e.Qq)("currency").notNull().default("UAH"),
    experience: (0, e.Qq)("experience").notNull(),
    description: (0, e.Qq)("description").notNull(),
    requirements: (0, e.Qq)("requirements").notNull(),
    benefits: (0, e.Qq)("benefits").notNull().default(""),
    status: (0, e.Qq)("status").notNull().default("active"),
    createdAt: (0, e.Qq)("created_at").notNull(),
    expiresAt: (0, e.Qq)("expires_at").notNull(),
    sourceUrl: (0, e.Qq)("source_url"),
    sourceId: (0, e.Qq)("source_id"),
    moderationStatus: (0, e.Qq)("moderation_status").notNull().default("approved"),
    moderationReason: (0, e.Qq)("moderation_reason").notNull().default("")
  }, a => [(0, g.Pe)("jobs_active_expiry").on(a.status, a.expiresAt), (0, g.Pe)("jobs_owner").on(a.ownerId), (0, g.Pe)("jobs_created").on(a.createdAt)]),
  i = (0, d.D)("profiles", {
    userId: (0, e.Qq)("user_id").primaryKey(),
    name: (0, e.Qq)("name").notNull(),
    phone: (0, e.Qq)("phone").notNull(),
    city: (0, e.Qq)("city").notNull(),
    occupation: (0, e.Qq)("occupation").notNull(),
    salary: (0, f.nd)("salary").notNull(),
    experience: (0, e.Qq)("experience").notNull(),
    skills: (0, e.Qq)("skills").notNull(),
    about: (0, e.Qq)("about").notNull(),
    schedule: (0, e.Qq)("schedule").notNull(),
    specialties: (0, e.Qq)("specialties").notNull().default("{}"),
    workHistory: (0, e.Qq)("work_history").notNull().default("[]"),
    education: (0, e.Qq)("education").notNull().default("[]"),
    updatedAt: (0, e.Qq)("updated_at").notNull()
  }),
  j = (0, d.D)("applications", {
    id: (0, e.Qq)("id").primaryKey(),
    jobId: (0, e.Qq)("job_id").notNull().references(() => h.id),
    candidateId: (0, e.Qq)("candidate_id").notNull(),
    profileSnapshot: (0, e.Qq)("profile_snapshot").notNull(),
    message: (0, e.Qq)("message").notNull(),
    status: (0, e.Qq)("status").notNull().default("new"),
    createdAt: (0, e.Qq)("created_at").notNull()
  }, a => [(0, g.GL)("application_candidate_job").on(a.jobId, a.candidateId), (0, g.Pe)("applications_candidate").on(a.candidateId)]),
  k = (0, d.D)("favorites", {
    id: (0, e.Qq)("id").primaryKey(),
    userId: (0, e.Qq)("user_id").notNull(),
    jobId: (0, e.Qq)("job_id").notNull()
  }, a => [(0, g.GL)("favorite_user_job").on(a.userId, a.jobId)]),
  l = (0, d.D)("saved_searches", {
    id: (0, e.Qq)("id").primaryKey(),
    userId: (0, e.Qq)("user_id").notNull(),
    name: (0, e.Qq)("name").notNull(),
    filters: (0, e.Qq)("filters").notNull(),
    createdAt: (0, e.Qq)("created_at").notNull()
  }),
  m = (0, d.D)("reports", {
    id: (0, e.Qq)("id").primaryKey(),
    userId: (0, e.Qq)("user_id").notNull(),
    jobId: (0, e.Qq)("job_id").notNull(),
    reason: (0, e.Qq)("reason").notNull(),
    createdAt: (0, e.Qq)("created_at").notNull(),
    status: (0, e.Qq)("status").notNull().default("open"),
    resolvedAt: (0, e.Qq)("resolved_at")
  }),
  n = (0, d.D)("accounts", {
    id: (0, e.Qq)("id").primaryKey(),
    email: (0, e.Qq)("email").notNull().unique(),
    name: (0, e.Qq)("name").notNull(),
    passwordHash: (0, e.Qq)("password_hash").notNull(),
    createdAt: (0, f.nd)("created_at").notNull(),
    role: (0, e.Qq)("role").notNull().default("user"),
    emailVerifiedAt: (0, f.nd)("email_verified_at")
  }),
  o = (0, d.D)("sessions", {
    tokenHash: (0, e.Qq)("token_hash").primaryKey(),
    userId: (0, e.Qq)("user_id").notNull().references(() => n.id),
    expiresAt: (0, f.nd)("expires_at").notNull()
  }, a => [(0, g.Pe)("sessions_user").on(a.userId)]),
  p = (0, d.D)("auth_attempts", {
    key: (0, e.Qq)("key").primaryKey(),
    count: (0, f.nd)("count").notNull(),
    expiresAt: (0, f.nd)("expires_at").notNull()
  }),
  q = (0, d.D)("password_resets", {
    tokenHash: (0, e.Qq)("token_hash").primaryKey(),
    userId: (0, e.Qq)("user_id").notNull().references(() => n.id),
    expiresAt: (0, f.nd)("expires_at").notNull(),
    createdAt: (0, f.nd)("created_at").notNull()
  }, a => [(0, g.Pe)("password_resets_user").on(a.userId)]),
  r = (0, d.D)("moderation_events", {
    id: (0, e.Qq)("id").primaryKey(),
    actorId: (0, e.Qq)("actor_id").notNull(),
    jobId: (0, e.Qq)("job_id").notNull(),
    action: (0, e.Qq)("action").notNull(),
    reason: (0, e.Qq)("reason").notNull(),
    createdAt: (0, e.Qq)("created_at").notNull()
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
