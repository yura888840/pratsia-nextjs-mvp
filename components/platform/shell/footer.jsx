"use client";

import { translate } from "../../../i18n/index.js";
import { LogOutIcon } from "../shared/icons.jsx";
function PlatformFooter({ openModal, platformState }) {
  return (
    <footer>
      <a className={"footer-brand"} href={"/"}>
        {translate("brand.logo")}
      </a>
      <span>
        {translate("app.platform.tvoya_robota_tvoyi_pravyla_ukrayina")}
      </span>
      <button onClick={() => openModal("about")}>
        {translate("app.platform.pro_platformu_2")}
      </button>
      {platformState.user && (
        <button
          onClick={async () => {
            await fetch("/api/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                action: "logout",
              }),
            });
            location.reload();
          }}
        >
          <LogOutIcon size={14} />
          {translate("app.platform.vyyty")}
        </button>
      )}
      <span className={"footer-country"}>
        <span className={"ua-flag"} />
        {translate("app.platform.ukrayina")}
      </span>
    </footer>
  );
}
export { PlatformFooter };
