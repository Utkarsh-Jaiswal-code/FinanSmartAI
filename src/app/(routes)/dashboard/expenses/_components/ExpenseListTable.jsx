import React from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useCurrency } from "@/app/components/CurrencyProvider";

function ExpenseListTable({ expensesList, refreshData }) {
  const { formatCurrency } = useCurrency();
  const deleteExpense = async (expense) => {
    try {
      const res = await fetch(`/api/expenses?id=${expense.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      toast("Expense Deleted!");
      refreshData();
    } catch (err) {
      console.error("Failed to delete expense", err);
      toast.error("Failed to delete expense");
    }
  };
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-5 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Category</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div key={expenses.id} className="grid grid-cols-5 bg-slate-50 rounded-bl-xl rounded-br-xl p-2">
          <h2>{expenses.name}</h2>
          <h2>{formatCurrency(expenses.amount)}</h2>
          <h2>{expenses.category || "Uncategorized"}</h2>
          <h2>{expenses.createdAt}</h2>
          <h2
            onClick={() => deleteExpense(expenses)}
            className="text-red-500 cursor-pointer"
          >
            Delete
          </h2>
          {/* <h2>
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteExpense(expenses)}
            />
          </h2> */}
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;