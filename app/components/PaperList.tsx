"use client";

import { useState, useEffect } from "react";
import { getPapers, verifyPaper } from "../../utils/contractAction";

export default function PaperList() {
    const [papers, setPapers] = useState([]);
    const [filteredPapers, setFilteredPapers] = useState([]); // ✅ Filtered list
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Frontend search state
    const [userAddress, setUserAddress] = useState("");
    const [loadingIndex, setLoadingIndex] = useState(null); // ✅ Track loading state for verification

    useEffect(() => {
        const fetchPapers = async () => {
            if (typeof window.ethereum !== "undefined") {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });

                if (accounts.length > 0) {
                    setUserAddress(accounts[0]);
                    const uploadedPapers = await getPapers(accounts[0]);
                    setPapers(uploadedPapers);
                    setFilteredPapers(uploadedPapers); // ✅ Set filtered papers initially
                } else {
                    console.error("No MetaMask account found.");
                }
            } else {
                console.error("MetaMask is not installed.");
            }
        };
        fetchPapers();
    }, []);

    // ✅ Function to Verify a Paper
    const handleVerifyPaper = async (index) => {
        setLoadingIndex(index);
        const success = await verifyPaper(userAddress, index);
        if (success) {
            const updatedPapers = [...papers];
            updatedPapers[index].verified = true;
            setPapers(updatedPapers);
            setFilteredPapers(updatedPapers); // ✅ Also update filtered list
        }
        setLoadingIndex(null);
    };

    // ✅ Real-time filtering based on search input
    useEffect(() => {
        if (!searchQuery) {
            setFilteredPapers(papers); // Show all if search is empty
        } else {
            const filtered = papers.filter((paper) =>
                paper.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPapers(filtered);
        }
    }, [searchQuery, papers]);

    return (
        <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-sm font-bold text-white text-start mb-6">📜 Uploaded Papers</h2>

            {/* 🔍 Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="🔍 Search papers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-blue-500 bg-gray-900 text-gray-300 rounded-lg shadow-md focus:ring focus:ring-blue-500 transition-all"
                />
            </div>

            {filteredPapers.length === 0 ? (
                <p className="text-gray-400 text-center">No matching papers found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {filteredPapers.map((paper, index) => (
                        <div
                            key={index}
                            className="p-6 border border-gray-700 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all"
                        >
                            <h3 className="text-lg font-semibold text-white">{index + 1}. {paper.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Uploaded by: <span className="text-blue-400 break-all">{userAddress}</span>
                            </p>

                            <div className="mt-3 flex flex-col space-y-3">
                                <a
                                    href={`https://ipfs.io/ipfs/${paper.ipfsHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-400 transition"
                                >
                                    🔗 View Paper
                                </a>

                                {paper.verified ? (
                                    <span className="text-green-400 bg-green-900 py-2 rounded-md p-2 max-w-28 items-start justify-start text-center font-medium">✅ Verified</span>
                                ) : (
                                    <button
                                        className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                                        onClick={() => handleVerifyPaper(index)}
                                        disabled={loadingIndex === index}
                                    >
                                        {loadingIndex === index ? "Verifying..." : "Verify"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
