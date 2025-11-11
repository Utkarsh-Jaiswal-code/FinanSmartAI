import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // pages that anyone can access
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: [
    // Apply middleware to everything except static files & Next.js internals
    "/((?!_next|.*\\..*).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};




