import { getDatabase } from "../../../../core/db/index.js";
import { jsonNoStore } from "../../../../core/http/json.js";
import { listPublicJobs, readApplicantState } from "../../../../applicant/server/platform-state.js";
import { readEmployerState } from "../../../../employer/server/platform-state.js";
import { handleApplicantAction } from "../../../../applicant/server/actions.js";
import { employerActions, handleEmployerAction } from "../../../../employer/server/actions.js";

import { workflowRole } from "../../../../core/auth/permissions.js";
import { getWorkflowState, postWorkflowAction } from "../../../../common/server/workflow-http.js";

export function GET() {
  return getWorkflowState(async user => {
    const db = getDatabase();
    const role = workflowRole(user);
    const jobs = await listPublicJobs(db);
    const applicant = role === "candidate" ? await readApplicantState(db, user.userId) : {};
    const employer = role === "employer" ? await readEmployerState(db, user.userId) : {};
    return jsonNoStore({
      jobs, user: user && { name: user.displayName, accountType: user.accountType, email: user.email, isAdmin: user.isAdmin },
      profile: null, favorites: [], searches: [], applications: [], myJobs: [], incoming: [],
      ...applicant, ...employer,
    });
  });
}

export function POST(request) {
  return postWorkflowAction(request, (user, payload) =>
    employerActions.has(payload?.action) ? handleEmployerAction(user, payload) : handleApplicantAction(user, payload));
}

export const dynamic = "force-dynamic";
