// src/app/api/image-search/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { query } = await request.json();

    const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
    if (!SERPAPI_KEY) {
      throw new Error("SERPAPI_API_KEY is not set in .env.local");
    }

    // 🔎 Google Images search
    const serpResponse = await fetch(
      `https://serpapi.com/search.json?engine=google_images&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`
    );

    if (!serpResponse.ok) {
      throw new Error(
        `SerpApi Google Images request failed with status ${serpResponse.status}`
      );
    }

    const serpData = await serpResponse.json();


    const imageResults = (serpData.images_results || []).slice(0, 50).map(item => {
      const rawUrl = item.original || item.thumbnail;
      return {
        imageUrl: `/api/image-proxy?url=${encodeURIComponent(rawUrl)}`, 
        thumbnailUrl: `/api/image-proxy?url=${encodeURIComponent(item.thumbnail || rawUrl)}`,
        title: item.title || "Untitled",
        link: item.link || "",
        source: item.source || (item.link ? new URL(item.link).hostname.replace("www.", "") : "Unknown")
      };
    });

    return NextResponse.json({ images: imageResults });

  } catch (error) {
    console.error("Image Search API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
