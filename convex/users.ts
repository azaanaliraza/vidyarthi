import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

export const createUser = internalMutation({
  args: { email: v.string(), name: v.string(), clerkId: v.string(), role: v.string() },
  handler: async (ctx, args) => {
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
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, { ...args });
  },
});

export const submitRecruiterProfile = mutation({
  args: {
    name: v.string(),
    organization: v.string(),
    position: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, {
      name: args.name,
      organization: args.organization,
      position: args.position,
    });
  },
});