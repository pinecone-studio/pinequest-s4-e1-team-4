export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Чатын түүх олдсонгүй" },
        { status: 400 },
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Чи бол CV засах, Cover Letter үүсгэх, ярилцлагын бэлтгэл хийхэд тусалдаг мэргэжлийн AI Карьерын Төлөөлөгч юм. Хэрэглэгчид маш зөөлөн, ухаалаг, тодорхой зөвлөгөө өгч ажиллаарай.",
        },
        ...messages,
      ],
    });

    const aiMessage = response.choices[0].message;
    return NextResponse.json({ message: aiMessage }, { status: 200 });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "AI хариулт өгөхөд алдаа гарлаа", details: error.message },
      { status: 500 },
    );
  }
}
