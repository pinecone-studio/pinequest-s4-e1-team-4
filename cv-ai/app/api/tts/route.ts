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

    const response = await fetch("https://api.topmediai.com/v1/texttospeech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.TOPMEDIA_KEY || "",
      },
      body: JSON.stringify({
        text: body.text,
        voice_id: "en_us_male_01",
        language: "en",
      }),
    });

    if (!response.ok) throw new Error(`TopMediai Error: ${response.status}`);
    const data = await response.json();
    const audioUrl = data.data?.audio_url;

    if (!audioUrl) {
      return NextResponse.json(
        { error: "Дууны линк үүссэнгүй" },
        { status: 500 },
      );
    }

    const audioFetchRes = await fetch(audioUrl);
    if (!audioFetchRes.ok) throw new Error("Аудио файлыг татаж чадсангүй.");

    const audioBuffer = await audioFetchRes.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error: any) {
    console.error("TTS API Error:", error.message);
    return NextResponse.json(
      { error: "Дуу үүсгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
