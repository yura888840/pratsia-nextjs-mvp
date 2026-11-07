"use client";

import { translate } from "../../../i18n/index.js";
import {
  SearchIcon,
  BookmarkIcon,
  BriefcaseBusinessIcon,
  FileTextIcon,
  BellIcon,
  ShieldCheckIcon,
  Building2Icon,
  ArrowUpRightIcon,
  LeafIcon,
  ArrowRightIcon,
} from "../shared/icons.jsx";
import * as jsxRuntime from "react/jsx-runtime";
function PlatformSidebar({
  activeView,
  isEmployer,
  isPlatformLoading,
  isSidebarOpen,
  navigateToView,
  openModal,
  platformState,
}) {
  return (
    <aside className={"sidebar " + (isSidebarOpen ? "show" : "")}>
      <a
        className={"brand"}
        href={"/"}
        aria-label={translate("app.platform.pratsya_holovna")}
      >
        <span className={"brand-mark"}>
          <span />
          <span />
        </span>
        {translate("app.platform.pratsya")}
        <span className={"brand-dot"}>{"."}</span>
      </a>
      <div className={"workspace-label"}>
        {translate("app.platform.robota_ye_znaydy_svoyu")}
      </div>
      <nav aria-label={translate("app.platform.osnovna_navihatsiya")}>
        {[
          ["search", translate("app.platform.znayty_robotu"), SearchIcon],
          ["saved", translate("app.platform.zberezheni"), BookmarkIcon],
          [
            "applications",
            translate("app.platform.moyi_vidhuky"),
            BriefcaseBusinessIcon,
          ],
          ["profile", translate("app.platform.moye_rezyume"), FileTextIcon],
          ["alerts", translate("app.platform.zberezheni_poshuky"), BellIcon],
        ].map(([viewId, viewLabel, NavigationIcon]) => (
          <button
            className={"nav-item " + (activeView === viewId ? "active" : "")}
            onClick={() => navigateToView(viewId)}
            key={viewId}
          >
            {(0, jsxRuntime.jsx)(NavigationIcon, {
              size: 19,
            })}
            <span>{viewLabel}</span>
            {"saved" === viewId && platformState.favorites.length > 0 && (
              <small>{platformState.favorites.length}</small>
            )}
          </button>
        ))}
        {platformState.user?.isAdmin && (
          <button
            className={
              "nav-item " + ("moderation" === activeView ? "active" : "")
            }
            onClick={() => navigateToView("moderation")}
          >
            <ShieldCheckIcon size={19} />
            <span>{translate("app.platform.moderatsiya")}</span>
          </button>
        )}
      </nav>
      <div className={"sidebar-rule"} />
      {!isPlatformLoading && (!platformState.user || isEmployer) && (
        <a
          className={
            "nav-item " +
            (["employer", "employers"].includes(activeView) ? "active" : "")
          }
          href={isEmployer ? "/employer" : "/employers"}
        >
          <Building2Icon size={19} />
          {translate("navigation.employers")}
          <ArrowUpRightIcon size={16} className="ml-auto" />
        </a>
      )}
      <div className={"sidebar-promo"}>
        <span className={"small-icon"}>
          <LeafIcon size={21} />
        </span>
        <h3>
          {translate("app.platform.ne_prosto")}
          <br />
          {translate("app.platform.shche_odna_robota")}
        </h3>
        <p>
          {translate("app.platform.zapovny_anketu_odyn_raz")}
          <br />
          {translate("app.platform.vykorystovuy_dlya_vidhukiv")}
        </p>
        <button onClick={() => openModal("profile")}>
          {translate("app.platform.stvoryty_rezyume")}
          <ArrowRightIcon size={16} />
        </button>
      </div>
      <div className={"sidebar-bottom"}>
        <span className={"ua-flag"} />
        {translate("app.platform.zrobleno_dlya_ukrayiny")}
        <button onClick={() => openModal("about")}>
          {translate("app.platform.pro_platformu")}
          <ArrowUpRightIcon size={13} />
        </button>
      </div>
    </aside>
  );
}
export { PlatformSidebar };
