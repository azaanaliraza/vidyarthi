"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Id } from "./_generated/dataModel";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const askChatbot = action({
  args: {
    // --- MODIFIED: Add documentTexts to the function's arguments ---
    documentTexts: v.string(),
    messages: v.array(v.object({
        role: v.string(),
        parts: v.array(v.object({ text: v.string() })),
    })),
  },
  handler: async (ctx, { messages, documentTexts }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.runQuery(api.users.get);
    if (!user) throw new Error("User not found");

    const systemPrompt = `
      You are "Vidyarthi Dost," a helpful AI career counselor for students in India.
      Provide supportive and actionable advice based on the user's profile and the content of their uploaded documents.
      ALWAYS answer in clear, well-formatted markdown.

      **User Profile:**
      - Name: ${user.name}
      - Course: ${user.course || 'Not specified'}
      - Skills: ${user.skills?.join(", ") || 'No skills listed'}
      
      **User's Uploaded Document Content (for context):**
      ${documentTexts || 'No documents have been read.'}
    `;

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,
    });
    
    const historyForApi = messages.filter(msg => msg.role === 'user' || (msg.role === 'model' && messages.indexOf(msg) > 0));
    const chat = model.startChat({ history: historyForApi });
    
    const lastUserMessage = messages[messages.length - 1].parts[0].text;
    const result = await chat.sendMessage(lastUserMessage);
    const response = result.response;
    return response.text();
  },
});