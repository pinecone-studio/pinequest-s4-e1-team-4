export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, resumeData, language } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Чатын түүх олдсонгүй" },
        { status: 400 },
      );
    }

    const currentLang = language || "mn";

    const systemPrompt =
      currentLang === "mn"
        ? `Чи бол CV засах, Cover Letter үүсгэх мэргэжлийн AI Карьерын Төлөөлөгч юм. 

         ХЭРЭГЛЭГЧИЙН ОДООГИЙН CV МЭДЭЭЛЭЛ:
         ${resumeData ? JSON.stringify(resumeData) : "Одоогоор CV оруулаагүй байна."}
         
         Хэрэв хэрэглэгч ямар нэг ур чадвар нэмэх, туршлага засах гэх мэт CV-д өөрчлөлт оруулах хүсэлт гаргавал чи CV-ний мэдээллийг шинэчилнэ.
         
         ЧУХАЛ ДҮРЭМ: Чиний хариулт ЗААВАЛ дараах бүтэцтэй цэвэр JSON байх ёстой:
         {
           "message": "Хэрэглэгчид харуулах чиний хариулт",
           "updatedData": {}
         }
         
         МАС МҮЧАЛ: Хариултын 'message' хэсэг заавал 1-2 өгүүлбэрт багтах, маш товч байх ёстой. Урт текст дуут системээр уншихад сонин сонсогддог тул маш товч хариул.`
        : `You are a professional AI Career Agent specialized in resume editing, cover letter generation, and mock interviews. 

         CURRENT RESUME DATA:
         ${resumeData ? JSON.stringify(resumeData) : "No resume provided yet."}
         
         If the user requests any changes to their resume or profile, update the information accordingly.
         
         CRITICAL RULE: Your response MUST be a clean JSON with the following structure:
         {
           "message": "Your response to the user",
           "updatedData": {}
         }
         
         CRITICAL INSTRUCTION: The 'message' field must be extremely concise (1-2 sentences max) as it will be read aloud by a text-to-speech engine.`;

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
