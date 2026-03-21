import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { totalBudget = 0, totalIncome = 0, totalSpend = 0 } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server missing Gemini API key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const userPrompt = `Based on the following financial data:\n- Total Budget: ${totalBudget}\n- Expenses: ${totalSpend}\n- Incomes: ${totalIncome}\nProvide concise financial advice in two sentences to help the user manage their finances.`;

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const advice = response.text() || "No advice returned";

    return NextResponse.json({ advice });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
