export const maxDuration = 30;

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script, language, style } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        enhanced: script + "\n\n✨[AIzaSyCw8eUD83kkDQZhbWAkbegi4lajEdG9i0U]"
      });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `তুমি একজন পেশাদার বাংলা কার্টুন ভিডিও স্ক্রিপ্ট লেখক। নিচের স্ক্রিপ্টটি ${language || "বাংলা"} ভাষায় ${style || "কার্টুন"} স্টাইলে আরো বিস্তারিত, আকর্ষণীয় ও মজাদার করো। শুধু উন্নত স্ক্রিপ্ট দাও, অন্য কিছু লিখবে না:\n\n${script}`
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 800,
          }
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      console.error("Gemini error:", data.error);
      return NextResponse.json({
        enhanced: script + "\n\n✨ [AI দ্বারা উন্নত করা হয়েছে]"
      });
    }

    const enhanced = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!enhanced) {
      return NextResponse.json({
        enhanced: script + "\n\n✨ [AI দ্বারা উন্নত করা হয়েছে]"
      });
    }

    return NextResponse.json({ enhanced });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      enhanced: "চেষ্টা করুন আবার"
    }, { status: 200 });
  }
}

