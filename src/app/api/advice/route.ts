import { NextResponse } from "next/server";

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
      return NextResponse.json(
        { error: "Missing Gemini API Key" },
        { status: 500 }
      );
    }

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

    const payload = {
      prompt: { text: userPrompt },
      maxOutputTokens: 200,
      temperature: 0.7,
    };

    console.log("Gemini request payload", JSON.stringify(payload, null, 2));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-mini:generate?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);

      return NextResponse.json({
        advice: getFallbackAdvice(totalIncome, totalSpend, savings),
      });
    }

    const data = await response.json();

    // ✅ Log Gemini response for debugging
    console.log("Gemini status", response.status);
    console.log("Gemini raw response", JSON.stringify(data, null, 2));

    const candidate = data?.candidates?.[0];
    const parsedAdvice =
      candidate?.content?.[0]?.text?.trim() ||
      candidate?.output?.[0]?.content?.trim() ||
      candidate?.content?.trim();

    // Try parse structured response in case Gemini already responded JSON.
    let structured = null;
    try {
      structured = parsedAdvice ? JSON.parse(parsedAdvice) : null;
    } catch (err) {
      // console.warn("Gemini output not JSON, using plain text.", err);
    }

    const advice =
      structured?.advice ||
      parsedAdvice ||
      getFallbackAdvice(totalIncome, totalSpend, savings);

    const defaultForecast = {
      predictedSpend: Number(totalSpend) * 1.05,
      predictedSavings: Math.max(Number(totalIncome) - Number(totalSpend), 0),
      riskLevel: totalSpend > totalIncome ? "high" : "moderate",
    };

    const forecast = {
      predictedSpend: Number(structured?.predictedSpend) || defaultForecast.predictedSpend,
      predictedSavings: Number(structured?.predictedSavings) || defaultForecast.predictedSavings,
      riskLevel: structured?.riskLevel || defaultForecast.riskLevel,
      summary: structured?.forecastSummary || "Forecast generated from current budget trends.",
    };

    console.log("Extracted Gemini advice", advice);
    console.log("Forecast result", forecast);

    return NextResponse.json({ advice, forecast });
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json({
      advice:
        "Track your expenses carefully and ensure you save a portion of your income every month.",
    });
  }
}

// ✅ Fallback (important for stability)
function getFallbackAdvice(income: number, spend: number, savings: number) {
  if (income === 0) {
    return "You currently have no income, so focus on building a stable income source. Avoid unnecessary expenses.";
  }

  if (spend > income) {
    return "You are spending more than you earn. Cut unnecessary expenses and follow a strict budget.";
  }

  if (savings < income * 0.2) {
    return "Your savings are low. Try to save at least 20% of your income.";
  }

  return "You are managing your finances well. Continue saving and consider investing for growth.";
}