import { CandidateDto } from '../models/dto/ServerOpDtos';

export function filterCandidateStatus(candidates: CandidateDto[]) {
  const filteredCandidates: Record<string, CandidateDto[]> = {};
  console.log({ candidates });
  candidates.forEach((e) => {
    7;
    console.log('candidate');
    if (filteredCandidates[`${e.post}`]) {
      filteredCandidates[`${e.post}`] = [...filteredCandidates[`${e.post}`], e];
    } else {
      filteredCandidates[`${e.post}`] = [e];
    }
  });

  return filteredCandidates;
}
