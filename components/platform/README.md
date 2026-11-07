# Platform UI domains

`app/platform.jsx` is the client composition root. It selects the active view,
opens dialogs, and connects the domain components to `usePlatformController`.

| Directory | Responsibility |
| --- | --- |
| `jobs/` | Job search, filters, saved searches, cards, details, comparison and demo jobs |
| `candidate/` | Candidate profile, resume editor, work history and education |
| `employer/` | Employer entry screens, dashboard and vacancy publication form |
| `applications/` | Candidate applications, incoming applications, status labels and application form |
| `auth/` | Authentication and password fields |
| `moderation/` | Moderation queue and job reports |
| `catalog/` | Occupation picker, occupation aliases, job options and category icons |
| `shell/` | Navigation, header, footer, modal container and platform information |
| `shared/` | Shared SVG icon definitions |

## State and dependencies

`use-platform-controller.js` owns shared workflow state and API actions. This
keeps job selection, profile editing, applications and modal transitions in sync.
Components receive their data and callbacks explicitly through props; they do not
import the controller or the composition root. Authentication and moderation keep
their existing local state and requests within their own components.

The existing company editor remains in `components/company-editor.jsx` and is
used by the employer dashboard. API routes, payloads, translation tokens and CSS
are unchanged by this split.

Prefer adding domain-specific UI to its directory. Put cross-domain coordination
in the controller rather than making screens depend on one another. Catalog
lists and SVG definitions are deliberately separate from component behavior;
these declarative data files can be longer than the UI components.
