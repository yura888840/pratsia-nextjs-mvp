# App business domains

Next.js route groups organize routes by business domain without changing public URLs.

| Directory | Responsibility | Routes |
| --- | --- | --- |
| `(candidate)` | Job discovery and public employer profiles for job seekers | `/`, `/jobs/[id]`, `/companies/[id]`, `/api/jobs` |
| `(employer)` | Employer onboarding, workspace, and company management | `/employers`, `/employer`, `/api/company` |
| `(moderator)` | Moderation queue and decisions | `/api/moderation` |
| `(shared)` | Authentication and cross-domain platform state/actions | `/api/auth`, `/api/auth/recovery`, `/api/platform` |
| `_shared` | Shared client platform shell | No routes |

The root layout, global styles, robots and sitemap remain at the app root.
Domain-specific routes belong inside their domain group. Shared code that is
not a route belongs in `_shared`; the underscore makes it a Next.js private folder.

The platform shell still composes candidate, employer and moderation views
from `components/platform` with the shared controller. Moderation currently
opens inside that shell; there is no standalone moderator page. The platform
API serves multiple roles, so it remains shared rather than belonging to a
single domain. Route groups organize source files; existing server-side role
checks remain responsible for authorization.

## Candidate prototype

The candidate layout wraps every candidate page in the same search/navigation
shell (`components/candidate`). `/` defaults to vacancy search. `?view=profile`,
`?view=saved`, and `?view=applications` select the resume, favorites and applied
lists. The last two lists select IDs from the same vacancy collection and use
the same `VacancyList`/`VacancyActions` components. `/jobs/demo-*` opens a mock
vacancy inside the same shell. Existing published vacancy URLs remain supported.

`domains/resume/model.js` defines a flat resume record. Manual entry and PDF
import use this same model. PDF.js extracts text locally; explicitly labelled
fields and email are populated for review, and the full source text is kept in
`about`. Unlabelled data must be reviewed manually. Scanned PDFs need OCR, which
is not included. Files are limited to 10 MB / 30 pages and are never uploaded.

`domains/vacancy/model.js` defines a separate vacancy record;
`domains/vacancy/mocks.js` adapts the fictional seed data. Search covers job title,
profession, company and skills. The prototype stores a resume, favorite IDs and
application records (with a resume snapshot) in versioned browser localStorage.
It does not send applications, and does not use the signed-in account's server
profile. The interface explicitly marks this demonstration mode. Production
persistence can replace the provider without changing either model or list UI.

The public employer entry page is `/employers`; `/employer` redirects there.
Existing employer APIs and backend authorization remain intact; the full
employer dashboard is still paused. The legacy platform shell is retained but no longer
mounted by the home page.

Resume editing and the application list require a server-validated candidate
session. Guests see `Створити резюме`, which opens registration/sign-in with the
candidate role preselected. Direct private-view URLs redirect guests to that
registration page and employer accounts to `/`. Menu entries and local resume /
application mutations use the same role check; the profile API also rejects
employer writes. Browser demo storage is scoped by account ID (v2), with a
separate guest store for public favorites. The old unscoped v1 prototype record
is not automatically assigned to an account.

The candidate's name in the right-hand header links to `/account`. This protected
account page keeps the shared header/search and places its navigation on the
left below that shared area. Sections `profile`, `saved`, and `applications`
reuse the resume editor and vacancy lists. Legacy `/?view=...` links redirect
signed-in candidates to the corresponding account section. Guests keep public
search/favorites and the registration entry; employer accounts cannot open the
candidate account. On small screens the account menu stacks above the content.

The employer section now has a separate route-group layout and stylesheet in
`app/(employer)`. `/employers` is its minimal public starting page; `/employer`
redirects there. Guest headers link between candidate and employer sections.
The candidate guest header offers login, registration, and the employer site,
aligned right. `/register?mode=login` opens the existing form in login mode;
links from employer pages preserve the employer role default for registration.
The employer dashboard and publication UI are not enabled by this entry page.

On the anonymous home page, `GuestSearch` replaces the standard form with a
combined query/location field, a separate submit button, and eight quick-filter
chips. Chips submit the current query and location with one active `filter`
value; the main submit preserves that selection. The location selector offers
Ukraine, other countries, and cities from the mock collection. All current mocks
are Ukrainian, so other-country searches correctly return an empty list. Mock
eligibility flags are fictional UI fixtures, not verified employer claims.
Authenticated pages retain the standard search form. The redundant candidate
site label beside the logo has been removed.
