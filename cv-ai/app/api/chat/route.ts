export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Буруу хүсэлт" }, { status: 400 });
    }

    const { messages, resumeData } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Чатын түүх олдсонгүй" },
        { status: 400 },
      );
    }

    const systemPrompt = `Чи бол CV засах, Cover Letter үүсгэх мэргэжлийн AI Карьерын Төлөөлөгч юм.
 
         ХЭРЭГЛЭГЧИЙН ОДООГИЙН CV МЭДЭЭЛЭЛ:
         ${resumeData ? JSON.stringify(resumeData) : "Одоогоор CV оруулаагүй байна."}
         
         Хэрэв хэрэглэгч ямар нэг ур чадвар нэмэх, туршлага засах гэх мэт CV-д өөрчлөлт оруулах хүсэлт гаргавал чи CV-ний мэдээллийг шинэчилнэ.
         
         ЧУХАЛ ДҮРЭМ: Чиний хариулт ЗААВАЛ дараах бүтэцтэй цэвэр JSON байх ёстой:
         {
           "message": "Хэрэглэгчид харуулах чиний хариулт (Жишээ нь: 'Би таны ур чадвар руу React болон Node.js-ийг нэмчихлээ')",
           "updatedData": {}
         }`;

    const cleanHistory = messages.map((m: any) => ({
      role: (m.role === "assistant" || m.role === "ai"
        ? "assistant"
        : "user") as "assistant" | "user",
      content: String(m.content || "").trim(),
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system" as const, content: systemPrompt },
        ...cleanHistory,
      ],
    });

    const aiResponseText = response.choices[0].message.content || "{}";

    try {
      const aiData = JSON.parse(aiResponseText);
      return NextResponse.json(
        {
          message: { role: "assistant", content: aiData.message || "" },
          updatedData: aiData.updatedData || null,
        },
        { status: 200 },
      );
    } catch {
      return NextResponse.json({
        message: { role: "assistant", content: aiResponseText },
        updatedData: null,
      });
    }
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "AI хариулт өгөхөд алдаа гарлаа", details: error.message },
      { status: 500 },
    );
  }
}
