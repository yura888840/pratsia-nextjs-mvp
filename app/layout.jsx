import { SiteFooter } from "../components/site-footer/index.jsx";
import "../components/site-footer/footer.css";
import { translate, defaultLocale } from "../i18n/index.js";
// Reconstructed from production build. Names/types not present in the build cannot be recovered exactly.
import "./globals.css";
import * as jsxRuntime from "react/jsx-runtime";
const metadata = {
  title: translate("app.layout.pratsya_znaydit_svoyu_robotu"),
  description: translate(
    "app.layout.vakansiyi_ta_rezyume_po_vsiy_ukrayini_zruchnyy_poshuk_za_profesiyeyu_mistom_zarplatoy",
  ),
  icons: {
    icon: "/favicon.svg",
  },
};
function RootLayout({ children }) {
  return (
    <html lang={defaultLocale}>
      <body
        style={{
          "--i18n-brand": JSON.stringify(translate("brand.logo")),
          "--i18n-profile-heading": JSON.stringify(
            translate("profile.print.heading"),
          ),
        }}
      >
        {children}
        <SiteFooter year={new Date().getFullYear()} />
      </body>
    </html>
  );
}
export { RootLayout as default };
export { metadata };
