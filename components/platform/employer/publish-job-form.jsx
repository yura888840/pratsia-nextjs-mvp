"use client";

import * as jsxRuntime from "react/jsx-runtime";
import { translate, catalogLabel } from "../../../i18n/index.js";
import { occupations } from "../catalog/occupations.js";
import {
  jobCategories,
  schedules,
  experienceLevels,
} from "../catalog/job-options.js";
import { Salary } from "../jobs/salary.jsx";
import {
  ArrowLeftIcon,
  LoaderCircleIcon,
  ArrowRightIcon,
} from "../shared/icons.jsx";
function PublishJobForm({
  editingJobId,
  formError,
  formStep,
  isFormConfirmed,
  isSaving,
  jobForm,
  setFormConfirmed,
  setFormError,
  setFormStep,
  setJobForm,
  setOccupationPickerTarget,
  submitJob,
}) {
  return (
    <form onSubmit={submitJob}>
      <div className={"form-body"}>
        {0 === formStep && (
          <jsxRuntime.Fragment>
            <p className={"form-intro"}>
              {translate(
                "app.platform.rozmishchennya_bezkoshtovne_vakansiya_aktyvna_30_dniv",
              )}
            </p>
            <label className={"field"}>
              {translate("company.name")}
              <input
                required={true}
                minLength={2}
                maxLength={100}
                value={jobForm.company}
                onChange={(event) =>
                  setJobForm({
                    ...jobForm,
                    company: event.target.value,
                  })
                }
                placeholder={translate("app.platform.kompaniya_abo_fop")}
              />
            </label>
            <label className={"field"}>
              {translate("app.platform.profesiya")}
              <input
                required={true}
                list={"occupation-search"}
                minLength={2}
                maxLength={100}
                value={jobForm.occupation}
                onChange={(event) => {
                  const matchedOccupation = occupations.find(
                    (occupation) => occupation.name === event.target.value,
                  );
                  setJobForm({
                    ...jobForm,
                    occupation: event.target.value,
                    title:
                      jobForm.title && jobForm.title !== jobForm.occupation
                        ? jobForm.title
                        : event.target.value,
                    category: matchedOccupation?.category || jobForm.category,
                  });
                }}
                placeholder={translate(
                  "app.platform.obery_zi_spysku_abo_vvedy_svoyu",
                )}
              />
              <button
                type={"button"}
                className={"occupation-field-button"}
                onClick={() => setOccupationPickerTarget("job")}
              >
                {translate("app.platform.obraty_z_katalohu")}
                {occupations.length}
                {translate("app.platform.profesiyi")}
              </button>
            </label>
            <label className={"field"}>
              {translate("app.platform.nazva_vakansiyi")}
              <input
                required={true}
                minLength={3}
                maxLength={120}
                value={jobForm.title}
                onChange={(event) =>
                  setJobForm({
                    ...jobForm,
                    title: event.target.value,
                  })
                }
                placeholder={translate(
                  "app.platform.napryklad_yuryst_iz_dohovirnoyi_roboty",
                )}
              />
            </label>
            <label className={"field"}>
              {translate("app.platform.sfera")}
              <select
                value={jobForm.category}
                onChange={(event) =>
                  setJobForm({
                    ...jobForm,
                    category: event.target.value,
                  })
                }
              >
                {jobCategories
                  .filter((category) => "all" !== category.id)
                  .map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </label>
          </jsxRuntime.Fragment>
        )}
        {1 === formStep && (
          <jsxRuntime.Fragment>
            <div className={"form-grid"}>
              <label className={"field"}>
                {translate("fields.city")}
                <input
                  required={true}
                  minLength={2}
                  maxLength={100}
                  list={"cities"}
                  value={jobForm.city}
                  onChange={(event) =>
                    setJobForm({
                      ...jobForm,
                      city: event.target.value,
                    })
                  }
                  placeholder={translate("app.platform.obery_abo_vvedy_svoye")}
                />
              </label>
              <label className={"field"}>
                {translate("app.platform.format_roboty")}
                <select
                  value={jobForm.arrangement}
                  onChange={(event) =>
                    setJobForm({
                      ...jobForm,
                      arrangement: event.target.value,
                    })
                  }
                >
                  {[
                    translate("catalog.onsite"),
                    translate("catalog.hybrid"),
                    translate("catalog.remote"),
                  ].map((arrangement) => (
                    <option key={arrangement} value={arrangement}>
                      {catalogLabel(arrangement)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={"form-grid"}>
              <label className={"field"}>
                {translate("app.platform.zarplata_vid_misyats")}
                <input
                  required={true}
                  type={"number"}
                  min={0}
                  max={1e7}
                  value={jobForm.salaryMin}
                  onChange={(event) =>
                    setJobForm({
                      ...jobForm,
                      salaryMin: Number(event.target.value),
                    })
                  }
                />
              </label>
              <label className={"field"}>
                {translate("app.platform.zarplata_do_misyats")}
                <input
                  required={true}
                  type={"number"}
                  min={jobForm.salaryMin}
                  max={1e7}
                  value={jobForm.salaryMax}
                  onChange={(event) =>
                    setJobForm({
                      ...jobForm,
                      salaryMax: Number(event.target.value),
                    })
                  }
                />
              </label>
            </div>
            <small className={"muted"}>
              {translate(
                "app.platform.vkazhy_0_v_obokh_polyakh_yakshcho_zarplata_za_domovlenistyu_u_zavdannyakh_utochny_sta",
              )}
            </small>
            <div className={"form-grid"}>
              <label className={"field"}>
                {translate("app.platform.zaynyatist")}
                <select
                  value={jobForm.schedule}
                  onChange={(event) =>
                    setJobForm({
                      ...jobForm,
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
              <label className={"field"}>
                {translate("app.platform.neobkhidnyy_dosvid")}
                <select
                  value={jobForm.experience}
                  onChange={(event) =>
                    setJobForm({
                      ...jobForm,
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
            </div>
          </jsxRuntime.Fragment>
        )}
        {2 === formStep && (
          <jsxRuntime.Fragment>
            <label className={"field"}>
              {translate("app.platform.pro_robotu_ta_zavdannya")}
              <textarea
                required={true}
                minLength={40}
                maxLength={1e4}
                rows={4}
                value={jobForm.description}
                onChange={(event) =>
                  setJobForm({
                    ...jobForm,
                    description: event.target.value,
                  })
                }
                placeholder={translate(
                  "app.platform.chym_zaymatymetsya_lyudyna_de_pratsyuvatyme_ta_yaki_umovy_oplaty_vid_40_symvoliv",
                )}
              />
            </label>
            <label className={"field"}>
              {translate("app.platform.vymohy_do_kandydata")}
              <textarea
                required={true}
                minLength={10}
                maxLength={5e3}
                rows={3}
                value={jobForm.requirements}
                onChange={(event) =>
                  setJobForm({
                    ...jobForm,
                    requirements: event.target.value,
                  })
                }
                placeholder={translate(
                  "app.platform.potribni_navychky_ta_dosvid",
                )}
              />
            </label>
            <label className={"field"}>
              {translate("app.platform.dodatkovi_perevahy")}
              <textarea
                rows={2}
                maxLength={3e3}
                value={jobForm.benefits}
                onChange={(event) =>
                  setJobForm({
                    ...jobForm,
                    benefits: event.target.value,
                  })
                }
                placeholder={translate(
                  "app.platform.navchannya_obladnannya_hnuchkyy_hrafik",
                )}
              />
            </label>
          </jsxRuntime.Fragment>
        )}
        {3 === formStep && (
          <jsxRuntime.Fragment>
            <p className={"form-intro"}>
              {translate(
                "app.platform.os_yak_kandydaty_pobachat_tvoyu_vakansiyu_perevir_umovy_pered_publikatsiyeyu",
              )}
            </p>
            <article className={"vacancy-review"}>
              <small>{jobForm.company}</small>
              <h3>{jobForm.title}</h3>
              <div className={"job-salary"}>
                <Salary job={jobForm} />
              </div>
              <div className={"job-tags"}>
                <span>{jobForm.city}</span>
                <span>{jobForm.arrangement}</span>
                <span>{jobForm.schedule}</span>
                <span>{jobForm.experience}</span>
              </div>
              <h4>{translate("jobs.about")}</h4>
              <p className={"preline"}>{jobForm.description}</p>
              <h4>{translate("jobs.requirements")}</h4>
              <p className={"preline"}>{jobForm.requirements}</p>
              {jobForm.benefits && (
                <jsxRuntime.Fragment>
                  <h4>{translate("app.platform.perevahy")}</h4>
                  <p className={"preline"}>{jobForm.benefits}</p>
                </jsxRuntime.Fragment>
              )}
            </article>
            <label className={"check-label consent"}>
              <input
                required={true}
                type={"checkbox"}
                checked={isFormConfirmed}
                onChange={(event) => setFormConfirmed(event.target.checked)}
              />
              {translate(
                "app.platform.ya_mayu_pravo_rozmishchuvaty_tsyu_vakansiyu_pidtverdzhuyu_yiyi_aktualnist_i_hotovyy_o",
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
            type={"button"}
            className={"outline"}
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
            {translate("app.platform.krok_1_iz_4")}
          </span>
        )}
        <button className={"primary"} disabled={isSaving}>
          {isSaving ? (
            <LoaderCircleIcon size={17} className={"spin"} />
          ) : 3 === formStep ? (
            editingJobId ? (
              translate("app.platform.zberehty_zminy")
            ) : (
              translate("app.platform.nadislaty_na_perevirku")
            )
          ) : 2 === formStep ? (
            translate("app.platform.perehlyanuty_vakansiyu")
          ) : (
            translate("app.platform.dali")
          )}
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </form>
  );
}
export { PublishJobForm };
