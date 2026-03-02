"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const res = await fetch(`/api/budgets?email=${encodeURIComponent(email)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (!data || data.length === 0) router.replace("/dashboard/budgets");
    } catch (err) {
      console.error("Error checking user budgets:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row pt-6">
          {/* Sidebar */}
          <aside className="">
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
              <SideNav />
            </div>
          </aside>

          {/* Main content area */}
          <section className="flex-1">
            <div className="bg-white rounded-2xl shadow p-6">
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
