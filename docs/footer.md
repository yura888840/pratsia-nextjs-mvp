# Shared footer

`app/layout.jsx` renders `SiteFooter` once for all UI routes, including unknown pages.
Login and registration paths are always excluded. Do not add another footer in role layouts.

Edit `components/site-footer/config.js` to override an exact pathname:

```js
export const footerOverrides = {
  "/about": { showMobile: false, note: "A localized project note" },
  "/special-page": { hidden: true },
};
```

Supported keys: `hidden`, `showMobile`, `note`, `columns`.
`columns` replaces the main navigation groups with an array of
`{ title, links: [{ href, label }] }`. Use dictionary translations for visible text.
Auth exclusions take precedence over overrides.

Information pages are defined in `components/site-footer/pages.js` and rendered
by `app/(info)/[slug]/page.jsx`. Unknown slugs return 404. Content is in `locales/uk.json`.
Support, employer tools, legal documents and mobile apps have clearly stated
first-version availability; no unverified external contact or store links are used.
