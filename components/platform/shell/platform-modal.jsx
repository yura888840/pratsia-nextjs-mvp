"use client";

import { translate } from "../../../i18n/index.js";
import { XIcon, CheckIcon } from "../shared/icons.jsx";
import { ProfileForm } from "../candidate/profile-form.jsx";
import { PublishJobForm } from "../employer/publish-job-form.jsx";
import { ApplicationForm } from "../applications/application-form.jsx";
import { ReportForm } from "../moderation/report-form.jsx";
import { AuthForm } from "../auth/auth-form.jsx";
import { AboutPlatform } from "./about.jsx";
function PlatformModal({
  activeModal,
  applicationMessage,
  editingJobId,
  formError,
  formStep,
  isFormConfirmed,
  isSaving,
  jobForm,
  loadPlatformState,
  passwordResetToken,
  pendingApplicationJob,
  platformState,
  profileForm,
  reportReason,
  savePlatformAction,
  selectedJob,
  setActiveModal,
  setApplicationMessage,
  setFormConfirmed,
  setFormError,
  setFormStep,
  setJobForm,
  setOccupationPickerTarget,
  setPasswordResetToken,
  setProfileForm,
  setReportReason,
  setToastMessage,
  submitJob,
  submitProfile,
}) {
  return (
    <div
      className={"overlay center"}
      onClick={() => !isSaving && setActiveModal(null)}
    >
      <section
        className={"modal"}
        role={"dialog"}
        aria-modal={"true"}
        aria-labelledby={"modal-title"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={"modal-header"}>
          <div>
            <span className={"eyebrow"}>
              {"profile" === activeModal
                ? translate("app.platform.tvoya_profesiyna_istoriya")
                : "publish" === activeModal
                  ? translate("app.platform.znaydy_svoyikh_lyudey")
                  : translate("app.platform.pratsya_2")}
            </span>
            <h2 id={"modal-title"}>
              {
                {
                  profile: pendingApplicationJob
                    ? translate("app.platform.rezyume_dlya_vidhuku")
                    : platformState.profile
                      ? translate("app.platform.redahuvaty_rezyume")
                      : translate("app.platform.stvoryty_rezyume_2"),
                  publish: editingJobId
                    ? translate("app.platform.redahuvaty_vakansiyu")
                    : translate("app.platform.nova_vakansiya"),
                  apply: translate("app.platform.vidhuk_na_vakansiyu"),
                  report: translate("app.platform.povidomyty_pro_problemu"),
                  auth: translate("app.platform.tviy_kabinet"),
                  about: translate(
                    "app.platform.robota_pochynayetsya_z_lyudey",
                  ),
                }[activeModal]
              }
            </h2>
          </div>
          <button
            className={"icon-btn"}
            aria-label={translate("app.platform.zakryty_vikno")}
            onClick={() => setActiveModal(null)}
            disabled={isSaving}
          >
            <XIcon />
          </button>
        </div>
        {("profile" === activeModal || "publish" === activeModal) && (
          <div className={"steps"}>
            {("profile" === activeModal
              ? [
                  translate("app.platform.kontakty"),
                  translate("app.platform.profesiya"),
                  translate("app.platform.dosvid"),
                ]
              : [
                  translate("app.platform.osnovne"),
                  translate("app.platform.umovy"),
                  translate("app.platform.zavdannya"),
                  translate("app.platform.perevirka"),
                ]
            ).map((stepLabel, stepIndex) => (
              <span
                className={stepIndex <= formStep ? "current" : ""}
                key={stepLabel}
              >
                <i>
                  {stepIndex < formStep ? (
                    <CheckIcon size={12} />
                  ) : (
                    stepIndex + 1
                  )}
                </i>
                {stepLabel}
              </span>
            ))}
          </div>
        )}
        {"profile" === activeModal && (
          <ProfileForm
            formError={formError}
            formStep={formStep}
            isFormConfirmed={isFormConfirmed}
            isSaving={isSaving}
            profileForm={profileForm}
            setFormConfirmed={setFormConfirmed}
            setFormError={setFormError}
            setFormStep={setFormStep}
            setOccupationPickerTarget={setOccupationPickerTarget}
            setProfileForm={setProfileForm}
            submitProfile={submitProfile}
          />
        )}
        {"publish" === activeModal && (
          <PublishJobForm
            editingJobId={editingJobId}
            formError={formError}
            formStep={formStep}
            isFormConfirmed={isFormConfirmed}
            isSaving={isSaving}
            jobForm={jobForm}
            setFormConfirmed={setFormConfirmed}
            setFormError={setFormError}
            setFormStep={setFormStep}
            setJobForm={setJobForm}
            setOccupationPickerTarget={setOccupationPickerTarget}
            submitJob={submitJob}
          />
        )}
        {"apply" === activeModal && (
          <ApplicationForm
            applicationMessage={applicationMessage}
            formError={formError}
            isFormConfirmed={isFormConfirmed}
            isSaving={isSaving}
            profileForm={profileForm}
            savePlatformAction={savePlatformAction}
            selectedJob={selectedJob}
            setActiveModal={setActiveModal}
            setApplicationMessage={setApplicationMessage}
            setFormConfirmed={setFormConfirmed}
            setToastMessage={setToastMessage}
          />
        )}
        {"report" === activeModal && (
          <ReportForm
            formError={formError}
            isSaving={isSaving}
            reportReason={reportReason}
            savePlatformAction={savePlatformAction}
            selectedJob={selectedJob}
            setActiveModal={setActiveModal}
            setReportReason={setReportReason}
            setToastMessage={setToastMessage}
          />
        )}
        {"auth" === activeModal && (
          <AuthForm
            onRecoveryComplete={() => setPasswordResetToken("")}
            resetToken={passwordResetToken || void 0}
            onSuccess={async () => {
              await loadPlatformState();
              setPasswordResetToken("");
              setActiveModal(null);
              setToastMessage(translate("app.platform.vkhid_vykonano"));
            }}
          />
        )}
        {"about" === activeModal && <AboutPlatform />}
      </section>
    </div>
  );
}
export { PlatformModal };
