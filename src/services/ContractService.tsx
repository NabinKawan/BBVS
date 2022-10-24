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
import { promises } from 'stream';

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
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    console.log(contract);
    const candidateList: ContractCandidateDto[] = await contract.getCandidateList();
    console.log(candidateList);
    return candidateList;
  }

  static async getCandidatesCount() {
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    console.log(contract);
    const candidateCount: BigNumber = await contract.getCandidatesCount();
    console.log(candidateCount.toNumber());
    return candidateCount.toNumber();
  }

  static async getResults() {
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    console.log(contract);
    const result: ElectionResultDto = await contract.getResults();
    console.log(result);
    return result;
  }

  static async getVotersCount() {
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    console.log(contract);
    const voterCount: BigNumber = await contract.getVotersCount();
    console.log(voterCount.toNumber());
    return voterCount.toNumber();
  }

  static async getVotingEndTime() {
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    console.log(contract);
    const votingEndTime: BigNumber = await contract.getVotingEndTime();
    console.log(votingEndTime.toNumber());
    return votingEndTime.toNumber();
  }

  static async getTotalVotes(): Promise<number> {
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    const totalVotes: BigNumber = await contract.totalVotes();
    return totalVotes.toNumber();
  }

  static async getElectionName(): Promise<string> {
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    const electionName: string = await contract.electionName();
    console.log(electionName);
    return electionName;
  }

  static async didCurrentVoterVoted(voterId: string): Promise<boolean> {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      const res: boolean = await contract.didCurrentVoterVoted(voterId);
      return res;
    } catch (e) {
      throw new Error('Provider error');
    }
  }

  static async getVotingStartTime() {
    const provider = this.getProvider();
    const contract = this.getContract(provider);
    console.log(contract);
    const votingStartTime: BigNumber = await contract.getVotingEndTime();
    console.log(votingStartTime.toNumber());
    return votingStartTime.toNumber();
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
      );
      if (res) {
        toast.info('Transaction in progress', { autoClose: 2000 });
      }
      const miningResult = provider.waitForTransaction(res.hash);
      return miningResult;
    } catch (e) {
      console.log(e);

      //@ts-ignore
      throw new Error(e);
    }
  }

  static async vote(voterId: string, candidateIds: string[]) {
    const provider = this.getProvider();
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const contract = this.getContract(signer);
    await contract.vote(voterId, candidateIds);
  }
}
