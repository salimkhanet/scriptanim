import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "No API key found" });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Say hello in Bengali" }] }]
        }),
      }
    );
    const data = await res.json();
    return NextResponse.json({ 
      success: true, 
      keyExists: true,
      response: data 
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
}
