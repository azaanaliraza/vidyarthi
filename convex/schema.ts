// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // --- MODIFIED USERS TABLE ---
  users: defineTable({
    name: v.string(),
    email: v.string(),
    vidyarthiId: v.string(),
    clerkId: v.string(),
    phone: v.optional(v.string()),
    bio: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    dob: v.optional(v.string()),
    aadhar: v.optional(v.string()),
    address: v.optional(v.string()),
    course: v.optional(v.string()),
    institution: v.optional(v.string()),
    // Add highest qualification field
    highestQualification: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),

  // --- NEW DOCUMENTS TABLE ---
  documents: defineTable({
    userId: v.string(),
    storageId: v.id("_storage"),
    fileName: v.string(),
    // Type helps us identify compulsory vs. general documents
    type: v.string(), 
    issuer: v.optional(v.string()),
    status: v.string(), // "Pending", "Verified"
  }).index("by_userId", ["userId"]),
});