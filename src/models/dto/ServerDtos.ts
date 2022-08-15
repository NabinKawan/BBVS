type CandidateContentDto = {
  cid: number;
  name: string;
  crn: string;
  image: string;
};

export type CandidateDto = {
  candidates: Array<CandidateContentDto>;
};
