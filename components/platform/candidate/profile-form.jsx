"use client";

import * as jsxRuntime from "react/jsx-runtime";
import { translate, catalogLabel, catalogValue } from "../../../i18n/index.js";
import {
  ShieldCheckIcon,
  ArrowLeftIcon,
  LoaderCircleIcon,
  ArrowRightIcon,
} from "../shared/icons.jsx";
import { occupations } from "../catalog/occupations.js";
import { experienceLevels, schedules } from "../catalog/job-options.js";
import { ResumeBuilder } from "./resume-builder.jsx";
function ProfileForm({
  formError,
  formStep,
  isFormConfirmed,
  isSaving,
  profileForm,
  setFormConfirmed,
  setFormError,
  setFormStep,
  setOccupationPickerTarget,
  setProfileForm,
  submitProfile,
}) {
  let selectedOccupationName;
  return (
    <form onSubmit={submitProfile}>
      <div className={"form-body"}>
        {0 === formStep && (
          <jsxRuntime.Fragment>
            <p className={"form-intro"}>
              {translate(
                "app.platform.yak_tebe_zvaty_ta_de_ty_shukayesh_robotu",
              )}
            </p>
            <label className={"field"}>
              {translate("app.platform.im_ya_ta_prizvyshche")}
              <input
                required={true}
                minLength={2}
                maxLength={100}
                value={profileForm.name}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    name: event.target.value,
                  })
                }
                autoComplete={"name"}
                placeholder={translate("app.platform.olena_koval")}
              />
            </label>
            <div className={"form-grid"}>
              <label className={"field"}>
                {translate("app.platform.telefon")}
                <input
                  required={true}
                  type={"tel"}
                  minLength={7}
                  maxLength={30}
                  pattern={"[+0-9 ()\\-]+"}
                  value={profileForm.phone}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      phone: event.target.value,
                    })
                  }
                  autoComplete={"tel"}
                  placeholder={"+380"}
                />
              </label>
              <label className={"field"}>
                {translate("app.platform.misto_abo_dystantsiyno")}
                <input
                  required={true}
                  list={"cities"}
                  minLength={2}
                  maxLength={100}
                  value={profileForm.city}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      city: event.target.value,
                    })
                  }
                  placeholder={translate("app.platform.obery_abo_vvedy_svoye")}
                />
              </label>
            </div>
            <div className={"inline-note"}>
              <ShieldCheckIcon size={17} />
              {translate(
                "app.platform.anketa_ne_publikuyetsya_u_vidkrytiy_bazi_robotodavets_otrymuye_yiyi_pislya_tvoho_vidh",
              )}
            </div>
          </jsxRuntime.Fragment>
        )}
        {1 === formStep && (
          <jsxRuntime.Fragment>
            <p className={"form-intro"}>
              {translate(
                "app.platform.obery_profesiyu_pidkazhemo_shcho_vazhlyvo_vkazaty",
              )}
            </p>
            <label className={"field"}>
              {translate("app.platform.kym_khochesh_pratsyuvaty")}
              <input
                required={true}
                list={"occupation-search"}
                minLength={2}
                maxLength={100}
                value={profileForm.occupation}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    occupation: event.target.value,
                    specialties: {},
                  })
                }
                placeholder={translate("app.platform.pochny_vvodyty_profesiyu")}
              />
              <button
                type={"button"}
                className={"occupation-field-button"}
                onClick={() => setOccupationPickerTarget("profile")}
              >
                {translate("app.platform.obraty_z_katalohu")}
                {occupations.length}
                {translate("app.platform.profesiyi")}
              </button>
            </label>
            <div className={"form-grid"}>
              <label className={"field"}>
                {translate("app.platform.dosvid")}
                <select
                  value={catalogLabel(profileForm.experience)}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      experience: event.target.value,
                    })
                  }
                >
                  {experienceLevels.map((experienceLevel) => (
                    <option key={experienceLevel} value={experienceLevel}>
                      {catalogLabel(experienceLevel)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={"field"}>
                {translate("app.platform.bazhana_zarplata_misyats")}
                <input
                  type={"number"}
                  min={0}
                  max={1e7}
                  value={profileForm.salary || ""}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      salary: Number(event.target.value),
                    })
                  }
                  placeholder={translate("salary.negotiable")}
                />
              </label>
            </div>
            <label className={"field"}>
              {translate("app.platform.zaynyatist")}
              <select
                value={catalogLabel(profileForm.schedule)}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    schedule: event.target.value,
                  })
                }
              >
                {schedules.map((schedule) => (
                  <option key={schedule} value={schedule}>
                    {catalogLabel(schedule)}
                  </option>
                ))}
              </select>
            </label>
          </jsxRuntime.Fragment>
        )}
        {2 === formStep && (
          <jsxRuntime.Fragment>
            <label className={"field"}>
              {translate("app.platform.tvoyi_navychky")}
              <textarea
                required={true}
                minLength={2}
                maxLength={2e3}
                rows={3}
                value={profileForm.skills}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    skills: event.target.value,
                  })
                }
                placeholder={translate(
                  "app.platform.shcho_ty_vmiyesh_i_z_yakymy_instrumentamy_pratsyuyesh",
                )}
              />
            </label>
            {((selectedOccupationName = profileForm.occupation),
            /водій/i.test(selectedOccupationName)
              ? [
                  catalogValue("app.platform.katehoriyi_posvidchennya"),
                  catalogValue("app.platform.vlasnyy_avtomobil"),
                ]
              : /адвокат/i.test(selectedOccupationName)
                ? [
                    catalogValue("app.platform.nomer_svidotstva_za_bazhannyam"),
                    catalogValue("app.platform.praktyky"),
                  ]
                : /юрист/i.test(selectedOccupationName)
                  ? [
                      catalogValue("app.platform.haluzi_prava"),
                      catalogValue("app.platform.dosvid_predstavnytstva"),
                    ]
                  : /йог|тренер/i.test(selectedOccupationName)
                    ? [
                        catalogValue("app.platform.napryamy_zanyat"),
                        catalogValue("app.platform.sertyfikatsiya"),
                      ]
                    : /бухгалтер/i.test(selectedOccupationName)
                      ? [
                          catalogValue("app.platform.oblikovi_prohramy"),
                          catalogValue("app.platform.dilyanky_obliku"),
                        ]
                      : /SMM|маркет/i.test(selectedOccupationName)
                        ? [
                            catalogValue(
                              "app.platform.sotsialni_merezhi_instrumenty",
                            ),
                            catalogValue(
                              "app.platform.posylannya_na_portfolio",
                            ),
                          ]
                        : [
                            catalogValue(
                              "app.platform.klyuchovi_instrumenty_navychky",
                            ),
                            catalogValue(
                              "app.platform.posylannya_na_portfolio_za_bazhannyam",
                            ),
                          ]).map((specialtyName) => (
              <label className={"field"} key={specialtyName}>
                {catalogLabel(specialtyName)}
                <input
                  maxLength={1e3}
                  value={profileForm.specialties[specialtyName] || ""}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      specialties: {
                        ...profileForm.specialties,
                        [specialtyName]: event.target.value,
                      },
                    })
                  }
                />
              </label>
            ))}
            <ResumeBuilder profile={profileForm} setProfile={setProfileForm} />
            <label className={"field"}>
              {translate("app.platform.pro_sebe")}
              <small>{translate("app.platform.za_bazhannyam")}</small>
              <textarea
                maxLength={5e3}
                rows={3}
                value={profileForm.about}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    about: event.target.value,
                  })
                }
                placeholder={translate(
                  "app.platform.poperednya_robota_navchannya_dosyahnennya",
                )}
              />
            </label>
            <label className={"check-label consent"}>
              <input
                type={"checkbox"}
                checked={isFormConfirmed}
                onChange={(event) => setFormConfirmed(event.target.checked)}
                required={true}
              />
              {translate(
                "app.platform.pohodzhuyus_na_zberezhennya_ankety_ta_yiyi_peredavannya_robotodavtsyam_yakym_samostiy",
              )}
            </label>
          </jsxRuntime.Fragment>
        )}
        {formError && (
          <p className={"form-error"} role={"alert"}>
            {formError}
          </p>
        )}
      </div>
      <div className={"form-footer"}>
        {formStep > 0 ? (
          <button
            className={"outline"}
            type={"button"}
            onClick={() => {
              setFormStep(formStep - 1);
              setFormError("");
            }}
          >
            <ArrowLeftIcon size={16} />
            {translate("app.platform.nazad")}
          </button>
        ) : (
          <span className={"muted"}>
            {translate("app.platform.krok")}
            {formStep + 1}
            {translate("app.platform.iz_3")}
          </span>
        )}
        <button className={"primary"} disabled={isSaving}>
          {isSaving ? (
            <LoaderCircleIcon size={17} className={"spin"} />
          ) : 2 === formStep ? (
            translate("app.platform.zberehty_rezyume")
          ) : (
            translate("app.platform.dali")
          )}
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </form>
  );
}
export { ProfileForm };
