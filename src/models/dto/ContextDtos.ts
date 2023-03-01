import { candidates } from '../../dummy/data';
import { AdminDto, CandidateDto, VoterDto } from './ServerOpDtos';

export type CandidateContextDto = {
  candidates: Array<CandidateDto>;
  clearAddCandidateRef: boolean;
  posts: Array<string>;
  // @ts-ignore
  setPosts: (posts: Array<string>) => null;
  // @ts-ignore
  setCandidates: (candidates: Array<CandidateDto>) => null;

  addCandidateInfo: (id: string, value: string) => null;
  getAddCandidateInfo: () => CandidateDto;
  clearAddCandidateInfo: () => null;
};

export type VoterContextDto = {
  voters: Array<VoterDto>;
  clearAddVoterRef: boolean;
  // @ts-ignore
  setVoters: (candidates: Array<VoterDto>) => null;
  addVoterInfo: (id: string, value: string) => null;
  getAddVoterInfo: () => VoterDto;
  clearAddVoterInfo: () => null;
};

export type AdminContextDto = {
  currentContainer: string;
  accessToken: string;
  admin: AdminDto;
  setAdmin: (admin: AdminDto) => null;
  setAccessToken: (accessToken: string) => null;
  // @ts-ignore
  setCurrentContainer: (string) => null;
};

export type VotingContextDto = {
  completedSteps: string[];
  votes: {};
  accessToken: string;
  voter: VoterDto;
  setVoter: (voter: VoterDto) => null;
  setAccessToken: (accessToken: string) => null;
  addVote: (post: string, candidate: CandidateDto | null) => null;
  addStep: (step: string) => null;
  clearVotes: () => null;
  getVotes: () => string[];
};
