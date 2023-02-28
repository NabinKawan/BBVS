import { CandidateDto } from '../models/dto/ServerOpDtos';

export function filterCandidateStatus(candidates: CandidateDto[]) {
  const filteredCandidates: Record<string, CandidateDto[]> = {};

  candidates.forEach((e) => {
    7;

    if (filteredCandidates[`${e.post}`]) {
      filteredCandidates[`${e.post}`] = [...filteredCandidates[`${e.post}`], e];
    } else {
      filteredCandidates[`${e.post}`] = [e];
    }
  });

  return filteredCandidates;
}
