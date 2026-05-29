export const maxDuration = 30;

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json();

    if (!script) {
      return NextResponse.json({ enhanced: script || "" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY not found");
      return NextResponse.json({ enhanced: script });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `তুমি একজন পেশাদার বাংলা ভিডিও স্ক্রিপ্ট রাইটার। 
নিচের স্ক্রিপ্টটাকে আরও সুন্দর, আকর্ষণীয়, স্বাভাবিক এবং ছোট ভিডিওর জন্য উপযোগী করে দাও। 
শুধু স্ক্রিপ্টটাই দাও, অতিরিক্ত কথা লিখো না।

স্ক্রিপ্ট: ${script}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    const enhanced = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!enhanced) {
      return NextResponse.json({ enhanced: script });
    }

    return NextResponse.json({ enhanced });

  } catch (error) {
    console.error("Enhance Script Error:", error);
    return NextResponse.json({ 
      enhanced: script,
      error: "স্ক্রিপ্ট এনহ্যান্স করতে সমস্যা হয়েছে"
    });
  }
}
