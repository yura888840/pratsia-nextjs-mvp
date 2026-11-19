import { and, desc, eq, sql } from "drizzle-orm";
import { jobs, profiles, favorites, searches, applications } from "../../core/db/schema.js";

export async function listPublicJobs(connection) {
  const nowIso = new Date().toISOString();
  return (
    await connection
      .select()
      .from(jobs)
      .where(
        and(
          eq(jobs.status, "active"),
          eq(jobs.moderationStatus, "approved"),
          sql`${jobs.expiresAt}>${nowIso}`,
        ),
      )
      .orderBy(desc(jobs.createdAt))
      .limit(16)
  ).map(({ ownerId, moderationReason, ...publicJob }) => publicJob);
}

export async function readApplicantState(connection, userId) {
  const [userProfiles, userFavorites, savedSearches, submittedApplications] = await Promise.all([
    connection
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1),
    connection
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId)),
    connection
      .select()
      .from(searches)
      .where(eq(searches.userId, userId)),
    connection
      .select({
        application: applications,
        job: jobs,
      })
      .from(applications)
      .innerJoin(jobs, eq(jobs.id, applications.jobId))
      .where(eq(applications.candidateId, userId)),
  ]);
  return {
    profile: userProfiles[0] ?? null,
    favorites: userFavorites.map((favorite) => favorite.jobId),
    searches: savedSearches,
    applications: submittedApplications.map(
      ({ application, job: { moderationReason, ...applicationJob } }) => ({
        application,
        job: applicationJob,
      }),
    ),
  };
}
