"use client";

import { translate } from "../../../i18n/index.js";
import { DEFAULT_FILTERS } from "./search.js";
import { ArrowRightIcon, Trash2Icon, BellIcon } from "../shared/icons.jsx";
function SavedSearchesView({
  navigateToView,
  platformState,
  savePlatformAction,
  setCityInput,
  setFilters,
  setQueryInput,
}) {
  return (
    <section className={"dashboard"}>
      <div className={"page-heading"}>
        <span className={"eyebrow"}>
          {translate("app.platform.use_potribne_pid_rukoyu")}
        </span>
        <h1>{translate("app.platform.zberezheni_poshuky")}</h1>
        <p>
          {translate(
            "app.platform.umovy_poshuku_zberihayutsya_u_tvoyemu_kabineti_zovnishni_spovishchennya_shche_ne_pidk",
          )}
        </p>
      </div>
      {platformState.searches.length ? (
        platformState.searches.map((savedSearch) => (
          <div className={"dashboard-card"} key={savedSearch.id}>
            <div>
              <h3>{savedSearch.name}</h3>
              <p>
                {translate(
                  "app.platform.shvydkyy_perekhid_do_aktualnoyi_dobirky",
                )}
              </p>
            </div>
            <button
              className={"primary small"}
              onClick={() => {
                const restoredFilters = {
                  ...DEFAULT_FILTERS,
                  ...JSON.parse(savedSearch.filters),
                };
                setFilters(restoredFilters);
                setQueryInput(restoredFilters.query);
                setCityInput(restoredFilters.city);
                navigateToView("search");
              }}
            >
              {translate("app.platform.vidkryty")}
              <ArrowRightIcon size={15} />
            </button>
            <button
              className={"icon-btn"}
              aria-label={translate("app.platform.vydalyty_poshuk")}
              onClick={() =>
                savePlatformAction({
                  action: "deleteSearch",
                  id: savedSearch.id,
                })
              }
            >
              <Trash2Icon size={17} />
            </button>
          </div>
        ))
      ) : (
        <div className={"empty-state"}>
          <BellIcon size={36} />
          <h3>{translate("app.platform.zberezhy_zruchnu_dobirku")}</h3>
          <p>
            {translate(
              "app.platform.vstanovy_filtry_u_poshuku_ta_natysny_zberehty_poshuk",
            )}
          </p>
          <button
            className={"primary"}
            onClick={() => navigateToView("search")}
          >
            {translate("app.platform.do_poshuku")}
          </button>
        </div>
      )}
    </section>
  );
}
export { SavedSearchesView };
