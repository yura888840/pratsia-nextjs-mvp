"use client";

import { translate } from "../../../i18n/index.js";
import { Trash2Icon, PlusIcon } from "../shared/icons.jsx";
function ResumeBuilder({ profile, setProfile }) {
  return (
    <div className={"resume-builder"}>
      <div className={"builder-heading"}>
        <div>
          <h3>{translate("app.platform.dosvid_roboty")}</h3>
          <p>
            {translate(
              "app.platform.doday_ostanni_mistsya_roboty_yakshcho_dosvidu_shche_nemaye_propusty",
            )}
          </p>
        </div>
      </div>
      {profile.workHistory.map((workEntry, index) => (
        <fieldset className={"builder-entry"} key={index}>
          <legend>
            {translate("app.platform.mistse_roboty")}
            {index + 1}
          </legend>
          <button
            type={"button"}
            className={"builder-remove"}
            aria-label={
              translate("app.platform.prybraty_mistse_roboty") + (index + 1)
            }
            onClick={() =>
              setProfile({
                ...profile,
                workHistory: profile.workHistory.filter(
                  (workEntry3, index7) => index7 !== index,
                ),
              })
            }
          >
            <Trash2Icon size={15} />
            {translate("app.platform.prybraty")}
          </button>
          <label className={"field"}>
            {translate("app.platform.posada")}
            <input
              required={true}
              minLength={2}
              maxLength={120}
              value={workEntry.position}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry4, index8) =>
                    index8 === index
                      ? {
                          ...workEntry4,
                          position: event.target.value,
                        }
                      : workEntry4,
                  ),
                })
              }
            />
          </label>
          <label className={"field"}>
            {translate("app.platform.kompaniya")}
            <input
              required={true}
              minLength={2}
              maxLength={100}
              value={workEntry.company}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry5, index9) =>
                    index9 === index
                      ? {
                          ...workEntry5,
                          company: event.target.value,
                        }
                      : workEntry5,
                  ),
                })
              }
            />
          </label>
          <div className={"form-grid"}>
            <label className={"field"}>
              {translate("app.platform.pochatok")}
              <input
                required={true}
                type={"month"}
                value={workEntry.start}
                onChange={(event) =>
                  setProfile({
                    ...profile,
                    workHistory: profile.workHistory.map(
                      (workEntry6, index10) =>
                        index10 === index
                          ? {
                              ...workEntry6,
                              start: event.target.value,
                            }
                          : workEntry6,
                    ),
                  })
                }
              />
            </label>
            <label className={"field"}>
              {translate("app.platform.zavershennya")}
              <input
                required={!workEntry.current}
                disabled={workEntry.current}
                type={"month"}
                min={workEntry.start}
                value={workEntry.end}
                onChange={(event) =>
                  setProfile({
                    ...profile,
                    workHistory: profile.workHistory.map(
                      (workEntry7, index11) =>
                        index11 === index
                          ? {
                              ...workEntry7,
                              end: event.target.value,
                            }
                          : workEntry7,
                    ),
                  })
                }
              />
            </label>
          </div>
          <label className={"check-label"}>
            <input
              type={"checkbox"}
              checked={workEntry.current}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry8, index12) =>
                    index12 === index
                      ? {
                          ...workEntry8,
                          current: event.target.checked,
                          end: event.target.checked ? "" : workEntry8.end,
                        }
                      : workEntry8,
                  ),
                })
              }
            />
            {translate("app.platform.pratsyuyu_tut_zaraz")}
          </label>
          <label className={"field"}>
            {translate("app.platform.zavdannya_ta_rezultaty")}
            <small>{translate("app.platform.za_bazhannyam")}</small>
            <textarea
              maxLength={2e3}
              rows={2}
              value={workEntry.description}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  workHistory: profile.workHistory.map((workEntry9, index13) =>
                    index13 === index
                      ? {
                          ...workEntry9,
                          description: event.target.value,
                        }
                      : workEntry9,
                  ),
                })
              }
            />
          </label>
        </fieldset>
      ))}
      <button
        type={"button"}
        className={"outline small"}
        disabled={profile.workHistory.length >= 10}
        onClick={() =>
          setProfile({
            ...profile,
            workHistory: [
              ...profile.workHistory,
              {
                company: "",
                position: "",
                start: "",
                end: "",
                current: false,
                description: "",
              },
            ],
          })
        }
      >
        <PlusIcon size={15} />
        {translate("app.platform.dodaty_mistse_roboty")}
      </button>
      <div className={"builder-heading"}>
        <div>
          <h3>{translate("app.platform.osvita_ta_navchannya")}</h3>
          <p>{translate("app.platform.zaklad_spetsialnist_abo_kurs")}</p>
        </div>
      </div>
      {profile.education.map((educationEntry, index) => (
        <fieldset className={"builder-entry"} key={index}>
          <legend>
            {translate("app.platform.osvita")}
            {index + 1}
          </legend>
          <button
            type={"button"}
            className={"builder-remove"}
            aria-label={translate("app.platform.prybraty_osvitu") + (index + 1)}
            onClick={() =>
              setProfile({
                ...profile,
                education: profile.education.filter(
                  (educationEntry3, index15) => index15 !== index,
                ),
              })
            }
          >
            <Trash2Icon size={15} />
            {translate("app.platform.prybraty")}
          </button>
          <label className={"field"}>
            {translate("app.platform.zaklad_abo_orhanizator_kursu")}
            <input
              required={true}
              minLength={2}
              maxLength={150}
              value={educationEntry.institution}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  education: profile.education.map(
                    (educationEntry4, index16) =>
                      index16 === index
                        ? {
                            ...educationEntry4,
                            institution: event.target.value,
                          }
                        : educationEntry4,
                  ),
                })
              }
            />
          </label>
          <label className={"field"}>
            {translate("app.platform.spetsialnist_abo_nazva_kursu")}
            <input
              required={true}
              minLength={2}
              maxLength={150}
              value={educationEntry.qualification}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  education: profile.education.map(
                    (educationEntry5, index17) =>
                      index17 === index
                        ? {
                            ...educationEntry5,
                            qualification: event.target.value,
                          }
                        : educationEntry5,
                  ),
                })
              }
            />
          </label>
          <label className={"field"}>
            {translate(
              "app.platform.rik_zavershennya_abo_ochikuvanoho_zavershennya",
            )}
            <input
              required={true}
              type={"number"}
              min={1940}
              max={2100}
              value={educationEntry.year || ""}
              onChange={(event) =>
                setProfile({
                  ...profile,
                  education: profile.education.map(
                    (educationEntry6, index18) =>
                      index18 === index
                        ? {
                            ...educationEntry6,
                            year: Number(event.target.value),
                          }
                        : educationEntry6,
                  ),
                })
              }
            />
          </label>
        </fieldset>
      ))}
      <button
        type={"button"}
        className={"outline small"}
        disabled={profile.education.length >= 10}
        onClick={() =>
          setProfile({
            ...profile,
            education: [
              ...profile.education,
              {
                institution: "",
                qualification: "",
                year: new Date().getFullYear(),
              },
            ],
          })
        }
      >
        <PlusIcon size={15} />
        {translate("app.platform.dodaty_osvitu")}
      </button>
    </div>
  );
}
export { ResumeBuilder };
