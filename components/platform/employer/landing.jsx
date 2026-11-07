"use client";

import { translate } from "../../../i18n/index.js";
function EmployerLanding({}) {
  return (
    <section className="dashboard">
      <div className="page-heading">
        <span className="eyebrow">
          {translate("app.platform.robotodavtsyam")}
        </span>
        <h1>{translate("app.platform.znaydit_lyudey_dlya_svoyeyi_komandy")}</h1>
        <p>
          {translate(
            "app.platform.rozmishchuyte_vakansiyi_ta_otrymuyte_vidhuky_kandydativ_na_starti_bezkoshtovno",
          )}
        </p>
      </div>
      <div className="profile-card">
        <h2>
          {translate("app.platform.vid_vakansiyi_do_znayomstva_z_kandydatom")}
        </h2>
        <ol>
          <li>
            {translate(
              "app.platform.zareyestruytesya_yak_robotodavets_i_zapovnit_informatsiyu_pro_kompaniyu",
            )}
          </li>
          <li>
            {translate(
              "app.platform.stvorit_vakansiyu_ta_nadishlit_yiyi_na_perevirku",
            )}
          </li>
          <li>
            {translate(
              "app.platform.perehlyadayte_vidhuky_ta_zv_yazuytesya_z_kandydatamy_u_svoyemu_kabineti",
            )}
          </li>
        </ol>
        <a className="primary" href="/employer?register=1">
          {translate("employer.register")}
        </a>
        <p>
          {translate("app.platform.vzhe_mayete_akaunt")}
          <a href="/employer">{translate("auth.login")}</a>
        </p>
      </div>
    </section>
  );
}
export { EmployerLanding };
