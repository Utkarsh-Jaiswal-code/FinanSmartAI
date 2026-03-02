import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { totalBudget = 0, totalIncome = 0, totalSpend = 0 } = body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server missing OpenAI API key" }, { status: 500 });
    }

    const client = new OpenAI({ apiKey });

    const userPrompt = `Based on the following financial data:\n- Total Budget: ${totalBudget}\n- Expenses: ${totalSpend}\n- Incomes: ${totalIncome}\nProvide concise financial advice in two sentences to help the user manage their finances.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: userPrompt }],
      max_tokens: 250,
    });

    const advice = completion?.choices?.[0]?.message?.content || "No advice returned";

    return NextResponse.json({ advice });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
