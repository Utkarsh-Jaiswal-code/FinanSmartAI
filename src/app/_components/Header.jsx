"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../../components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { isLoaded } = useUser(); // prevents hydration flicker
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <header className="sticky max-w-5xl mx-auto pt-4 top-0 z-50 w-full border-b shadow-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/finan-logo.svg"
            alt="FinanSmartAI Logo"
            width={40}
            height={40}
            className="transition-transform group-hover:rotate-6"
          />
          {!isDashboard && (
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              FinanSmartAI
            </span>
          )}
        </Link>

        {/* Right side */}
        {!isLoaded ? (
          <div className="h-10 w-36 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
        ) : (
          <div className="flex items-center gap-3">
            {/* When signed in */}
            <SignedIn>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* When signed out */}
            <SignedOut>
              {/* Keep Dashboard visible even when logged out (optional) */}
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                className="rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:opacity-90"
                asChild
              >
                <Link href="/sign-in">Get Started</Link>
              </Button>
            </SignedOut>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
