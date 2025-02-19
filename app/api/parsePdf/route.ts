import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

// ✅ Server action for parsing PDF
export async function POST(req: NextRequest) {
    try {
        const { pdfBuffer } = await req.json(); // Expecting base64 string

        if (!pdfBuffer) {
            return NextResponse.json({ error: "No PDF buffer provided" }, { status: 400 });
        }

        // Convert base64 string to buffer
        const buffer = Buffer.from(pdfBuffer, "base64");

        // Extract text from PDF
        const data = await pdfParse(buffer);

        return NextResponse.json({ text: data.text }, { status: 200 });
    } catch (error) {
        console.error("Error parsing PDF:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
