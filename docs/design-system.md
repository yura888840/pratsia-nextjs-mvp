# Pratsia design system and Storybook

## Run locally

Use Node >=22.16.0 (the app's existing requirement).

```sh
npm ci
npm run storybook
# http://127.0.0.1:6006

npm run build-storybook
# static output: storybook-static/
```

Storybook is a development dependency and a separate process/build. It is not an application route, has no database requirement and does not weaken employer authentication. Stories use fictional data and isolated state; they do not save drafts or call production APIs. The output is ignored by git. No deployment, public hosting or Chromatic account is required.

## Change design centrally

| File | Responsibility |
| --- | --- |
| `styles/tokens.css` | Semantic colors, font family/sizes, spacing, radii, control sizes, focus ring and page width/gutters |
| `components/ui/ui.css` | Shared component appearance and interaction states |
| `components/ui/index.jsx` | Accessible primitives and their public props |
| `stories/*.stories.jsx` | Examples, states, controls and interaction scenarios |
| `.storybook/preview.jsx` | Shared styles, App Router mocks and accessibility addon |

The application root layout and Storybook import **the same** token and component CSS files. For example, edit `--color-brand` to change primary actions, `--radius-control` for fields, or `--control-height` for minimum control height. Use `Foundations/Design tokens` to inspect the palette, spacing and typography. `CentralOverride` demonstrates scoped variable overrides without copying component styles. Use semantic variables rather than adding new hex values to components.

```jsx
import { Button, Field, Input } from '../ui/index.jsx';

<Field id="company-name" label={translate('employer.company')} error={error} required>
  <Input name="company" value={company} onChange={onChange} />
</Field>
<Button type="submit" busy={saving}>{saveLabel}</Button>
```

`Field` requires one control and a unique stable `id`. It connects its label, hint and error via `htmlFor`/`aria-describedby`; `required` declares an accessibility requirement without forcing browser validation (the vacancy editor supports saving incomplete drafts). Pass native `required` to the child when browser validation is wanted. Use `Button` for actions and `LinkButton` for navigation. Buttons default to `type="button"` to prevent accidental form submission; explicitly choose `submit`. Busy buttons are disabled; provide the translated busy label as children. Checkbox controls use native keyboard behavior. Components accept native attributes and `className` for layout.

## Catalogue

- Button: primary, secondary, ghost, small, disabled, busy and navigation.
- Field: input, required/hint/error, disabled, readonly, select and textarea.
- Checkbox: default, checked and disabled.
- Card: plain container and composed vacancy example.
- Badge: neutral, success and danger.
- Alert: information and error.
- Foundations: palette, typography, spacing and central overrides.
- Patterns: interactive vacancy form, including mobile viewport.

Controls and Autodocs expose supported props. Interaction `play` scenarios cover typing, accessible descriptions/errors, save validation, checkbox keyboard toggling and disabled-button behavior. Open the Accessibility panel to inspect axe results. These browser scenarios are separate from `npm test`; a static Storybook build does not execute them.

## Adoption boundary

The vacancy editor/list now uses shared buttons, links, fields, checkbox, badges, alerts and vacancy cards. Registration uses shared input and submit-button components. Both candidate and employer role CSS, shared welcome layout and footer consume the principal semantic brand/text colors. Existing authentication, callbacks, storage and validation are unchanged.

This is an incremental migration, not a claim that every legacy style is standardized. The recovered generated `app/globals.css`, remaining role-specific components, illustration colors and layout-specific sizes still contain local values. New UI must use the primitives. Migrate remaining components one at a time with their stories; remove the old rule when its final consumer is migrated. Do not import application-wide legacy CSS into Storybook to conceal styling dependencies. Doubled primitive selectors give stable specificity inside old role wrappers; new components should not depend on that compatibility mechanism.

## Verification before merging

```sh
npm test
npm run build
npm run build-storybook
npm run test:http
```

Also open Storybook and check focus, disabled/error states and narrow viewports. The framework is `@storybook/nextjs-vite` with App Router support, aligned to the same pinned Storybook release as the addons. Official setup: https://storybook.js.org/docs/get-started/frameworks/nextjs-vite
