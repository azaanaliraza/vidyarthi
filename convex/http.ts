// convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });

      switch (result.type) {
        case "user.created":
          // --- MODIFIED: Read the role from the metadata we passed from the frontend ---
          const role = result.data.unsafe_metadata.role as string || "student";
          await ctx.runMutation(internal.users.createUser, {
            email: result.data.email_addresses[0]?.email_address,
            name: `${result.data.first_name ?? ""} ${result.data.last_name ?? ""}`,
            clerkId: result.data.id,
            role: role, // Pass the dynamic role
          });
      }
      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response("Webhook Error", { status: 400 });
    }
  }),
});

export default http;