// convex/users.ts
import { v } from "convex/values";
import { internalMutation, query, mutation } from "./_generated/server";

// Function to get the current logged-in user from our database
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
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

// Internal function to create a new user
export const createUser = internalMutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    // Generate a unique Vidyarthi ID
    const vidyarthiId = `VID-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      clerkId: args.clerkId,
      vidyarthiId: vidyarthiId,
    });
  },
});

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
    // Add highestQualification to the arguments
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
      // Save the new field
      highestQualification: args.highestQualification,
    });
  },
});