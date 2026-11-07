import { catalogValue } from "../../../i18n/index.js";
const occupationAliases = {
  [catalogValue("app.platform.yuryst")]: [
    catalogValue("app.platform.yuryskonsult_2"),
    catalogValue("catalog.terms.lawyer"),
    catalogValue("app.platform.yurysty"),
    catalogValue("app.platform.yurystka"),
  ],
  [catalogValue("app.platform.advokat")]: [
    catalogValue("catalog.terms.advocate"),
    catalogValue("catalog.terms.attorney"),
    catalogValue("app.platform.advokaty"),
    catalogValue("app.platform.advokatka"),
  ],
  [catalogValue("app.platform.pomichnyk_advokata")]: [
    catalogValue("app.platform.pomoshchnyk_advokata"),
    catalogValue("app.platform.pomichnytsya_advokata"),
    catalogValue("catalog.terms.legal_assistant"),
  ],
  [catalogValue("app.platform.notarius")]: [
    catalogValue("app.platform.notaryus"),
    catalogValue("app.platform.notariuska"),
  ],
  [catalogValue("app.platform.pryvatnyy_vykonavets")]: [
    catalogValue("app.platform.chastnyy_yspolnytel"),
  ],
  [catalogValue("app.platform.komplayens_ofitser")]: [
    catalogValue("catalog.terms.compliance_officer"),
    catalogValue("app.platform.komplaens"),
  ],
  [catalogValue("app.platform.fakhivets_iz_zakhystu_personalnykh_danykh")]: [
    catalogValue("catalog.terms.dpo"),
    catalogValue("catalog.terms.data_protection_officer"),
  ],
  [catalogValue("app.platform.trener")]: [
    catalogValue("catalog.terms.coach"),
    catalogValue("app.platform.trenery"),
    catalogValue("app.platform.trenerka"),
  ],
  [catalogValue("app.platform.fitnes_trener")]: [
    catalogValue("catalog.terms.fitness"),
    catalogValue("app.platform.fytnes"),
    catalogValue("app.platform.instruktor_z_fitnesu"),
  ],
  [catalogValue("app.platform.personalnyy_trener")]: [
    catalogValue("catalog.terms.personal_trainer"),
    catalogValue("app.platform.personalnyy_trener_2"),
  ],
  [catalogValue("app.platform.trener_z_yohy")]: [
    catalogValue("catalog.terms.yoga"),
    catalogValue("app.platform.yoha"),
    catalogValue("app.platform.yohy"),
    catalogValue("app.platform.instruktor_yohy"),
    catalogValue("app.platform.ynstruktor_yohy"),
  ],
  [catalogValue("app.platform.instruktor_z_pilatesu")]: [
    catalogValue("app.platform.pylates"),
    catalogValue("app.platform.pilates"),
    catalogValue("catalog.terms.pilates"),
  ],
  [catalogValue("app.platform.trener_zi_stretchynhu")]: [
    catalogValue("catalog.terms.stretching"),
    catalogValue("app.platform.rastyazhka"),
    catalogValue("app.platform.roztyazhka"),
    catalogValue("app.platform.stretchynh"),
  ],
  [catalogValue("app.platform.trener_iz_krosfitu")]: [
    catalogValue("app.platform.krossfyt"),
    catalogValue("catalog.terms.crossfit"),
  ],
  [catalogValue("app.platform.trener_z_plavannya")]: [
    catalogValue("app.platform.plavanye"),
    catalogValue("catalog.terms.swimming"),
  ],
  [catalogValue("app.platform.khoreohraf")]: [
    catalogValue("catalog.terms.choreographer"),
    catalogValue("app.platform.tantsy"),
    catalogValue("app.platform.tantsi"),
  ],
  [catalogValue("app.platform.model")]: [
    catalogValue("catalog.terms.model"),
    catalogValue("app.platform.modely"),
    catalogValue("app.platform.modellyu"),
  ],
  [catalogValue("app.platform.fotomodel")]: [
    catalogValue("catalog.terms.photo_model"),
    catalogValue("catalog.terms.photomodel"),
    catalogValue("app.platform.fotomodely"),
  ],
  [catalogValue("app.platform.podiumna_model")]: [
    catalogValue("catalog.terms.runway_model"),
    catalogValue("app.platform.podyumnaya_model"),
  ],
  [catalogValue("app.platform.model_plus_size")]: [
    catalogValue("catalog.terms.plus_size"),
    catalogValue("app.platform.plyus_sayz"),
    catalogValue("app.platform.plyus_sayz_2"),
  ],
  [catalogValue("app.platform.model_dlya_prymirok")]: [
    catalogValue("catalog.terms.fit_model"),
    catalogValue("app.platform.prymerochnaya_model"),
  ],
  [catalogValue("app.platform.buker_modelnoho_ahentstva")]: [
    catalogValue("catalog.terms.model_booker"),
    catalogValue("app.platform.buker"),
  ],
  [catalogValue("app.platform.stylist")]: [
    catalogValue("app.platform.stylyst"),
    catalogValue("catalog.terms.stylist"),
  ],
  [catalogValue("app.platform.smm_menedzher")]: [
    catalogValue("app.platform.smm"),
    catalogValue("catalog.terms.smm"),
    catalogValue("catalog.terms.sms"),
    catalogValue("app.platform.sotsmerezh"),
    catalogValue("app.platform.sotsyalnykh_setey"),
    catalogValue("catalog.terms.social_media_manager"),
  ],
  [catalogValue("app.platform.seo_fakhivets")]: [
    catalogValue("catalog.terms.seo"),
    catalogValue("app.platform.seo"),
    catalogValue("app.platform.seoshnyk"),
  ],
  [catalogValue("app.platform.ppc_fakhivets")]: [
    catalogValue("catalog.terms.ppc"),
    catalogValue("app.platform.kontekstoloh"),
    catalogValue("app.platform.kontekstnaya_reklama"),
    catalogValue("catalog.terms.google_ads"),
  ],
  [catalogValue("app.platform.tarhetoloh")]: [
    catalogValue("app.platform.tarhet"),
    catalogValue("catalog.terms.targeting"),
    catalogValue("catalog.terms.facebook_ads"),
    catalogValue("catalog.terms.meta_ads"),
  ],
  [catalogValue("app.platform.kopirayter")]: [
    catalogValue("app.platform.kopyrayter"),
    catalogValue("catalog.terms.copywriter"),
  ],
  [catalogValue("app.platform.kontent_menedzher")]: [
    catalogValue("app.platform.kontent_menedzher_2"),
    catalogValue("catalog.terms.content_manager"),
  ],
  [catalogValue("app.platform.prohramist")]: [
    catalogValue("app.platform.prohrammyst"),
    catalogValue("catalog.terms.developer"),
    catalogValue("app.platform.rozrobnyk"),
    catalogValue("catalog.terms.software_engineer"),
  ],
  [catalogValue("app.platform.frontend_rozrobnyk")]: [
    catalogValue("catalog.terms.frontend"),
    catalogValue("catalog.terms.front_end"),
    catalogValue("app.platform.frontend"),
    catalogValue("app.platform.verstalshchyk"),
  ],
  [catalogValue("app.platform.backend_rozrobnyk")]: [
    catalogValue("catalog.terms.backend"),
    catalogValue("catalog.terms.back_end"),
    catalogValue("app.platform.bekend"),
    catalogValue("app.platform.bekend_2"),
  ],
  [catalogValue("app.platform.fullstack_rozrobnyk")]: [
    catalogValue("catalog.terms.full_stack"),
    catalogValue("catalog.terms.fullstack"),
    catalogValue("app.platform.fulstek"),
  ],
  [catalogValue("app.platform.testuvalnyk")]: [
    catalogValue("app.platform.testyrovshchyk"),
    catalogValue("catalog.terms.qa"),
    catalogValue("catalog.terms.tester"),
  ],
  [catalogValue("app.platform.systemnyy_administrator")]: [
    catalogValue("app.platform.sysadmin"),
    catalogValue("app.platform.sysadmyn"),
    catalogValue("app.platform.systemnyy_admynystrator"),
    catalogValue("catalog.terms.sysadmin"),
  ],
  [catalogValue("app.platform.analityk_danykh")]: [
    catalogValue("catalog.terms.data_analyst"),
    catalogValue("app.platform.analytyk_dannykh"),
  ],
  "Data Scientist": [
    catalogValue("app.platform.data_sayentyst"),
    catalogValue("app.platform.data_sayentyst_2"),
  ],
  [catalogValue("app.platform.ai_inzhener")]: [
    catalogValue("app.platform.shtuchnyy_intelekt"),
    catalogValue("app.platform.yskusstvennyy_yntellekt"),
    catalogValue("catalog.terms.ai_engineer"),
  ],
  [catalogValue("app.platform.inzhener_iz_kiberbezpeky")]: [
    catalogValue("catalog.terms.cybersecurity"),
    catalogValue("app.platform.kyberbezopasnost"),
  ],
  [catalogValue("app.platform.pentester")]: [
    catalogValue("catalog.terms.pentester"),
    catalogValue("catalog.terms.penetration_tester"),
  ],
  [catalogValue("app.platform.ux_ui_dyzayner")]: [
    catalogValue("catalog.terms.ui_ux"),
    catalogValue("catalog.terms.ux_ui"),
    catalogValue("catalog.terms.ux_designer"),
    catalogValue("catalog.terms.ui_designer"),
  ],
  [catalogValue("app.platform.hrafichnyy_dyzayner")]: [
    catalogValue("app.platform.hrafycheskyy_dyzayner"),
    catalogValue("catalog.terms.graphic_designer"),
  ],
  [catalogValue("app.platform.videomontazher")]: [
    catalogValue("app.platform.montazher"),
    catalogValue("app.platform.videomontazh"),
    catalogValue("app.platform.vydeomontazh"),
    catalogValue("catalog.terms.video_editor"),
  ],
  [catalogValue("app.platform.fotohraf")]: [
    catalogValue("catalog.terms.photographer"),
    catalogValue("app.platform.fotohrafka"),
  ],
  [catalogValue("app.platform.videohraf")]: [
    catalogValue("app.platform.vydeohraf"),
    catalogValue("catalog.terms.videographer"),
  ],
  [catalogValue("app.platform.modelyer")]: [
    catalogValue("app.platform.modeler"),
    catalogValue("catalog.terms.fashion_designer"),
  ],
  [catalogValue("app.platform.hr_menedzher")]: [
    catalogValue("catalog.terms.hr"),
    catalogValue("app.platform.eychar"),
    catalogValue("app.platform.eychar_2"),
    catalogValue("app.platform.menedzher_po_personalu"),
  ],
  [catalogValue("app.platform.rekruter")]: [
    catalogValue("catalog.terms.recruiter"),
    catalogValue("app.platform.rekruterka"),
  ],
  [catalogValue("app.platform.biznes_trener")]: [
    catalogValue("app.platform.byznes_trener"),
    catalogValue("catalog.terms.business_trainer"),
  ],
  [catalogValue("app.platform.kar_yernyy_konsultant")]: [
    catalogValue("app.platform.karernyy_konsultant"),
    catalogValue("catalog.terms.career_advisor"),
  ],
  [catalogValue("app.platform.menedzher_z_prodazhu")]: [
    catalogValue("catalog.terms.sales"),
    catalogValue("app.platform.prodazh"),
    catalogValue("app.platform.prodazham"),
    catalogValue("app.platform.menedzher_po_prodazham"),
  ],
  [catalogValue("app.platform.menedzher_iz_klyuchovykh_kliyentiv")]: [
    catalogValue("catalog.terms.key_account_manager"),
    catalogValue("catalog.terms.kam"),
  ],
  [catalogValue("app.platform.prodavets_konsultant")]: [
    catalogValue("app.platform.prodavets_konsultant_2"),
    catalogValue("app.platform.prodavchynya"),
    catalogValue("app.platform.prodavtsy"),
  ],
  [catalogValue("app.platform.merchendayzer")]: [
    catalogValue("catalog.terms.merchandiser"),
    catalogValue("app.platform.merchendayzynh"),
  ],
  [catalogValue("app.platform.menedzher_internet_mahazynu")]: [
    catalogValue("app.platform.ynternet_mahazyn"),
    catalogValue("catalog.terms.ecommerce_manager"),
    catalogValue("catalog.terms.e_commerce"),
  ],
  [catalogValue("app.platform.riyeltor")]: [
    catalogValue("app.platform.ryeltor"),
    catalogValue("app.platform.rieltor"),
    catalogValue("catalog.terms.realtor"),
  ],
  [catalogValue("app.platform.bukhhalter")]: [
    catalogValue("catalog.terms.accountant"),
    catalogValue("app.platform.bukhhalterka"),
  ],
  [catalogValue("app.platform.holovnyy_bukhhalter")]: [
    catalogValue("app.platform.hlavnyy_bukhhalter"),
    catalogValue("app.platform.hlavbukh"),
    catalogValue("catalog.terms.chief_accountant"),
  ],
  [catalogValue("app.platform.finansovyy_dyrektor")]: [
    catalogValue("catalog.terms.cfo"),
    catalogValue("app.platform.fynansovyy_dyrektor"),
  ],
  [catalogValue("app.platform.heneralnyy_dyrektor")]: [
    catalogValue("catalog.terms.ceo"),
    catalogValue("app.platform.heneralnyy_dyrektor_2"),
  ],
  [catalogValue("app.platform.operatsiynyy_dyrektor")]: [
    catalogValue("catalog.terms.coo"),
    catalogValue("app.platform.operatsyonnyy_dyrektor"),
  ],
  [catalogValue("app.platform.asystent_kerivnyka")]: [
    catalogValue("app.platform.assystent_rukovodytelya"),
    catalogValue("app.platform.pomoshchnyk_rukovodytelya"),
    catalogValue("catalog.terms.executive_assistant"),
  ],
  [catalogValue("app.platform.ofis_menedzher")]: [
    catalogValue("app.platform.ofys_menedzher"),
    catalogValue("catalog.terms.office_manager"),
  ],
  [catalogValue("app.platform.operator_kontakt_tsentru")]: [
    catalogValue("app.platform.koll_tsentr"),
    catalogValue("catalog.terms.call_center"),
    catalogValue("app.platform.call_tsentr"),
    catalogValue("app.platform.operator_koltsentru"),
    catalogValue("app.platform.operator_koll_tsentra"),
  ],
  [catalogValue("app.platform.operator_chatu")]: [
    catalogValue("app.platform.chat_menedzher"),
    catalogValue("app.platform.chat_menedzherka"),
    catalogValue("app.platform.operator_chata"),
    catalogValue("catalog.terms.chat_support"),
  ],
  [catalogValue("app.platform.kukhar")]: [
    catalogValue("app.platform.povar"),
    catalogValue("catalog.terms.cook"),
    catalogValue("app.platform.kukharka"),
  ],
  [catalogValue("app.platform.shef_kukhar")]: [
    catalogValue("app.platform.shef_povar"),
    catalogValue("catalog.terms.chef"),
  ],
  [catalogValue("app.platform.ofitsiant")]: [
    catalogValue("app.platform.ofytsyant"),
    catalogValue("app.platform.ofitsiantka"),
    catalogValue("catalog.terms.waiter"),
    catalogValue("catalog.terms.waitress"),
  ],
  [catalogValue("app.platform.pekar")]: [
    catalogValue("app.platform.pekar_2"),
    catalogValue("catalog.terms.baker"),
  ],
  [catalogValue("app.platform.pokoyivka")]: [
    catalogValue("app.platform.hornychnaya"),
    catalogValue("catalog.terms.housekeeper"),
  ],
  [catalogValue("app.platform.turystychnyy_ahent")]: [
    catalogValue("app.platform.turahent"),
    catalogValue("catalog.terms.travel_agent"),
  ],
  [catalogValue("app.platform.likar")]: [
    catalogValue("app.platform.vrach"),
    catalogValue("catalog.terms.doctor"),
    catalogValue("app.platform.likarka"),
  ],
  [catalogValue("app.platform.medychna_sestra")]: [
    catalogValue("app.platform.medsestra"),
    catalogValue("app.platform.medsestry"),
    catalogValue("catalog.terms.nurse"),
  ],
  [catalogValue("app.platform.medychnyy_brat")]: [
    catalogValue("app.platform.medbrat"),
  ],
  [catalogValue("app.platform.stomatoloh")]: [
    catalogValue("catalog.terms.dentist"),
    catalogValue("app.platform.zubnyy_likar"),
  ],
  [catalogValue("app.platform.farmatsevt")]: [
    catalogValue("catalog.terms.pharmacist"),
    catalogValue("app.platform.farmatsevtka"),
  ],
  [catalogValue("app.platform.veterynar")]: [
    catalogValue("app.platform.veterynarnyy_vrach"),
    catalogValue("catalog.terms.veterinarian"),
  ],
  [catalogValue("app.platform.psykholoh")]: [
    catalogValue("catalog.terms.psychologist"),
    catalogValue("app.platform.psykholohynya"),
  ],
  [catalogValue("app.platform.psykhoterapevt")]: [
    catalogValue("catalog.terms.psychotherapist"),
    catalogValue("app.platform.psykhoterapevtka"),
  ],
  [catalogValue("app.platform.reabilitoloh")]: [
    catalogValue("app.platform.reabylytoloh"),
    catalogValue("app.platform.reabilitatsiya"),
  ],
  [catalogValue("app.platform.masazhyst")]: [
    catalogValue("app.platform.massazhyst"),
    catalogValue("app.platform.masazhystka"),
    catalogValue("catalog.terms.massage_therapist"),
  ],
  [catalogValue("app.platform.perukar")]: [
    catalogValue("app.platform.parykmakher"),
    catalogValue("catalog.terms.hairdresser"),
    catalogValue("app.platform.perukarka"),
  ],
  [catalogValue("app.platform.vizazhyst")]: [
    catalogValue("app.platform.vyzazhyst"),
    catalogValue("catalog.terms.makeup_artist"),
    catalogValue("app.platform.vizazhystka"),
  ],
  [catalogValue("app.platform.mayster_manikyuru")]: [
    catalogValue("app.platform.manykyur"),
    catalogValue("app.platform.manikyur"),
    catalogValue("catalog.terms.nail_technician"),
  ],
  [catalogValue("app.platform.brovist")]: [
    catalogValue("app.platform.brovyst"),
    catalogValue("catalog.terms.brow_artist"),
  ],
  [catalogValue("app.platform.leshmeyker")]: [
    catalogValue("catalog.terms.lash_artist"),
    catalogValue("app.platform.naroshchuvannya_viy"),
    catalogValue("app.platform.narashchyvanye_resnyts"),
  ],
  [catalogValue("app.platform.hrumer")]: [
    catalogValue("catalog.terms.groomer"),
    catalogValue("app.platform.hrummer"),
  ],
  [catalogValue("app.platform.vchytel")]: [
    catalogValue("app.platform.uchytel"),
    catalogValue("app.platform.uchytelnytsa"),
    catalogValue("app.platform.vchytelka"),
    catalogValue("catalog.terms.teacher"),
  ],
  [catalogValue("app.platform.vykladach_anhliyskoyi_movy")]: [
    catalogValue("catalog.terms.english_teacher"),
    catalogValue("app.platform.uchytel_anhlyyskoho"),
    catalogValue("app.platform.vchytel_anhliyskoyi"),
    catalogValue("app.platform.anhliyska"),
  ],
  [catalogValue("app.platform.vykhovatel")]: [
    catalogValue("app.platform.vospytatel"),
    catalogValue("app.platform.vykhovatelka"),
  ],
  [catalogValue("app.platform.nyanya")]: [
    catalogValue("catalog.terms.nanny"),
    catalogValue("app.platform.bebisiter"),
    catalogValue("app.platform.bebysytter"),
    catalogValue("catalog.terms.babysitter"),
  ],
  [catalogValue("app.platform.perekladach")]: [
    catalogValue("app.platform.perevodchyk"),
    catalogValue("catalog.terms.translator"),
    catalogValue("app.platform.perekladachka"),
  ],
  [catalogValue("app.platform.vodiy")]: [
    catalogValue("app.platform.vodytel"),
    catalogValue("catalog.terms.driver"),
    catalogValue("app.platform.vodiyka"),
  ],
  [catalogValue("app.platform.vodiy_mizhnarodnyk")]: [
    catalogValue("app.platform.dalnoboyshchyk"),
    catalogValue("app.platform.mizhnarodni_perevezennya"),
    catalogValue("catalog.terms.truck_driver"),
  ],
  [catalogValue("app.platform.kur_yer")]: [
    catalogValue("app.platform.kurer"),
    catalogValue("catalog.terms.courier"),
    catalogValue("app.platform.dostavka"),
  ],
  [catalogValue("app.platform.komirnyk")]: [
    catalogValue("app.platform.kladovshchyk"),
    catalogValue("catalog.terms.warehouse_keeper"),
    catalogValue("app.platform.komirnytsya"),
  ],
  [catalogValue("app.platform.vantazhnyk")]: [
    catalogValue("app.platform.hruzchyk"),
    catalogValue("catalog.terms.loader"),
  ],
  [catalogValue("app.platform.lohist")]: [
    catalogValue("app.platform.lohyst"),
    catalogValue("catalog.terms.logistics"),
  ],
  [catalogValue("app.platform.avtoslyusar")]: [
    catalogValue("app.platform.avtoslesar"),
    catalogValue("catalog.terms.car_mechanic"),
  ],
  [catalogValue("app.platform.shynomontazhnyk")]: [
    catalogValue("app.platform.shynomontazh"),
    catalogValue("catalog.terms.tyre_fitter"),
  ],
  [catalogValue("app.platform.budivelnyk")]: [
    catalogValue("app.platform.stroytel"),
    catalogValue("catalog.terms.builder"),
  ],
  [catalogValue("app.platform.vykonrob")]: [
    catalogValue("app.platform.prorab"),
    catalogValue("catalog.terms.foreman"),
  ],
  [catalogValue("app.platform.plytochnyk")]: [
    catalogValue("app.platform.plytochnyk_oblytsovshchyk"),
    catalogValue("catalog.terms.tiler"),
  ],
  [catalogValue("app.platform.inzhener_koshtorysnyk")]: [
    catalogValue("app.platform.smetchyk"),
    catalogValue("app.platform.koshtorysnyk"),
    catalogValue("catalog.terms.estimator"),
  ],
  [catalogValue("app.platform.zvaryuvalnyk")]: [
    catalogValue("app.platform.svarshchyk"),
    catalogValue("catalog.terms.welder"),
  ],
  [catalogValue("app.platform.shvachka")]: [
    catalogValue("app.platform.shveya"),
    catalogValue("catalog.terms.seamstress"),
  ],
  [catalogValue("app.platform.slyusar")]: [catalogValue("app.platform.slesar")],
  [catalogValue("app.platform.tokar")]: [
    catalogValue("app.platform.tokar_2"),
    catalogValue("catalog.terms.turner"),
  ],
  [catalogValue("app.platform.elektryk")]: [
    catalogValue("app.platform.elektryk_2"),
    catalogValue("catalog.terms.electrician"),
  ],
  [catalogValue("app.platform.doyar")]: [
    catalogValue("app.platform.doyarka"),
    catalogValue("app.platform.doyinnya"),
    catalogValue("app.platform.doenyya"),
  ],
  [catalogValue("app.platform.operator_mashynnoho_doyinnya")]: [
    catalogValue("app.platform.operator_mashynnoho_doenyya"),
  ],
  [catalogValue("app.platform.traktoryst")]: [
    catalogValue("app.platform.traktorystka"),
    catalogValue("catalog.terms.tractor_driver"),
  ],
  [catalogValue("app.platform.ahronom")]: [
    catalogValue("catalog.terms.agronomist"),
  ],
  [catalogValue("app.platform.prybyralnyk")]: [
    catalogValue("app.platform.uborshchyk"),
    catalogValue("catalog.terms.cleaner"),
  ],
  [catalogValue("app.platform.prybyralnytsya")]: [
    catalogValue("app.platform.uborshchytsa"),
  ],
  [catalogValue("app.platform.dohlyadalnytsya")]: [
    catalogValue("app.platform.sydelka"),
    catalogValue("catalog.terms.caregiver"),
  ],
  [catalogValue("app.platform.domrobitnytsya")]: [
    catalogValue("app.platform.domrabotnytsa"),
  ],
  [catalogValue("app.platform.okhoronnyk")]: [
    catalogValue("app.platform.okhrannyk"),
    catalogValue("catalog.terms.security_guard"),
  ],
  [catalogValue("app.platform.okhoronets")]: [
    catalogValue("app.platform.okhrannyk"),
    catalogValue("app.platform.okhorona"),
  ],
  [catalogValue("app.platform.operator_bpla")]: [
    catalogValue("app.platform.operator_drona"),
    catalogValue("catalog.terms.drone_pilot"),
    catalogValue("app.platform.bpla"),
  ],
  [catalogValue("app.platform.operator_fpv_drona")]: [
    catalogValue("catalog.terms.fpv"),
    catalogValue("app.platform.fpv"),
  ],
  [catalogValue("app.platform.hrant_menedzher")]: [
    catalogValue("catalog.terms.grant_manager"),
    catalogValue("app.platform.hrantrayter"),
  ],
  [catalogValue("app.platform.fandreyzer")]: [
    catalogValue("catalog.terms.fundraiser"),
    catalogValue("app.platform.fandrayzer"),
  ],
};
export { occupationAliases };
