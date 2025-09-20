import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalMutation, query } from "./_generated/server";
// --- MODIFIED: Use the correct named import for clerkClient ---
import { clerkClient } from "@clerk/clerk-sdk-node";

// This query remains the same
export const getPendingRecruiters = query({
    handler: async (ctx) => {
        const usersList = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("role"), "recruiter_pending"))
            .collect();
        return usersList;
    },
});

// An action to approve a recruiter
export const approveRecruiter = action({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
        // --- MODIFIED: We don't need to initialize the client, just use it ---
        // The secret key is automatically picked up from the environment variables.

        // Update the user's role in Clerk's metadata
        await clerkClient.users.updateUserMetadata(clerkId, {
            publicMetadata: { role: "recruiter" },
        });

        // The public action can call the internal mutation
        await ctx.runMutation(internal.admin.updateUserRoleInDb, {
            clerkId,
            role: "recruiter",
        });
    },
});

// This internal mutation remains the same
export const updateUserRoleInDb = internalMutation({
    args: { clerkId: v.string(), role: v.string() },
    handler: async (ctx, { clerkId, role }) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.patch(user._id, { role });
    },
});