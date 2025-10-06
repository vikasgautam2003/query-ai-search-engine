// src/app/api/videos/route.js
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;
        if (!SERPAPI_API_KEY) {
            throw new Error("SERPAPI_API_KEY is not set in .env.local");
        }
        
        const query = "Latest Science and Technology Explained";
        
        const videoResponse = await fetch(`https://serpapi.com/search.json?engine=google_videos&q=${encodeURIComponent(query)}&api_key=${SERPAPI_API_KEY}`);
        
        if (!videoResponse.ok) {
            throw new Error(`SerpApi video request failed: ${videoResponse.statusText}`);
        }

        const videoData = await videoResponse.json();
        
        
        const videos = (videoData.video_results || []).slice(0, 10).map(video => ({
            title: video.title,
            link: video.link,
            thumbnailUrl: video.thumbnail,
            source: video.source,
            duration: video.duration
        }));

        return NextResponse.json(videos);

    } catch (error) {
        console.error('Videos API Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}