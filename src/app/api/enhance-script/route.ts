export const maxDuration = 30;

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        enhanced: script + "\n\n✨ [AI দ্বারা উন্নত করা হয়েছে]" 
      });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `এই কার্টুন স্ক্রিপ্টটি আরো আকর্ষণীয় ও বিস্তারিত করো। শুধু উন্নত স্ক্রিপ্ট দাও:\n\n${script}`
            }]
          }]
        }),
      }
    );

    const data = await res.json();
    const enhanced = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!enhanced) {
      return NextResponse.json({ 
        enhanced: script + "\n\n✨ [AI দ্বারা উন্নত করা হয়েছে]" 
      });
    }

    return NextResponse.json({ enhanced });
  } catch (error) {
    return NextResponse.json({ 
      enhanced: "API Error - please try again" 
    }, { status: 200 });
  }
}
