import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

const openai = new OpenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { title, abstract, keywords } = await req.json();

    const messages = [
      {
        role: "system",
        content:
          "You are an AI research paper validator. Return JSON with analysis including AI-generated risk, plagiarism risk, credibility, and suggestions.",
      },
      {
        role: "user",
        content: `Analyze the research paper metadata:
                - Title: "${title}"
                - Abstract: "${abstract}"
                - Keywords: "${keywords}"
                
                Return a **valid JSON** object exactly like this:
                {
                    "summary": "Brief paper summary",
                    "ai_generated_risk": 0-100,
                    "plagiarism_risk": 0-100,
                    "credibility_score": 0-100,
                    "suggestions": "Improvements"
                }`,
      },
    ];

    // ✅ Fix: Ensure OpenAI returns a valid JSON format
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.5,
      response_format: { type: "json_object" }, // ✅ Ensure JSON response
      max_tokens: 500,
    });

    // ✅ Ensure we extract structured data correctly
    const analysis = response.choices?.[0]?.message?.content;
    if (!analysis) throw new Error("AI returned an empty response.");

    console.log("🔍 AI Analysis:", analysis); // Debugging

    return NextResponse.json({ success: true, analysis: JSON.parse(analysis) });
  } catch (error) {
    console.error("AI Validation Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to validate paper." },
      { status: 500 }
    );
  }
}
