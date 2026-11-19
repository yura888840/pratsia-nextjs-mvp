import { translate } from "../i18n/index.js";
import { getCurrentUser } from "../../core/auth/session.js";
import { isAllowedOrigin } from "../../core/http/origin.js";
import { jsonNoStore } from "../../core/http/json.js";

export async function getWorkflowState(readState) {
  try {
    const user = await getCurrentUser();
    return await readState(user);
  } catch (error) {
    console.error("platform_read_failed", error instanceof Error ? error.message : "unknown");
    return jsonNoStore({ error: translate("app.api.platform.route.ne_vdalosya_zavantazhyty_dani_sprobuyte_shche_raz") }, 503);
  }
}

export async function postWorkflowAction(request, handleAction) {
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
