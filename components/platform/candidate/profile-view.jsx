"use client";

import { translate, catalogLabel } from "../../../i18n/index.js";
import * as jsxRuntime from "react/jsx-runtime";
import {
  WalletIcon,
  BriefcaseBusinessIcon,
  ClockIcon,
  DownloadIcon,
  ArrowRightIcon,
  FileTextIcon,
  PlusIcon,
} from "../shared/icons.jsx";
import { formatSalary } from "../jobs/salary.jsx";
import { ResumeHistory } from "./resume-history.jsx";
function CandidateProfileView({
  navigateToView,
  openModal,
  platformState,
  profileForm,
}) {
  return (
    <section className={"dashboard"}>
      <div className={"page-heading"}>
        <span className={"eyebrow"}>
          {translate("app.platform.pro_tebe_po_suti")}
        </span>
        <h1>{translate("app.platform.moye_rezyume")}</h1>
        <p>
          {translate(
            "app.platform.odna_anketa_dlya_vsikh_vidhukiv_kontakty_bachyt_robotodavets_yakomu_ty_vidhukneshsya",
          )}
        </p>
      </div>
      {platformState.profile ? (
        <jsxRuntime.Fragment>
          <div className={"profile-card printable"}>
            <div className={"profile-title"}>
              <div className={"profile-avatar"}>
                {profileForm.name.slice(0, 1)}
              </div>
              <div>
                <h2>{profileForm.name}</h2>
                <p>
                  {profileForm.occupation}
                  {" \xb7 "}
                  {profileForm.city}
                </p>
              </div>
              <button
                className={"outline no-print"}
                onClick={() => openModal("profile")}
              >
                {translate("app.platform.redahuvaty")}
              </button>
            </div>
            <div className={"profile-facts"}>
              <span>
                <WalletIcon size={18} />
                {profileForm.salary
                  ? formatSalary(profileForm.salary) +
                    translate("app.platform.text")
                  : translate("salary.byAgreement")}
              </span>
              <span>
                {(0, jsxRuntime.jsx)(BriefcaseBusinessIcon, {
                  size: 18,
                })}
                {catalogLabel(profileForm.experience)}
              </span>
              <span>
                <ClockIcon size={18} />
                {catalogLabel(profileForm.schedule)}
              </span>
            </div>
            <h3>{translate("app.platform.navychky")}</h3>
            <p className={"preline"}>{profileForm.skills}</p>
            <ResumeHistory
              workHistory={profileForm.workHistory}
              education={profileForm.education}
            />
            {profileForm.about && (
              <jsxRuntime.Fragment>
                <h3>{translate("app.platform.pro_sebe_ta_dosvid")}</h3>
                <p className={"preline"}>{profileForm.about}</p>
              </jsxRuntime.Fragment>
            )}
            {Object.entries(profileForm.specialties)
              .filter(([, specialtyName]) => specialtyName)
              .map(([specialtyName, specialtyValue]) => (
                <div key={specialtyName}>
                  <h3>{specialtyName}</h3>
                  <p>{specialtyValue}</p>
                </div>
              ))}
            <h3>{translate("app.platform.kontakty")}</h3>
            <p>
              {profileForm.phone}
              {" \xb7 "}
              {platformState.user?.email}
            </p>
          </div>
          <div className={"button-row"}>
            <button
              className={"primary"}
              onClick={function () {
                window.print();
              }}
            >
              <DownloadIcon size={17} />
              {translate("app.platform.druk_zberehty_pdf")}
            </button>
            <button
              className={"outline"}
              onClick={() => navigateToView("search")}
            >
              {translate("app.platform.do_vakansiy")}
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </jsxRuntime.Fragment>
      ) : (
        <div className={"empty-state"}>
          {(0, jsxRuntime.jsx)(FileTextIcon, {
            size: 36,
          })}
          <h3>{translate("app.platform.rozkazhy_pro_sebe_u_trokh_krokakh")}</h3>
          <p>
            {translate(
              "app.platform.kontakty_profesiya_ta_navychky_anketu_mozhna_redahuvaty_bud_koly",
            )}
          </p>
          <button className={"primary"} onClick={() => openModal("profile")}>
            {translate("app.platform.stvoryty_rezyume_2")}
            <PlusIcon size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
export { CandidateProfileView };
