// convex/clerk.ts
"use node";

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { internalAction } from "./_generated/server";
import { Webhook } from "svix";
import { v } from "convex/values"; // 1. Import 'v'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET as string;

export const fulfill = internalAction({
  // 2. Define the expected arguments
  args: {
    headers: v.any(),
    payload: v.string(),
  },
  handler: async (_, args) => {
    const wh = new Webhook(webhookSecret);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
    return payload;
  },
});