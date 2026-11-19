// Server-side contract. The caller authorizes the employer and checks CV visibility.
export interface CandidateMatchV1 {
  candidateId: string;
  cvId: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface CandidateMatchingPort {
  findCandidates(vacancyId: string, limit: number): Promise<readonly CandidateMatchV1[]>;
}
