"use client";

import { translate } from "../../../i18n/index.js";
import { MenuIcon, PlusIcon, UsersIcon } from "../shared/icons.jsx";
function PlatformHeader({
  activeView,
  isEmployer,
  isPlatformLoading,
  isSidebarOpen,
  navigateToView,
  openModal,
  platformState,
  requireAuthentication,
  setSidebarOpen,
}) {
  return (
    <header className={"topbar"}>
      <div className={"topbar-left"}>
        <button
          className={"icon-btn menu-btn"}
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          aria-label={translate("app.platform.vidkryty_menyu")}
        >
          <MenuIcon />
        </button>
        <span className={"breadcrumb"}>
          {translate("app.platform.robota_po_vsiy_ukrayini")}
          <span>{"/"}</span>{" "}
          <b>
            {
              {
                search: translate("app.platform.poshuk_roboty"),
                saved: translate("app.platform.zberezheni"),
                applications: translate("app.platform.moyi_vidhuky"),
                profile: translate("app.platform.moye_rezyume"),
                alerts: translate("app.platform.zberezheni_poshuky"),
                employer: translate("employer.dashboard.title"),
                employers: translate("navigation.employers"),
                moderation: translate("app.platform.moderatsiya"),
              }[activeView]
            }
          </b>
        </span>
      </div>
      <div className={"header-actions"}>
        <span className={"country"}>
          <span className={"ua-flag"} />
          {translate("app.platform.ukrayina")}
        </span>
        {!isPlatformLoading && (!platformState.user || isEmployer) && (
          <button className={"post-top"} onClick={() => openModal("publish")}>
            <PlusIcon size={17} />
            {translate("jobs.publish")}
          </button>
        )}
        <button
          className={"avatar"}
          title={platformState.user?.email || translate("auth.login")}
          onClick={() =>
            platformState.user
              ? navigateToView("profile")
              : requireAuthentication()
          }
        >
          {platformState.user ? (
            platformState.user.name.slice(0, 2).toUpperCase()
          ) : (
            <UsersIcon size={18} />
          )}
        </button>
      </div>
    </header>
  );
}
export { PlatformHeader };
