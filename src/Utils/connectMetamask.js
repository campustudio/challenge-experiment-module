import { ethers } from "ethers";
import { showMetaMaskError } from "./messages";

export const checkIfMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const connectMetamask = async () => {
  if (!checkIfMetaMaskInstalled()) {
    showMetaMaskError();
    return null;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { signer: signer, provider: provider };
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const checkIfWalletIsConnect = async (setAccount) => {
  try {
    if (!checkIfMetaMaskInstalled()) {
      console.log("Metamask not installed");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  } catch (error) {
    console.log(error);
  }
};
