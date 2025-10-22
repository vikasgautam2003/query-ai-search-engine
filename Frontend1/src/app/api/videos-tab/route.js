import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
        if (!SERPAPI_KEY) {
            return NextResponse.json({ error: 'SerpAPI API key is not configured.' }, { status: 500 });
        }

        const videoResponse = await fetch(`https://serpapi.com/search.json?engine=google_videos&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`);

        if (!videoResponse.ok) {
            let errorBody = 'SerpApi video request failed';
            try {
                const errorData = await videoResponse.json();
                errorBody = errorData.error || errorBody;
            } catch (e) {}
            throw new Error(`${errorBody} (Status: ${videoResponse.status})`);
        }

        const videoData = await videoResponse.json();

        console.log("📹Video Responded Data", videoData);

        const videos = (videoData.video_results || []).slice(0, 12).map(video => ({
            title: video.title,
            link: video.link,
            thumbnailUrl: `/api/image-proxy?url=${encodeURIComponent( video.thumbnail)}`,
            source: video.source,
            duration: video.duration,
            snippet: video.snippet
        }));

        return NextResponse.json({ videos });

    } catch (error) {
        console.error('Next.js Video API Route Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error during video search.';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Method Not Allowed. Please use POST.' }, { status: 405 });
}
