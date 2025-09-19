// convex/documents.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Function to generate a temporary URL for uploading a file
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Function to save the document details after it's uploaded
export const saveDocument = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
    type: v.string(),
    issuer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User not authenticated");

    await ctx.db.insert("documents", {
      userId: identity.subject, // Link document to the user
      storageId: args.storageId,
      fileName: args.fileName,
      type: args.type,
      issuer: args.issuer,
      status: "Pending", // All new documents are pending verification
    });
  },
});

// Function to get all documents for the logged-in user
export const getDocumentsForUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
    
    // Return documents with their storage URLs for viewing
    return Promise.all(
        documents.map(async (doc) => ({
            ...doc,
            url: await ctx.storage.getUrl(doc.storageId),
        }))
    );
  },
});

export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User not authenticated");

    const doc = await ctx.db.get(args.documentId);

    // Ensure the user owns the document before deleting
    if (!doc || doc.userId !== identity.subject) {
      throw new Error("Document not found or user does not have permission");
    }

    // Delete the file from storage
    await ctx.storage.delete(doc.storageId);
    // Delete the document record from the database
    await ctx.db.delete(args.documentId);
  },
});