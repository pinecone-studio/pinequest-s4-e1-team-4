import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob | null;

    if (!audioFile || audioFile.size < 2048) {
      return NextResponse.json(
        { error: "Аудио хэт богино байна (2KB-аас бага)" },
        { status: 400 },
      );
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const token = process.env.CHIMEGE_STT?.trim() || "";

    if (!token) {
      console.error("STT Алдаа: CHIMEGE_STT_SHORT түлхүүр олдсонгүй!");
      return NextResponse.json({ error: "Түлхүүр олдсонгүй" }, { status: 500 });
    }

    const response = await fetch("https://api.chimege.com/v1.2/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        Token: token,
        punctuate: "true",
      },
      body: buffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Chimege STT Transcribe Алдаа:",
        response.status,
        errorText,
      );
      throw new Error(`Transcribe Error: ${response.status} - ${errorText}`);
    }

    const textData = await response.text();

    try {
      const jsonData = JSON.parse(textData);
      return NextResponse.json({ text: jsonData.text || textData });
    } catch {
      return NextResponse.json({ text: textData });
    }
  } catch (error: any) {
    console.error("STT Бэкэнд Алдаа:", error.message);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
