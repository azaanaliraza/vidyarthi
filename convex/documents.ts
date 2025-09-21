import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Function to generate a temporary URL for uploading a file directly to Convex
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Function to save the document details after it's uploaded to Convex
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
      userId: identity.subject,
      storageId: args.storageId,
      fileName: args.fileName,
      type: args.type,
      issuer: args.issuer,
      status: "Pending",
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
    
    return Promise.all(
        documents.map(async (doc) => ({
            ...doc,
            url: await ctx.storage.getUrl(doc.storageId),
        }))
    );
  },
});

// Function to delete a document and its corresponding file
export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User not authenticated");

    const doc = await ctx.db.get(args.documentId);

    if (!doc || doc.userId !== identity.subject) {
      throw new Error("Document not found or user does not have permission");
    }

    await ctx.storage.delete(doc.storageId);
    await ctx.db.delete(args.documentId);
  },
});

// convex/documents.ts
// ... (at the end of the file)
export const getDocumentById = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => await ctx.db.get(args.id)
});