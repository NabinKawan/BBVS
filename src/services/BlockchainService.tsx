import environments from '../configs/environments';

const blockchainClient = (blockHash: string) => {
  const apiUrl = `${environments.BLOCKCHAIN_URL}/blocks/${blockHash}`;
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
