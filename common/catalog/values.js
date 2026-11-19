
import { catalogValue, formatNumber, translate } from "../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
let d = [{
  id: "all",
  name: translate("app.platform.usi_sfery"),
  icon: "grid"
}, {
  id: "sales",
  name: translate("app.platform.prodazh_i_torhivlya"),
  icon: "store"
}, {
  id: "it",
  name: translate("app.platform.it_ta_digital"),
  icon: "code"
}, {
  id: "office",
  name: translate("app.platform.ofis_i_upravlinnya"),
  icon: "briefcase"
}, {
  id: "legal",
  name: translate("app.platform.pravo_ta_finansy"),
  icon: "scale"
}, {
  id: "hospitality",
  name: translate("app.platform.hoteli_ta_restorany"),
  icon: "coffee"
}, {
  id: "logistics",
  name: translate("app.platform.transport_i_lohistyka"),
  icon: "truck"
}, {
  id: "health",
  name: translate("app.platform.medytsyna_ta_krasa"),
  icon: "heart"
}, {
  id: "education",
  name: translate("app.platform.osvita_ta_sport"),
  icon: "graduation"
}, {
  id: "production",
  name: translate("app.platform.vyrobnytstvo_ta_ahro"),
  icon: "factory"
}, {
  id: "construction",
  name: translate("app.platform.budivnytstvo"),
  icon: "hammer"
}, {
  id: "other",
  name: translate("app.platform.inshi_spetsialnosti"),
  icon: "more"
}];
[{
  id: "law",
  name: translate("app.platform.pravo_advokatura_ta_notariat"),
  category: "legal",
  names: [catalogValue("app.platform.yuryst"), catalogValue("app.platform.advokat"), catalogValue("app.platform.pomichnyk_advokata"), catalogValue("app.platform.stazhyst_advokata"), catalogValue("app.platform.yuryskonsult"), catalogValue("app.platform.pomichnyk_yurysta"), catalogValue("app.platform.korporatyvnyy_yuryst"), catalogValue("app.platform.yuryst_iz_dohovirnoyi_roboty"), catalogValue("app.platform.yuryst_iz_sudovoyi_roboty"), catalogValue("app.platform.yuryst_iz_mizhnarodnoho_prava"), catalogValue("app.platform.yuryst_iz_podatkovoho_prava"), catalogValue("app.platform.yuryst_iz_trudovoho_prava"), catalogValue("app.platform.yuryst_iz_zemelnoho_prava"), catalogValue("app.platform.yuryst_iz_nerukhomosti"), catalogValue("app.platform.yuryst_z_intelektualnoyi_vlasnosti"), catalogValue("app.platform.yuryst_iz_viyskovoho_prava"), catalogValue("app.platform.yuryst_iz_kryminalnoho_prava"), catalogValue("app.platform.yuryst_iz_simeynoho_prava"), catalogValue("app.platform.kerivnyk_yurydychnoho_viddilu"), catalogValue("app.platform.notarius"), catalogValue("app.platform.pomichnyk_notariusa"), catalogValue("app.platform.pryvatnyy_vykonavets"), catalogValue("app.platform.pomichnyk_pryvatnoho_vykonavtsya"), catalogValue("app.platform.derzhavnyy_vykonavets"), catalogValue("app.platform.arbitrazhnyy_keruyuchyy"), catalogValue("app.platform.mediator"), catalogValue("app.platform.patentnyy_povirenyy"), catalogValue("app.platform.komplayens_ofitser"), catalogValue("app.platform.fakhivets_iz_zakhystu_personalnykh_danykh"), catalogValue("app.platform.sekretar_sudovoho_zasidannya"), catalogValue("app.platform.pomichnyk_suddi"), catalogValue("app.platform.sudovyy_ekspert"), catalogValue("app.platform.prokuror"), catalogValue("app.platform.slidchyy")]
}, {
  id: "sport",
  name: translate("app.platform.sport_fitnes_ta_yoha"),
  category: "education",
  names: [catalogValue("app.platform.trener"), catalogValue("app.platform.fitnes_trener"), catalogValue("app.platform.personalnyy_trener"), catalogValue("app.platform.trener_trenazhernoho_zalu"), catalogValue("app.platform.instruktor_hrupovykh_prohram"), catalogValue("app.platform.trener_z_yohy"), catalogValue("app.platform.instruktor_z_pilatesu"), catalogValue("app.platform.trener_zi_stretchynhu"), catalogValue("app.platform.trener_z_funktsionalnoho_treninhu"), catalogValue("app.platform.trener_iz_krosfitu"), catalogValue("app.platform.trener_z_aerobiky"), catalogValue("app.platform.trener_z_plavannya"), catalogValue("app.platform.instruktor_z_akvaaerobiky"), catalogValue("app.platform.trener_z_boksu"), catalogValue("app.platform.trener_z_kikboksynhu"), catalogValue("app.platform.trener_iz_borotby"), catalogValue("app.platform.trener_iz_dzyudo"), catalogValue("app.platform.trener_iz_karate"), catalogValue("app.platform.trener_iz_tkhekvondo"), catalogValue("app.platform.trener_zi_zmishanykh_yedynoborstv"), catalogValue("app.platform.trener_iz_futbolu"), catalogValue("app.platform.trener_iz_basketbolu"), catalogValue("app.platform.trener_iz_voleybolu"), catalogValue("app.platform.trener_iz_tenisu"), catalogValue("app.platform.trener_iz_nastilnoho_tenisu"), catalogValue("app.platform.trener_iz_himnastyky"), catalogValue("app.platform.trener_iz_lehkoyi_atletyky"), catalogValue("app.platform.trener_iz_shakhiv"), catalogValue("app.platform.trener_iz_velosportu"), catalogValue("app.platform.trener_iz_kinnoho_sportu"), catalogValue("app.platform.trener_iz_tantsiv"), catalogValue("app.platform.khoreohraf"), catalogValue("app.platform.dytyachyy_trener"), catalogValue("app.platform.sportyvnyy_instruktor"), catalogValue("app.platform.instruktor_iz_turyzmu"), catalogValue("app.platform.hirskolyzhnyy_instruktor"), catalogValue("app.platform.instruktor_iz_dayvinhu"), catalogValue("app.platform.instruktor_parashutnoho_sportu"), catalogValue("app.platform.sportyvnyy_suddya"), catalogValue("app.platform.sportyvnyy_menedzher"), catalogValue("app.platform.administrator_fitnes_klubu"), catalogValue("app.platform.menedzher_sportyvnoho_klubu")]
}, {
  id: "model",
  name: translate("app.platform.modeli_moda_ta_styl"),
  category: "other",
  names: [catalogValue("app.platform.model"), catalogValue("app.platform.fotomodel"), catalogValue("app.platform.podiumna_model"), catalogValue("app.platform.model_dlya_reklamy"), catalogValue("app.platform.model_dlya_katalohu"), catalogValue("app.platform.model_dlya_prymirok"), catalogValue("app.platform.model_plus_size"), catalogValue("app.platform.fitnes_model"), catalogValue("app.platform.model_dlya_zyomky_odyahu"), catalogValue("app.platform.model_ruk"), catalogValue("app.platform.promomodel"), catalogValue("app.platform.modelnyy_ahent"), catalogValue("app.platform.buker_modelnoho_ahentstva"), catalogValue("app.platform.kastynh_menedzher"), catalogValue("app.platform.stylist"), catalogValue("app.platform.personalnyy_stylist"), catalogValue("app.platform.feshn_stylist"), catalogValue("app.platform.imidzhmeyker"), catalogValue("app.platform.dyzayner_odyahu"), catalogValue("app.platform.modelyer"), catalogValue("app.platform.konstruktor_odyahu"), catalogValue("app.platform.tekhnoloh_shveynoho_vyrobnytstva"), catalogValue("app.platform.bayer_odyahu"), catalogValue("app.platform.merchandayzer_odyahu"), catalogValue("app.platform.kostyumer"), catalogValue("app.platform.harderobnyk"), catalogValue("app.platform.asystent_stylista"), catalogValue("app.platform.prodyuser_modnykh_zyomok")]
}, {
  id: "itdev",
  name: translate("app.platform.rozrobka_prohramnoho_zabezpechennya"),
  category: "it",
  names: [catalogValue("app.platform.prohramist"), catalogValue("app.platform.frontend_rozrobnyk"), catalogValue("app.platform.backend_rozrobnyk"), catalogValue("app.platform.fullstack_rozrobnyk"), catalogValue("app.platform.vebrozrobnyk"), catalogValue("app.platform.javascript_rozrobnyk"), catalogValue("app.platform.typescript_rozrobnyk"), catalogValue("app.platform.python_rozrobnyk"), catalogValue("app.platform.java_rozrobnyk"), catalogValue("app.platform.php_rozrobnyk"), catalogValue("app.platform.c_rozrobnyk"), catalogValue("app.platform.c_rozrobnyk_2"), catalogValue("app.platform.go_rozrobnyk"), catalogValue("app.platform.rust_rozrobnyk"), catalogValue("app.platform.ruby_rozrobnyk"), catalogValue("app.platform.react_rozrobnyk"), catalogValue("app.platform.vue_rozrobnyk"), catalogValue("app.platform.angular_rozrobnyk"), catalogValue("app.platform.node_js_rozrobnyk"), catalogValue("app.platform.net_rozrobnyk"), catalogValue("app.platform.android_rozrobnyk"), catalogValue("app.platform.ios_rozrobnyk"), catalogValue("app.platform.flutter_rozrobnyk"), catalogValue("app.platform.react_native_rozrobnyk"), catalogValue("app.platform.rozrobnyk_ihor"), catalogValue("app.platform.unity_rozrobnyk"), catalogValue("app.platform.unreal_engine_rozrobnyk"), catalogValue("app.platform.embedded_rozrobnyk"), catalogValue("app.platform.rozrobnyk_bas"), catalogValue("app.platform.rozrobnyk_wordpress"), catalogValue("app.platform.rozrobnyk_erp"), catalogValue("app.platform.rozrobnyk_crm"), catalogValue("app.platform.arkhitektor_prohramnoho_zabezpechennya"), catalogValue("app.platform.tekhnichnyy_lider")]
}, {
  id: "itops",
  name: translate("app.platform.it_dani_testuvannya_ta_kiberbezpeka"),
  category: "it",
  names: [catalogValue("app.platform.testuvalnyk"), catalogValue("catalog.terms.qa_automation_engineer"), catalogValue("catalog.terms.manual_qa_engineer"), catalogValue("app.platform.inzhener_iz_testuvannya_navantazhennya"), catalogValue("app.platform.devops_inzhener"), catalogValue("app.platform.sre_inzhener"), catalogValue("app.platform.khmarnyy_inzhener"), catalogValue("app.platform.systemnyy_administrator"), catalogValue("app.platform.merezhevyy_administrator"), catalogValue("app.platform.administrator_baz_danykh"), catalogValue("app.platform.it_fakhivets"), catalogValue("app.platform.fakhivets_tekhnichnoyi_pidtrymky"), catalogValue("app.platform.inzhener_tekhnichnoyi_pidtrymky"), catalogValue("app.platform.it_rekruter"), catalogValue("app.platform.analityk_danykh"), catalogValue("catalog.terms.data_scientist"), catalogValue("catalog.terms.data_engineer"), catalogValue("app.platform.bi_analityk"), catalogValue("catalog.terms.machine_learning_engineer"), catalogValue("app.platform.ai_inzhener"), catalogValue("app.platform.biznes_analityk"), catalogValue("app.platform.systemnyy_analityk"), catalogValue("app.platform.product_menedzher"), catalogValue("catalog.terms.it_project_manager"), catalogValue("catalog.terms.scrum_master"), catalogValue("catalog.terms.delivery_manager"), catalogValue("app.platform.inzhener_iz_kiberbezpeky"), catalogValue("app.platform.analityk_soc"), catalogValue("app.platform.pentester"), catalogValue("app.platform.fakhivets_iz_zakhystu_informatsiyi"), catalogValue("app.platform.tekhnichnyy_pysmennyk"), catalogValue("app.platform.inzhener_iz_robototekhniky")]
}, {
  id: "marketing",
  name: translate("app.platform.marketynh_reklama_ta_pr"),
  category: "it",
  names: [catalogValue("app.platform.marketoloh"), catalogValue("app.platform.internet_marketoloh"), catalogValue("app.platform.smm_menedzher"), catalogValue("app.platform.seo_fakhivets"), catalogValue("app.platform.ppc_fakhivets"), catalogValue("app.platform.tarhetoloh"), catalogValue("app.platform.kontent_menedzher"), catalogValue("app.platform.kopirayter"), catalogValue("app.platform.kontent_marketoloh"), catalogValue("app.platform.brend_menedzher"), catalogValue("app.platform.pr_menedzher"), catalogValue("app.platform.email_marketoloh"), catalogValue("app.platform.crm_marketoloh"), catalogValue("app.platform.performance_marketoloh"), catalogValue("app.platform.affiliate_menedzher"), catalogValue("app.platform.influencer_menedzher"), catalogValue("app.platform.community_menedzher"), catalogValue("app.platform.mediabayer"), catalogValue("app.platform.marketynhovyy_analityk"), catalogValue("app.platform.menedzher_iz_komunikatsiy"), catalogValue("app.platform.menedzher_reklamnykh_proyektiv"), catalogValue("app.platform.kerivnyk_viddilu_marketynhu"), catalogValue("app.platform.dyrektor_iz_marketynhu"), catalogValue("app.platform.treyd_marketoloh"), catalogValue("app.platform.promouter"), catalogValue("app.platform.interv_yuer"), catalogValue("app.platform.merchandayzer"), catalogValue("app.platform.event_menedzher")]
}, {
  id: "creative",
  name: translate("app.platform.dyzayn_foto_ta_video"),
  category: "it",
  names: [catalogValue("app.platform.ux_ui_dyzayner"), catalogValue("app.platform.hrafichnyy_dyzayner"), catalogValue("app.platform.vebdyzayner"), catalogValue("app.platform.produktovyy_dyzayner"), catalogValue("app.platform.dyzayner_inter_yeru"), catalogValue("app.platform.landshaftnyy_dyzayner"), catalogValue("app.platform.promyslovyy_dyzayner"), catalogValue("app.platform.dyzayner_mebliv"), catalogValue("app.platform.dyzayner_polihrafiyi"), catalogValue("app.platform.ilyustrator"), catalogValue("app.platform.khudozhnyk"), catalogValue("app.platform.kontsept_khudozhnyk"), catalogValue("app.platform.3d_khudozhnyk"), catalogValue("app.platform.3d_vizualizator"), catalogValue("app.platform.3d_modeler"), catalogValue("app.platform.motion_dyzayner"), catalogValue("app.platform.animator"), catalogValue("app.platform.fotohraf"), catalogValue("app.platform.predmetnyy_fotohraf"), catalogValue("app.platform.retusher"), catalogValue("app.platform.videohraf"), catalogValue("app.platform.videooperator"), catalogValue("app.platform.videomontazher"), catalogValue("app.platform.rezhyser_montazhu"), catalogValue("app.platform.koloryst"), catalogValue("app.platform.artdyrektor"), catalogValue("app.platform.kreatyvnyy_dyrektor"), catalogValue("app.platform.dekorator"), catalogValue("app.platform.floryst")]
}, {
  id: "media",
  name: translate("app.platform.media_vydavnytstvo_ta_polihrafiya"),
  category: "other",
  names: [catalogValue("app.platform.zhurnalist"), catalogValue("app.platform.redaktor"), catalogValue("app.platform.literaturnyy_redaktor"), catalogValue("app.platform.vypuskovyy_redaktor"), catalogValue("app.platform.holovnyy_redaktor"), catalogValue("app.platform.korektor"), catalogValue("app.platform.rerayter"), catalogValue("app.platform.stsenaryst"), catalogValue("app.platform.televeduchyy"), catalogValue("app.platform.radioveduchyy"), catalogValue("app.platform.dyktor"), catalogValue("app.platform.korespondent"), catalogValue("app.platform.presatashe"), catalogValue("app.platform.pres_sekretar"), catalogValue("app.platform.vydavets"), catalogValue("app.platform.verstalnyk"), catalogValue("app.platform.drukar"), catalogValue("app.platform.operator_tsyfrovoho_druku"), catalogValue("app.platform.operator_shyrokoformatnoho_druku"), catalogValue("app.platform.paliturnyk"), catalogValue("app.platform.menedzher_drukarni"), catalogValue("app.platform.bloher"), catalogValue("app.platform.kontent_kreator"), catalogValue("app.platform.ugc_kreator"), catalogValue("app.platform.podkaster")]
}, {
  id: "performing",
  name: translate("app.platform.kultura_muzyka_ta_rozvahy"),
  category: "other",
  names: [catalogValue("app.platform.aktor"), catalogValue("app.platform.aktor_ozvuchuvannya"), catalogValue("app.platform.artyst"), catalogValue("app.platform.spivak"), catalogValue("app.platform.muzykant"), catalogValue("app.platform.didzhey"), catalogValue("app.platform.kompozytor"), catalogValue("app.platform.saund_dyzayner"), catalogValue("app.platform.zvukorezhyser"), catalogValue("app.platform.zvukooperator"), catalogValue("app.platform.rezhyser"), catalogValue("app.platform.prodyuser"), catalogValue("app.platform.liniynyy_prodyuser"), catalogValue("app.platform.teatralnyy_administrator"), catalogValue("app.platform.kontsertnyy_menedzher"), catalogValue("app.platform.tantsivnyk"), catalogValue("app.platform.baletmeyster"), catalogValue("app.platform.veduchyy_zakhodiv"), catalogValue("app.platform.orhanizator_zakhodiv"), catalogValue("app.platform.ivent_koordynator"), catalogValue("app.platform.artyst_animator"), catalogValue("app.platform.dytyachyy_animator"), catalogValue("app.platform.kerivnyk_hurtka"), catalogValue("app.platform.bibliotekar"), catalogValue("app.platform.muzeynyy_pratsivnyk"), catalogValue("app.platform.ekskursovod"), catalogValue("app.platform.restavrator"), catalogValue("app.platform.osvitlyuvach"), catalogValue("app.platform.stsenichnyy_robitnyk")]
}, {
  id: "sales",
  name: translate("app.platform.prodazhi_ta_robota_z_kliyentamy"),
  category: "sales",
  names: [catalogValue("app.platform.menedzher_z_prodazhu"), catalogValue("app.platform.torhovyy_predstavnyk"), catalogValue("app.platform.torhovyy_ahent"), catalogValue("app.platform.menedzher_iz_rozvytku_biznesu"), catalogValue("app.platform.menedzher_z_obsluhovuvannya_kliyentiv"), catalogValue("app.platform.menedzher_iz_prodazhu_posluh"), catalogValue("app.platform.menedzher_iz_prodazhu_nerukhomosti"), catalogValue("app.platform.menedzher_iz_prodazhu_avtomobiliv"), catalogValue("app.platform.menedzher_iz_prodazhu_budmaterialiv"), catalogValue("app.platform.menedzher_iz_prodazhu_obladnannya"), catalogValue("app.platform.menedzher_iz_prodazhu_reklamy"), catalogValue("app.platform.menedzher_iz_prodazhu_b2b"), catalogValue("app.platform.menedzher_iz_prodazhu_b2c"), catalogValue("app.platform.menedzher_iz_prodazhu_saas"), catalogValue("app.platform.menedzher_iz_klyuchovykh_kliyentiv"), catalogValue("app.platform.account_menedzher"), catalogValue("catalog.terms.customer_success_manager"), catalogValue("app.platform.menedzher_iz_suprovodu_kliyentiv"), catalogValue("app.platform.menedzher_iz_eksportu"), catalogValue("app.platform.rehionalnyy_menedzher"), catalogValue("app.platform.terytorialnyy_menedzher"), catalogValue("app.platform.supervayzer"), catalogValue("app.platform.kerivnyk_viddilu_prodazhu"), catalogValue("app.platform.dyrektor_iz_prodazhu"), catalogValue("app.platform.komertsiynyy_dyrektor"), catalogValue("app.platform.fakhivets_iz_tenderiv"), catalogValue("app.platform.tendernyy_menedzher")]
}, {
  id: "retail",
  name: translate("app.platform.mahazyny_ta_elektronna_torhivlya"),
  category: "sales",
  names: [catalogValue("app.platform.prodavets_konsultant"), catalogValue("app.platform.prodavets"), catalogValue("app.platform.prodavets_kasyr"), catalogValue("app.platform.kasyr"), catalogValue("app.platform.starshyy_kasyr"), catalogValue("app.platform.kerivnyk_mahazynu"), catalogValue("app.platform.administrator_mahazynu"), catalogValue("app.platform.administrator_torhovoho_zalu"), catalogValue("app.platform.merchendayzer"), catalogValue("app.platform.menedzher_internet_mahazynu"), catalogValue("app.platform.operator_internet_mahazynu"), catalogValue("app.platform.menedzher_marketpleysiv"), catalogValue("app.platform.katehoriynyy_menedzher"), catalogValue("app.platform.tovaroznavets"), catalogValue("app.platform.pryymalnyk_tovariv"), catalogValue("app.platform.prodavets_odyahu"), catalogValue("app.platform.prodavets_vzuttya"), catalogValue("app.platform.prodavets_kosmetyky"), catalogValue("app.platform.prodavets_yuvelirnykh_vyrobiv"), catalogValue("app.platform.prodavets_elektroniky"), catalogValue("app.platform.prodavets_prodovolchykh_tovariv"), catalogValue("app.platform.prodavets_budmaterialiv"), catalogValue("app.platform.prodavets_zootovariv"), catalogValue("app.platform.pekar_prodavets"), catalogValue("app.platform.fakhivets_iz_povernennya_tovariv")]
}, {
  id: "realestate",
  name: translate("app.platform.nerukhomist_ta_otsinka"),
  category: "sales",
  names: [catalogValue("app.platform.riyeltor"), catalogValue("app.platform.ahent_iz_nerukhomosti"), catalogValue("app.platform.broker_iz_nerukhomosti"), catalogValue("app.platform.menedzher_z_orendy"), catalogValue("app.platform.menedzher_komertsiynoyi_nerukhomosti"), catalogValue("app.platform.otsinyuvach_nerukhomosti"), catalogValue("app.platform.otsinyuvach_mayna"), catalogValue("app.platform.kerivnyk_viddilu_nerukhomosti"), catalogValue("app.platform.keruyuchyy_nerukhomistyu"), catalogValue("app.platform.administrator_zhytlovoho_kompleksu"), catalogValue("app.platform.upravytel_budynku"), catalogValue("app.platform.fakhivets_iz_zemelnykh_pytan")]
}, {
  id: "office",
  name: translate("app.platform.ofis_administruvannya_ta_pidtrymka"),
  category: "office",
  names: [catalogValue("app.platform.administrator"), catalogValue("app.platform.ofis_menedzher"), catalogValue("app.platform.sekretar"), catalogValue("app.platform.sekretar_kerivnyka"), catalogValue("app.platform.asystent_kerivnyka"), catalogValue("app.platform.biznes_asystent"), catalogValue("app.platform.osobystyy_pomichnyk"), catalogValue("app.platform.administratyvnyy_asystent"), catalogValue("app.platform.dilovod"), catalogValue("app.platform.arkhivarius"), catalogValue("app.platform.operator_vvedennya_danykh"), catalogValue("app.platform.operator_kontakt_tsentru"), catalogValue("app.platform.operator_chatu"), catalogValue("app.platform.dyspetcher_zvernen"), catalogValue("app.platform.administrator_retseptsiyi"), catalogValue("app.platform.menedzher_iz_dokumentoobihu"), catalogValue("app.platform.koordynator"), catalogValue("app.platform.menedzher_z_administratyvnoyi_diyalnosti"), catalogValue("app.platform.fakhivets_z_obrobky_zamovlen"), catalogValue("app.platform.operator_poshtovoho_viddilennya"), catalogValue("app.platform.administrator_kovorkinhu"), catalogValue("app.platform.moderator_kontentu")]
}, {
  id: "hr",
  name: translate("app.platform.personal_rekrutynh_ta_biznes_navchannya"),
  category: "office",
  names: [catalogValue("app.platform.hr_menedzher"), catalogValue("app.platform.rekruter"), catalogValue("catalog.terms.hr_business_partner"), catalogValue("catalog.terms.hr_generalist"), catalogValue("app.platform.hr_analityk"), catalogValue("app.platform.dyrektor_iz_personalu"), catalogValue("app.platform.kerivnyk_viddilu_kadriv"), catalogValue("app.platform.inspektor_iz_kadriv"), catalogValue("app.platform.fakhivets_iz_kadrovoho_dilovodstva"), catalogValue("app.platform.menedzher_iz_adaptatsiyi_personalu"), catalogValue("app.platform.menedzher_iz_navchannya_personalu"), catalogValue("app.platform.fakhivets_iz_kompensatsiy_ta_pilh"), catalogValue("app.platform.fakhivets_iz_rozvytku_personalu"), catalogValue("app.platform.sorser"), catalogValue("app.platform.kar_yernyy_konsultant"), catalogValue("app.platform.biznes_trener"), catalogValue("app.platform.korporatyvnyy_trener"), catalogValue("app.platform.trener_iz_prodazhu"), catalogValue("app.platform.kouch"), catalogValue("app.platform.fasylitator"), catalogValue("app.platform.fakhivets_iz_vnutrishnikh_komunikatsiy")]
}, {
  id: "management",
  name: translate("app.platform.kerivnytstvo_ta_upravlinnya_proyektamy"),
  category: "office",
  names: [catalogValue("app.platform.kerivnyk_proyektiv"), catalogValue("app.platform.kerivnyk"), catalogValue("app.platform.dyrektor"), catalogValue("app.platform.heneralnyy_dyrektor"), catalogValue("app.platform.operatsiynyy_dyrektor"), catalogValue("app.platform.vykonavchyy_dyrektor"), catalogValue("app.platform.kerivnyk_filiyi"), catalogValue("app.platform.kerivnyk_predstavnytstva"), catalogValue("app.platform.menedzher_iz_rozvytku"), catalogValue("app.platform.kerivnyk_vyrobnytstva"), catalogValue("app.platform.dyrektor_pidpryyemstva"), catalogValue("app.platform.dyrektor_iz_zakupivel"), catalogValue("app.platform.dyrektor_iz_lohistyky"), catalogValue("app.platform.kerivnyk_viddilu"), catalogValue("app.platform.antykryzovyy_menedzher"), catalogValue("app.platform.kerivnyk_prohram"), catalogValue("app.platform.biznes_konsultant"), catalogValue("app.platform.konsultant_iz_upravlinnya"), catalogValue("app.platform.menedzher_iz_yakosti"), catalogValue("app.platform.fakhivets_z_optymizatsiyi_protsesiv")]
}, {
  id: "finance",
  name: translate("app.platform.bukhhalteriya_finansy_banky_ta_strakhuvannya"),
  category: "legal",
  names: [catalogValue("app.platform.bukhhalter"), catalogValue("app.platform.holovnyy_bukhhalter"), catalogValue("app.platform.pomichnyk_bukhhaltera"), catalogValue("app.platform.bukhhalter_iz_zarobitnoyi_platy"), catalogValue("app.platform.bukhhalter_iz_pervynnoyi_dokumentatsiyi"), catalogValue("app.platform.bukhhalter_kasyr"), catalogValue("app.platform.bukhhalter_iz_podatkovoho_obliku"), catalogValue("app.platform.audytor"), catalogValue("app.platform.vnutrishniy_audytor"), catalogValue("app.platform.podatkovyy_konsultant"), catalogValue("app.platform.ekonomist"), catalogValue("app.platform.finansovyy_analityk"), catalogValue("app.platform.finansyst"), catalogValue("app.platform.finansovyy_kontroler"), catalogValue("app.platform.finansovyy_dyrektor"), catalogValue("app.platform.kaznachey"), catalogValue("app.platform.bankivskyy_pratsivnyk"), catalogValue("app.platform.kasyr_banku"), catalogValue("app.platform.operatsionist_banku"), catalogValue("app.platform.kredytnyy_ekspert"), catalogValue("app.platform.kredytnyy_analityk"), catalogValue("app.platform.ryzyk_menedzher"), catalogValue("app.platform.fakhivets_iz_finansovoho_monitorynhu"), catalogValue("app.platform.investytsiynyy_analityk"), catalogValue("app.platform.finansovyy_konsultant"), catalogValue("app.platform.strakhovyy_ahent"), catalogValue("app.platform.strakhovyy_broker"), catalogValue("app.platform.anderrayter"), catalogValue("app.platform.aktuariy"), catalogValue("app.platform.fakhivets_iz_vrehulyuvannya_zbytkiv"), catalogValue("app.platform.menedzher_lizynhovykh_operatsiy"), catalogValue("app.platform.fakhivets_iz_byudzhetuvannya")]
}, {
  id: "restaurant",
  name: translate("app.platform.restorany_kafe_ta_kharchuvannya"),
  category: "hospitality",
  names: [catalogValue("app.platform.kukhar"), catalogValue("app.platform.shef_kukhar"), catalogValue("app.platform.su_shef"), catalogValue("app.platform.kukhar_universal"), catalogValue("app.platform.kukhar_haryachoho_tsekhu"), catalogValue("app.platform.kukhar_kholodnoho_tsekhu"), catalogValue("app.platform.kukhar_sushyst"), catalogValue("app.platform.pitsayolo"), catalogValue("app.platform.kondyter"), catalogValue("app.platform.pekar"), catalogValue("app.platform.tistorob"), catalogValue("app.platform.ofitsiant"), catalogValue("app.platform.starshyy_ofitsiant"), catalogValue("app.platform.barysta"), catalogValue("app.platform.barmen"), catalogValue("app.platform.khostes"), catalogValue("app.platform.menedzher_restoranu"), catalogValue("app.platform.administrator_restoranu"), catalogValue("app.platform.keruyuchyy_restoranom"), catalogValue("app.platform.myynyk_posudu"), catalogValue("app.platform.kukhonnyy_pratsivnyk"), catalogValue("app.platform.zahotivelnyk_produktiv"), catalogValue("app.platform.somelye"), catalogValue("app.platform.kalyannyy_mayster"), catalogValue("app.platform.tekhnoloh_hromadskoho_kharchuvannya"), catalogValue("app.platform.menedzher_keyterynhu"), catalogValue("app.platform.pratsivnyk_zakladu_shvydkoho_kharchuvannya")]
}, {
  id: "travel",
  name: translate("app.platform.hoteli_turyzm_ta_podorozhi"),
  category: "hospitality",
  names: [catalogValue("app.platform.administrator_hotelyu"), catalogValue("app.platform.menedzher_hotelyu"), catalogValue("app.platform.keruyuchyy_hotelem"), catalogValue("app.platform.pokoyivka"), catalogValue("app.platform.nichnyy_administrator"), catalogValue("app.platform.konsyerzh"), catalogValue("app.platform.portye"), catalogValue("app.platform.shveytsar"), catalogValue("app.platform.nosiy_bahazhu"), catalogValue("app.platform.menedzher_iz_bronyuvannya"), catalogValue("app.platform.turystychnyy_ahent"), catalogValue("app.platform.menedzher_iz_turyzmu"), catalogValue("app.platform.turoperator"), catalogValue("app.platform.hid"), catalogValue("app.platform.hid_perekladach"), catalogValue("app.platform.suprovodzhuvach_turystychnykh_hrup"), catalogValue("app.platform.ahent_z_aviakvytkiv"), catalogValue("app.platform.administrator_khostelu"), catalogValue("app.platform.menedzher_kurortu"), catalogValue("app.platform.pratsivnyk_pralni")]
}, {
  id: "medicine",
  name: translate("app.platform.medytsyna_farmatsevtyka_ta_veterynariya"),
  category: "health",
  names: [catalogValue("app.platform.likar"), catalogValue("app.platform.simeynyy_likar"), catalogValue("app.platform.terapevt"), catalogValue("app.platform.pediatr"), catalogValue("app.platform.khirurh"), catalogValue("app.platform.anestezioloh"), catalogValue("app.platform.kardioloh"), catalogValue("app.platform.nevroloh"), catalogValue("app.platform.dermatoloh"), catalogValue("app.platform.endokrynoloh"), catalogValue("app.platform.hastroenteroloh"), catalogValue("app.platform.oftalmoloh"), catalogValue("app.platform.otolarynholoh"), catalogValue("app.platform.hinekoloh"), catalogValue("app.platform.uroloh"), catalogValue("app.platform.onkoloh"), catalogValue("app.platform.ortoped_travmatoloh"), catalogValue("app.platform.psykhiatr"), catalogValue("app.platform.likar_uzd"), catalogValue("app.platform.renthenoloh"), catalogValue("app.platform.stomatoloh"), catalogValue("app.platform.stomatoloh_terapevt"), catalogValue("app.platform.stomatoloh_khirurh"), catalogValue("app.platform.ortodont"), catalogValue("app.platform.stomatoloh_ortoped"), catalogValue("app.platform.zubnyy_tekhnik"), catalogValue("app.platform.asystent_stomatoloha"), catalogValue("app.platform.medychna_sestra"), catalogValue("app.platform.medychnyy_brat"), catalogValue("app.platform.operatsiyna_medychna_sestra"), catalogValue("app.platform.akusherka"), catalogValue("app.platform.feldsher"), catalogValue("app.platform.paramedyk"), catalogValue("app.platform.laborant"), catalogValue("app.platform.medychnyy_reyestrator"), catalogValue("app.platform.molodsha_medychna_sestra"), catalogValue("app.platform.farmatsevt"), catalogValue("app.platform.provizor"), catalogValue("app.platform.zaviduvach_apteky"), catalogValue("app.platform.medychnyy_predstavnyk"), catalogValue("app.platform.klinichnyy_doslidnyk"), catalogValue("app.platform.veterynar"), catalogValue("app.platform.veterynarnyy_feldsher"), catalogValue("app.platform.asystent_veterynara"), catalogValue("app.platform.veterynarnyy_khirurh"), catalogValue("app.platform.epidemioloh"), catalogValue("app.platform.diyetoloh"), catalogValue("app.platform.sportyvnyy_likar")]
}, {
  id: "wellbeing",
  name: translate("app.platform.psykholohiya_reabilitatsiya_ta_sotsialna_dopomoha"),
  category: "health",
  names: [catalogValue("app.platform.psykholoh"), catalogValue("app.platform.klinichnyy_psykholoh"), catalogValue("app.platform.dytyachyy_psykholoh"), catalogValue("app.platform.simeynyy_psykholoh"), catalogValue("app.platform.sportyvnyy_psykholoh"), catalogValue("app.platform.viyskovyy_psykholoh"), catalogValue("app.platform.psykhoterapevt"), catalogValue("app.platform.psykholoh_konsultant"), catalogValue("app.platform.praktychnyy_psykholoh"), catalogValue("app.platform.fizychnyy_terapevt"), catalogValue("app.platform.erhoterapevt"), catalogValue("app.platform.reabilitoloh"), catalogValue("app.platform.asystent_fizychnoho_terapevta"), catalogValue("app.platform.korektsiynyy_pedahoh"), catalogValue("app.platform.defektoloh"), catalogValue("app.platform.surdopedahoh"), catalogValue("app.platform.tyflopedahoh"), catalogValue("app.platform.ava_terapist"), catalogValue("app.platform.fakhivets_iz_rannoho_vtruchannya"), catalogValue("app.platform.sotsialnyy_pratsivnyk"), catalogValue("app.platform.sotsialnyy_pedahoh"), catalogValue("app.platform.sotsialnyy_vykhovatel"), catalogValue("app.platform.keys_menedzher"), catalogValue("app.platform.fakhivets_iz_suprovodu_veteraniv")]
}, {
  id: "beauty",
  name: translate("app.platform.krasa_ta_dohlyad"),
  category: "health",
  names: [catalogValue("app.platform.kosmetoloh"), catalogValue("app.platform.likar_kosmetoloh"), catalogValue("app.platform.kosmetoloh_estetyst"), catalogValue("app.platform.perukar"), catalogValue("app.platform.perukar_koloryst"), catalogValue("app.platform.barber"), catalogValue("app.platform.mayster_manikyuru"), catalogValue("app.platform.mayster_pedykyuru"), catalogValue("app.platform.podoloh"), catalogValue("app.platform.vizazhyst"), catalogValue("app.platform.brovist"), catalogValue("app.platform.leshmeyker"), catalogValue("app.platform.mayster_permanentnoho_makiyazhu"), catalogValue("app.platform.mayster_depilyatsiyi"), catalogValue("app.platform.mayster_lazernoyi_epilyatsiyi"), catalogValue("app.platform.masazhyst"), catalogValue("app.platform.spa_terapevt"), catalogValue("app.platform.mayster_tatu"), catalogValue("app.platform.mayster_pirsynhu"), catalogValue("app.platform.administrator_salonu_krasy"), catalogValue("app.platform.keruyuchyy_salonom_krasy"), catalogValue("app.platform.konsultant_iz_kosmetyky"), catalogValue("app.platform.mayster_iz_naroshchuvannya_volossya"), catalogValue("app.platform.hrumer")]
}, {
  id: "education",
  name: translate("app.platform.osvita_movy_ta_rozvytok_ditey"),
  category: "education",
  names: [catalogValue("app.platform.vchytel"), catalogValue("app.platform.vykladach"), catalogValue("app.platform.repetytor"), catalogValue("app.platform.vykladach_anhliyskoyi_movy"), catalogValue("app.platform.vykladach_nimetskoyi_movy"), catalogValue("app.platform.vykladach_frantsuzkoyi_movy"), catalogValue("app.platform.vykladach_polskoyi_movy"), catalogValue("app.platform.vykladach_ispanskoyi_movy"), catalogValue("app.platform.vykladach_italiyskoyi_movy"), catalogValue("app.platform.vykladach_kytayskoyi_movy"), catalogValue("app.platform.vchytel_ukrayinskoyi_movy"), catalogValue("app.platform.vchytel_matematyky"), catalogValue("app.platform.vchytel_fizyky"), catalogValue("app.platform.vchytel_khimiyi"), catalogValue("app.platform.vchytel_biolohiyi"), catalogValue("app.platform.vchytel_istoriyi"), catalogValue("app.platform.vchytel_heohrafiyi"), catalogValue("app.platform.vchytel_informatyky"), catalogValue("app.platform.vchytel_pochatkovykh_klasiv"), catalogValue("app.platform.vchytel_muzyky"), catalogValue("app.platform.vchytel_fizkultury"), catalogValue("app.platform.asystent_vchytelya"), catalogValue("app.platform.vykhovatel"), catalogValue("app.platform.pomichnyk_vykhovatelya"), catalogValue("app.platform.vykhovatel_hrupy_podovzhenoho_dnya"), catalogValue("app.platform.nyanya"), catalogValue("app.platform.huverner"), catalogValue("app.platform.lohoped"), catalogValue("app.platform.metodyst"), catalogValue("app.platform.dyrektor_shkoly"), catalogValue("app.platform.zaviduvach_dytyachoho_sadka"), catalogValue("app.platform.kerivnyk_navchalnoho_tsentru"), catalogValue("app.platform.pedahoh_orhanizator"), catalogValue("app.platform.vykladach_vokalu"), catalogValue("app.platform.vykladach_hry_na_fortepiano"), catalogValue("app.platform.vykladach_prohramuvannya"), catalogValue("app.platform.tyutor"), catalogValue("app.platform.perekladach"), catalogValue("app.platform.usnyy_perekladach"), catalogValue("app.platform.synkhronnyy_perekladach"), catalogValue("app.platform.pysmovyy_perekladach"), catalogValue("app.platform.lokalizator"), catalogValue("app.platform.osvitniy_konsultant"), catalogValue("app.platform.vykladach_universytetu")]
}, {
  id: "science",
  name: translate("app.platform.nauka_doslidzhennya_ta_laboratoriyi"),
  category: "education",
  names: [catalogValue("app.platform.naukovyy_spivrobitnyk"), catalogValue("app.platform.laborant_doslidnyk"), catalogValue("app.platform.bioloh"), catalogValue("app.platform.mikrobioloh"), catalogValue("app.platform.biotekhnoloh"), catalogValue("app.platform.khimik"), catalogValue("app.platform.khimik_analityk"), catalogValue("app.platform.fizyk"), catalogValue("app.platform.matematyk"), catalogValue("app.platform.statystyk"), catalogValue("app.platform.sotsioloh"), catalogValue("app.platform.politoloh"), catalogValue("app.platform.istoryk"), catalogValue("app.platform.arkheoloh"), catalogValue("app.platform.heoloh"), catalogValue("app.platform.heohraf"), catalogValue("app.platform.meteoroloh"), catalogValue("app.platform.ekoloh"), catalogValue("app.platform.inzhener_doslidnyk"), catalogValue("app.platform.patentoznavets")]
}, {
  id: "logistics",
  name: translate("app.platform.lohistyka_zakupivli_ta_sklad"),
  category: "logistics",
  names: [catalogValue("app.platform.lohist"), catalogValue("app.platform.menedzher_iz_lohistyky"), catalogValue("app.platform.transportnyy_lohist"), catalogValue("app.platform.dyspetcher"), catalogValue("app.platform.dyspetcher_perevezen"), catalogValue("app.platform.ekspedytor"), catalogValue("app.platform.komirnyk"), catalogValue("app.platform.pratsivnyk_skladu"), catalogValue("app.platform.zaviduvach_skladu"), catalogValue("app.platform.nachalnyk_skladu"), catalogValue("app.platform.komplektuvalnyk"), catalogValue("app.platform.pakuvalnyk"), catalogValue("app.platform.vantazhnyk"), catalogValue("app.platform.sortuvalnyk"), catalogValue("app.platform.skanuvalnyk_tovariv"), catalogValue("app.platform.operator_skladskoho_obliku"), catalogValue("app.platform.vodiy_navantazhuvacha"), catalogValue("app.platform.vodiy_shtabelera"), catalogValue("app.platform.menedzher_iz_zakupivel"), catalogValue("app.platform.menedzher_iz_postachannya"), catalogValue("app.platform.bayer"), catalogValue("app.platform.mytnyy_broker"), catalogValue("app.platform.deklarant"), catalogValue("app.platform.menedzher_zed"), catalogValue("app.platform.fakhivets_iz_mizhnarodnykh_perevezen"), catalogValue("app.platform.operator_poshtomata"), catalogValue("app.platform.kur_yer"), catalogValue("app.platform.pishyy_kur_yer"), catalogValue("app.platform.velokur_yer"), catalogValue("app.platform.kur_yer_na_avto"), catalogValue("app.platform.koordynator_dostavky")]
}, {
  id: "transport",
  name: translate("app.platform.transport_i_vodinnya"),
  category: "logistics",
  names: [catalogValue("app.platform.vodiy"), catalogValue("app.platform.vodiy_katehoriyi_b"), catalogValue("app.platform.vodiy_katehoriyi_c"), catalogValue("app.platform.vodiy_katehoriyi_ce"), catalogValue("app.platform.vodiy_katehoriyi_d"), catalogValue("app.platform.vodiy_mizhnarodnyk"), catalogValue("app.platform.vodiy_dalekobiynyk"), catalogValue("app.platform.vodiy_avtobusa"), catalogValue("app.platform.vodiy_marshrutnoho_taksi"), catalogValue("app.platform.vodiy_taksi"), catalogValue("app.platform.osobystyy_vodiy"), catalogValue("app.platform.vodiy_ekspedytor"), catalogValue("app.platform.vodiy_spetstekhniky"), catalogValue("app.platform.vodiy_evakuatora"), catalogValue("app.platform.vodiy_shvydkoyi_dopomohy"), catalogValue("app.platform.vodiy_troleybusa"), catalogValue("app.platform.vodiy_tramvaya"), catalogValue("app.platform.mashynist_lokomotyva"), catalogValue("app.platform.pomichnyk_mashynista"), catalogValue("app.platform.mashynist_metropolitenu"), catalogValue("app.platform.providnyk_pasazhyrskoho_vahona"), catalogValue("app.platform.ohlyadach_vahoniv"), catalogValue("app.platform.skladach_poyizdiv"), catalogValue("app.platform.dyspetcher_zaliznychnoho_transportu"), catalogValue("app.platform.aviadyspetcher"), catalogValue("app.platform.pilot"), catalogValue("app.platform.bortprovidnyk"), catalogValue("app.platform.ahent_z_obsluhovuvannya_pasazhyriv"), catalogValue("app.platform.pratsivnyk_aeroportu")]
}, {
  id: "auto",
  name: translate("app.platform.avtoservis_ta_remont_tekhniky"),
  category: "logistics",
  names: [catalogValue("app.platform.mekhanik"), catalogValue("app.platform.avtomekhanik"), catalogValue("app.platform.avtoslyusar"), catalogValue("app.platform.avtoelektryk"), catalogValue("app.platform.avtodiahnost"), catalogValue("app.platform.avtomalyar"), catalogValue("app.platform.rykhtuvalnyk"), catalogValue("app.platform.shynomontazhnyk"), catalogValue("app.platform.motoryst"), catalogValue("app.platform.mayster_sto"), catalogValue("app.platform.mayster_pryymalnyk"), catalogValue("app.platform.administrator_sto"), catalogValue("app.platform.avtomyynyk"), catalogValue("app.platform.deteyler"), catalogValue("app.platform.tonuvalnyk_avtomobiliv"), catalogValue("app.platform.mayster_iz_remontu_avtoskla"), catalogValue("app.platform.menedzher_iz_prodazhu_avtozapchastyn"), catalogValue("app.platform.vstanovlyuvach_hbo"), catalogValue("app.platform.mekhanik_iz_remontu_spetstekhniky"), catalogValue("app.platform.mayster_iz_remontu_velosypediv"), catalogValue("app.platform.mayster_iz_remontu_mototekhniky"), catalogValue("app.platform.servisnyy_inzhener"), catalogValue("app.platform.mayster_iz_remontu_pobutovoyi_tekhniky"), catalogValue("app.platform.mayster_iz_remontu_telefoniv"), catalogValue("app.platform.mayster_iz_remontu_komp_yuteriv")]
}, {
  id: "maritime",
  name: translate("app.platform.morski_ta_richkovi_spetsialnosti"),
  category: "logistics",
  names: [catalogValue("app.platform.kapitan_sudna"), catalogValue("app.platform.starshyy_pomichnyk_kapitana"), catalogValue("app.platform.pomichnyk_kapitana"), catalogValue("app.platform.matros"), catalogValue("app.platform.botsman"), catalogValue("app.platform.sudnovyy_mekhanik"), catalogValue("app.platform.starshyy_sudnovyy_mekhanik"), catalogValue("app.platform.sudnovyy_elektromekhanik"), catalogValue("app.platform.sudnovyy_kukhar"), catalogValue("app.platform.sudnovyy_ahent"), catalogValue("app.platform.lotsman"), catalogValue("app.platform.portovyy_dyspetcher"), catalogValue("app.platform.doker"), catalogValue("app.platform.kranovyk_portu"), catalogValue("app.platform.inspektor_suden"), catalogValue("app.platform.vodolaz"), catalogValue("app.platform.sudnobudivnyk"), catalogValue("app.platform.menedzher_kryuyinhu")]
}, {
  id: "construction",
  name: translate("app.platform.budivnytstvo_arkhitektura_ta_remont"),
  category: "construction",
  names: [catalogValue("app.platform.budivelnyk"), catalogValue("app.platform.inzhener_budivelnyk"), catalogValue("app.platform.arkhitektor"), catalogValue("app.platform.holovnyy_arkhitektor"), catalogValue("app.platform.inzhener_proyektuvalnyk"), catalogValue("app.platform.inzhener_konstruktor"), catalogValue("app.platform.inzhener_koshtorysnyk"), catalogValue("app.platform.vykonrob"), catalogValue("app.platform.nachalnyk_dilnytsi"), catalogValue("app.platform.mayster_budivelnykh_robit"), catalogValue("app.platform.inzhener_tekhnichnoho_nahlyadu"), catalogValue("app.platform.heodezyst"), catalogValue("app.platform.zemlevporyadnyk"), catalogValue("app.platform.kadastrovyy_reyestrator"), catalogValue("app.platform.mulyar"), catalogValue("app.platform.betonyar"), catalogValue("app.platform.armaturnyk"), catalogValue("app.platform.shtukatur"), catalogValue("app.platform.malyar"), catalogValue("app.platform.plytochnyk"), catalogValue("app.platform.hipsokartonnyk"), catalogValue("app.platform.pokrivelnyk"), catalogValue("app.platform.fasadnyk"), catalogValue("app.platform.uteplyuvach"), catalogValue("app.platform.santekhnik"), catalogValue("app.platform.montazhnyk"), catalogValue("app.platform.montazhnyk_vikon"), catalogValue("app.platform.montazhnyk_dverey"), catalogValue("app.platform.montazhnyk_metalokonstruktsiy"), catalogValue("app.platform.montazhnyk_ventylyatsiyi"), catalogValue("app.platform.montazhnyk_kondytsioneriv"), catalogValue("app.platform.montazhnyk_sonyachnykh_elektrostantsiy"), catalogValue("app.platform.montazhnyk_system_opalennya"), catalogValue("app.platform.montazhnyk_natyazhnykh_stel"), catalogValue("app.platform.parketnyk"), catalogValue("app.platform.stolyar"), catalogValue("app.platform.teslyar"), catalogValue("app.platform.riznorobochyy"), catalogValue("app.platform.mashynist_ekskavatora"), catalogValue("app.platform.mashynist_buldozera"), catalogValue("app.platform.mashynist_avtokrana"), catalogValue("app.platform.mashynist_bashtovoho_krana"), catalogValue("app.platform.burylnyk"), catalogValue("app.platform.promyslovyy_alpinist"), catalogValue("app.platform.dorozhniy_robitnyk"), catalogValue("app.platform.asfaltobetonnyk")]
}, {
  id: "production",
  name: translate("app.platform.vyrobnytstvo_inzhenery_ta_robitnychi_profesiyi"),
  category: "production",
  names: [catalogValue("app.platform.operator_vyrobnytstva"), catalogValue("app.platform.operator_verstativ_z_chpk"), catalogValue("app.platform.nalahodzhuvalnyk_verstativ_z_chpk"), catalogValue("app.platform.prohramist_verstativ_z_chpk"), catalogValue("app.platform.tokar"), catalogValue("app.platform.frezeruvalnyk"), catalogValue("app.platform.shlifuvalnyk"), catalogValue("app.platform.sverdluvalnyk"), catalogValue("app.platform.zvaryuvalnyk"), catalogValue("app.platform.elektrozvaryuvalnyk"), catalogValue("app.platform.arhonnyk"), catalogValue("app.platform.hazorizalnyk"), catalogValue("app.platform.slyusar"), catalogValue("app.platform.slyusar_remontnyk"), catalogValue("app.platform.slyusar_skladalnyk"), catalogValue("app.platform.elektroslyusar"), catalogValue("app.platform.elektryk"), catalogValue("app.platform.elektromonter"), catalogValue("app.platform.elektromekhanik"), catalogValue("app.platform.elektronik"), catalogValue("app.platform.montazhnyk_radioelektronnoyi_aparatury"), catalogValue("app.platform.payalnyk"), catalogValue("app.platform.inzhener_mekhanik"), catalogValue("app.platform.inzhener_elektryk"), catalogValue("app.platform.inzhener_elektronik"), catalogValue("app.platform.inzhener_tekhnoloh"), catalogValue("app.platform.tekhnoloh"), catalogValue("app.platform.holovnyy_inzhener"), catalogValue("app.platform.inzhener_iz_yakosti"), catalogValue("app.platform.kontroler_yakosti"), catalogValue("app.platform.inzhener_iz_metrolohiyi"), catalogValue("app.platform.inzhener_iz_standartyzatsiyi"), catalogValue("app.platform.inzhener_z_okhorony_pratsi"), catalogValue("app.platform.inzhener_iz_pozhezhnoyi_bezpeky"), catalogValue("app.platform.mayster_vyrobnytstva"), catalogValue("app.platform.nachalnyk_tsekhu"), catalogValue("app.platform.operator_liniyi"), catalogValue("app.platform.operator_fasuvalnoyi_liniyi"), catalogValue("app.platform.operator_termoplastavtomata"), catalogValue("app.platform.lyvarnyk"), catalogValue("app.platform.koval"), catalogValue("app.platform.termist"), catalogValue("app.platform.halvanik"), catalogValue("app.platform.skladalnyk"), catalogValue("app.platform.skladalnyk_mebliv"), catalogValue("app.platform.meblyar"), catalogValue("app.platform.operator_derevoobrobnykh_verstativ"), catalogValue("app.platform.rizbyar_po_derevu"), catalogValue("app.platform.mayster_iz_kamenyu"), catalogValue("app.platform.sklyar"), catalogValue("app.platform.rizalnyk_skla"), catalogValue("app.platform.shvachka"), catalogValue("app.platform.kravets"), catalogValue("app.platform.zakriynyk"), catalogValue("app.platform.vyshyvalnyk"), catalogValue("app.platform.prasuvalnyk"), catalogValue("app.platform.obbyvalnyk_mebliv"), catalogValue("app.platform.vzuttovyk"), catalogValue("app.platform.yuvelir"), catalogValue("app.platform.hodynnykar")]
}, {
  id: "food",
  name: translate("app.platform.kharchove_vyrobnytstvo"),
  category: "production",
  names: [catalogValue("app.platform.tekhnoloh_kharchovoho_vyrobnytstva"), catalogValue("app.platform.tekhnoloh_m_yasnoho_vyrobnytstva"), catalogValue("app.platform.tekhnoloh_molochnoho_vyrobnytstva"), catalogValue("app.platform.tekhnoloh_khlibopekarskoho_vyrobnytstva"), catalogValue("app.platform.obvalyuvalnyk_m_yasa"), catalogValue("app.platform.zhyluvalnyk_m_yasa"), catalogValue("app.platform.m_yasnyk"), catalogValue("app.platform.kovbasnyk"), catalogValue("app.platform.koptylnyk"), catalogValue("app.platform.syrovar"), catalogValue("app.platform.maslorob"), catalogValue("app.platform.pyvovar"), catalogValue("app.platform.vynorob"), catalogValue("app.platform.kupazhyst"), catalogValue("app.platform.operator_kharchovoyi_liniyi"), catalogValue("app.platform.operator_rozlyvu"), catalogValue("app.platform.fasuvalnyk"), catalogValue("app.platform.kalibruvalnyk_produktsiyi"), catalogValue("app.platform.kontroler_kharchovoyi_bezpeky"), catalogValue("app.platform.laborant_kharchovoho_vyrobnytstva")]
}, {
  id: "agro",
  name: translate("app.platform.ahro_tvarynnytstvo_ta_lisove_hospodarstvo"),
  category: "production",
  names: [catalogValue("app.platform.ahronom"), catalogValue("app.platform.holovnyy_ahronom"), catalogValue("app.platform.ahronom_konsultant"), catalogValue("app.platform.ahrokhimik"), catalogValue("app.platform.ahroinzhener"), catalogValue("app.platform.traktoryst"), catalogValue("app.platform.kombayner"), catalogValue("app.platform.mekhanizator"), catalogValue("app.platform.pratsivnyk_fermy"), catalogValue("app.platform.doyar"), catalogValue("app.platform.operator_mashynnoho_doyinnya"), catalogValue("app.platform.zootekhnik"), catalogValue("app.platform.tvarynnyk"), catalogValue("app.platform.svynar"), catalogValue("app.platform.ptakhivnyk"), catalogValue("app.platform.konyukh"), catalogValue("app.platform.pastukh"), catalogValue("app.platform.bdzholyar"), catalogValue("app.platform.rybovod"), catalogValue("app.platform.pratsivnyk_teplytsi"), catalogValue("app.platform.ovochivnyk"), catalogValue("app.platform.sadivnyk"), catalogValue("app.platform.kvitnykar"), catalogValue("app.platform.pratsivnyk_rozsadnyka"), catalogValue("app.platform.vynohradar"), catalogValue("app.platform.hrybivnyk"), catalogValue("app.platform.lisnyk"), catalogValue("app.platform.lisnychyy"), catalogValue("app.platform.lisorub"), catalogValue("app.platform.operator_kharvestera"), catalogValue("app.platform.operator_elevatora"), catalogValue("app.platform.mayster_zernovoho_kompleksu"), catalogValue("app.platform.laborant_zernovoyi_laboratoriyi"), catalogValue("app.platform.operator_ahrodrona"), catalogValue("app.platform.fakhivets_iz_tochnoho_zemlerobstva")]
}, {
  id: "energy",
  name: translate("app.platform.enerhetyka_vydobuvannya_ta_komunalni_systemy"),
  category: "production",
  names: [catalogValue("app.platform.enerhetyk"), catalogValue("app.platform.holovnyy_enerhetyk"), catalogValue("app.platform.inzhener_enerhetyk"), catalogValue("app.platform.inzhener_teplotekhnik"), catalogValue("app.platform.inzhener_kvpia"), catalogValue("app.platform.inzhener_z_avtomatyzatsiyi"), catalogValue("app.platform.dyspetcher_enerhosystemy"), catalogValue("app.platform.elektromonter_liniy_elektroperedachi"), catalogValue("app.platform.operator_kotelni"), catalogValue("app.platform.mashynist_kotelni"), catalogValue("app.platform.mashynist_turbiny"), catalogValue("app.platform.operator_azs"), catalogValue("app.platform.mashynist_nasosnykh_ustanovok"), catalogValue("app.platform.slyusar_hazovoho_hospodarstva"), catalogValue("app.platform.obkhidnyk_hazoprovodu"), catalogValue("app.platform.mayster_vodopostachannya"), catalogValue("app.platform.operator_ochysnykh_sporud"), catalogValue("app.platform.hirnychyy_inzhener"), catalogValue("app.platform.shakhtar"), catalogValue("app.platform.prokhidnyk"), catalogValue("app.platform.marksheyder"), catalogValue("app.platform.zbahachuvach"), catalogValue("app.platform.burovyy_mayster"), catalogValue("app.platform.operator_naftohazovydobuvannya"), catalogValue("app.platform.inzhener_vidnovlyuvanoyi_enerhetyky")]
}, {
  id: "telecom",
  name: translate("app.platform.telekomunikatsiyi_ta_systemy_zv_yazku"),
  category: "it",
  names: [catalogValue("app.platform.inzhener_zv_yazku"), catalogValue("app.platform.telekomunikatsiynyy_inzhener"), catalogValue("app.platform.montazhnyk_internetu"), catalogValue("app.platform.montazhnyk_volokonno_optychnykh_liniy"), catalogValue("app.platform.zvaryuvalnyk_optovolokna"), catalogValue("app.platform.merezhevyy_inzhener"), catalogValue("app.platform.radioinzhener"), catalogValue("app.platform.radiotekhnik"), catalogValue("app.platform.tekhnik_zv_yazku"), catalogValue("app.platform.inzhener_bazovykh_stantsiy"), catalogValue("app.platform.montazhnyk_system_videosposterezhennya"), catalogValue("app.platform.montazhnyk_okhoronnoyi_syhnalizatsiyi"), catalogValue("app.platform.inzhener_slabkostrumovykh_system"), catalogValue("app.platform.kabelnyk"), catalogValue("app.platform.operator_telekomunikatsiynoyi_merezhi")]
}, {
  id: "security",
  name: translate("app.platform.okhorona_ta_tsyvilna_bezpeka"),
  category: "other",
  names: [catalogValue("app.platform.okhoronnyk"), catalogValue("app.platform.okhoronets"), catalogValue("app.platform.osobystyy_okhoronets"), catalogValue("app.platform.nachalnyk_okhorony"), catalogValue("app.platform.inspektor_okhorony"), catalogValue("app.platform.operator_videosposterezhennya"), catalogValue("app.platform.operator_pulta_okhorony"), catalogValue("app.platform.inkasator"), catalogValue("app.platform.kontroler_sluzhby_bezpeky"), catalogValue("app.platform.fakhivets_iz_ekonomichnoyi_bezpeky"), catalogValue("app.platform.detektyv"), catalogValue("app.platform.politseyskyy"), catalogValue("app.platform.patrulnyy_politseyskyy"), catalogValue("app.platform.kinoloh"), catalogValue("app.platform.pozhezhnyk"), catalogValue("app.platform.ryatuvalnyk"), catalogValue("app.platform.ryatuvalnyk_na_vodi"), catalogValue("app.platform.saper_humanitarnoho_rozminuvannya"), catalogValue("app.platform.instruktor_iz_minnoyi_bezpeky"), catalogValue("app.platform.fakhivets_iz_tsyvilnoho_zakhystu")]
}, {
  id: "services",
  name: translate("app.platform.pobutovi_posluhy_ta_domashniy_personal"),
  category: "other",
  names: [catalogValue("app.platform.prybyralnyk"), catalogValue("app.platform.prybyralnytsya"), catalogValue("app.platform.dvirnyk"), catalogValue("app.platform.domrobitnytsya"), catalogValue("app.platform.dohlyadalnyk"), catalogValue("app.platform.dohlyadalnytsya"), catalogValue("app.platform.simeynyy_pomichnyk"), catalogValue("app.platform.konsyerzh_budynku"), catalogValue("app.platform.komendant"), catalogValue("app.platform.robitnyk_iz_kompleksnoho_obsluhovuvannya_budivel"), catalogValue("app.platform.kliner"), catalogValue("app.platform.myynyk_vikon"), catalogValue("app.platform.operator_khimchystky"), catalogValue("app.platform.pryymalnyk_khimchystky"), catalogValue("app.platform.mayster_iz_remontu_odyahu"), catalogValue("app.platform.mayster_iz_remontu_vzuttya"), catalogValue("app.platform.mayster_iz_vyhotovlennya_klyuchiv"), catalogValue("app.platform.mayster_iz_remontu_zamkiv"), catalogValue("app.platform.sadivnyk_iz_dohlyadu_za_dilyankoyu"), catalogValue("app.platform.landshaftnyy_robitnyk"), catalogValue("app.platform.dezinfektor"), catalogValue("app.platform.ozelenyuvach"), catalogValue("app.platform.pet_siter"), catalogValue("app.platform.vyhulnyk_sobak"), catalogValue("app.platform.dresyruvalnyk"), catalogValue("app.platform.pratsivnyk_prytulku_dlya_tvaryn"), catalogValue("app.platform.orhanizator_prostoru"), catalogValue("app.platform.ahent_rytualnykh_posluh")]
}, {
  id: "public",
  name: translate("app.platform.derzhavna_sluzhba_ta_hromadskyy_sektor"),
  category: "office",
  names: [catalogValue("app.platform.derzhavnyy_sluzhbovets"), catalogValue("app.platform.holovnyy_spetsialist_derzhavnoyi_ustanovy"), catalogValue("app.platform.spetsialist_orhanu_mistsevoho_samovryaduvannya"), catalogValue("app.platform.administrator_tsnap"), catalogValue("app.platform.derzhavnyy_reyestrator"), catalogValue("app.platform.fakhivets_iz_publichnykh_zakupivel"), catalogValue("app.platform.fakhivets_iz_mizhnarodnykh_vidnosyn"), catalogValue("app.platform.dyplomat"), catalogValue("app.platform.hrant_menedzher"), catalogValue("app.platform.fandreyzer"), catalogValue("app.platform.koordynator_volonteriv"), catalogValue("app.platform.menedzher_humanitarnykh_proyektiv"), catalogValue("app.platform.koordynator_humanitarnoyi_dopomohy"), catalogValue("app.platform.fakhivets_iz_monitorynhu_ta_otsinyuvannya"), catalogValue("app.platform.fakhivets_iz_advokatsiyi"), catalogValue("app.platform.fakhivets_iz_roboty_z_hromadamy"), catalogValue("app.platform.menedzher_hromadskoyi_orhanizatsiyi"), catalogValue("app.platform.menedzher_blahodiynoho_fondu"), catalogValue("app.platform.proyektnyy_asystent"), catalogValue("app.platform.fakhivets_iz_humanitarnoho_zakhystu")]
}, {
  id: "military",
  name: translate("app.platform.syly_oborony_ta_oboronni_tekhnolohiyi"),
  category: "other",
  names: [catalogValue("app.platform.viyskovosluzhbovets"), catalogValue("app.platform.strilets"), catalogValue("app.platform.hranatometnyk"), catalogValue("app.platform.kulemetnyk"), catalogValue("app.platform.rozvidnyk"), catalogValue("app.platform.viyskovyy_vodiy"), catalogValue("app.platform.mekhanik_vodiy"), catalogValue("app.platform.operator_bpla"), catalogValue("app.platform.operator_fpv_drona"), catalogValue("app.platform.inzhener_bpla"), catalogValue("app.platform.tekhnik_bpla"), catalogValue("app.platform.instruktor_bpla"), catalogValue("app.platform.operator_reb"), catalogValue("app.platform.fakhivets_iz_radioelektronnoyi_rozvidky"), catalogValue("app.platform.viyskovyy_zv_yazkivets"), catalogValue("app.platform.boyovyy_medyk"), catalogValue("app.platform.viyskovyy_feldsher"), catalogValue("app.platform.viyskovyy_kukhar"), catalogValue("app.platform.viyskovyy_lohist"), catalogValue("app.platform.viyskovyy_dilovod"), catalogValue("app.platform.instruktor_iz_taktychnoyi_medytsyny"), catalogValue("app.platform.mayster_iz_remontu_ozbroyennya"), catalogValue("app.platform.inzhener_oboronnykh_system"), catalogValue("app.platform.fakhivets_iz_viyskovoho_rekrutynhu")]
}, {
  id: "other",
  name: translate("app.platform.inshi_spetsialnosti"),
  category: "other",
  names: [catalogValue("app.platform.insha_spetsialnist")]
}].flatMap(a => a.names.map(b => ({
  name: b,
  category: a.category,
  section: a.id
})));
let e = {
    [catalogValue("app.platform.yuryst")]: [catalogValue("app.platform.yuryskonsult_2"), catalogValue("catalog.terms.lawyer"), catalogValue("app.platform.yurysty"), catalogValue("app.platform.yurystka")],
    [catalogValue("app.platform.advokat")]: [catalogValue("catalog.terms.advocate"), catalogValue("catalog.terms.attorney"), catalogValue("app.platform.advokaty"), catalogValue("app.platform.advokatka")],
    [catalogValue("app.platform.pomichnyk_advokata")]: [catalogValue("app.platform.pomoshchnyk_advokata"), catalogValue("app.platform.pomichnytsya_advokata"), catalogValue("catalog.terms.legal_assistant")],
    [catalogValue("app.platform.notarius")]: [catalogValue("app.platform.notaryus"), catalogValue("app.platform.notariuska")],
    [catalogValue("app.platform.pryvatnyy_vykonavets")]: [catalogValue("app.platform.chastnyy_yspolnytel")],
    [catalogValue("app.platform.komplayens_ofitser")]: [catalogValue("catalog.terms.compliance_officer"), catalogValue("app.platform.komplaens")],
    [catalogValue("app.platform.fakhivets_iz_zakhystu_personalnykh_danykh")]: [catalogValue("catalog.terms.dpo"), catalogValue("catalog.terms.data_protection_officer")],
    [catalogValue("app.platform.trener")]: [catalogValue("catalog.terms.coach"), catalogValue("app.platform.trenery"), catalogValue("app.platform.trenerka")],
    [catalogValue("app.platform.fitnes_trener")]: [catalogValue("catalog.terms.fitness"), catalogValue("app.platform.fytnes"), catalogValue("app.platform.instruktor_z_fitnesu")],
    [catalogValue("app.platform.personalnyy_trener")]: [catalogValue("catalog.terms.personal_trainer"), catalogValue("app.platform.personalnyy_trener_2")],
    [catalogValue("app.platform.trener_z_yohy")]: [catalogValue("catalog.terms.yoga"), catalogValue("app.platform.yoha"), catalogValue("app.platform.yohy"), catalogValue("app.platform.instruktor_yohy"), catalogValue("app.platform.ynstruktor_yohy")],
    [catalogValue("app.platform.instruktor_z_pilatesu")]: [catalogValue("app.platform.pylates"), catalogValue("app.platform.pilates"), catalogValue("catalog.terms.pilates")],
    [catalogValue("app.platform.trener_zi_stretchynhu")]: [catalogValue("catalog.terms.stretching"), catalogValue("app.platform.rastyazhka"), catalogValue("app.platform.roztyazhka"), catalogValue("app.platform.stretchynh")],
    [catalogValue("app.platform.trener_iz_krosfitu")]: [catalogValue("app.platform.krossfyt"), catalogValue("catalog.terms.crossfit")],
    [catalogValue("app.platform.trener_z_plavannya")]: [catalogValue("app.platform.plavanye"), catalogValue("catalog.terms.swimming")],
    [catalogValue("app.platform.khoreohraf")]: [catalogValue("catalog.terms.choreographer"), catalogValue("app.platform.tantsy"), catalogValue("app.platform.tantsi")],
    [catalogValue("app.platform.model")]: [catalogValue("catalog.terms.model"), catalogValue("app.platform.modely"), catalogValue("app.platform.modellyu")],
    [catalogValue("app.platform.fotomodel")]: [catalogValue("catalog.terms.photo_model"), catalogValue("catalog.terms.photomodel"), catalogValue("app.platform.fotomodely")],
    [catalogValue("app.platform.podiumna_model")]: [catalogValue("catalog.terms.runway_model"), catalogValue("app.platform.podyumnaya_model")],
    [catalogValue("app.platform.model_plus_size")]: [catalogValue("catalog.terms.plus_size"), catalogValue("app.platform.plyus_sayz"), catalogValue("app.platform.plyus_sayz_2")],
    [catalogValue("app.platform.model_dlya_prymirok")]: [catalogValue("catalog.terms.fit_model"), catalogValue("app.platform.prymerochnaya_model")],
    [catalogValue("app.platform.buker_modelnoho_ahentstva")]: [catalogValue("catalog.terms.model_booker"), catalogValue("app.platform.buker")],
    [catalogValue("app.platform.stylist")]: [catalogValue("app.platform.stylyst"), catalogValue("catalog.terms.stylist")],
    [catalogValue("app.platform.smm_menedzher")]: [catalogValue("app.platform.smm"), catalogValue("catalog.terms.smm"), catalogValue("catalog.terms.sms"), catalogValue("app.platform.sotsmerezh"), catalogValue("app.platform.sotsyalnykh_setey"), catalogValue("catalog.terms.social_media_manager")],
    [catalogValue("app.platform.seo_fakhivets")]: [catalogValue("catalog.terms.seo"), catalogValue("app.platform.seo"), catalogValue("app.platform.seoshnyk")],
    [catalogValue("app.platform.ppc_fakhivets")]: [catalogValue("catalog.terms.ppc"), catalogValue("app.platform.kontekstoloh"), catalogValue("app.platform.kontekstnaya_reklama"), catalogValue("catalog.terms.google_ads")],
    [catalogValue("app.platform.tarhetoloh")]: [catalogValue("app.platform.tarhet"), catalogValue("catalog.terms.targeting"), catalogValue("catalog.terms.facebook_ads"), catalogValue("catalog.terms.meta_ads")],
    [catalogValue("app.platform.kopirayter")]: [catalogValue("app.platform.kopyrayter"), catalogValue("catalog.terms.copywriter")],
    [catalogValue("app.platform.kontent_menedzher")]: [catalogValue("app.platform.kontent_menedzher_2"), catalogValue("catalog.terms.content_manager")],
    [catalogValue("app.platform.prohramist")]: [catalogValue("app.platform.prohrammyst"), catalogValue("catalog.terms.developer"), catalogValue("app.platform.rozrobnyk"), catalogValue("catalog.terms.software_engineer")],
    [catalogValue("app.platform.frontend_rozrobnyk")]: [catalogValue("catalog.terms.frontend"), catalogValue("catalog.terms.front_end"), catalogValue("app.platform.frontend"), catalogValue("app.platform.verstalshchyk")],
    [catalogValue("app.platform.backend_rozrobnyk")]: [catalogValue("catalog.terms.backend"), catalogValue("catalog.terms.back_end"), catalogValue("app.platform.bekend"), catalogValue("app.platform.bekend_2")],
    [catalogValue("app.platform.fullstack_rozrobnyk")]: [catalogValue("catalog.terms.full_stack"), catalogValue("catalog.terms.fullstack"), catalogValue("app.platform.fulstek")],
    [catalogValue("app.platform.testuvalnyk")]: [catalogValue("app.platform.testyrovshchyk"), catalogValue("catalog.terms.qa"), catalogValue("catalog.terms.tester")],
    [catalogValue("app.platform.systemnyy_administrator")]: [catalogValue("app.platform.sysadmin"), catalogValue("app.platform.sysadmyn"), catalogValue("app.platform.systemnyy_admynystrator"), catalogValue("catalog.terms.sysadmin")],
    [catalogValue("app.platform.analityk_danykh")]: [catalogValue("catalog.terms.data_analyst"), catalogValue("app.platform.analytyk_dannykh")],
    "Data Scientist": [catalogValue("app.platform.data_sayentyst"), catalogValue("app.platform.data_sayentyst_2")],
    [catalogValue("app.platform.ai_inzhener")]: [catalogValue("app.platform.shtuchnyy_intelekt"), catalogValue("app.platform.yskusstvennyy_yntellekt"), catalogValue("catalog.terms.ai_engineer")],
    [catalogValue("app.platform.inzhener_iz_kiberbezpeky")]: [catalogValue("catalog.terms.cybersecurity"), catalogValue("app.platform.kyberbezopasnost")],
    [catalogValue("app.platform.pentester")]: [catalogValue("catalog.terms.pentester"), catalogValue("catalog.terms.penetration_tester")],
    [catalogValue("app.platform.ux_ui_dyzayner")]: [catalogValue("catalog.terms.ui_ux"), catalogValue("catalog.terms.ux_ui"), catalogValue("catalog.terms.ux_designer"), catalogValue("catalog.terms.ui_designer")],
    [catalogValue("app.platform.hrafichnyy_dyzayner")]: [catalogValue("app.platform.hrafycheskyy_dyzayner"), catalogValue("catalog.terms.graphic_designer")],
    [catalogValue("app.platform.videomontazher")]: [catalogValue("app.platform.montazher"), catalogValue("app.platform.videomontazh"), catalogValue("app.platform.vydeomontazh"), catalogValue("catalog.terms.video_editor")],
    [catalogValue("app.platform.fotohraf")]: [catalogValue("catalog.terms.photographer"), catalogValue("app.platform.fotohrafka")],
    [catalogValue("app.platform.videohraf")]: [catalogValue("app.platform.vydeohraf"), catalogValue("catalog.terms.videographer")],
    [catalogValue("app.platform.modelyer")]: [catalogValue("app.platform.modeler"), catalogValue("catalog.terms.fashion_designer")],
    [catalogValue("app.platform.hr_menedzher")]: [catalogValue("catalog.terms.hr"), catalogValue("app.platform.eychar"), catalogValue("app.platform.eychar_2"), catalogValue("app.platform.menedzher_po_personalu")],
    [catalogValue("app.platform.rekruter")]: [catalogValue("catalog.terms.recruiter"), catalogValue("app.platform.rekruterka")],
    [catalogValue("app.platform.biznes_trener")]: [catalogValue("app.platform.byznes_trener"), catalogValue("catalog.terms.business_trainer")],
    [catalogValue("app.platform.kar_yernyy_konsultant")]: [catalogValue("app.platform.karernyy_konsultant"), catalogValue("catalog.terms.career_advisor")],
    [catalogValue("app.platform.menedzher_z_prodazhu")]: [catalogValue("catalog.terms.sales"), catalogValue("app.platform.prodazh"), catalogValue("app.platform.prodazham"), catalogValue("app.platform.menedzher_po_prodazham")],
    [catalogValue("app.platform.menedzher_iz_klyuchovykh_kliyentiv")]: [catalogValue("catalog.terms.key_account_manager"), catalogValue("catalog.terms.kam")],
    [catalogValue("app.platform.prodavets_konsultant")]: [catalogValue("app.platform.prodavets_konsultant_2"), catalogValue("app.platform.prodavchynya"), catalogValue("app.platform.prodavtsy")],
    [catalogValue("app.platform.merchendayzer")]: [catalogValue("catalog.terms.merchandiser"), catalogValue("app.platform.merchendayzynh")],
    [catalogValue("app.platform.menedzher_internet_mahazynu")]: [catalogValue("app.platform.ynternet_mahazyn"), catalogValue("catalog.terms.ecommerce_manager"), catalogValue("catalog.terms.e_commerce")],
    [catalogValue("app.platform.riyeltor")]: [catalogValue("app.platform.ryeltor"), catalogValue("app.platform.rieltor"), catalogValue("catalog.terms.realtor")],
    [catalogValue("app.platform.bukhhalter")]: [catalogValue("catalog.terms.accountant"), catalogValue("app.platform.bukhhalterka")],
    [catalogValue("app.platform.holovnyy_bukhhalter")]: [catalogValue("app.platform.hlavnyy_bukhhalter"), catalogValue("app.platform.hlavbukh"), catalogValue("catalog.terms.chief_accountant")],
    [catalogValue("app.platform.finansovyy_dyrektor")]: [catalogValue("catalog.terms.cfo"), catalogValue("app.platform.fynansovyy_dyrektor")],
    [catalogValue("app.platform.heneralnyy_dyrektor")]: [catalogValue("catalog.terms.ceo"), catalogValue("app.platform.heneralnyy_dyrektor_2")],
    [catalogValue("app.platform.operatsiynyy_dyrektor")]: [catalogValue("catalog.terms.coo"), catalogValue("app.platform.operatsyonnyy_dyrektor")],
    [catalogValue("app.platform.asystent_kerivnyka")]: [catalogValue("app.platform.assystent_rukovodytelya"), catalogValue("app.platform.pomoshchnyk_rukovodytelya"), catalogValue("catalog.terms.executive_assistant")],
    [catalogValue("app.platform.ofis_menedzher")]: [catalogValue("app.platform.ofys_menedzher"), catalogValue("catalog.terms.office_manager")],
    [catalogValue("app.platform.operator_kontakt_tsentru")]: [catalogValue("app.platform.koll_tsentr"), catalogValue("catalog.terms.call_center"), catalogValue("app.platform.call_tsentr"), catalogValue("app.platform.operator_koltsentru"), catalogValue("app.platform.operator_koll_tsentra")],
    [catalogValue("app.platform.operator_chatu")]: [catalogValue("app.platform.chat_menedzher"), catalogValue("app.platform.chat_menedzherka"), catalogValue("app.platform.operator_chata"), catalogValue("catalog.terms.chat_support")],
    [catalogValue("app.platform.kukhar")]: [catalogValue("app.platform.povar"), catalogValue("catalog.terms.cook"), catalogValue("app.platform.kukharka")],
    [catalogValue("app.platform.shef_kukhar")]: [catalogValue("app.platform.shef_povar"), catalogValue("catalog.terms.chef")],
    [catalogValue("app.platform.ofitsiant")]: [catalogValue("app.platform.ofytsyant"), catalogValue("app.platform.ofitsiantka"), catalogValue("catalog.terms.waiter"), catalogValue("catalog.terms.waitress")],
    [catalogValue("app.platform.pekar")]: [catalogValue("app.platform.pekar_2"), catalogValue("catalog.terms.baker")],
    [catalogValue("app.platform.pokoyivka")]: [catalogValue("app.platform.hornychnaya"), catalogValue("catalog.terms.housekeeper")],
    [catalogValue("app.platform.turystychnyy_ahent")]: [catalogValue("app.platform.turahent"), catalogValue("catalog.terms.travel_agent")],
    [catalogValue("app.platform.likar")]: [catalogValue("app.platform.vrach"), catalogValue("catalog.terms.doctor"), catalogValue("app.platform.likarka")],
    [catalogValue("app.platform.medychna_sestra")]: [catalogValue("app.platform.medsestra"), catalogValue("app.platform.medsestry"), catalogValue("catalog.terms.nurse")],
    [catalogValue("app.platform.medychnyy_brat")]: [catalogValue("app.platform.medbrat")],
    [catalogValue("app.platform.stomatoloh")]: [catalogValue("catalog.terms.dentist"), catalogValue("app.platform.zubnyy_likar")],
    [catalogValue("app.platform.farmatsevt")]: [catalogValue("catalog.terms.pharmacist"), catalogValue("app.platform.farmatsevtka")],
    [catalogValue("app.platform.veterynar")]: [catalogValue("app.platform.veterynarnyy_vrach"), catalogValue("catalog.terms.veterinarian")],
    [catalogValue("app.platform.psykholoh")]: [catalogValue("catalog.terms.psychologist"), catalogValue("app.platform.psykholohynya")],
    [catalogValue("app.platform.psykhoterapevt")]: [catalogValue("catalog.terms.psychotherapist"), catalogValue("app.platform.psykhoterapevtka")],
    [catalogValue("app.platform.reabilitoloh")]: [catalogValue("app.platform.reabylytoloh"), catalogValue("app.platform.reabilitatsiya")],
    [catalogValue("app.platform.masazhyst")]: [catalogValue("app.platform.massazhyst"), catalogValue("app.platform.masazhystka"), catalogValue("catalog.terms.massage_therapist")],
    [catalogValue("app.platform.perukar")]: [catalogValue("app.platform.parykmakher"), catalogValue("catalog.terms.hairdresser"), catalogValue("app.platform.perukarka")],
    [catalogValue("app.platform.vizazhyst")]: [catalogValue("app.platform.vyzazhyst"), catalogValue("catalog.terms.makeup_artist"), catalogValue("app.platform.vizazhystka")],
    [catalogValue("app.platform.mayster_manikyuru")]: [catalogValue("app.platform.manykyur"), catalogValue("app.platform.manikyur"), catalogValue("catalog.terms.nail_technician")],
    [catalogValue("app.platform.brovist")]: [catalogValue("app.platform.brovyst"), catalogValue("catalog.terms.brow_artist")],
    [catalogValue("app.platform.leshmeyker")]: [catalogValue("catalog.terms.lash_artist"), catalogValue("app.platform.naroshchuvannya_viy"), catalogValue("app.platform.narashchyvanye_resnyts")],
    [catalogValue("app.platform.hrumer")]: [catalogValue("catalog.terms.groomer"), catalogValue("app.platform.hrummer")],
    [catalogValue("app.platform.vchytel")]: [catalogValue("app.platform.uchytel"), catalogValue("app.platform.uchytelnytsa"), catalogValue("app.platform.vchytelka"), catalogValue("catalog.terms.teacher")],
    [catalogValue("app.platform.vykladach_anhliyskoyi_movy")]: [catalogValue("catalog.terms.english_teacher"), catalogValue("app.platform.uchytel_anhlyyskoho"), catalogValue("app.platform.vchytel_anhliyskoyi"), catalogValue("app.platform.anhliyska")],
    [catalogValue("app.platform.vykhovatel")]: [catalogValue("app.platform.vospytatel"), catalogValue("app.platform.vykhovatelka")],
    [catalogValue("app.platform.nyanya")]: [catalogValue("catalog.terms.nanny"), catalogValue("app.platform.bebisiter"), catalogValue("app.platform.bebysytter"), catalogValue("catalog.terms.babysitter")],
    [catalogValue("app.platform.perekladach")]: [catalogValue("app.platform.perevodchyk"), catalogValue("catalog.terms.translator"), catalogValue("app.platform.perekladachka")],
    [catalogValue("app.platform.vodiy")]: [catalogValue("app.platform.vodytel"), catalogValue("catalog.terms.driver"), catalogValue("app.platform.vodiyka")],
    [catalogValue("app.platform.vodiy_mizhnarodnyk")]: [catalogValue("app.platform.dalnoboyshchyk"), catalogValue("app.platform.mizhnarodni_perevezennya"), catalogValue("catalog.terms.truck_driver")],
    [catalogValue("app.platform.kur_yer")]: [catalogValue("app.platform.kurer"), catalogValue("catalog.terms.courier"), catalogValue("app.platform.dostavka")],
    [catalogValue("app.platform.komirnyk")]: [catalogValue("app.platform.kladovshchyk"), catalogValue("catalog.terms.warehouse_keeper"), catalogValue("app.platform.komirnytsya")],
    [catalogValue("app.platform.vantazhnyk")]: [catalogValue("app.platform.hruzchyk"), catalogValue("catalog.terms.loader")],
    [catalogValue("app.platform.lohist")]: [catalogValue("app.platform.lohyst"), catalogValue("catalog.terms.logistics")],
    [catalogValue("app.platform.avtoslyusar")]: [catalogValue("app.platform.avtoslesar"), catalogValue("catalog.terms.car_mechanic")],
    [catalogValue("app.platform.shynomontazhnyk")]: [catalogValue("app.platform.shynomontazh"), catalogValue("catalog.terms.tyre_fitter")],
    [catalogValue("app.platform.budivelnyk")]: [catalogValue("app.platform.stroytel"), catalogValue("catalog.terms.builder")],
    [catalogValue("app.platform.vykonrob")]: [catalogValue("app.platform.prorab"), catalogValue("catalog.terms.foreman")],
    [catalogValue("app.platform.plytochnyk")]: [catalogValue("app.platform.plytochnyk_oblytsovshchyk"), catalogValue("catalog.terms.tiler")],
    [catalogValue("app.platform.inzhener_koshtorysnyk")]: [catalogValue("app.platform.smetchyk"), catalogValue("app.platform.koshtorysnyk"), catalogValue("catalog.terms.estimator")],
    [catalogValue("app.platform.zvaryuvalnyk")]: [catalogValue("app.platform.svarshchyk"), catalogValue("catalog.terms.welder")],
    [catalogValue("app.platform.shvachka")]: [catalogValue("app.platform.shveya"), catalogValue("catalog.terms.seamstress")],
    [catalogValue("app.platform.slyusar")]: [catalogValue("app.platform.slesar")],
    [catalogValue("app.platform.tokar")]: [catalogValue("app.platform.tokar_2"), catalogValue("catalog.terms.turner")],
    [catalogValue("app.platform.elektryk")]: [catalogValue("app.platform.elektryk_2"), catalogValue("catalog.terms.electrician")],
    [catalogValue("app.platform.doyar")]: [catalogValue("app.platform.doyarka"), catalogValue("app.platform.doyinnya"), catalogValue("app.platform.doenyya")],
    [catalogValue("app.platform.operator_mashynnoho_doyinnya")]: [catalogValue("app.platform.operator_mashynnoho_doenyya")],
    [catalogValue("app.platform.traktoryst")]: [catalogValue("app.platform.traktorystka"), catalogValue("catalog.terms.tractor_driver")],
    [catalogValue("app.platform.ahronom")]: [catalogValue("catalog.terms.agronomist")],
    [catalogValue("app.platform.prybyralnyk")]: [catalogValue("app.platform.uborshchyk"), catalogValue("catalog.terms.cleaner")],
    [catalogValue("app.platform.prybyralnytsya")]: [catalogValue("app.platform.uborshchytsa")],
    [catalogValue("app.platform.dohlyadalnytsya")]: [catalogValue("app.platform.sydelka"), catalogValue("catalog.terms.caregiver")],
    [catalogValue("app.platform.domrobitnytsya")]: [catalogValue("app.platform.domrabotnytsa")],
    [catalogValue("app.platform.okhoronnyk")]: [catalogValue("app.platform.okhrannyk"), catalogValue("catalog.terms.security_guard")],
    [catalogValue("app.platform.okhoronets")]: [catalogValue("app.platform.okhrannyk"), catalogValue("app.platform.okhorona")],
    [catalogValue("app.platform.operator_bpla")]: [catalogValue("app.platform.operator_drona"), catalogValue("catalog.terms.drone_pilot"), catalogValue("app.platform.bpla")],
    [catalogValue("app.platform.operator_fpv_drona")]: [catalogValue("catalog.terms.fpv"), catalogValue("app.platform.fpv")],
    [catalogValue("app.platform.hrant_menedzher")]: [catalogValue("catalog.terms.grant_manager"), catalogValue("app.platform.hrantrayter")],
    [catalogValue("app.platform.fandreyzer")]: [catalogValue("catalog.terms.fundraiser"), catalogValue("app.platform.fandrayzer")]
  },
  f = [catalogValue("catalog.fullTime"), catalogValue("app.platform.nepovna_zaynyatist"), catalogValue("app.platform.pozminno"), catalogValue("app.platform.hnuchkyy_hrafik"), catalogValue("app.platform.proyektna_robota")],
  g = [catalogValue("catalog.noExperience"), catalogValue("app.platform.do_1_roku"), catalogValue("app.platform.1_3_roky"), catalogValue("app.platform.3_5_rokiv"), catalogValue("app.platform.ponad_5_rokiv")];
[[catalogValue("app.platform.menedzher_z_prodazhu"), catalogValue("app.platform.obriy_pryklad"), catalogValue("app.platform.menedzher_z_prodazhu"), "sales", catalogValue("app.platform.kyyiv"), 3e4, 5e4, catalogValue("catalog.hybrid"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.smm_menedzher"), catalogValue("app.platform.lyst_pryklad"), catalogValue("app.platform.smm_menedzher"), "it", catalogValue("catalog.remote"), 25e3, 4e4, catalogValue("catalog.remote"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.prodavets_konsultant"), catalogValue("app.platform.dobra_kramnytsya_pryklad"), catalogValue("app.platform.prodavets_konsultant"), "sales", catalogValue("app.platform.odesa"), 22e3, 28e3, catalogValue("catalog.onsite"), catalogValue("catalog.noExperience")], [catalogValue("app.platform.yuryst_iz_dohovirnoyi_roboty"), catalogValue("app.platform.pravo_pryklad"), catalogValue("app.platform.yuryst"), "legal", catalogValue("app.platform.dnipro"), 3e4, 45e3, catalogValue("catalog.hybrid"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.barysta"), catalogValue("app.platform.ranok_pryklad"), catalogValue("app.platform.barysta"), "hospitality", catalogValue("app.platform.lviv"), 2e4, 27e3, catalogValue("catalog.onsite"), catalogValue("catalog.noExperience")], [catalogValue("app.platform.vodiy_katehoriyi_b"), catalogValue("app.platform.rukh_pryklad"), catalogValue("app.platform.vodiy"), "logistics", catalogValue("app.platform.kharkiv"), 28e3, 35e3, catalogValue("catalog.onsite"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.bukhhalter"), catalogValue("app.platform.balans_pryklad"), catalogValue("app.platform.bukhhalter"), "legal", catalogValue("app.platform.vinnytsya"), 28e3, 38e3, catalogValue("catalog.hybrid"), catalogValue("app.platform.3_5_rokiv")], [catalogValue("app.platform.trener_z_yohy"), catalogValue("app.platform.prostir_pryklad"), catalogValue("app.platform.trener_z_yohy"), "education", catalogValue("app.platform.poltava"), 18e3, 3e4, catalogValue("catalog.onsite"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.frontend_rozrobnyk"), catalogValue("app.platform.kod_pryklad"), catalogValue("app.platform.frontend_rozrobnyk"), "it", catalogValue("catalog.remote"), 55e3, 85e3, catalogValue("catalog.remote"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.medychna_sestra"), catalogValue("app.platform.turbota_pryklad"), catalogValue("app.platform.medychna_sestra"), "health", catalogValue("app.platform.cherkasy"), 2e4, 29e3, catalogValue("catalog.onsite"), catalogValue("app.platform.do_1_roku")], [catalogValue("app.platform.komirnyk"), catalogValue("app.platform.mist_pryklad"), catalogValue("app.platform.komirnyk"), "logistics", catalogValue("app.platform.zaporizhzhya"), 22e3, 3e4, catalogValue("catalog.onsite"), catalogValue("catalog.noExperience")], [catalogValue("app.platform.ahronom"), catalogValue("app.platform.pole_pryklad"), catalogValue("app.platform.ahronom"), "production", catalogValue("app.platform.kropyvnytskyy"), 3e4, 45e3, catalogValue("catalog.onsite"), catalogValue("app.platform.3_5_rokiv")], [catalogValue("app.platform.hr_menedzher"), catalogValue("app.platform.komanda_pryklad"), catalogValue("app.platform.hr_menedzher"), "office", catalogValue("app.platform.ivano_frankivsk"), 27e3, 38e3, catalogValue("catalog.hybrid"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.elektryk"), catalogValue("app.platform.mayster_pryklad"), catalogValue("app.platform.elektryk"), "production", catalogValue("app.platform.mykolayiv"), 25e3, 35e3, catalogValue("catalog.onsite"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.vchytel_anhliyskoyi_movy"), catalogValue("app.platform.slovo_pryklad"), catalogValue("app.platform.vykladach_anhliyskoyi_movy"), "education", catalogValue("catalog.remote"), 22e3, 4e4, catalogValue("catalog.remote"), catalogValue("app.platform.do_1_roku")], [catalogValue("app.platform.kukhar"), catalogValue("app.platform.smak_pryklad"), catalogValue("app.platform.kukhar"), "hospitality", catalogValue("app.platform.uzhhorod"), 25e3, 33e3, catalogValue("catalog.onsite"), catalogValue("app.platform.1_3_roky")], [catalogValue("app.platform.advokat"), catalogValue("app.platform.zakhyst_pryklad"), catalogValue("app.platform.advokat"), "legal", catalogValue("app.platform.kyyiv"), 35e3, 6e4, catalogValue("catalog.onsite"), catalogValue("app.platform.3_5_rokiv")], [catalogValue("app.platform.operator_mashynnoho_doyinnya"), catalogValue("app.platform.lany_pryklad"), catalogValue("app.platform.doyar"), "production", catalogValue("app.platform.khmelnytskyy"), 22e3, 3e4, catalogValue("catalog.onsite"), catalogValue("catalog.noExperience")]].map((a, b) => ({
  id: `demo-${b + 1}`,
  title: String(a[0]),
  company: String(a[1]),
  occupation: String(a[2]),
  category: String(a[3]),
  country: "UA",
  city: String(a[4]),
  salaryMin: Number(a[5]),
  salaryMax: Number(a[6]),
  arrangement: String(a[7]),
  experience: String(a[8]),
  currency: "UAH",
  schedule: b % 4 == 0 ? catalogValue("app.platform.hnuchkyy_hrafik") : b % 3 == 0 ? catalogValue("app.platform.pozminno") : catalogValue("catalog.fullTime"),
  description: catalogValue("app.platform.tse_vyhadanyy_pryklad_dlya_perevirky_poshuku_ta_interfeysu_kompaniya_i_umovy_ne_ye_re"),
  requirements: catalogValue("app.platform.dosvid_i_navychky_vidpovidno_do_obranoyi_profesiyi_detalni_vymohy_robotodavets_zapovn"),
  benefits: catalogValue("app.platform.navchannya_ta_rozvytok_zruchnyy_hrafik"),
  status: "active",
  createdAt: "2026-10-24T09:00:00.000Z",
  expiresAt: "2099-12-31T23:59:59.000Z",
  demo: true
}));
let h = {
  query: "",
  city: "",
  category: "all",
  remote: false,
  noExperience: false,
  minSalary: 0,
  schedule: "",
  sort: "newest"
};
function i(a) {
  return a.toLocaleLowerCase("uk").replace(/[’'`]/g, "").replace(/\s+/g, " ").trim();
}
function j(a) {
  return formatNumber(a);
}
export { d as categories };
export { i as filterJobs };
export { j as formatSalary };
export { f as schedules };
export { g as experienceLevels };
export { h as defaultFilters };
export { e as cities };
