import { ethers } from "ethers";
import { checkAndNotifyMetaMask } from "./messages";

export const connectMetamask = async () => {
  if (!checkAndNotifyMetaMask()) {
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
    if (!checkAndNotifyMetaMask()) {
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
