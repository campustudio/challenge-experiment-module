import { toast } from "react-toastify";

export const WALLET_MESSAGES = {
  NO_METAMASK: "🦊 MetaMask not detected. Click here to install MetaMask →"
};

export const showMetaMaskError = () => {
  toast.error(WALLET_MESSAGES.NO_METAMASK, {
    onClick: () => window.open("https://metamask.io/download/", "_blank"),
    autoClose: false,
  });
};

export const checkAndNotifyMetaMask = () => {
  const { ethereum } = window;
  const hasMetaMask = Boolean(ethereum && ethereum.isMetaMask);
  if (!hasMetaMask) {
    showMetaMaskError();
  }
  return hasMetaMask;
};
