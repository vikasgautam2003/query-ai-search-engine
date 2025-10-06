// import { NextResponse } from 'next/server';

// export async function GET() {
//     try {
//         const GNEWS_KEY = process.env.GNEWS_API_KEY;
//         if (!GNEWS_KEY) throw new Error("GNEWS_API_KEY is not set in .env.local");

//         const newsResponse = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${GNEWS_KEY}`);
//         if (!newsResponse.ok) throw new Error(`GNews API request failed with status ${newsResponse.status}`);

//         const newsData = await newsResponse.json();
//         return NextResponse.json(newsData.articles);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }





import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const GNEWS_KEY = process.env.GNEWS_API_KEY;
        if (!GNEWS_KEY) {
            throw new Error("GNEWS_API_KEY is not set in .env.local");
        }

        const category = request.nextUrl.searchParams.get('category') || 'general';

        const newsResponse = await fetch(
            `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${GNEWS_KEY}`
        );

        if (!newsResponse.ok) {
            throw new Error(`GNews API request for category '${category}' failed with status ${newsResponse.status}`);
        }

        const newsData = await newsResponse.json();

        return NextResponse.json(newsData.articles || [], {
            status: 200,
            headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=59' }
        });

    } catch (error) {
        console.error('News API Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}








