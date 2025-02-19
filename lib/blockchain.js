import { ethers } from "ethers";
import contractABI from "../lib/ResearchPaperRegistry.json"; // ✅ Ensure correct path

const CONTRACT_ADDRESS = "0xFBFCA9c9A4Eb92590d5aebAC11b3f19F00aBAbEF";
const POLYGON_TESTNET_ID = 80002; // ✅ Amoy Testnet Chain ID

export const getEthereumContract = async () => {
    if (typeof window === "undefined") return null;

    if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return null;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // ✅ Force MetaMask to switch to the correct network
        const { chainId } = await provider.getNetwork();
        if (chainId !== POLYGON_TESTNET_ID) {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x13882" }], // 80002 in hex
            });
        }

        return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
    } catch (error) {
        console.error("Error initializing Ethereum contract:", error);
        return null;
    }
};
