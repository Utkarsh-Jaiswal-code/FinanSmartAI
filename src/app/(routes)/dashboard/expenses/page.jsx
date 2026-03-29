
"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from '@/app/(routes)/dashboard/expenses/_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) getAllExpenses();
  }, [user]);

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const res = await fetch(
        `/api/expenses?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setExpensesList(data || []);
    } catch (error) {
      console.error('Failed to fetch expenses', error);
    }
  };

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>

      <ExpenseListTable
        refreshData={() => getAllExpenses()}
        expensesList={expensesList}
      />
    </div>
  )
}

export default ExpensesScreen
