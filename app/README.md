# Workflow modules

The Next.js host serves one deployment. Route groups in `app/` preserve public URLs and select a workflow's pages and request handlers. The account type stored in sessions and API payloads is still `candidate`.

| Module | Owns | Entry points |
| --- | --- | --- |
| `applicant/` | Job search, recommendations, public job and company pages, resume editing and PDF import, favorites, saved searches and applications | `/`, `/search`, `/account`, `/recommended`, `/cv-welcome`, `/api/jobs` |
| `employer/` | Employer landing and workspace, vacancy drafts, publication, company profile and incoming applications | `/employers`, `/employers/vacancies`, `/api/company` |
| `admin/` | Verified moderator queue, job approval, blocking, report resolution and decision history | `/admin`, `/api/moderation` |
| `common/` | Reusable UI, styles, translations, catalog, shared resume display and matching attributes | Imported by modules and host |
| `core/` | SQLite connections and schema, authentication, sessions and HTTP helpers | Server infrastructure |

Workflow modules may import their own code, common and core. Neither shared layer imports a workflow. Only the host composes multiple workflows. The retained legacy platform shell and controller live in `app/_platform/`.

## Server and storage contracts

`/api/platform` authenticates requests and adapts the existing HTTP contract to the applicant and employer modules. Each module owns its queries, action validation and write authorization. Moderation has a separate endpoint and verifies the moderator role on the server. Shared sign-in and registration routes live in `app/(shared)/`.

Candidate resume/favorite/application demo state and employer vacancy drafts keep their existing browser storage keys. The server-backed endpoints continue to use the shared SQLite schema and migrations. Published jobs and incoming applications therefore still share a database across workflows.

## Extracting a workflow

Move its module and corresponding route group into a new Next.js host. Supply the shared UI and infrastructure dependencies, root layout/global styles, authentication routes and any existing API contracts used by its client. A separate deployment also needs an explicit session and persistence strategy. The combined platform endpoint is the compatibility boundary for existing clients.

The Go candidate-matching service has no client or protocol in this version. An employer-side adapter can consume it when its contract is available. CV sharing, CV moderation and account activation/deactivation also require new product and persistence behavior.

## Workflow API contracts

| Endpoint | GET | POST actions |
| --- | --- | --- |
| `/api/applicant` | Own profile, favorites, searches and submitted applications | profile, favorite, apply, saveSearch, deleteSearch, report |
| `/api/employer` | Owned jobs and incoming applications | publish, editJob, jobStatus, applicationStatus |
| `/api/moderation` | Verified moderator queue | hide, restore, dismiss |

Applicant and employer actions require a session for that workflow. Verified administrators use the moderation workflow independently of their registration account type. Guests can read published vacancies. All public job lists and the job embedded in application history use the explicit field list in `common/contracts/public-job-v1.js`.

The legacy `/api/platform` client receives the same outer keys with empty defaults for inactive workflows. New clients should use their workflow endpoint and `/api/jobs` for public search. Run `npm run test:extraction` to build and start each workflow in a temporary host with its own migrated database and shared sign-in endpoint. Each host checks guest and cross-role access, then signs in to save a profile, publish a vacancy or approve a pending vacancy.

## Retirement and persistence

The unmounted `app/_platform/` UI is deprecated as of this PR. Remove it in the next minor release after the search, applicant, employer and moderator entry points pass HTTP regression tests. Retire the compatibility endpoint separately after all deployed consumers migrate to the workflow endpoints.

Employer draft saves stay on the current browser under the employer's account-scoped key. Editing or reloading a draft does not publish it. The server publish command validates the payload and creates a pending SQLite job. Drafts have no server ID or cross-device synchronization. See [the employer workspace guide](../docs/employer-workspace.md).

The employer workspace uses `employer/repositories/drafts.js` for account-scoped browser persistence. Server commands use `employer/server/vacancy-repository.js` for owned vacancies. The proposed matching port and versioned result type live in `employer/contracts/candidate-matching.ts`; transport and visibility enforcement are tracked in #28.
