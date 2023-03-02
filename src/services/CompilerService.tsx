import { ElectionContractAddrs } from '../models/constants';
import { ExecuteDto } from '../models/dto/CompilerDto';
import { ContractCandidateDto, ContractVoterDto } from '../models/dto/ContractDtos';

export const compilerClient = (body: any) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_COMPILER_URL}/execute`;
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export default class CompilerService {
  static async startElection(
    electionName: string,
    endTimeSec: number,
    candidates: ContractCandidateDto[],
    voters: ContractVoterDto[],
    posts: string[],
  ) {
    candidates.map(async (candidate) => {
      const request: ExecuteDto = {
        contract_address: ElectionContractAddrs,
        command_params: {
          command: 'initialize-candidates',
          option_name: '--details',
          args: [
            candidate.candidateId,
            candidate.name,
            candidate.imageUrl,
            candidate.logo,
            candidate.post,
          ],
        },
      };
      debugger;
      await compilerClient(request);
    });
    return 'success';
    // return compilerClient()
  }
  static addCandidates() {}

  static addVoters() {}
}
