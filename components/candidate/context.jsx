"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  emptyCandidateState,
  restoreCandidateState,
  applyToVacancy,
} from "../../domains/candidate/state.js";
import {
  canUseCandidateFeatures,
  candidateStorageKey,
} from "../../domains/candidate/access.js";
import { mockVacancies } from "../../domains/vacancy/mocks.js";
import { translate } from "../../i18n/index.js";
const CandidateContext = createContext(null);
export function CandidateProvider({ children, user }) {
  const isCandidate = canUseCandidateFeatures(user);
  const storageKey = candidateStorageKey(user);
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
  }, [storageKey]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      setStorageError(true);
    }
  }, [state, ready, storageKey]);
  const value = {
    ...state,
    ready,
    isCandidate,
    saveResume: (resume) => {
      if (isCandidate) setState((previous) => ({ ...previous, resume }));
    },
    toggleFavorite: (id) =>
      setState((previous) => ({
        ...previous,
        favorites: previous.favorites.includes(id)
          ? previous.favorites.filter((value) => value !== id)
          : [...previous.favorites, id],
      })),
    apply: (id) => {
      if (isCandidate) setState((previous) => applyToVacancy(previous, id));
    },
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
