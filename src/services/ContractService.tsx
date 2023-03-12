import { utils, Contract, ethers, BigNumber, providers } from 'ethers';
import electionAbi from '../abi/election_abi.json';
import { ElectionContractAddrs } from '../models/constants';

import { ContractCandidateDto, ContractVoterDto } from '../models/dto/ContractDtos';
import { toast } from 'react-toastify';
const InputDataDecoder = require('ethereum-input-data-decoder');

const decoder = new InputDataDecoder(electionAbi);

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

      const candidateList = await contract.getCandidateList();

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

      const candidateCount: BigNumber = await contract.getCandidatesCount();

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

      const result = await contract.getResults();

      return result;
    } catch (e: any) {
      //@ts-ignore
      let errorMessage: string = e.message;
      if (errorMessage.indexOf('reason=') > 0) {
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

      const voterCount: BigNumber = await contract.getVotersCount();

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

      const votingEndTime: BigNumber = await contract.getVotingEndTime();

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
      // print(e.message);
      errorMessage = errorMessage.slice(0, errorMessage.indexOf('('));
      throw new Error(errorMessage);
    }
  }

  static async getElectionName(): Promise<string> {
    try {
      const provider = this.getProvider();
      const contract = this.getContract(provider);
      const electionName: string = await contract.electionName();

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

      const votingStartTime: BigNumber = await contract.getVotingEndTime();

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
      debugger;
      const res = await contract.startElection(
        electionName,
        endTimeSec,
        candidateTuple,
        voterTuple,
        posts,
      );

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
      const miningResult = await provider.waitForTransaction(res.hash);
      return miningResult.transactionHash;
    } catch (e: any) {
      //@ts-ignore
      let errorMessage: string = e.message;
      if (errorMessage.indexOf('reason=') > 0) {
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

  static async getTransaction(txHash: string): Promise<providers.TransactionResponse> {
    const provider: ethers.providers.Provider = this.getProvider();
    return await provider.getTransaction(txHash);
  }

  static async getBlock(blockNumber: number): Promise<providers.Block> {
    const provider: ethers.providers.Provider = this.getProvider();
    return await provider.getBlock(blockNumber);
  }

  static decodeData(data: string) {
    const result = decoder.decodeData(data);
    return result;
  }
}
