import { translate } from "../../../../common/i18n/index.js";
import { canUseCandidateFeatures } from "../../../../applicant/access.js";
import { readApplicantState } from "../../../../applicant/server/platform-state.js";
import { handleApplicantAction } from "../../../../applicant/server/actions.js";
import { getWorkflowState, postWorkflowAction } from "../../../../core/http/workflow-http.js";
import { jsonNoStore } from "../../../../core/http/json.js";
import { getDatabase } from "../../../../core/db/index.js";

export const dynamic = "force-dynamic";

export function GET() {
  return getWorkflowState(translate, async user => {
    if (!canUseCandidateFeatures(user)) return jsonNoStore({ error: user ? "forbidden" : "unauthenticated" }, user ? 403 : 401);
    return jsonNoStore(await readApplicantState(getDatabase(), user.userId));
  });
}

export function POST(request) {
  return postWorkflowAction(translate, request, handleApplicantAction);
}
