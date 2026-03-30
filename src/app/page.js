"use client";

import Image from "next/image";
import Header from "@/app/_components/Header";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  const getStartedHref = isLoaded && isSignedIn ? "/dashboard" : "/sign-in";

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
             <Link href={getStartedHref}>Get Started</Link>
          </button>
          <button className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800">
            <Link href="/about">Learn More</Link>
          </button>
        </div>
      </main>

      
    </>
  );
}

