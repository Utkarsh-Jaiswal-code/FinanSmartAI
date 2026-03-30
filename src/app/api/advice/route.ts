import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Ensure numbers (fix common frontend issue)
    const totalBudget = Number(body.totalBudget) || 0;
    const totalIncome = Number(body.totalIncome) || 0;
    const totalSpend = Number(body.totalSpend) || 0;

    // ✅ Derived values (no AI math dependency)
    const savings = totalIncome - totalSpend;
    const isOverspending = totalSpend > totalIncome;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Missing Gemini API Key");
      return NextResponse.json(
        { error: "Missing Gemini API Key" },
        { status: 500 }
      );
    }

    console.log("API Key loaded, length:", apiKey.length);

    // ✅ Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);

    // ✅ Use the correct available model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ✅ Strong structured prompt
    const userPrompt = `
You are a financial advisor.

User Financial Data:
- Budget: ${totalBudget}
- Income: ${totalIncome}
- Expenses: ${totalSpend}
- Savings: ${savings}

Condition:
User is ${isOverspending ? "overspending" : "saving money"}.

Instructions:
- Use the numbers
- Be specific and practical
- Give exactly 2 short sentences
`;

    console.log("Prompt sent to Gemini:\n", userPrompt);

    // ✅ Generate content with Gemini
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const advice = response.text().trim();

    console.log("Gemini Response:", advice);

    // ✅ Default forecast (fallback)
    const defaultForecast = {
      predictedSpend: Number(totalSpend) * 1.05,
      predictedSavings: Math.max(Number(totalIncome) - Number(totalSpend), 0),
      riskLevel: totalSpend > totalIncome ? "high" : "moderate",
    };

    // For now, return simple forecast since we're focusing on advice
    const forecast = {
      predictedSpend: defaultForecast.predictedSpend,
      predictedSavings: defaultForecast.predictedSavings,
      riskLevel: defaultForecast.riskLevel,
      summary: "Forecast generated from current budget trends.",
    };

    return NextResponse.json({ advice, forecast });
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json({
      advice:
        "Track your expenses carefully and ensure you save a portion of your income every month.",
    });
  }
}