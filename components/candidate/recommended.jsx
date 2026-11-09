"use client";
import Link from "next/link";
import { translate } from "../../i18n/index.js";
import { useCandidate } from "./context.jsx";
import { mockVacancies } from "../../domains/vacancy/mocks.js";
import { selectVacancies } from "../../domains/vacancy/model.js";
import { VacancyList } from "./vacancies.jsx";
export function RecommendedVacancies() {
  const { resume, ready } = useCandidate();
  const query = resume.profession.trim();
  const matched = query ? selectVacancies(mockVacancies, { query }) : [];
  return (
    <section>
      <h2>{translate("recommendations.title")}</h2>
      {!ready ? (
        <p role="status">{translate("candidate.loading")}</p>
      ) : (
        <>
          <p>
            {matched.length
              ? translate("recommendations.matched")
              : translate("recommendations.explore")}
          </p>
          {!query && (
            <p>
              <Link href="/cv-welcome">
                {translate("candidate.createResume")}
              </Link>
            </p>
          )}
          <VacancyList vacancies={matched.length ? matched : mockVacancies} />
        </>
      )}
    </section>
  );
}
