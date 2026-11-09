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
