"use client";

import { translate, catalogValue } from "../../../i18n/index.js";
import {
  ArrowUpRightIcon,
  SearchIcon,
  MapPinIcon,
  ArrowRightIcon,
  LayoutGridIcon,
} from "../shared/icons.jsx";
import * as jsxRuntime from "react/jsx-runtime";
import { occupations } from "../catalog/occupations.js";
function SearchHero({
  cityInput,
  navigateToView,
  queryInput,
  setCityInput,
  setFilters,
  setOccupationPickerTarget,
  setQueryInput,
  updateFilter,
}) {
  return (
    <section className={"hero"}>
      <div className={"hero-content"}>
        <div className={"eyebrow"}>
          <span />
          {translate("app.platform.platforma_dlya_tykh_khto_rukhayetsya_dali")}
        </div>
        <h1>
          {translate("app.platform.tvoya_robota")}
          <br />
          <span>{translate("app.platform.tvoyi_pravyla")}</span>
          <i className={"hero-fullstop"}>{"*"}</i>
        </h1>
        <p>
          {translate(
            "app.platform.poruch_iz_domom_v_inshomu_misti_abo_tam_de_tviy_noutbuk_obyray_yak_pratsyuvaty_dali",
          )}
        </p>
      </div>
      <div className={"hero-art"} aria-hidden={"true"}>
        <span className={"board-label"}>
          {translate("app.platform.ya_khochu_pratsyuvaty")}
        </span>
        <div className={"profession-board"}>
          <span>{translate("app.platform.z_lyudmy")}</span>
          <span className={"board-active"}>
            {translate("app.platform.z_ideyamy")}
            <ArrowUpRightIcon size={45} />
          </span>
          <span>{translate("app.platform.svoyimy_rukamy")}</span>
        </div>
        <div className={"board-bottom"}>
          <span className={"ua-flag"} />
          <b>{translate("app.platform.ukrayina_usya")}</b>
          <span className={"board-cross"}>{"✳"}</span>
        </div>
        <div className={"hand-note"}>
          {translate("app.platform.tut_pochynayetsya")}
          <br />
          {translate("app.platform.shchos_tvoye")}
          <svg viewBox={"0 0 80 50"}>
            <path
              d={"M70 4C20 0 50 42 8 40M8 40l12-12M8 40l17 5"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={"2"}
            />
          </svg>
        </div>
      </div>
      <form
        className={"search-bar"}
        onSubmit={function (event) {
          event?.preventDefault();
          setFilters((previousFilters) => ({
            ...previousFilters,
            query: queryInput,
            city: cityInput,
          }));
          navigateToView("search");
        }}
      >
        <label>
          {(0, jsxRuntime.jsx)(SearchIcon, {
            size: 21,
          })}
          <input
            aria-label={translate("app.platform.profesiya_abo_kompaniya")}
            placeholder={translate(
              "app.platform.posada_profesiya_abo_kompaniya",
            )}
            value={queryInput}
            onChange={(event) => setQueryInput(event.target.value)}
            list={"occupation-search"}
          />
        </label>
        <label className={"city-search"}>
          <MapPinIcon size={20} />
          <input
            aria-label={translate("app.platform.misto_poshuku")}
            placeholder={translate("app.platform.usya_ukrayina")}
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
            list={"cities"}
          />
        </label>
        <button className={"primary"} type={"submit"}>
          {translate("app.platform.znayty_robotu_2")}
          <ArrowRightIcon size={18} />
        </button>
      </form>
      <button
        type={"button"}
        className={"occupation-browse"}
        onClick={() => setOccupationPickerTarget("search")}
      >
        {(0, jsxRuntime.jsx)(LayoutGridIcon, {
          size: 16,
        })}
        {translate("app.platform.usi_profesiyi")}
        <span>{occupations.length}</span>
        <ArrowUpRightIcon size={15} />
      </button>
      <div className={"popular"}>
        <span>{translate("app.platform.sprobuy")}</span>
        {[
          translate("app.platform.smm_menedzher"),
          translate("app.platform.yuryst"),
          translate("app.platform.vodiy"),
          translate("catalog.remote"),
        ].map((suggestedQuery) => (
          <button
            onClick={() => {
              {
                if (catalogValue("catalog.remote") === suggestedQuery) {
                  updateFilter("remote", true);
                } else {
                  setQueryInput(suggestedQuery);
                  updateFilter("query", suggestedQuery);
                }
              }
              navigateToView("search");
            }}
            key={suggestedQuery}
          >
            {suggestedQuery}
            <ArrowUpRightIcon size={12} />
          </button>
        ))}
      </div>
    </section>
  );
}
export { SearchHero };
