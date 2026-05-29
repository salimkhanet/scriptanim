export const maxDuration = 30;
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  let script = "";
  try {
    const body = await req.json();
    script = body.script || "";
    const key = process.env.HF_API_KEY;
    if (!key) {
      return NextResponse.json({ enhanced: script });
    }
    const res = await fetch(
      "https://api-inference.huggingface.co/models/facebook/mbart-large-cc25",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: script }),
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



















