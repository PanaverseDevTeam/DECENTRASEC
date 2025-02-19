// "use client"

// import { useState, useEffect } from "react";
// import { uploadPaper } from "../../utils/contractAction";
// import { getEthereumContract } from "../../lib/blockchain";
// import { Contract } from "ethers"; // 👈 Import `Contract` type

// export default function UploadForm() {
//     const [title, setTitle] = useState("");
//     const [ipfsHash, setIpfsHash] = useState("");
//     const [account, setAccount] = useState("");
//     const [contract, setContract] = useState<Contract | null>(null); // 👈 Fix TypeScript error

//     useEffect(() => {
//         const connectWallet = async () => {
//             if (typeof window !== "undefined" && window.ethereum) {
//                 const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//                 setAccount(accounts[0]);

//                 const contractInstance = getEthereumContract();
//                 if (contractInstance) {
//                     setContract(contractInstance);
//                 } else {
//                     console.error("Failed to load contract.");
//                 }
//             } else {
//                 alert("MetaMask is not installed!");
//             }
//         };
//         connectWallet();
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!contract) {
//             alert("Blockchain connection is not ready!");
//             return;
//         }
//         await uploadPaper(title, ipfsHash);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="p-4 border rounded">
//             <input
//                 type="text"
//                 placeholder="Research Paper Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="p-2 border rounded w-full"
//             />
//             <input
//                 type="text"
//                 placeholder="IPFS Hash"
//                 value={ipfsHash}
//                 onChange={(e) => setIpfsHash(e.target.value)}
//                 className="p-2 border rounded w-full mt-2"
//             />
//             <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
//                 Upload Paper
//             </button>
//         </form>
//     );
// }

////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect } from "react";
// import { uploadPaper } from "../../utils/contractAction";
// import { getEthereumContract } from "../../lib/blockchain";
// import { Contract } from "ethers";

// export default function UploadForm() {
//     const [title, setTitle] = useState("");
//     const [ipfsHash, setIpfsHash] = useState("");
//     const [account, setAccount] = useState("");
//     const [contract, setContract] = useState<Contract | null>(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const connectWallet = async () => {
//             if (typeof window !== "undefined" && window.ethereum) {
//                 const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//                 setAccount(accounts[0]);

//                 const contractInstance = getEthereumContract();
//                 if (contractInstance) {
//                     setContract(contractInstance);
//                 } else {
//                     console.error("Failed to load contract.");
//                 }
//             } else {
//                 alert("MetaMask is not installed!");
//             }
//         };
//         connectWallet();
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!contract) {
//             alert("Blockchain connection is not ready!");
//             return;
//         }
//         if (!title || !ipfsHash) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         setLoading(true);
//         try {
//             await uploadPaper(title, ipfsHash);
//             alert("Paper uploaded successfully! 🎉");
//             setTitle("");
//             setIpfsHash("");
//         } catch (error) {
//             console.error("Upload failed:", error);
//             alert("Failed to upload paper.");
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="flex flex-col items-start justify-start min-h-screen px-10 py-12">
//             {/* 🔹 Heading */}
//             <h1 className="text-3xl font-bold text-blue-500 tracking-wide mb-8">
//                 📜 Upload Research Paper
//             </h1>

//             {/* 🏛 Main Container */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
//                 {/* 🔹 Left Section: Why & How */}
//                 <div className="space-y-6">
//                     <div className="p-6 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
//                         <h2 className="text-lg font-semibold text-blue-400 mb-2">🔍 Why Upload on Blockchain?</h2>
//                         <p className="text-gray-400">
//                             - Immutable Storage: Your research papers are permanently recorded.<br />
//                             - Security & Transparency: Anyone can verify ownership and authenticity.<br />
//                             - Decentralized Proof: No central authority controls your papers.<br />
//                         </p>
//                     </div>

//                     <div className="p-6 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
//                         <h2 className="text-lg font-semibold text-blue-400 mb-2">📌 How to Upload?</h2>
//                         <ol className="list-decimal pl-6 text-gray-400">
//                             <li>Enter the **Research Paper Title**.</li>
//                             <li>Paste the **IPFS Hash** where your document is stored.</li>
//                             <li>Click **Upload Paper**, and it will be recorded on the blockchain.</li>
//                             <li>Check back to verify and share your paper securely. 🔒</li>
//                         </ol>
//                     </div>
//                 </div>

//                 {/* 📂 Right Section: Upload Form */}
//                 <div className="p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-md w-full">
//                     <h2 className="text-xl font-bold text-blue-400 mb-4 text-left">🚀 Upload Your Paper</h2>

//                     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                         <label className="text-gray-300 text-sm">
//                             Research Paper Title:
//                             <input
//                                 type="text"
//                                 placeholder="Enter title..."
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 shadow-md focus:ring focus:ring-blue-500"
//                             />
//                         </label>

//                         <label className="text-gray-300 text-sm">
//                             IPFS Hash:
//                             <input
//                                 type="text"
//                                 placeholder="Paste your IPFS hash..."
//                                 value={ipfsHash}
//                                 onChange={(e) => setIpfsHash(e.target.value)}
//                                 className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 shadow-md focus:ring focus:ring-blue-500"
//                             />
//                         </label>

//                         <button
//                             type="submit"
//                             className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition"
//                             disabled={loading}
//                         >
//                             {loading ? "Uploading..." : "📤 Upload Paper"}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useState, useEffect } from "react";
// import { uploadPaper } from "../../utils/contractAction";
// import { fetchPaperFromIPFS, validatePaperWithAI } from "../../utils/aiValidator";
// import { getEthereumContract } from "../../lib/blockchain";
// import { Contract } from "ethers";

// export default function UploadForm() {
//     const [title, setTitle] = useState("");
//     const [ipfsHash, setIpfsHash] = useState("");
//     const [account, setAccount] = useState("");
//     const [contract, setContract] = useState<Contract | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [aiAnalysis, setAiAnalysis] = useState(null);
//     const [aiLoading, setAiLoading] = useState(false);

//     useEffect(() => {
//         const connectWallet = async () => {
//             if (typeof window !== "undefined" && window.ethereum) {
//                 const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//                 setAccount(accounts[0]);

//                 const contractInstance = getEthereumContract();
//                 if (contractInstance) {
//                     setContract(contractInstance);
//                 } else {
//                     console.error("Failed to load contract.");
//                 }
//             } else {
//                 alert("MetaMask is not installed!");
//             }
//         };
//         connectWallet();
//     }, []);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!contract) {
//             alert("Blockchain connection is not ready!");
//             return;
//         }
//         if (!title || !ipfsHash) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         setLoading(true);
//         try {
//             await uploadPaper(title, ipfsHash);
//             alert("Paper uploaded successfully! 🎉");

//             // 🔍 AI Analysis After Upload
//             setAiLoading(true);
//             const paperText = await fetchPaperFromIPFS(ipfsHash);
//             if (paperText) {
//                 const aiResult = await validatePaperWithAI(paperText);
//                 setAiAnalysis(aiResult);
//             }
//             setAiLoading(false);

//             setTitle("");
//             setIpfsHash("");
//         } catch (error) {
//             console.error("Upload failed:", error);
//             alert("Failed to upload paper.");
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="flex flex-col items-start justify-start min-h-screen px-10 py-12">
//             {/* 🔹 Heading */}
//             <h1 className="text-3xl font-bold text-blue-500 tracking-wide mb-8">
//                 📜 Upload Research Paper
//             </h1>

//             {/* 🏛 Main Container */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
//                 {/* 🔹 Left Section: Why & How */}
//                 <div className="space-y-6">
//                     <div className="p-6 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
//                         <h2 className="text-lg font-semibold text-blue-400 mb-2">🔍 Why Upload on Blockchain?</h2>
//                         <p className="text-gray-400">
//                             - Immutable Storage: Your research papers are permanently recorded.<br />
//                             - Security & Transparency: Anyone can verify ownership and authenticity.<br />
//                             - Decentralized Proof: No central authority controls your papers.<br />
//                         </p>
//                     </div>

//                     <div className="p-6 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
//                         <h2 className="text-lg font-semibold text-blue-400 mb-2">📌 How to Upload?</h2>
//                         <ol className="list-decimal pl-6 text-gray-400">
//                             <li>Enter the **Research Paper Title**.</li>
//                             <li>Paste the **IPFS Hash** where your document is stored.</li>
//                             <li>Click **Upload Paper**, and it will be recorded on the blockchain.</li>
//                             <li>Check back to verify and share your paper securely. 🔒</li>
//                         </ol>
//                     </div>
//                 </div>

//                 {/* 📂 Right Section: Upload Form */}
//                 <div className="p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-md w-full">
//                     <h2 className="text-xl font-bold text-blue-400 mb-4 text-left">🚀 Upload Your Paper</h2>

//                     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                         <label className="text-gray-300 text-sm">
//                             Research Paper Title:
//                             <input
//                                 type="text"
//                                 placeholder="Enter title..."
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 shadow-md focus:ring focus:ring-blue-500"
//                             />
//                         </label>

//                         <label className="text-gray-300 text-sm">
//                             IPFS Hash:
//                             <input
//                                 type="text"
//                                 placeholder="Paste your IPFS hash..."
//                                 value={ipfsHash}
//                                 onChange={(e) => setIpfsHash(e.target.value)}
//                                 className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 shadow-md focus:ring focus:ring-blue-500"
//                             />
//                         </label>

//                         <button
//                             type="submit"
//                             className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition"
//                             disabled={loading}
//                         >
//                             {loading ? "Uploading..." : "📤 Upload Paper"}
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             {/* 🔍 AI Analysis Results */}
//             {aiLoading && (
//                 <div className="mt-8 p-6 bg-gray-900 border border-blue-500 rounded-lg text-gray-300">
//                     Analyzing your paper... ⏳
//                 </div>
//             )}

//             {aiAnalysis && (
//                 <div className="mt-8 p-6 bg-gray-900 border border-blue-500 rounded-lg">
//                     <h3 className="text-xl font-bold text-green-400">✅ AI Validation Results</h3>
//                     <p className="text-gray-300"><strong>Summary:</strong> {aiAnalysis.summary}</p>
//                     <p className="text-gray-300"><strong>Plagiarism Risk:</strong> {aiAnalysis.plagiarism_risk}%</p>
//                     <p className="text-gray-300"><strong>AI-Generated Risk:</strong> {aiAnalysis.ai_generated_risk}%</p>
//                     <p className="text-gray-300"><strong>Credibility Score:</strong> {aiAnalysis.credibility_score}/100</p>
//                     <p className="text-gray-300"><strong>Suggestions:</strong> {aiAnalysis.suggestions}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { uploadPaper } from "../../utils/contractAction";
import { getEthereumContract } from "../../lib/blockchain";
import { Contract } from "ethers";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        const contractInstance = getEthereumContract();
        if (contractInstance) {
          setContract(contractInstance);
        } else {
          console.error("Failed to load contract.");
        }
      } else {
        alert("MetaMask is not installed!");
      }
    };
    connectWallet();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract) {
      alert("Blockchain connection is not ready!");
      return;
    }
    if (!title || !abstract || !keywords || !ipfsHash) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await uploadPaper(title, ipfsHash);
      alert("Paper uploaded successfully! 🎉");

      // 🔍 AI Analysis After Upload
      setAiLoading(true);
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, abstract, keywords }),
      });

      const data = await response.json();
      if (data.success) {
        setAiAnalysis(data.analysis);
      } else {
        console.error("AI Validation Failed");
      }

      setAiLoading(false);
      setTitle("");
      setAbstract("");
      setKeywords("");
      setIpfsHash("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload paper.");
    }
    setLoading(false);
  };

  return (
    <div className=" relative flex flex-col items-start justify-start min-h-screen px-10 py-12">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        📜 Upload & Validate Research Paper
      </h1>

      {/* 🔹 Step-by-Step Process */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="p-4 border border-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-400">
            1️⃣ Prepare Paper
          </h2>
          <p className="text-gray-400 text-sm">
            Ensure your abstract and keywords clearly represent your research.
            Upload your paper to IPFS and copy the hash.
          </p>
        </div>
        <div className="p-4  border border-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-400">
            2️⃣ Upload & Validate
          </h2>
          <p className="text-gray-400 text-sm">
            Your paper is stored securely on the blockchain. Our AI will analyze
            its authenticity and credibility.
          </p>
        </div>
        <div className="p-4  border border-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-400">
            3️⃣ Review AI Feedback
          </h2>
          <p className="text-gray-400 text-sm">
            Get insights on originality, AI-generated content, and improvement
            suggestions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {/* 🔹 Left - Why Upload? */}
        <div className="space-y-6">
          <div className="p-6  border border-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-400 mb-2">
              🔍 Why AI Validation?
            </h2>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>
                ✅ <strong>Plagiarism Detection:</strong> Ensure your research
                is original.
              </li>
              <li>
                ✅ <strong>AI-Generated Risk:</strong> Detects auto-generated
                content.
              </li>
              <li>
                ✅ <strong>Credibility Score:</strong> Evaluates academic
                strength.
              </li>
            </ul>
          </div>
        </div>

        {/* 🔹 Right - Upload Form */}
        <div className="p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-bold text-blue-400 mb-4">
            🚀 Upload Paper
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200"
            />
            <textarea
              placeholder="Abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 h-40"
            ></textarea>
            <input
              type="text"
              placeholder="Keywords (comma-separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200"
            />
            <input
              type="text"
              placeholder="IPFS Hash"
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200"
            />

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg"
              disabled={loading}
            >
              {loading ? "Uploading..." : "📤 Upload & Validate"}
            </button>
          </form>
        </div>
      </div>

      {/* 🔍 AI Analysis Results */}
      {aiAnalysis && (
        <div className=" absolute left-10 top-[55%] p-6 bg-gray-900 border border-blue-500 max-w-[788px] rounded-lg">
          <h3 className="text-xl font-bold text-green-400">
            ✅ AI Validation Results
          </h3>

          <div className="mt-4">
            <p className="text-gray-300 font-semibold">AI-Generated Risk:</p>
            <progress
              className="w-full h-2 bg-gray-700 rounded-lg"
              value={aiAnalysis.ai_generated_risk}
              max="100"
            ></progress>
          </div>

          <div className="mt-4">
            <p className="text-gray-300 font-semibold">Plagiarism Risk:</p>
            <progress
              className="w-full h-2 bg-gray-700 rounded-lg"
              value={aiAnalysis.plagiarism_risk}
              max="100"
            ></progress>
          </div>

          <p className="mt-4 text-gray-300">
            <strong>Suggestions:</strong>
          </p>
          <ul className="text-gray-400 list-disc list-inside">
            {aiAnalysis.suggestions.split(". ").map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
