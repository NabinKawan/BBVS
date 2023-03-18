export type InputsDto = {
  voter: string;
  votes: string[];
};

export type MetaDataDto = {
  inputs: InputsDto;
  address: string;
};

export type BlockDto = {
  block_hash: string;
  prev_hash: string;
  timestamp: number;
  tx: MetaDataDto;
};
