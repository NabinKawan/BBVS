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
    function formatList(arr: ContractCandidateDto[] | ContractVoterDto[]) {
      let formatedList: any[] = [];
      arr.map((ob) => formatedList.push(Object.values(ob)));
      return JSON.stringify(formatedList);
    }

    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'start-election',
        option_name: '--election',
        args: [
          electionName,
          endTimeSec.toString(),
          formatList(candidates),
          formatList(voters),
          JSON.stringify(posts),
        ],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();

        return data;
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async vote(voter_id: string, candidates: string[]) {
    let candidates_request = JSON.stringify(candidates).replace('"', '"');
    debugger;
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'do-vote',
        option_name: '--vote',
        args: [voter_id, candidates_request],
      },
    };
    try {
      const response = await compilerClient(request);
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        return data.blockchain_response['tx_hash'];
      } else if (response.status === 400) {
        throw Error(data.detail);
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getVoterStatus(voter_id: string) {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-voter-status',
        option_name: '--voter',
        args: [voter_id],
      },
    };
    try {
      const response = await compilerClient(request);
      const data = await response.json();
      if (response.status === 200) {
        if (data.contract_response.toLowerCase() == 'false') {
          return false;
        } else if (data.contract_response.toLowerCase() == 'true') {
          return true;
        }
      } else if (response.status === 400) {
        throw Error(data.detail);
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getCandidateList() {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-candidate-list',
        option_name: '',
        args: [''],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();
        const listData = JSON.parse(data.contract_response.replace(/'/g, '"'));
        return listData;
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getResults() {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-results',
        option_name: '',
        args: [''],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();
        const listData = JSON.parse(data.contract_response.replace(/'/g, '"'));
        return listData;
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getTotalVotes() {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-total-votes',
        option_name: '',
        args: [''],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();
        const contract_response = Number(data.contract_response);
        return contract_response;
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getCandidatesCount() {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-candidates-count',
        option_name: '',
        args: [''],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();
        const contract_response = Number(data.contract_response);
        return contract_response;
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getVotersCount() {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-voters-count',
        option_name: '',
        args: [''],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();
        const contract_response = Number(data.contract_response);
        return contract_response;
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getVotingEndTime() {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-end-time',
        option_name: '',
        args: [''],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();
        const contract_response = Number(data.contract_response);
        return contract_response;
      }
    } catch (e: any) {
      throw e;
    }
  }

  static async getElectionName() {
    const request: ExecuteDto = {
      contract_address: ElectionContractAddrs,
      command_params: {
        command: 'get-election-name',
        option_name: '',
        args: [''],
      },
    };
    try {
      const response = await compilerClient(request);

      if (response.status === 200) {
        const data = await response.json();
        return data.contract_response;
      }
    } catch (e: any) {
      throw e;
    }
  }
}
