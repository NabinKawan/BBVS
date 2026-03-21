import environments from '../configs/environments';

const blockchainClient = (blockHash: string) => {
  const apiUrl = `${environments.BLOCKCHAIN_URL}/blocks/${blockHash}`;
  return fetch(apiUrl);
};

export default class BlockchainService {
  static async getTransaction(txHash: any) {
    try {
      const response = await blockchainClient(txHash);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    } catch (e: any) {
      throw e;
    }
  }
}
