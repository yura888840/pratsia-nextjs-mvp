"use client";

import { translate } from "../../../i18n/index.js";
import { ArrowRightIcon } from "../shared/icons.jsx";
function ApplicationForm({
  applicationMessage,
  formError,
  isFormConfirmed,
  isSaving,
  profileForm,
  savePlatformAction,
  selectedJob,
  setActiveModal,
  setApplicationMessage,
  setFormConfirmed,
  setToastMessage,
}) {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        {
          if (
            isFormConfirmed &&
            (await savePlatformAction({
              action: "apply",
              jobId: selectedJob?.id,
              message: applicationMessage,
            }))
          ) {
            setActiveModal(null);
            setToastMessage(
              translate(
                "app.platform.vidhuk_dostavleno_do_kabinetu_robotodavtsya",
              ),
            );
          }
        }
      }}
    >
      <div className={"form-body"}>
        <h3>{selectedJob?.title}</h3>
        <p className={"muted"}>{selectedJob?.company}</p>
        <div className={"inline-note"}>
          {translate("app.platform.bude_nadislano_tvoyu_zberezhenu_anketu")}
          {profileForm.name}
          {", "}
          {profileForm.phone}
          {"."}
        </div>
        <label className={"field"}>
          {translate("app.platform.kilka_sliv_robotodavtsyu")}
          <small>{translate("app.platform.za_bazhannyam")}</small>
          <textarea
            maxLength={2e3}
            rows={4}
            value={applicationMessage}
            onChange={(event) => setApplicationMessage(event.target.value)}
            placeholder={translate(
              "app.platform.chomu_tebe_zatsikavyla_tsya_robota",
            )}
          />
        </label>
        <label className={"check-label consent"}>
          <input
            type={"checkbox"}
            required={true}
            checked={isFormConfirmed}
            onChange={(event) => setFormConfirmed(event.target.checked)}
          />
          {translate(
            "app.platform.peredaty_anketu_ta_kontakty_robotodavtsyu_tsiyeyi_vakansiyi",
          )}
        </label>
        {formError && <p className={"form-error"}>{formError}</p>}
      </div>
      <div className={"form-footer"}>
        <span className={"muted"}>
          {translate("app.platform.anketa_zberezhetsya_u_vidhuku")}
        </span>
        <button className={"primary"} disabled={isSaving}>
          {translate("app.platform.nadislaty_vidhuk")}
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </form>
  );
}
export { ApplicationForm };
