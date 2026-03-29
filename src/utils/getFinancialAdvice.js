const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
    try {
        const res = await fetch("/api/advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalBudget, totalIncome, totalSpend }),
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to fetch advice");
        }

        const data = await res.json();
        return {
            advice: data?.advice || "No advice available",
            forecast: data?.forecast || {
                predictedSpend: totalSpend * 1.05,
                predictedSavings: Math.max(totalIncome - totalSpend, 0),
                riskLevel: totalSpend > totalIncome ? "high" : "moderate",
                summary: "Forecast not available yet. Using simple trend estimate.",
            },
        };
    } catch (err) {
        console.error("getFinancialAdvice error:", err);
        return {
            advice: "No advice available",
            forecast: {
                predictedSpend: totalSpend * 1.05,
                predictedSavings: Math.max(totalIncome - totalSpend, 0),
                riskLevel: totalSpend > totalIncome ? "high" : "moderate",
                summary: "Failed to compute forecast.",
            },
        };
    }
};

export default getFinancialAdvice;