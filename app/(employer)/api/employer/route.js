import { canUseEmployerFeatures } from "../../../../employer/access.js";
import { readEmployerState } from "../../../../employer/server/platform-state.js";
import { handleEmployerAction } from "../../../../employer/server/actions.js";
import { getWorkflowState, postWorkflowAction } from "../../../../common/server/workflow-http.js";
import { jsonNoStore } from "../../../../core/http/json.js";
import { getDatabase } from "../../../../core/db/index.js";

export const dynamic = "force-dynamic";

export function GET() {
  return getWorkflowState(async user => {
    if (!canUseEmployerFeatures(user)) return jsonNoStore({ error: user ? "forbidden" : "unauthenticated" }, user ? 403 : 401);
    return jsonNoStore(await readEmployerState(getDatabase(), user.userId));
  });
}

export function POST(request) {
  return postWorkflowAction(request, handleEmployerAction);
}
