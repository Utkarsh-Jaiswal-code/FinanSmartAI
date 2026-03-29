"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import AddExpense from "@/app/(routes)/dashboard/expenses/_components/AddExpense";
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "@/app/(routes)/dashboard/expenses/_components/EditBudget";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();
  useEffect(() => {
    if (user) getBudgetInfo();
  }, [user]);

  /**
   * Get Budget Information
   */
  const getBudgetInfo = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const res = await fetch(
        `/api/budgets?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      // find the matching budget
      const info = data.find((b) => String(b.id) === String(params.id));
      setbudgetInfo(info);
      getExpensesList();
    } catch (err) {
      console.error("Failed to fetch budget info", err);
    }
  };

  /**
   * Get Latest Expenses
   */
  const getExpensesList = async () => {
    try {
      const res = await fetch(`/api/expenses?budgetId=${params.id}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setExpensesList(data || []);
    } catch (err) {
      console.error("Failed to fetch expenses list", err);
    }
  };

  /**
   * Used to Delete budget
   */
  const deleteBudget = async () => {
    try {
      const res = await fetch(`/api/budgets?id=${params.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      toast("Budget Deleted !");
      route.replace("/dashboard/budgets");
    } catch (err) {
      console.error("Failed to delete budget", err);
      toast.error("Failed to delete budget");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;