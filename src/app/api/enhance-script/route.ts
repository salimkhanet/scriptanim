export const maxDuration = 30;
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ enhanced: script });
    }
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "এই স্ক্রিপ্টটি আরো সুন্দর করো: " + script }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 800 }
      }),
    });
    const data = await res.json();
    const enhanced = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!enhanced) {
      return NextResponse.json({ enhanced: script });
    }
    return NextResponse.json({ enhanced });
  } catch (error) {
    return NextResponse.json({ enhanced: script });
  }
}
