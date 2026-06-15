import db from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Error: CLERK_WEBHOOK_SECRET missing!");
    return new Response("Error: Missing secret", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Error: Verification error", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses?.[0]?.email_address;
    const name = `${first_name || ""} ${last_name || ""}`.trim();

    if (!email) return new Response("Error: Missing email", { status: 400 });

    try {
      if (eventType === "user.created") {
        await db.user.create({
          data: { clerkId: id, email: email, name: name || null },
        });
        return new Response("User created", { status: 201 });
      } else {
        await db.user.update({
          where: { clerkId: id },
          data: { email: email, name: name || null },
        });
        return new Response("User updated", { status: 200 });
      }
    } catch (error) {
      console.error("Prisma Error:", error);
      return new Response("Database Error", { status: 500 });
    }
  }

  return new Response("Processed", { status: 200 });
}
