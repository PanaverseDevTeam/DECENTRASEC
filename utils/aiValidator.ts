/**
 * 🔍 Fetch paper content from IPFS using its hash.
 */
export async function fetchPaperFromIPFS(ipfsHash: string): Promise<string | null> {
    try {
        const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
        if (!response.ok) throw new Error("Failed to fetch paper from IPFS");

        return await response.text();
    } catch (error) {
        console.error("IPFS Fetch Error:", error);
        return null;
    }
}

/**
 * 🔍 Truncate text to avoid token overflow
 */
function truncateText(text: string, maxTokens: number = 3000): string {
    return text.split(" ").slice(0, maxTokens).join(" "); // Limit words to avoid token overflow
}

/**

/**
 * 🧠 Validate research paper using OpenAI GPT-4o
 */
export async function validatePaperWithAI(paperText: string) {
    try {
        const truncatedText = truncateText(paperText); // ✅ Truncate before sending

        const response = await fetch("/api/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paperText: truncatedText }),
        });

        const data = await response.json();
        if (!data.success) throw new Error("AI validation failed");

        return data.analysis;
    } catch (error) {
        console.error("AI Validation Error:", error);
        return null;
    }
}
