# Employer workspace prototype

Based on main `eb31302d2127aef889fa10227691b9c82e8c0ed7`. Routes:

- `/employers`: public promotional landing for guests/candidates; overview and draft counts for authenticated employers.
- `/employers/vacancies`: searchable list, draft/example filters, empty state.
- `/employers/vacancies/new`: creation, local draft save, validated preview.
- `/employers/vacancies/[id]`: full vacancy preview.
- `/employers/vacancies/[id]/edit`: edit a draft or copy the example.

The workspace is an explicitly labelled UI prototype restricted server-side to authenticated accounts with `accountType=employer`. Every vacancy page uses the shared server guard; guests are redirected to employer login and candidates to the public employer landing. Auth return URLs allow the exact `/employers` destination. Drafts are browser-local and keyed by the authenticated account ID; the former anonymous storage key is deliberately not imported because ownership cannot be established. Browser storage is not encrypted and remains readable through developer tools on a shared device. Drafts are never sent to the jobs API or candidate search. Avoid entering real contacts on shared devices. The example uses fictional company details. Existing registration, candidate routes, server authorization, database and shared footer remain in place. No paid plans, simulated publication, email delivery, chat, maps, AI generation or invented applicant statistics.

Screenshots informed the grouped form, salary range, employment/work format, description, benefits, contacts, completion indicator and preview. The design uses the existing Pratsia green palette and responsive layouts. Plain text descriptions are rendered as text, not HTML. Preview requires core matching/content fields; incomplete drafts can be saved.

## Shared matching contract

`lib/matching-attributes.js` adapts **separate** vacancy (`jobs`) and resume (`profiles`) models to a common read model. It does not merge records or introduce a matching score.

| Attribute | Vacancy source | Resume source | Contract |
| --- | --- | --- | --- |
| Profession | occupation | occupation | Normalized catalogue name; free text retained |
| Skills | prototype skills | skills | Trimmed, lowercase, deduplicated array |
| Experience | experience (required) | experience (held) | none / under_1 / 1_3 / 3_5 / over_5 |
| Salary | salaryMin, salaryMax | salary (expected minimum) | min/max, currency, monthly period |
| City | city | city | Normalized name |
| Work format | arrangement | arrangement when available | onsite / hybrid / remote; absent = null |
| Employment | schedule | schedule | full_time / part_time / shift / flexible / project |

The existing catalogue is reused by the form and adapters. Its shift/flexible values represent schedules as well as employment; a future schema should separate these without silently changing existing records. Catalogue names are a transitional key, not durable profession/city IDs; synonyms need a curated ID migration. Unknown values are null, not presumed matches. Experience buckets describe different requirements/preferences; equality alone is not a ranking algorithm. Salary comparison must require equal currency and period; no FX conversion is implied. Absent, zero and invalid salaries are treated as undisclosed (null).

## Next backend slice

Add structured skills to jobs and preferred work formats/currency to profiles with backward-compatible migrations and server validation. Persist employer-owned draft records under authenticated account IDs, enforce ownership and employer role on every read/write, and clear browser prototype storage when retiring the mock. Use shared catalogue IDs in both editors. Publication must go through moderation and only approved, active, unexpired jobs may enter candidate search. Application snapshots remain separate from mutable resumes. Benefits/contacts/application preferences require explicit persistence fields; the prototype does not silently overload requirements or existing profile data.
