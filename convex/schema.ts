import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Defines the 'users' table
  users: defineTable({
    // Basic Information
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    role: v.string(), // "student", "recruiter", "recruiter_pending", "admin"

    // Student-Specific Fields
    vidyarthiId: v.optional(v.string()),
    
    // Recruiter-Specific Fields
    organization: v.optional(v.string()),
    position: v.optional(v.string()),

    // Shared Profile Fields
    phone: v.optional(v.string()),
    bio: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    dob: v.optional(v.string()),
    aadhar: v.optional(v.string()),
    address: v.optional(v.string()),
    course: v.optional(v.string()),
    institution: v.optional(v.string()),
    highestQualification: v.optional(v.string()),
  })
    // An index to quickly look up users by their Clerk ID
    .index("by_clerk_id", ["clerkId"])
    
    // --- MODIFIED: Create two separate search indexes ---
    // A search index for the 'name' field
    .searchIndex("search_name", { searchField: "name" })
    // A search index for the 'course' field
    .searchIndex("search_course", { searchField: "course" }),

  // Defines the 'documents' table
  documents: defineTable({
    userId: v.string(), // This will be the clerkId of the user who owns the document
    storageId: v.id("_storage"), // Links to the actual file in Convex's file storage
    fileName: v.string(),
    type: v.string(), // "Photo", "10th Marksheet", "General Certificate", etc.
    issuer: v.optional(v.string()), // The authority that issued the certificate (e.g., "CBSE", "Coursera")
    status: v.string(), // "Pending", "Verified", "Rejected"
  })
    // An index to quickly find all documents belonging to a specific user
    .index("by_userId", ["userId"]),
});