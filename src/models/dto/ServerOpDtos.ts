export type CandidateDto = {
  candidate_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  post: string;
  image: string;
};

export type VoterDto = {
  voter_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
};

export type AdminCredentialDto = {
  admin_id: string;
  password: string;
};

export type AdminDto = {
  admin_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
};

export type VoterCredentialDto = {
  voter_id: string;
  password: string;
};

export type CandidateResponseDto = {
  total_items: number;
  posts: string[];
  content: Array<CandidateDto>;
};

export type VoterResponseDto = {
  total_items: number;
  content: Array<VoterDto>;
};
