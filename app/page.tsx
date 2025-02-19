// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { getPapers } from "../utils/contractAction"; // ✅ Fetch papers from blockchain
// import PaperList from "./components/PaperList";

// export default function Home({ userAddress }) {
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state
//   const [papers, setPapers] = useState([]); // ✅ Papers state
//   const [filteredPapers, setFilteredPapers] = useState([]); // ✅ Filtered results

//   // ✅ Fetch all papers when the page loads
//   useEffect(() => {
//     const fetchPapers = async () => {
//       const allPapers = await getPapers(); // ✅ Fetch all papers
//       setPapers(allPapers);
//       setFilteredPapers(allPapers); // ✅ Set initial filtered results
//     };
//     fetchPapers();
//   }, []);

//   // ✅ Filter papers in real-time
//   useEffect(() => {
//     if (!searchQuery) {
//       setFilteredPapers(papers); // Show all if search is empty
//     } else {
//       const filtered = papers.filter((paper) =>
//         paper.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredPapers(filtered);
//     }
//   }, [searchQuery, papers]);

//   return (
//     <>
//       <main className="flex min-h-screen flex-col mt-20 items-center justify-center p-12">
//         <h1 className="text-5xl md:text-9xl font-mono text-blue-600">DECENTRASEC</h1>
//         <p className="mt-4 text-lg text-gray-700 text-center max-w-xl">
//           Securely upload, store, and verify research papers using blockchain technology.
//         </p>

//         {/* ✅ Search Bar */}
//         <input
//           type="text"
//           placeholder="Search research papers..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="mt-6 px-4 py-2 border rounded-lg w-full max-w-lg text-black"
//         />

//         <div className="mt-6 space-x-4">
//           <Link href="/upload">
//             <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//               Upload Paper
//             </button>
//           </Link>
//           {/* <Link href="/papers">
//             <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
//               View Papers
//             </button>
//           </Link> */}
//         </div>

//         {/* ✅ Display Papers */}
//         <div className="mt-8 w-full max-w-2xl">
//           <h2 className="text-xl font-bold mb-2 text-center">Research Papers</h2>

//           <div>
//             <h1 className="text-xl font-bold mb-4">Your Research Papers</h1>
//             <PaperList userAddress={userAddress} />
//           </div>

//         </div>
//       </main>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPapers } from "../utils/contractAction";
import PaperList from "./components/PaperList";

export default function Home({ userAddress }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);

  // ✅ Fetch all papers when the page loads
  useEffect(() => {
    const fetchPapers = async () => {
      const allPapers = await getPapers();
      setPapers(allPapers);
      setFilteredPapers(allPapers);
    };
    fetchPapers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12  text-white">
      {/* 🔹 Cyberpunk Title */}
      <h1 className="text-5xl md:text-9xl font-mono mt-40 text-blue-500 tracking-wide glow">
        DECENTRASEC
      </h1>
      <p className="mt-3 text-lg text-gray-400 text-center max-w-xl">
        Securely upload, store, and verify research papers using blockchain
        technology.
      </p>

      {/* 🔍 Search Bar */}

      {/* 🛠 Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link href="/upload">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition">
            🚀 Upload Paper
          </button>
        </Link>
        <Link href="/upload-pdf">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition">
            🚀 Upload Pdf to Cloud
          </button>
        </Link>
      </div>

      {/* 📜 Research Papers */}
      <div className="mt-10 w-full max-w-4xl p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-blue-400 text-center">
          📜 Research Papers
        </h2>
        <div className="mt-4">
          <PaperList userAddress={userAddress} />
        </div>
      </div>
    </main>
  );
}
