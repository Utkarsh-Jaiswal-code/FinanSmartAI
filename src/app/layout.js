import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/app/components/CurrencyProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FinanSmartAI",
  description: "Smart AI-powered platform for expense tracking and financial planning",
};

export default function RootLayout({ children }) {
  return (
    <CurrencyProvider>
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-primary-dark via-background to-secondary-dark text-foreground`}
          >
       
        {/* Page wrapper */}
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <header className="w-full px-6 py-4 bg-card shadow-soft flex justify-between items-center">
            <h1 className="text-xl font-bold text-primary animate-fade-in">
              FinanSmartAI
            </h1>
            <nav className="space-x-6 text-sm font-medium">
              <a href="#" className="hover:text-primary transition-colors">Home</a>
              <a href="#" className="hover:text-primary transition-colors">Services</a>
              <a href="#" className="hover:text-primary transition-colors">About</a>
            </nav>
          </header>

          {/* Main content */}
          <main className="flex-1 flex items-center justify-center  animate-fade-up">
            <div className="w-full  bg-card rounded-2xl shadow-card p-8">
              {children}
            </div>
          </main>
            {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm dark:text-gray-400">
        © {new Date().getFullYear()} FinanSmartAI. All rights reserved.
      </footer>
          
        </div>
       
      </body>
    </html>
    </ClerkProvider>
    </CurrencyProvider>
  );
}
