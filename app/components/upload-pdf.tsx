"use client";
import { useState, useEffect } from "react";
import { Copy } from "lucide-react"; // Import copy icon

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMjJmYjYzMC04ZGYwLTQxOGEtYjA3MS05NzYxM2ExZjc3ZmQiLCJlbWFpbCI6Im11aGFtbWFkbWFoZGk1MTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjM4ZWQ5YzZlNDg5YjZhYzFhNzFjIiwic2NvcGVkS2V5U2VjcmV0IjoiOWFlZGNiNjM4NjExYTU1OWViNTRmYmIyZmQ2Y2JlMGIyZmNmMzU1OGJiMDVjNDhhNWE3NTk1ODFhYjgzNDJiNyIsImV4cCI6MTc3MTUzMDY1NH0.6ZB1tR9-fgjDyXt0xnqUu7KrH5N2fIDxo3-7yaqM9bc"; // Replace with your actual JWT

interface IPFSResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  Name?: string;
}

export default function UploadPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<IPFSResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"public" | "private">("public");

  // Load previously uploaded files from localStorage
  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      setUploadedFiles(JSON.parse(storedFiles));
    }
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setUploadError("Please select a valid PDF file.");
        return;
      }
      setUploadError("");
      setFile(selectedFile);
    }
  };

  // Upload file to Pinata
  const uploadToPinata = async () => {
    if (!file) {
      setUploadError("Please select a file first.");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: formData,
        }
      );

      const response: IPFSResponse = await request.json();
      console.log("🚀 ~ uploadToPinata ~ response:", response);

      if (response.IpfsHash) {
        response.Name = file.name; // Store file name

        // Save to localStorage
        const updatedFiles = [response, ...uploadedFiles];
        setUploadedFiles(updatedFiles);
        localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
      } else {
        throw new Error("Failed to upload file to IPFS.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Copy CID to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("CID copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">📁 Upload Files</h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded bg-gray-100"
        />

        <button
          onClick={uploadToPinata}
          disabled={uploading}
          className={`w-full px-4 py-2 rounded ${
            uploading
              ? "bg-gray-500"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>

        {/* Error Message */}
        {uploadError && (
          <div className="mt-4 p-4 bg-red-600 text-white rounded">
            ❌ {uploadError}
          </div>
        )}
      </div>

      {/* File List */}
      <div className="mt-6 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("public")}
            className={`mr-4 pb-2 text-lg font-semibold ${
              activeTab === "public"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Public
          </button>
          {/* <button
            onClick={() => setActiveTab("private")}
            className={`pb-2 text-lg font-semibold ${
              activeTab === "private"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Private
          </button> */}
        </div>

        {/* Search Bar */}
        {/* <input
          type="text"
          placeholder="Search files and CIDs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        /> */}

        {/* Table */}
        <table className="w-full text-left border-collapse text-black">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">NAME</th>
              <th className="p-3">SIZE</th>
              <th className="p-3">IPFSHASH</th>
              <th className="p-3">CREATED</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles
              .filter(
                (file) =>
                  file.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  file.IpfsHash.includes(searchTerm)
              )
              .map((file, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{file.Name || "Unknown File"}</td>
                  <td className="p-3">{(file.PinSize / 1024).toFixed(2)} KB</td>
                  <td className="p-3 flex items-center">
                    {file.IpfsHash.substring(0, 6)}...{file.IpfsHash.slice(-6)}
                    <button
                      onClick={() => copyToClipboard(file.IpfsHash)}
                      className="ml-2 p-1"
                    >
                      <Copy size={16} />
                    </button>
                  </td>
                  <td className="p-3">
                    {new Date(file.Timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination Placeholder */}
        <div className="flex justify-between mt-4 text-gray-600">
          <span>Rows per page: 10 ▼</span>
          <span>◀ 1 - 10 ▶</span>
        </div>
      </div>
    </div>
  );
}
