import { ethers } from "ethers";
import { toast } from "react-toastify";

export const checkIfMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const connectMetamask = async () => {
  if (!checkIfMetaMaskInstalled()) {
    toast.error("No Metamask detected. Please install Metamask to continue.");
    window.open('https://metamask.io/download/', '_blank');
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
