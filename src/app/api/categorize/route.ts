import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDESMRtHxJgxFfHZ_l8i7a7C_qfrl-KJs0");

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    if (!description) {
      return NextResponse.json({ error: "Missing description" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Categorize the following expense description into one of these categories: Food & Dining, Transportation, Entertainment, Utilities, Healthcare, Shopping, Education, Travel, Other.

Description: "${description}"

Return only the category name, nothing else.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const categoryFromModel = response.text().trim();
    const category = categoryFromModel || "Other";

    return NextResponse.json({ category });
  } catch (err) {
    console.error("Categorization error:", err);
    return NextResponse.json({ error: "Failed to categorize" }, { status: 500 });
  }
}