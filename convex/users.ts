import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

// Function to get the current logged-in user from our database
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Return null if the user is not authenticated, instead of throwing an error.
      // The frontend will handle the loading state.
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique();

    return user;
  },
});

// Internal function to create a new user when they sign up via Clerk Webhook
export const createUser = internalMutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    // --- THIS LOGIC IS NOW CORRECT ---
    // It will only generate an ID if the role passed from the webhook is "student"
    let vidyarthiId = undefined;
    if (args.role === "student") {
      vidyarthiId = `VID-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    }

    await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      clerkId: args.clerkId,
      role: args.role,
      vidyarthiId: vidyarthiId,
    });
  },
});

// Function for students to update their profile information
export const updateProfile = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    bio: v.string(),
    skills: v.array(v.string()),
    dob: v.string(),
    aadhar: v.string(),
    address: v.string(),
    course: v.string(),
    institution: v.string(),
    highestQualification: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      name: args.name,
      phone: args.phone,
      bio: args.bio,
      skills: args.skills,
      dob: args.dob,
      aadhar: args.aadhar,
      address: args.address,
      course: args.course,
      institution: args.institution,
      highestQualification: args.highestQualification,
    });
  },
});

// Function for users to request an upgrade to the 'recruiter' role
export const requestRecruiterUpgrade = mutation({
  args: {
    organization: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      organization: args.organization,
      role: "recruiter_pending", // A temporary role for the admin to see
    });
  },
});

export const migrateUsersToHaveRole = mutation({
  handler: async (ctx) => {
    // Find all users that do NOT have the 'role' field set.
    const usersWithoutRole = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), undefined))
      .collect();

    if (usersWithoutRole.length === 0) {
      return "No users needed migration.";
    }

    // Loop through them and assign a default role of "student"
    for (const user of usersWithoutRole) {
      await ctx.db.patch(user._id, { role: "student" });
    }

    return `Migrated ${usersWithoutRole.length} user(s).`;
  },
});