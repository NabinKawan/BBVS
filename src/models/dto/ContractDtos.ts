export type ContractCandidateDto = {
  candidateId: string;
  name: string;
  imageUrl: string;
  post: string;
};

export type ContractVoterDto = {
  voterId: string;
  name: string;
  votedTo: string[];
  isVoted: boolean;
};

export type ElectionResultDto = {
  name: string;
  imageUrl: string;
  voteCount: number;
  candidateId: string;
};
