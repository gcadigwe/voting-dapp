import { contractAbi } from './abi';
import { ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();

      const poll = new Contract(
        '0xc863d2F0d8FcC14212D2ab65C68E48648C47c885',
        contractAbi,
        signer
      );
      resolve({ poll });
      return;
    }
    reject('Install Metamask');
  });

export default getBlockchain;
