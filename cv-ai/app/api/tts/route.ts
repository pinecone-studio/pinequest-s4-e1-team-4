import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
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
        text: text,
        voice_id: "en_us_male_01",
        language: "en",
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      audio_url: data.data?.audio_url || null,
    });
  } catch (error: any) {
    console.error("TTS API Error:", error);
    return NextResponse.json(
      { error: "Дуу үүсгэхэд алдаа гарлаа" },
      { status: 500 },
    );
  }
}
