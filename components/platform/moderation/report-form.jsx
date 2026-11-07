"use client";

import { translate } from "../../../i18n/index.js";
function ReportForm({
  formError,
  isSaving,
  reportReason,
  savePlatformAction,
  selectedJob,
  setActiveModal,
  setReportReason,
  setToastMessage,
}) {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        {
          if (
            await savePlatformAction({
              action: "report",
              jobId: selectedJob?.id,
              reason: reportReason,
            })
          ) {
            setActiveModal(null);
            setReportReason("");
            setToastMessage(
              translate("app.platform.povidomlennya_zberezheno_dlya_rozhlyadu"),
            );
          }
        }
      }}
    >
      <div className={"form-body"}>
        <p>
          {translate("app.platform.opyshy_shcho_same_ne_tak_iz_vakansiyeyu")}
          {selectedJob?.title}
          {"\xbb."}
        </p>
        <label className={"field"}>
          {translate("app.platform.opys_problemy")}
          <textarea
            required={true}
            minLength={5}
            maxLength={2e3}
            rows={5}
            value={reportReason}
            onChange={(event) => setReportReason(event.target.value)}
          />
        </label>
        {formError && <p className={"form-error"}>{formError}</p>}
      </div>
      <div className={"form-footer"}>
        <span />
        <button className={"primary"} disabled={isSaving}>
          {translate("app.platform.nadislaty_povidomlennya")}
        </button>
      </div>
    </form>
  );
}
export { ReportForm };
