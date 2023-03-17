import axios from 'axios';
import { ElectionContractAddrs } from '../models/constants';
import { ExecuteDto } from '../models/dto/CompilerDto';
import { ContractCandidateDto, ContractVoterDto } from '../models/dto/ContractDtos';

const blockchainClient = (blockHash: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BLOCKCHAIN_URL}/blocks/${blockHash}`;
  return fetch(apiUrl);
};

export default class BlockchainService {
  static async getTransaction(txHash: any) {
    debugger;
    try {
      const response = await blockchainClient(txHash);
      debugger;
      if (response.status === 200) {
        const data = await response.json();
        debugger;
        return data;
      }
    } catch (e: any) {
      throw e;
    }
  }
}
