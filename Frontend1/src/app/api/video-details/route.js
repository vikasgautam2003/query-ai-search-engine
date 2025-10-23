import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  }

  const apiKey = process.env.SERPAPI_API_KEY; 
  const url = `https://serpapi.com/search.json?engine=youtube_video&v=${videoId}&api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching from SerpApi:", err);
    return NextResponse.json({ error: "Failed to fetch video details" }, { status: 500 });
  }
}
