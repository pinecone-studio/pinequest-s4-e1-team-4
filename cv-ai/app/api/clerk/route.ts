import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // Clerk-ийн вэбсайт дээрх Webhook Secret-ээ энд хийнэ
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env",
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Svix ашиглан хүсэлтийг баталгаажуулах
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Error occured", { status: 400 });
  }

  // Энд л яг ямар үйлдэл хийхээ шийднэ
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    // Жишээ нь: Өөрийнхөө NeonDB (Prisma) рүү хэрэглэгчийг нэмэх
    // await prisma.user.create({ data: { clerkId: id, email: ... } })
    console.log("Шинэ хэрэглэгч бүртгэгдлээ:", id);
  }

  return new Response("", { status: 200 });
}
