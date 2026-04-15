"use client";
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCurrency } from "@/app/components/CurrencyProvider";

// Custom tooltip component defined outside to avoid recreation on render
const CustomTooltip = ({ active, payload, formatCurrency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{payload[0].name}</p>
        <p className="text-blue-600 font-bold">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

function ExpenseByCategoryChart({ expensesList }) {
  const { formatCurrency } = useCurrency();

  // Define colors for each category
  const COLORS = [
    "#4845d2",
    "#c3c2ff",
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f9ca24",
    "#ff9ff3",
    "#54a0ff",
    "#95a5a6",
    "#2ecc71",
    "#e74c3c",
    "#3498db",
  ];

  // Process data: group expenses by category
  const categoryData = useMemo(() => {
    const grouped = {};

    expensesList.forEach((expense) => {
      const category = expense.category || "Other";
      const amount = parseFloat(expense.amount) || 0;
      if (!grouped[category]) {
        grouped[category] = 0;
      }
      grouped[category] += amount;
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value: parseFloat(Number(value).toFixed(2)),
    }));
  }, [expensesList]);

  if (categoryData.length === 0) {
    return (
      <div className="p-5 h-full flex items-center justify-center">
        <p className="text-gray-500">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-5">
      <h2 className="font-bold text-lg mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={true}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip formatCurrency={formatCurrency} />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
        </PieChart>
      </ResponsiveContainer>

      {/* Category Summary Table */}
      <div className="mt-6">
        <h3 className="font-semibold text-md mb-3">Category Breakdown</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                ></div>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {formatCurrency(category.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseByCategoryChart;
