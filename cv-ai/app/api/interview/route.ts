export const dynamic = "force-dynamic";

import { companyInterviews } from "@/app/data/companies";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, companyId, language = "mn" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Ярианы түүх олдсонгүй" },
        { status: 400 },
      );
    }

    const selectedCompany = companyInterviews.find((c) => c.id === companyId);
    let masterPrompt = "";

    if (selectedCompany) {
      masterPrompt =
        language === "en"
          ? `You are the strict HR manager at ${selectedCompany.name} interviewing for ${selectedCompany.role}. Conduct strictly in English. Ask ONLY ONE short question at a time. Maximum 1-2 sentences.`
          : `${selectedCompany.systemPrompt} ДУУ ХОЛОЙНЫ ЖУРАМ: Асуултыг НАДД НЭГЭЭР НЬ асуу. Хариулт чинь хамгийн ихдээ 1-2 өгүүлбэр байна.`;
    } else {
      masterPrompt = "Чи бол карьерын ухаалаг зөвлөх байна. Товч хариул.";
    }

    const cleanHistory = messages.map((m: any) => ({
      role: (m.role === "assistant" || m.role === "ai"
        ? "assistant"
        : "user") as "assistant" | "user",
      content: String(m.content || "").trim(),
    }));

    const apiMessages = [
      { role: "system" as const, content: masterPrompt },
      ...cleanHistory,
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: apiMessages,
      max_tokens: 120,
    });
    return NextResponse.json({
      message: {
        role: "assistant",
        content: response.choices[0].message.content || "",
      },
    });
  } catch (error: any) {
    console.error("Interview API Error:", error);
    return NextResponse.json(
      { error: "Алдаа гарлаа", details: error.message },
      { status: 500 },
    );
  }
}
