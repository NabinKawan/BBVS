import { Contract, ethers } from 'ethers';
import ownerAbi from '../abi/owner_abi.json';
import storageAbi from '../abi/storage_abi.json';
import { OwnerContractAddrs, StorageContractAddrs } from '../models/constants';

export default class ContractService {
  static getProvider() {
    // @ts-ignore
    return new ethers.providers.Web3Provider(window.ethereum);
  }

  static getContract() {
    const provider = this.getProvider();
    console.log(provider);
    const ownerContract = new ethers.Contract(StorageContractAddrs, storageAbi, provider);
    return ownerContract;
  }

  static async getOwner() {
    const ownerContract = this.getContract();
    const provider = this.getProvider();
    console.log(storageAbi);
    console.log(await provider.getCode('0xA8388dCb0eBcf24cF1B50eCEc2826c39ffF547c3'));

    console.log(await ownerContract.retrieve());
    // ownerContract.retrieve().then((value: any) => {
    //   console.log('owner');
    //   console.log(value);
    // });
  }
}
