import {
    PiggyBank, ReceiptText
    , Wallet, Sparkles,
    CircleDollarSign,
} from "lucide-react";

import getFinancialAdvice from "@/utils/getFinancialAdvice";
import { useEffect, useState } from "react";
import { useCurrency } from "@/app/components/CurrencyProvider";
function CardInfo({ budgetList, incomeList }) {
    const [totalBudget, settotalBudget] = useState(0);
    const [totalSpend, settotalSpend] = useState(0);
    const [totalIncome, settotalIncome] = useState(0);
    const [financialAdvice, setfinancialAdvice] = useState("");
    const [forecastData, setForecastData] = useState(null);
    const { formatCurrency } = useCurrency();

    useEffect(() => {
        if ((budgetList && budgetList.length > 0) || (incomeList && incomeList.length > 0)) {
            CalculateCardInfo();
        } else {
            // reset when no data
            settotalBudget(0);
            settotalSpend(0);
            settotalIncome(0);
        }
    }, [budgetList, incomeList]);

    useEffect(() => {
        if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
            const fetchFinancialAdvice = async () => {
                try {
                    const result = await getFinancialAdvice(totalBudget, totalIncome, totalSpend);
                    setfinancialAdvice(result?.advice || "No financial advice available.");
                    setForecastData(result?.forecast || null);
                } catch (err) {
                    console.error("Error fetching financial advice:", err);
                }
            };
            fetchFinancialAdvice();
        }
    }, [totalBudget, totalIncome, totalSpend]);

    const CalculateCardInfo = () => {
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        let totalIncome_ = 0;

        if (Array.isArray(budgetList)) {
            budgetList.forEach((element) => {
                totalBudget_ += Number(element?.amount || 0);
                totalSpend_ += Number(element?.totalSpend || 0);
            });
        }

        if (Array.isArray(incomeList)) {
            incomeList.forEach((element) => {
                totalIncome_ += Number(element?.amount || 0);
            });
        }

        settotalBudget(totalBudget_);
        settotalSpend(totalSpend_);
        settotalIncome(totalIncome_);
    };
    const hasBudgets = Array.isArray(budgetList) && budgetList.length > 0;

    return (
        <div>
            {hasBudgets ? (
                <div>
                    <div className="p-7 border mt-4 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="flex mb-2 flex-row space-x-2 items-center">
                                <h2 className="text-xl font-semibold">Overview</h2>
                                <Sparkles className="rounded-full text-black w-10 h-10 p-2" />
                            </div>
                            <h2 className="font-light text-md">
                                {financialAdvice && financialAdvice.length > 0 ? financialAdvice : "No financial advice available yet."}
                            </h2>
                            {forecastData && (
                                <div className="mt-4 p-4 bg-slate-50 border rounded">
                                    <p className="text-sm font-medium">AI Budget Forecast</p>
                                    <p>Next month spend: {formatCurrency(forecastData.predictedSpend)}</p>
                                    <p>Next month savings: {formatCurrency(forecastData.predictedSavings)}</p>
                                    <p className="capitalize">Risk: {forecastData.riskLevel}</p>
                                    <p className="text-xs text-gray-600">{forecastData.summary}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-2"> */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        <div className="p-6 border rounded-xl flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Total Budget</h2>
                                <h2 className="font-bold text-2xl ">{formatCurrency(totalBudget)}</h2>
                            </div>
                            <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                        </div>

                        <div className="p-6 border rounded-xl flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Total Spend</h2>
                                <h2 className="font-bold text-2xl ">{formatCurrency(totalSpend)}</h2>
                            </div>
                            <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                        </div>

                        <div className="p-6 border rounded-xl flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Number of Budgets</h2>
                                <h2 className="font-bold text-2xl ">{budgetList.length}</h2>
                            </div>
                            <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                        </div>

                        <div className="p-6 border rounded-xl flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Sum of Income Streams</h2>
                                <h2 className="font-bold text-2xl ">{formatCurrency(totalIncome)}</h2>
                            </div>
                            <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-7">
                    <div className="text-center text-gray-600 py-8">
                        <p className="mb-2">No budgets available yet.</p>
                        <p className="text-sm">Create a budget to see summaries and advice here.</p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3].map((item, index) => (
                            <div className="h-28 w-full bg-slate-200 animate-pulse rounded" key={index}></div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


export default CardInfo;