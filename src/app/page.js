import Image from "next/image";
import Header from "./_components/Header";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          Welcome to FinanSmartAI
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Your AI-powered assistant for smarter expense tracking and financial planning.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold hover:opacity-90">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800">
            Learn More
          </button>
        </div>
      </main>

      
    </>
  );
}

