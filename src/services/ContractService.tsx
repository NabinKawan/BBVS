import { BigNumber, Contract, ethers } from 'ethers';
import ownerAbi from '../abi/owner_abi.json';
import storageAbi from '../abi/storage_abi.json';
import electionAbi from '../abi/election_abi.json';
import {
  ElectionContractAddrs,
  OwnerContractAddrs,
  StorageContractAddrs,
} from '../models/constants';
import { Address } from 'cluster';

import { CandidateDto, VoterDto } from '../models/dto/ServerOpDtos';
import {
  ContractCandidateDto,
  ElectionResultDto,
  ContractVoterDto,
} from '../models/dto/ContractDtos';
import { toast } from 'react-toastify';

export default class ContractService {
  static getProvider() {
    // @ts-ignore
    return new ethers.providers.Web3Provider(window.ethereum);
  }

  static getContract(provider: ethers.providers.Provider | ethers.Signer) {
    const contract = new ethers.Contract(ElectionContractAddrs, electionAbi, provider);
    return contract;
  }

  static async getCandidateList() {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      console.log(contract);
      const candidateList = await contract.getCandidateList();
      console.log(candidateList);
      return candidateList;
    } catch (e: any) {
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(errorMessage.indexOf('reason='), errorMessage.length);
      errorMessage = errorMessage.slice(8, errorMessage.indexOf('",'));
      throw new Error(errorMessage);
    }
  }

  static async getCandidatesCount() {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      console.log(contract);
      const candidateCount: BigNumber = await contract.getCandidatesCount();
      console.log(candidateCount.toNumber());
      return candidateCount.toNumber();
    } catch (e: any) {
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  static async getResults() {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      console.log(contract);
      const result = await contract.getResults();
      console.log(result);
      return result;
    } catch (e: any) {
      //@ts-ignore
      let errorMessage: string = e.message;
      if (errorMessage.indexOf('reason=') > 0) {
        console.log('yeah');
        errorMessage = errorMessage.slice(errorMessage.indexOf('reason='), errorMessage.length);
        errorMessage = errorMessage.slice(8, errorMessage.indexOf('",'));
        throw new Error(errorMessage);
      } else {
        //@ts-ignore
        let errorMessage = e.message;
        errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
        throw new Error(errorMessage[0].toUpperCase() + errorMessage.slice(1));
      }
    }
  }

  static async getVotersCount() {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      console.log(contract);
      const voterCount: BigNumber = await contract.getVotersCount();
      console.log(voterCount.toNumber());
      return voterCount.toNumber();
    } catch (e: any) {
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  static async getVotingEndTime() {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      console.log(contract);
      const votingEndTime: BigNumber = await contract.getVotingEndTime();
      console.log(votingEndTime.toNumber());
      return votingEndTime.toNumber();
    } catch (e: any) {
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  static async getTotalVotes(): Promise<number> {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      const totalVotes: BigNumber = await contract.totalVotes();
      return totalVotes.toNumber();
    } catch (e: any) {
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  static async getElectionName(): Promise<string> {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      const electionName: string = await contract.electionName();
      console.log(electionName);
      return electionName;
    } catch (e: any) {
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  static async getVoterStatus(voterId: string): Promise<boolean> {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      const res: boolean = await contract.getVoterStatus(voterId);
      return res;
    } catch (e) {
      console.log(e);
      //@ts-ignore
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(errorMessage.indexOf('reason='), errorMessage.length);
      errorMessage = errorMessage.slice(8, errorMessage.indexOf('",'));
      throw new Error(errorMessage);
    }
  }

  static async getVotingStartTime() {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      console.log(contract);
      const votingStartTime: BigNumber = await contract.getVotingEndTime();
      console.log(votingStartTime.toNumber());
      return votingStartTime.toNumber();
    } catch (e: any) {
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  generateTuple(members: ContractCandidateDto[] | ContractVoterDto[]) {
    const _tuple: any[][] = [];
    members.forEach((member) => {
      _tuple.push(Object.values(member));
    });
    return _tuple;
  }

  static async startElection(
    electionName: string,
    endTimeSec: number,
    candidates: ContractCandidateDto[],
    voters: ContractVoterDto[],
    posts: string[],
  ) {
    try {
      const contractService = new ContractService();
      const provider = this.getProvider();
      if (!provider) throw Error('No Provider selected');
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = this.getContract(signer);

      const candidateTuple = contractService.generateTuple(candidates);
      const voterTuple = contractService.generateTuple(voters);
      console.log(candidateTuple);
      console.log(voterTuple);
      const res = await contract.startElection(
        electionName,
        endTimeSec,
        candidateTuple,
        voterTuple,
        posts,
      );
      console.log(res);
      if (res) {
        toast.info('Transaction in progress', { autoClose: 2000 });
      }
      const miningResult = provider.waitForTransaction(res.hash);
      return miningResult;
    } catch (e) {
      //@ts-ignore
      let errorMessage = e.message;
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  static async vote(voterId: string, candidateIds: string[]) {
    try {
      const provider = this.getProvider();
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      const contract = this.getContract(signer);
      const res = await contract.vote(voterId, candidateIds);
      console.log(res);
      if (res) {
        toast.info('Transaction in progress', { autoClose: 2000 });
      }
      const miningResult = provider.waitForTransaction(res.hash);
      return miningResult;
    } catch (e: any) {
      console.log(e);
      //@ts-ignore
      let errorMessage: string = e.message;
      if (errorMessage.indexOf('reason=') > 0) {
        console.log('yeah');
        errorMessage = errorMessage.slice(errorMessage.indexOf('reason='), errorMessage.length);
        errorMessage = errorMessage.slice(8, errorMessage.indexOf('",'));
        throw new Error(errorMessage);
      } else {
        //@ts-ignore
        let errorMessage = e.message;
        errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
        throw new Error(errorMessage[0].toUpperCase() + errorMessage.slice(1));
      }
    }
  }
}
