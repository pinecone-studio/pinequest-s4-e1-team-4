export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Хуучин pdf-parse-аа хэвээр нь ашиглана
const pdfParse = require("pdf-parse");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Чи бол CV засах, мэдээлэл ялгах мэргэжлийн туслах систем юм. 
Танд өгөгдсөн CV-нээс дараах бүтцийн дагуу мэдээллийг ялган авч, заавал ЦЭВЭРХЭН JSON форматаар буцаа.

Бүтэц (JSON schema):
{
  "name": "Хэрэглэгчийн бүтэн нэр",
  "email": "Имэйл хаяг",
  "phone": "Утасны дугаар",
  "skills": ["Ур чадваруудын жагсаалт"],
  "experience": [
    {
      "company": "Компанийн нэр",
      "role": "Албан тушаал",
      "duration": "Ажилласан хугацаа"
    }
  ],
  "education": [
    {
      "school": "Сургуулийн нэр",
      "degree": "Мэргэжил / Зэрэг",
      "duration": "Суралцсан хугацаа"
    }
  ]
}`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл олдсонгүй" }, { status: 400 });
    }

    let aiResponse = "{}";
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ЗУРАГ БОЛОВСРУУЛАХ
    if (file.type.startsWith("image/")) {
      const base64Image = buffer.toString("base64");
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Энэхүү CV-ний зурагнаас мэдээллийг нь ялгаж аваад JSON хэлбэрээр буцаа.",
              },
              {
                type: "image_url",
                image_url: { url: `data:${file.type};base64,${base64Image}` },
              },
            ],
          },
        ],
        response_format: { type: "json_object" },
      });
      aiResponse = response.choices[0].message.content || "{}";

      // PDF БОЛОВСРУУЛАХ
    } else if (file.type === "application/pdf") {
      const pdfData = await pdfParse(buffer);
      const extractedText = pdfData.text;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Дараах текстийг уншаад мэдээллийг нь JSON болгож хувирга.\n\nТекст:\n${extractedText}`,
          },
        ],
        response_format: { type: "json_object" },
      });
      aiResponse = response.choices[0].message.content || "{}";
    } else {
      return NextResponse.json(
        {
          error:
            "Дэмжигдэхгүй файлын формат. Зөвхөн PDF эсвэл Зураг оруулна уу.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ data: JSON.parse(aiResponse) });
  } catch (error: any) {
    console.error("OpenAI Extractor API Error:", error);
    return NextResponse.json(
      { error: "Сервер дээр алдаа гарлаа", details: error.message },
      { status: 500 },
    );
  }
}
