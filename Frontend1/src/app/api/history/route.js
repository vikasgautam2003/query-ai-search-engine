import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const historyResponse = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`);
        
        if (!historyResponse.ok) {
            throw new Error(`History API request failed with status ${historyResponse.status}`);
        }

        const historyData = await historyResponse.json();
        
        const events = (historyData.events || []).slice(0, 3).map(event => ({
            year: event.year,
            description: event.description,
            wikipediaUrl: event.wikipedia[0]?.wikipedia || '#'
        }));

        return NextResponse.json(events);

    } catch (error) {
        console.error('History API Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
