"use client";

import { useState, useMemo } from "react";
import { normalizeSearch } from "../jobs/search.js";
import { occupations, occupationSections } from "./occupations.js";
import { occupationAliases } from "./occupation-aliases.js";
import { translate } from "../../../i18n/index.js";
import { XIcon, SearchIcon, ArrowRightIcon } from "../shared/icons.jsx";
import * as jsxRuntime from "react/jsx-runtime";
function OccupationPicker({ onChoose, onClose }) {
  const [occupationQuery, setOccupationQuery] = useState("");
  const [occupationSection, setOccupationSection] = useState("all");
  const matchingOccupations = useMemo(
    () =>
      (function (query, section = "all") {
        const queryTerms = normalizeSearch(query).split(" ").filter(Boolean);
        return occupations
          .filter(
            (occupation) =>
              ("all" === section || occupation.section === section) &&
              queryTerms.every((queryTerm) =>
                normalizeSearch(
                  [
                    occupation.name,
                    ...(occupationAliases[occupation.name] || []),
                  ].join(" "),
                ).includes(queryTerm),
              ),
          )
          .sort((leftOccupation, rightOccupation) => {
            const normalizedQuery = normalizeSearch(query);
            return (
              Number(
                normalizeSearch(rightOccupation.name) === normalizedQuery,
              ) -
                Number(
                  normalizeSearch(leftOccupation.name) === normalizedQuery,
                ) ||
              Number(
                normalizeSearch(rightOccupation.name).startsWith(
                  normalizedQuery,
                ),
              ) -
                Number(
                  normalizeSearch(leftOccupation.name).startsWith(
                    normalizedQuery,
                  ),
                ) ||
              leftOccupation.name.localeCompare(rightOccupation.name, "uk")
            );
          });
      })(occupationQuery, occupationSection),
    [occupationQuery, occupationSection],
  );
  return (
    <div className={"overlay occupation-overlay"} onClick={onClose}>
      <section
        className={"occupation-picker"}
        role={"dialog"}
        aria-modal={"true"}
        aria-labelledby={"occupation-picker-title"}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={"occupation-heading"}>
          <div>
            <span className={"eyebrow"}>
              {translate("app.platform.znaydy_sviy_napryam")}
            </span>
            <h2 id={"occupation-picker-title"}>
              {translate("app.platform.usi_profesiyi")}
              <small>{occupations.length}</small>
            </h2>
            <p>
              {translate(
                "app.platform.vid_advokata_do_ahronoma_obery_profesiyu_abo_znaydy_yiyi_za_nazvoyu",
              )}
            </p>
          </div>
          <button
            type={"button"}
            className={"icon-btn"}
            aria-label={translate("app.platform.zakryty_kataloh_profesiy")}
            onClick={onClose}
          >
            <XIcon />
          </button>
        </header>
        <div className={"occupation-controls"}>
          <label className={"occupation-query"}>
            {(0, jsxRuntime.jsx)(SearchIcon, {
              size: 19,
            })}
            <input
              aria-label={translate("app.platform.poshuk_profesiyi_v_katalozi")}
              placeholder={translate(
                "app.platform.napryklad_advokat_trener_model_driver",
              )}
              value={occupationQuery}
              onChange={(event) => setOccupationQuery(event.target.value)}
            />
          </label>
          <label className={"occupation-section"}>
            {translate("app.platform.napryam")}
            <select
              value={occupationSection}
              aria-label={translate("app.platform.napryam_profesiy")}
              onChange={(event) => setOccupationSection(event.target.value)}
            >
              <option value={"all"}>
                {translate("app.platform.usi_napryamy")}
                {occupationSections.length}
                {")"}
              </option>
              {occupationSections.map((occupationSection3) => (
                <option
                  value={occupationSection3.id}
                  key={occupationSection3.id}
                >
                  {occupationSection3.name}
                  {" ("}
                  {occupationSection3.names.length}
                  {")"}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={"occupation-summary"} aria-live={"polite"}>
          {translate("app.platform.znaydeno_profesiy")}
          <b>{matchingOccupations.length}</b>
          {occupationQuery && (
            <button type={"button"} onClick={() => setOccupationQuery("")}>
              {translate("app.platform.ochystyty_poshuk")}
            </button>
          )}
        </div>
        <div className={"occupation-results"}>
          {occupationSections
            .filter(
              (section) =>
                "all" === occupationSection || occupationSection === section.id,
            )
            .map((section) => {
              const sectionOccupations = matchingOccupations.filter(
                (occupation) => occupation.section === section.id,
              );
              return sectionOccupations.length ? (
                <section className={"occupation-group"} key={section.id}>
                  <h3>
                    {section.name}
                    <small>{sectionOccupations.length}</small>
                  </h3>
                  <div>
                    {sectionOccupations.map((occupation) => (
                      <button
                        type={"button"}
                        onClick={() => onChoose(occupation)}
                        key={occupation.name}
                      >
                        <span>{occupation.name}</span>
                        <ArrowRightIcon size={15} />
                      </button>
                    ))}
                  </div>
                </section>
              ) : null;
            })}
          {!matchingOccupations.length && (
            <div className={"occupation-empty"}>
              <h3>{translate("app.platform.sprobuy_inshu_nazvu")}</h3>
              <p>
                {translate(
                  "app.platform.skoroty_zapyt_abo_zminy_napryam_u_vakansiyi_ta_rezyume_takozh_mozhna_vpysaty_vlasnu_s",
                )}
              </p>
              <button
                type={"button"}
                className={"outline"}
                onClick={() => {
                  setOccupationQuery("");
                  setOccupationSection("all");
                }}
              >
                {translate("app.platform.pokazaty_vsi_profesiyi")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
export { OccupationPicker };
