export const maxDuration = 60;
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { script, voiceGender } = await req.json();
    const apiKey = process.env.DID_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 500 });
    }

    const voice = voiceGender === "মহিলা" 
      ? "en-US-JennyNeural" 
      : "en-US-GuyNeural";

    const res = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        script: {
          type: "text",
          input: script,
          provider: {
            type: "microsoft",
            voice_id: voice
          }
        },
        source_url: "https://d-id-public-bucket.s3.amazonaws.com/alice.jpg",
        config: { fluent: true }
      }),
    });

    const data = await res.json();

    if (data.id) {
      return NextResponse.json({ 
        success: true, 
        videoId: data.id,
        status: data.status 
      });
    }

    return NextResponse.json({ error: "Failed" }, { status: 500 });

  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
