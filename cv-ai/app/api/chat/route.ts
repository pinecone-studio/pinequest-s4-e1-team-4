export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, resumeData } = await req.json();

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
           "updatedData": {
             // Энд шинэчлэгдсэн CV-г бүхлээр нь буцаах (name, email, skills, experience, education). Хэрэв CV-г өөрчлөх шаардлагагүй бол null буцаах.
           }
         }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const aiResponseText = response.choices[0].message.content || "{}";
    const aiData = JSON.parse(aiResponseText);

    return NextResponse.json(
      {
        message: { role: "assistant", content: aiData.message },
        updatedData: aiData.updatedData || null,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "AI хариулт өгөхөд алдаа гарлаа", details: error.message },
      { status: 500 },
    );
  }
}
