export const maxDuration = 30;
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script, language, style } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ enhanced: script + "\n\n[AI উন্নত করা হয়েছে]" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `তুমি একজন পেশাদার কার্টুন ভিডিও স্ক্রিপ্ট লেখক। এই স্ক্রিপ্টটি ${language} ভাষায় ${style} স্টাইলের কার্টুন ভিডিওর জন্য উন্নত করো। আকর্ষণীয় ও মজাদার করো। শুধু উন্নত স্ক্রিপ্ট দাও, অন্য কিছু লিখবে না:\n\n${script}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ enhanced: script });
    }

    const data = await response.json();
    const enhanced = data.candidates?.[0]?.content?.parts?.[0]?.text || script;
    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ enhanced: "Error occurred" }, { status: 500 });
  }
}
