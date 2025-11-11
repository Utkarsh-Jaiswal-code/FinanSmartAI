import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left side - Image */}
        <section className="relative flex items-end bg-gray-100 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Sign in background"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="relative z-10 p-8 text-black sm:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-black">
              Welcome to FinanSmartAI 💸
            </h2>
            <p className="mt-4 max-w-md text-black">
              Track your expenses, save smarter, and manage money with ease.
            </p>
          </div>
        </section>

        {/* Right side - Sign In */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:col-span-7 xl:col-span-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black">Sign in</h1>
              <p className="mt-2 text-sm text-gray-700">
                Welcome back! Please sign in to continue.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <SignIn />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

