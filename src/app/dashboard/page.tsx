"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function DashboardRedirectPage() {
    const { isLoaded } = useAuth();
    const router = useRouter();
    // Fetch the user data only after Clerk is loaded
    const currentUser = useQuery(api.users.get, isLoaded ? undefined : "skip");

    useEffect(() => {
        // Ensure we have the user data before trying to redirect
        if (isLoaded && currentUser) {
            if (currentUser.role === "student") {
                router.push("/student-dashboard");
            } else if (currentUser.role === "recruiter" || currentUser.role === "recruiter_pending") {
                router.push("/recruiter-dashboard");
            }
            // Add other role-based redirects here if needed, e.g., for an admin
        }
    }, [currentUser, isLoaded, router]);

    // Show a loading spinner while we determine the user's role
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="ml-4 text-lg">Redirecting to your dashboard...</p>
        </div>
    );
}