import { BigNumber } from 'ethers';

export type ContractCandidateDto = {
  candidate_id: string;
  name: string;
  image_url: string;
  post: string;
  logo: string;
};

export type ContractVoterDto = {
  voterId: string;
  name: string;
  votedTo: string[];
  isVoted: boolean;
};

export type ElectionResultDto = {
  name: string;
  image_url: string;
  votecount: number;
  candidate_id: string;
  post: string;
  logo: string;
};
