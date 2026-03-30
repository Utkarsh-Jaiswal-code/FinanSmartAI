import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [loading, setLoading] = useState(false);
  const [categorizing, setCategorizing] = useState(false);

  const categorizeExpense = async (description) => {
    if (!description) {
      setCategory("Other");
      return;
    }
    setCategorizing(true);
    try {
      const res = await fetch("/api/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategory(data?.category?.trim() || "Other");
      } else {
        setCategory("Other");
      }
    } catch (err) {
      console.error("Categorization failed", err);
      setCategory("Other");
    } finally {
      setCategorizing(false);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value) {
      categorizeExpense(value);
    } else {
      setCategory("Other");
    }
  };
  /**
   * Used to Add New Expense
   */
  const addNewExpense = async () => {
    const parsedAmount = parseFloat(amount);
    if (!name || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          amount: parsedAmount,
          budgetId,
          category: category || "Other",
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setAmount("");
      setName("");
      setCategory("Other");
      refreshData();
      toast("New Expense Added!");
    } catch (err) {
      console.error("Failed to add expense", err);
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={handleNameChange}
        />
        {categorizing && <p className="text-sm text-gray-500">Categorizing...</p>}
        {category && <p className="text-sm text-blue-600">Category: {category}</p>}
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;