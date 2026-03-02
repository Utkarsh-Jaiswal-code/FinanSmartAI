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
        return data?.advice || "No advice available";
    } catch (err) {
        console.error("getFinancialAdvice error:", err);
        return "No advice available";
    }
};

export default getFinancialAdvice;