import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.text) {
      return NextResponse.json(
        { error: "Текст хоосон байна" },
        { status: 400 },
      );
    }

    const cleanText = body.text
      .replace(/CV/gi, "Си Ви")
      .replace(/AI/gi, "Эй Ай")
      .replace(/[^а-яА-ЯөӨүҮёЁ\s\?\!\.\-\'\"\,\:0-9]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanText) {
      return NextResponse.json(
        { error: "Унших боломжтой текст алга" },
        { status: 400 },
      );
    }

    const token = process.env.CHIMEGE_TTS?.trim();
    if (!token) {
      return NextResponse.json({ error: "Түлхүүр олдсонгүй" }, { status: 500 });
    }

    const response = await fetch("https://api.chimege.com/v1.2/synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "plain/text",
        Token: token,
        "voice-id": "FEMALE2",
      },
      body: cleanText,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Chimege TTS API Алдаа:", response.status, errorText);
      throw new Error(`Chimege TTS Error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: { "Content-Type": "audio/x-wav" },
    });
  } catch (error: any) {
    console.error("TTS Бэкэнд Алдаа:", error.message);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
