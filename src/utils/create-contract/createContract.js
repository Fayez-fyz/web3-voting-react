import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/constants";

export const createEthereumContract = async () => {
  try {
    if (!window.ethereum) throw new Error("Ethereum object not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    return { contract, signer };
  } catch (error) {
    console.error("Failed to create Ethereum contract:", error);
    throw error;
  }
};
