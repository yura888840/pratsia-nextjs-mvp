"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  emptyCandidateState,
  restoreCandidateState,
  applyToVacancy,
} from "../../domains/candidate/state.js";
import { mockVacancies } from "../../domains/vacancy/mocks.js";
import { translate } from "../../i18n/index.js";
const CandidateContext = createContext(null);
const storageKey = "pratsia:candidate-demo:v1";
export function CandidateProvider({ children }) {
  const [state, setState] = useState(emptyCandidateState);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      setState(
        restoreCandidateState(
          JSON.parse(localStorage.getItem(storageKey) || "null"),
          mockVacancies,
        ),
      );
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      setStorageError(true);
    }
  }, [state, ready]);
  const value = {
    ...state,
    ready,
    saveResume: (resume) => setState((previous) => ({ ...previous, resume })),
    toggleFavorite: (id) =>
      setState((previous) => ({
        ...previous,
        favorites: previous.favorites.includes(id)
          ? previous.favorites.filter((value) => value !== id)
          : [...previous.favorites, id],
      })),
    apply: (id) => setState((previous) => applyToVacancy(previous, id)),
  };
  return (
    <CandidateContext.Provider value={value}>
      {storageError && (
        <p className="candidate-notice" role="alert">
          {translate("candidate.storageError")}
        </p>
      )}
      {children}
    </CandidateContext.Provider>
  );
}
export const useCandidate = () => useContext(CandidateContext);
