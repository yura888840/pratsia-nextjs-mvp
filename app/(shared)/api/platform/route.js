import { translate } from "../../../../common/i18n/index.js";
import { getDatabase } from "../../../../core/db/index.js";
import { getCurrentUser } from "../../../../core/auth/session.js";
import { isAllowedOrigin } from "../../../../core/http/origin.js";
import { jsonNoStore } from "../../../../core/http/json.js";
import { listPublicJobs, readApplicantState } from "../../../../applicant/server/platform-state.js";
import { readEmployerState } from "../../../../employer/server/platform-state.js";
import { handleApplicantAction } from "../../../../applicant/server/actions.js";
import { employerActions, handleEmployerAction } from "../../../../employer/server/actions.js";

async function getPlatformState() {
  try {
    const connection = getDatabase();
    const currentUser = await getCurrentUser();
    const publicJobs = await listPublicJobs(connection);
    if (!currentUser)
      return jsonNoStore({
        jobs: publicJobs,
        user: null,
        profile: null,
        favorites: [],
        searches: [],
        applications: [],
        myJobs: [],
        incoming: [],
      });
    const [applicant, employer] = await Promise.all([
      readApplicantState(connection, currentUser.userId),
      currentUser.accountType === "employer"
        ? readEmployerState(connection, currentUser.userId)
        : { myJobs: [], incoming: [] },
    ]);
    return jsonNoStore({
      jobs: publicJobs,
      user: {
        name: currentUser.displayName,
        accountType: currentUser.accountType,
        email: currentUser.email,
        isAdmin: !!currentUser.isAdmin,
      },
      ...applicant,
      ...employer,
    });
  } catch (error) {
    console.error(
      "platform_read_failed",
      error instanceof Error ? error.message : "unknown",
    );
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.ne_vdalosya_zavantazhyty_dani_sprobuyte_shche_raz",
        ),
      },
      503,
    );
  }
}
async function postPlatformAction(request) {
  if (!isAllowedOrigin(request))
    return jsonNoStore(
      {
        error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt"),
      },
      403,
    );
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.uviydit_shchob_zberehty_zminy",
        ),
        needsAuth: true,
      },
      401,
    );
  if (Number(request.headers.get("content-length") || 0) > 4e4)
    return jsonNoStore(
      {
        error: translate("app.api.auth.recovery.route.zavelykyy_zapyt"),
      },
      413,
    );
  try {
    const requestBody = await request.text();
    if (requestBody.length > 4e4)
      return jsonNoStore(
        {
          error: translate("app.api.auth.recovery.route.zavelykyy_zapyt"),
        },
        413,
      );
    const actionPayload = JSON.parse(requestBody);
    const handleAction = employerActions.has(actionPayload.action)
      ? handleEmployerAction
      : handleApplicantAction;
    const result = await handleAction(currentUser, actionPayload);
    if (result) return result;
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.nevidoma_diya_abo_nekorektni_dani",
        ),
      },
      400,
    );
  } catch (error) {
    console.error(
      "platform_write_failed",
      error instanceof Error ? error.message : "unknown",
    );
    return jsonNoStore(
      {
        error: translate(
          "app.api.platform.route.ne_vdalosya_zberehty_perevirte_z_yednannya_ta_povtorit",
        ),
      },
      500,
    );
  }
}
export { getPlatformState as GET };
export { postPlatformAction as POST };
export const dynamic = "force-dynamic";
