"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
// import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  /**
   * used to get budget List
   */
  const getBudgetList = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const res = await fetch(`/api/budgets?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setBudgetList(data || []);
      getAllExpenses();
      getIncomeList();
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  /**
   * Get Income stream list
   */
  const getIncomeList = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const res = await fetch(`/api/incomes?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setIncomeList(data || []);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const res = await fetch(`/api/expenses?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setExpensesList(data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-bold text-3xl lg:text-4xl">
            Hi, {user?.fullName} 👋
          </h2>
          <p className="text-gray-600 mt-2">
            Here’s a quick summary of your budgets, spending and income.
          </p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Top Summary Cards */}
      <CardInfo budgetList={budgetList} incomeList={incomeList} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left side: Chart + Expenses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">Spending Overview</h2>
            <BarChartDashboard budgetList={budgetList} />
          </div>

          {/* Expenses Table */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">Recent Expenses</h2>
            <div className="text-sm text-gray-500">No recent expenses to display.</div>
          </div>
        </div>

        {/* Right side: Budgets */}
        <div className="bg-white rounded-xl shadow p-6 space-y-5">
          <h2 className="font-semibold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="h-24 w-full bg-slate-200 rounded-lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
