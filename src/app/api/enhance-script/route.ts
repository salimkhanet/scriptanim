import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script, language, style } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `তুমি একজন পেশাদার কার্টুন ভিডিও স্ক্রিপ্ট লেখক। তুমি ${language} ভাষায় ${style} স্টাইলের কার্টুন ভিডিওর জন্য স্ক্রিপ্ট উন্নত করো। স্ক্রিপ্টটি আকর্ষণীয়, মজাদার এবং শিশুদের উপযোগী করো।`,
          },
          {
            role: "user",
            content: `এই স্ক্রিপ্টটি উন্নত করো:\n\n${script}`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const enhanced = data.choices[0]?.message?.content || script;

    return NextResponse.json({ enhanced });
  } catch (error) {
    return NextResponse.json({ error: "Script enhance failed" }, { status: 500 });
  }
}
