import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to .env");
  }

  // 1. Svix-ээс ирсэн толгой мэдээллийг (headers) авах
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  // 2. Request-ийн биеийг (body) авах
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // 3. Webhook-ийг баталгаажуулах
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook баталгаажуулах үед алдаа гарлаа:", err);
    return new Response("Error occured", { status: 400 });
  }

  const eventType = evt.type;

  // 4. Шинэ хэрэглэгч үүсэх үед бааз руу хадгалах
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // ID байхгүй бол шууд хаах
    if (!id) {
      console.error("Алдаа: Хэрэглэгчийн ID Clerk-ээс ирсэнгүй.");
      return new Response("Bad Request: ID is required", { status: 400 });
    }

    // Имэйл хаягийг салгаж авах
    let email = email_addresses?.[0]?.email_address;

    // 💡 ШИНЭ ЛОГИК: Хэрэв имэйл байхгүй бол (Жишээ нь Clerk-ийн "Send Example" дата) орлуулах имэйл үүсгэх
    if (!email) {
      email = `test-${id}@clerk.dummy`;
      console.log(`Имэйл хаяг олдсонгүй, орлуулах имэйл үүсгэлээ: ${email}`);
    }

    // Нэрийг нэгтгэх
    const name =
      [first_name, last_name].filter(Boolean).join(" ") || "Шинэ хэрэглэгч";

    try {
      await prisma.user.upsert({
        where: { id: id },
        update: {
          email: email,
          name: name,
        },
        create: {
          id: id,
          email: email,
          name: name,
        },
      });
      console.log("✅ Хэрэглэгч DB-д амжилттай хадгалагдлаа/шинэчлэгдлээ:", id);
    } catch (dbError) {
      console.error("❌ Prisma DB рүү хадгалахад алдаа гарлаа:", dbError);
      return new Response("Database Error", { status: 500 });
    }
  }

  return new Response("Success", { status: 200 });
}
