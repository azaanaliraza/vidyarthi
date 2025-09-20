// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    vidyarthiId: v.optional(v.string()),
    clerkId: v.string(),
    highestQualification: v.optional(v.string()),
    role: v.string(), // This should be required
    organization: v.optional(v.string()),
    phone: v.optional(v.string()),
    bio: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    dob: v.optional(v.string()),
    aadhar: v.optional(v.string()),
    address: v.optional(v.string()),
    course: v.optional(v.string()),
    institution: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),

  documents: defineTable({
    userId: v.string(),
    storageId: v.id("_storage"),
    fileName: v.string(),
    type: v.string(), 
    issuer: v.optional(v.string()),
    status: v.string(),
  }).index("by_userId", ["userId"]),
});