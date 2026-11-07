"use client";

import { translate } from "../../../i18n/index.js";
function AboutPlatform({}) {
  return (
    <div className={"form-body about-body"}>
      <p>
        {translate(
          "app.platform.pratsya_platforma_vakansiy_ta_rezyume_dlya_vsiyeyi_ukrayiny_domen_proyektu_pratsia_co",
        )}
      </p>
      <h3>{translate("app.platform.shcho_vzhe_mozhna_zrobyty")}</h3>
      <p>
        {translate(
          "app.platform.opublikuvaty_vakansiyu_stvoryty_pryvatnu_anketu_znayty_ta_zberehty_propozytsiyi_vidhu",
        )}
      </p>
      <h3>{translate("app.platform.vlasnyy_oblikovyy_zapys")}</h3>
      <p>
        {translate(
          "app.platform.poshuk_dostupnyy_bez_vkhodu_dlya_rezyume_vidhukiv_i_publikatsiyi_vakansiy_stvory_akau",
        )}
      </p>
      <h3>{translate("app.platform.pro_dani")}</h3>
      <p>
        {translate(
          "app.platform.anketa_ta_kontaktni_dani_zberihayutsya_na_serveri_vidhuk_peredaye_robotodavtsyu_kopiy",
        )}
      </p>
      <h3>{translate("app.platform.pryklady_ta_dzherela")}</h3>
      <p>
        {translate(
          "app.platform.demonstratsiyni_kompaniyi_y_vakansiyi_vyhadani_ta_poznacheni_avtomatychnyy_import_zov",
        )}
      </p>
    </div>
  );
}
export { AboutPlatform };
