import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { query } = await request.json();

        const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
        if (!SERPAPI_KEY) {
            throw new Error("SERPAPI_API_KEY is not set in .env.local");
        }

        const serpResponse = await fetch(
            `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=50&api_key=${SERPAPI_KEY}`
        );

        if (!serpResponse.ok) {
            throw new Error(`SerpApi Google search request failed with status ${serpResponse.status}`);
        }

        const serpData = await serpResponse.json();

        const sourceResults = (serpData.organic_results || []).map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
            favicon: item.favicon
        }));

        return NextResponse.json({ sources: sourceResults });
    } catch (error) {
        console.error('Source Search API Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
