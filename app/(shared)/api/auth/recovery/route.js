import { translate } from "../../../../../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import {
  discriminatedUnion as discriminatedUnionSchema,
  object as objectSchema,
  literal as literalSchema,
  string as stringSchema,
} from "zod";
import {
  checkRateLimit,
  completePasswordReset,
  emailRateLimitKey,
  createPasswordReset,
  deletePasswordReset,
} from "../../../../../lib/auth.js";
import * as fsPromises from "node:fs/promises";
import { constants } from "node:fs";
import * as childProcesses from "node:child_process";
import { randomUUID } from "node:crypto";
const fileAccess = fsPromises;
const processSpawner = childProcesses;
const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
function getMailConfiguration() {
  return {
    path: process.env.PRATSIA_SENDMAIL_PATH || "/usr/sbin/sendmail",
    from: process.env.PRATSIA_MAIL_FROM || "no-reply@pratsia.com.ua",
  };
}
async function isMailAvailable() {
  if ("1" === process.env.PRATSIA_MAIL_DISABLED) return false;
  const mailConfiguration = getMailConfiguration();
  if (
    !EMAIL_PATTERN.test(mailConfiguration.from) ||
    /[\r\n]/.test(mailConfiguration.from)
  )
    return false;
  try {
    await (0, fileAccess.access)(mailConfiguration.path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}
async function sendPasswordResetEmail(recipientEmail, resetUrl) {
  const mailConfiguration = getMailConfiguration();
  const mailMessage = (function (
    recipient,
    passwordResetUrl,
    sender = getMailConfiguration().from,
  ) {
    if (
      !EMAIL_PATTERN.test(recipient) ||
      !EMAIL_PATTERN.test(sender) ||
      /[\r\n]/.test(recipient + sender) ||
      !passwordResetUrl.startsWith("https://")
    )
      throw Error("Invalid mail envelope");
    const encodedSubject = Buffer.from(
      translate("app.api.auth.recovery.route.pratsya_vidnovlennya_dostupu"),
      "utf8",
    ).toString("base64");
    return `From: Pratsia <${sender}>\r
To: ${recipient}\r
Subject: =?UTF-8?B?${encodedSubject}?=\r
Date: ${new Date().toUTCString()}\r
Message-ID: <${randomUUID()}@${sender.split("@")[1]}>\r
MIME-Version: 1.0\r
Content-Type: text/plain; charset=UTF-8\r
Content-Transfer-Encoding: 8bit\r
\r
${translate("auth.recovery.emailBody", {
  resetUrl: passwordResetUrl,
})}`;
  })(recipientEmail, resetUrl, mailConfiguration.from);
  await new Promise((resolve, reject) => {
    const mailProcess = (0, processSpawner.spawn)(
      mailConfiguration.path,
      ["-i", "-t", "-f", mailConfiguration.from],
      {
        stdio: ["pipe", "ignore", "pipe"],
        shell: false,
      },
    );
    let settled = false;
    const finish = (submissionError) => {
      {
        if (!settled) {
          settled = true;
          clearTimeout(timeoutId);
          if (submissionError) {
            reject(submissionError);
          } else {
            resolve();
          }
        }
      }
    };
    const timeoutId = setTimeout(() => {
      mailProcess.kill("SIGTERM");
      finish(Error("Mail submission timeout"));
    }, 1e4);
    mailProcess.on("error", () => finish(Error("Mail submission failed")));
    mailProcess.on("close", (exitCode) =>
      finish(0 === exitCode ? null : Error("Mail submission failed")),
    );
    mailProcess.stderr.on("data", () => {});
    mailProcess.stdin.on("error", () =>
      finish(Error("Mail submission failed")),
    );
    mailProcess.stdin.end(mailMessage);
  });
}
const recoveryRequestSchema = discriminatedUnionSchema("action", [
  objectSchema({
    action: literalSchema("request"),
    email: stringSchema().trim().toLowerCase().email().max(254),
  }),
  objectSchema({
    action: literalSchema("complete"),
    token: stringSchema().regex(/^[a-f0-9]{64}$/),
    password: stringSchema().min(12).max(128),
  }),
]);
async function postPasswordRecovery(request) {
  const startedAt = Date.now();
  const requestUrl = new URL(request.url);
  const allowedOrigin =
    process.env.PRATSIA_ORIGIN ||
    requestUrl.protocol +
      "//" +
      (request.headers.get("host") || requestUrl.host);
  const jsonNoStore = (body, status = 200) =>
    Response.json(body, {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    });
  if (request.headers.get("origin") !== allowedOrigin)
    return jsonNoStore(
      {
        error: translate("app.api.auth.recovery.route.nedozvolenyy_zapyt"),
      },
      403,
    );
  try {
    let validationResult;
    const requestBody = await request.text();
    if (requestBody.length > 2e3)
      return jsonNoStore(
        {
          error: translate("app.api.auth.recovery.route.zavelykyy_zapyt"),
        },
        413,
      );
    try {
      validationResult = recoveryRequestSchema.safeParse(
        JSON.parse(requestBody),
      );
    } catch {
      return jsonNoStore(
        {
          error: translate("app.api.auth.recovery.route.nekorektnyy_zapyt"),
        },
        400,
      );
    }
    if (!validationResult.success)
      return jsonNoStore(
        {
          error: translate(
            "app.api.auth.recovery.route.perevir_email_abo_novyy_parol_vid_12_do_128_symvoliv",
          ),
        },
        400,
      );
    if (!checkRateLimit("recovery-global", 100, 36e5))
      return jsonNoStore(
        {
          error: translate(
            "app.api.auth.recovery.route.zabahato_sprob_sprobuy_piznishe",
          ),
        },
        429,
      );
    if ("complete" === validationResult.data.action) {
      if (!checkRateLimit("recovery-complete", 30, 9e5))
        return jsonNoStore(
          {
            error: translate(
              "app.api.auth.recovery.route.zabahato_sprob_sprobuy_piznishe",
            ),
          },
          429,
        );
      return (await completePasswordReset(
        validationResult.data.token,
        validationResult.data.password,
      ))
        ? jsonNoStore({
            ok: true,
            message: translate(
              "app.api.auth.recovery.route.parol_zmineno_uviydy_z_novym_parolem",
            ),
          })
        : jsonNoStore(
            {
              error: translate(
                "app.api.auth.recovery.route.posylannya_vzhe_vykorystane_abo_termin_diyi_mynuv_zapytay_nove",
              ),
            },
            400,
          );
    }
    if (!(await isMailAvailable()))
      return jsonNoStore(
        {
          error: translate(
            "app.api.auth.recovery.route.vidnovlennya_poshtoyu_zaraz_nedostupne_sprobuy_piznishe",
          ),
        },
        503,
      );
    const email = validationResult.data.email;
    if (checkRateLimit("recovery:" + emailRateLimitKey(email), 3, 36e5)) {
      const resetToken = createPasswordReset(email);
      const resetPageUrl = new URL("/", allowedOrigin);
      resetPageUrl.protocol = "https:";
      if (resetToken)
        try {
          await sendPasswordResetEmail(
            email,
            resetPageUrl.toString() + "#reset=" + resetToken,
          );
        } catch {
          deletePasswordReset(resetToken);
          console.error("recovery_mail_submission_failed");
        }
    }
    const remainingDelayMs = 500 - (Date.now() - startedAt);
    if (remainingDelayMs > 0) {
      await new Promise((resolveDelay) =>
        setTimeout(resolveDelay, remainingDelayMs),
      );
    }
    return jsonNoStore({
      ok: true,
      message: translate(
        "app.api.auth.recovery.route.yakshcho_akaunt_iz_takoyu_poshtoyu_isnuye_my_nadislaly_posylannya_dlya_vidnovlennya_p",
      ),
    });
  } catch {
    console.error("recovery_request_failed");
    return jsonNoStore(
      {
        error: translate(
          "app.api.auth.recovery.route.ne_vdalosya_vykonaty_zapyt_sprobuy_piznishe",
        ),
      },
      500,
    );
  }
}
export { postPasswordRecovery as POST };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
