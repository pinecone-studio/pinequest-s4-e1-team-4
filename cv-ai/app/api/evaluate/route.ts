import { companyInterviews } from "@/app/data/companies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.messages) {
      return NextResponse.json(
        { error: "Чатны түүх олдсонгүй." },
        { status: 400 },
      );
    }

    const { messages, companyId } = body;
    const selectedCompany = companyInterviews.find((c) => c.id === companyId);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI түлхүүр тохируулагдаагүй байна." },
        { status: 500 },
      );
    }

    const chatHistory = messages
      .map(
        (m: any) =>
          `${m.role === "user" ? "Ажил горилогч" : "HR"}: ${m.content}`,
      )
      .join("\n");

    const evaluationPrompt = `Чи бол хүний нөөцийн мэргэжлийн шинжээч байна. 
Дараах ярилцлагын түүхийг уншиж, ажил горилогчийн CV-ийн чанар болон ажлын ярилцлагын гүйцэтгэлийг ${selectedCompany ? selectedCompany.name : "компани"}-ийн шалгуурт тааруулан үнэлгээ өгнө үү.

[ЯРИЛЦЛАГЫН ТҮҮХ]
${chatHistory}

ЧАТНЫ ТҮҮХЭД ҮНДЭСЛЭЖ ДАРААХ JSON СТРУКТУРЫГ БУЦАА. ТЕКСТЭН ТАЙЛБАР БИТГИЙ БИЧ, ЗӨВХӨН ЦЭВЭР JSON БУЦААРАЙ:
{
  "cvScore": 85,
  "interviewScore": 72,
  "strengths": ["Давуу тал 1", "Давуу тал 2"],
  "weaknesses": ["Сул тал 1", "Сул тал 2"],
  "tips": ["Засах зөвлөмж 1", "Засах зөвлөмж 2"]
}`;

    const openAiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: evaluationPrompt }],
          response_format: { type: "json_object" },
          temperature: 0.3,
        }),
      },
    );

    if (!openAiResponse.ok) throw new Error("OpenAI evaluation failed");

    const aiData = await openAiResponse.json();
    return NextResponse.json(
      JSON.parse(aiData.choices[0].message.content || "{}"),
    );
  } catch (error: any) {
    console.error("Evaluation API Error:", error.message);
    return NextResponse.json(
      { error: "Үнэлгээ хийх явцад алдаа гарлаа." },
      { status: 500 },
    );
  }
}
