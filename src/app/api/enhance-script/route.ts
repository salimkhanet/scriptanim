export const maxDuration = 30;
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json();
    const apiKey = process.env.HF_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ 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 });
    }

    const res = await fetch(
      "https://api-inference.huggingface.co/models/facebook/mbart-large-cc25",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: "এই কার্টুন স্ক্রিপ্টটি আরো আকর্ষণীয় করো: " + script,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.8
          }
        }),
      }
    );

    const data = await res.json();

    if (Array.isArray(data) && data[0]?.generated_text) {
      return NextResponse.json({ enhanced: data[0].generated_text });
    }

    return NextResponse.json({ enhanced: script });

  } catch (error) {
    return NextResponse.json({ enhanced: script });
  }
}
