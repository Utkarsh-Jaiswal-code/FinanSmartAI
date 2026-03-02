"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { Budgets, Expenses } from '../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    console.log('[BudgetList] user =', user);
    if (user) getBudgetList();
  }, [user]);

  /**
   * used to get budget List
   */
  const getBudgetList = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      console.log('[BudgetList] using email', email);
      const url = email
        ? `/api/budgets?email=${encodeURIComponent(email)}`
        : '/api/budgets';
      const res = await fetch(url);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }
      const data = await res.json();
      console.log('[BudgetList] fetched budgets', data);
      setBudgetList(data || []);
    } catch (error) {
      console.error('Failed to fetch budgets', error);
    }
  };

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget
        refreshData={()=>getBudgetList()}/>
        {budgetList?.length>0? budgetList.map((budget,index)=>(
          <BudgetItem budget={budget} key={index} />
        ))
      :[1,2,3,4,5].map((item,index)=>(
        <div key={index} className='w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse'>

        </div>
      ))
      }
        </div>
       
    </div>
  )
}

export default BudgetList