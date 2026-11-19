import { desc, eq } from "drizzle-orm";
import { jobs, applications } from "../../core/db/schema.js";

export async function readEmployerState(connection, userId) {
  const [myJobs, incoming] = await Promise.all([
    connection
      .select()
      .from(jobs)
      .where(eq(jobs.ownerId, userId))
      .orderBy(desc(jobs.createdAt)),
    connection
      .select({
        application: applications,
        job: jobs,
      })
      .from(applications)
      .innerJoin(jobs, eq(jobs.id, applications.jobId))
      .where(eq(jobs.ownerId, userId)),
  ]);
  return { myJobs, incoming };
}
