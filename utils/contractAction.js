import { getEthereumContract } from "../lib/blockchain";

// ✅ Upload Research Paper to Blockchain
export const uploadPaper = async (title, ipfsHash) => {
    try {
        if (!title || !ipfsHash) {
            console.error("❌ Title or IPFS Hash is missing!");
            return;
        }

        const contract = await getEthereumContract();
        if (!contract) throw new Error("❌ Contract not found!");

        console.log("🚀 Sending transaction...");
        const tx = await contract.uploadPaper(title, ipfsHash, {
            gasLimit: 250000, // ✅ Lowered gas limit
        });

        console.log("✅ Transaction sent:", tx.hash);
        await tx.wait();
        console.log("🎉 Paper uploaded successfully!");

    } catch (error) {
        console.error("❌ Error uploading paper:", error);
    }
};

export const verifyPaper = async (userAddress, paperIndex) => {
    try {
        const contract = await getEthereumContract();
        if (!contract) throw new Error("Contract not found!");

        const tx = await contract.verifyPaper(userAddress, paperIndex);
        await tx.wait(); // Wait for the transaction to complete

        console.log("Paper verified successfully!");
        return true;
    } catch (error) {
        console.error("Error verifying paper:", error);
        return false;
    }
};

export const verifyPaperOnChain = async (userAddress, index) => {
    try {
        const contract = getEthereumContract();
        const tx = await contract.verifyPaper(userAddress, index);
        await tx.wait();
        return true;
    } catch (error) {
        console.error("Verification failed:", error);
        return false;
    }
};


// ✅ Fetch Research Papers from Blockchain
export const getPapers = async (userAddress) => {
    try {
        if (!userAddress) {
            throw new Error("Invalid user address! Please connect MetaMask.");
        }

        const contract = await getEthereumContract();
        if (!contract) throw new Error("Contract not found!");

        const papers = await contract.getPapers(userAddress);
        return papers.map(paper => ({
            title: paper.title,
            author: paper.author,
            ipfsHash: paper.hash,
            verified: paper.verified, // ✅ Include verification status
        }));

    } catch (error) {
        console.error("Error fetching research papers:", error);
        return [];
    }
};
