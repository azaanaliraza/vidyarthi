import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDashboardStats = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (user?.role !== 'recruiter') throw new Error("User is not a recruiter");
    
    const studentCount = (await ctx.db.query("users").filter((q) => q.eq(q.field("role"), "student")).collect()).length;
    return { studentCount, newApplications: 0, interviewsToday: 0 };
  },
});

export const searchStudents = query({
  args: {
    searchText: v.optional(v.string()),
    qualification: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const fetchDocumentsForStudents = async (students: any[]) => {
        return Promise.all(
            students.map(async (student) => {
                const documents = await ctx.db.query("documents").withIndex("by_userId", q => q.eq("userId", student.clerkId)).collect();
                const photoDoc = documents.find(doc => doc.type === "Photo");
                const photoUrl = photoDoc ? await ctx.storage.getUrl(photoDoc.storageId) : null;
                return { ...student, documents, photoUrl };
            })
        );
    };

    if (!args.searchText) {
        let studentQuery = ctx.db.query("users").filter((q) => q.eq(q.field("role"), "student"));
        if (args.qualification && args.qualification !== "all") {
            studentQuery = studentQuery.filter((q) => q.eq(q.field("highestQualification"), args.qualification));
        }
        const students = await studentQuery.collect();
        return await fetchDocumentsForStudents(students);
    }

    const studentsByName = await ctx.db.query("users").withSearchIndex("search_name", (q) => q.search("name", args.searchText!)).collect();
    const studentsByCourse = await ctx.db.query("users").withSearchIndex("search_course", (q) => q.search("course", args.searchText!)).collect();
    const combinedResults = [...studentsByName, ...studentsByCourse];
    const uniqueResults = Array.from(new Map(combinedResults.map(item => [item._id, item])).values());
    
    let finalStudents = uniqueResults.filter(student => student.role === 'student');

    if (args.qualification && args.qualification !== "all") {
        finalStudents = finalStudents.filter(student => student.highestQualification === args.qualification);
    }

    return await fetchDocumentsForStudents(finalStudents);
  },
});

// --- RESTORED: API to fetch a single student by their ID ---
export const getStudentByVidyarthiId = query({
  args: {
    vidyarthiId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const recruiter = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (recruiter?.role !== 'recruiter') throw new Error("Unauthorized: User is not an approved recruiter.");

    if (!args.vidyarthiId) return null;

    const student = await ctx.db.query("users").filter((q) => q.eq(q.field("vidyarthiId"), args.vidyarthiId)).first();
    if (!student) return null;

    const documents = await ctx.db.query("documents").withIndex("by_userId", (q) => q.eq("userId", student.clerkId)).collect();
    const documentsWithUrls = await Promise.all(
        documents.map(async (doc) => ({
            ...doc,
            url: await ctx.storage.getUrl(doc.storageId),
        }))
    );
    
    const photoDoc = documentsWithUrls.find(doc => doc.type === "Photo");
    const photoUrl = photoDoc ? photoDoc.url : null;

    return {
        ...student,
        documents: documentsWithUrls,
        photoUrl,
    };
  },
});