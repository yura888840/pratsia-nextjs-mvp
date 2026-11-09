"use client";
import { tabLabels } from "./labels.js";
import { translate } from "../../i18n/index.js";
import { mockVacancies } from "../../domains/vacancy/mocks.js";
import { selectVacancies } from "../../domains/vacancy/model.js";
import { useCandidate } from "./context.jsx";
import { VacancyList } from "./vacancies.jsx";
import { ResumeEditor } from "./resume-editor.jsx";
export function CandidateWorkspace({
  view = "search",
  query = "",
  city = "",
  quickFilter = "",
  searchFilters = {},
}) {
  const { ready, favorites, applications, isCandidate } = useCandidate();
  if (!ready) return <p role="status">{translate("candidate.loading")}</p>;
  if (["profile", "applications"].includes(view) && !isCandidate) return null;
  if (view === "profile") return <ResumeEditor />;
  const vacancies = selectVacancies(mockVacancies, {
    view,
    query,
    city,
    quickFilter,
    searchFilters,
    favorites,
    applications,
  });
  return (
    <section>
      <h2>
        {tabLabels[view]}{" "}
        <span className="candidate-count">{vacancies.length}</span>
      </h2>
      <VacancyList vacancies={vacancies} />
    </section>
  );
}
