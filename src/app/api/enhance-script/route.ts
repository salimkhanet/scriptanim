import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script, language, style } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `তুমি একজন পেশাদার কার্টুন ভিডিও স্ক্রিপ্ট লেখক। এই স্ক্রিপ্টটি ${language} ভাষায় ${style} স্টাইলের কার্টুন ভিডিওর জন্য উন্নত করো। আকর্ষণীয় ও মজাদার করো:\n\n${script}`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    const enhanced = data.candidates?.[0]?.content?.parts?.[0]?.text || script;
    return NextResponse.json({ enhanced });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
