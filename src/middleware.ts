import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// --- Define the admin-only route ---
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// --- Define all other protected routes ---
const isProtectedRoute = createRouteMatcher([
  '/student-dashboard(.*)',
  '/recruiter-dashboard(.*)',
  '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // If the user is trying to access an admin route...
  if (isAdminRoute(req)) {
    // ...protect it and require the 'admin' role.
    // Clerk will handle redirection automatically if they are not an admin.
    auth.protect({ role: 'admin' });
  }

  // If the user is trying to access any other protected route...
  if (isProtectedRoute(req)) {
    // ...just require them to be logged in.
    auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};