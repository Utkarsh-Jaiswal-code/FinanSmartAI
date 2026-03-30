import Header from "@/app/_components/Header";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] px-6 py-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
           FinanSmartAI
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          FinanSmartAI is your intelligent finance companion for tracking income,
          expenses, and budgets. Log in to manage your finances easily and power
          your decisions with AI-driven insights.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold hover:opacity-90"
            href="/"
          >
            Home
          </Link>
          <Link
            className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
            href="/dashboard"
          >
            Go Dashboard
          </Link>
        </div>
      </main>
    </>
  );
}
