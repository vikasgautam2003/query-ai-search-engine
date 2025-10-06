// src/app/api/market-data/route.js
import { NextResponse } from 'next/server';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
    try {
        const ALPHA_VANTAGE_KEY = process.env.ALPHAVANTAGE_API_KEY;
        if (!ALPHA_VANTAGE_KEY) {
            throw new Error("ALPHAVANTAGE_API_KEY is not set in .env.local");
        }

        const symbols = {
            indices: [
                { symbol: 'SPY', name: 'S&P 500' },
                { symbol: 'QQQ', name: 'NASDAQ' },
            ],
            crypto: [
                { symbol: 'BTC', name: 'Bitcoin' },
                { symbol: 'ETH', name: 'Ethereum' },
            ]
        };
        
        const allData = [];

        for (const item of symbols.indices) {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=${ALPHA_VANTAGE_KEY}`);
            const data = await response.json();
            const quote = data['Global Quote'];
            if (quote && Object.keys(quote).length > 0) {
                allData.push({
                    name: item.name,
                    price: parseFloat(quote['05. price']),
                    change: parseFloat(quote['09. change']),
                    changesPercentage: parseFloat(quote['10. change percent'].replace('%', ''))
                });
            }
            await delay(1000);
        }
        
        for (const item of symbols.crypto) {
            const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${item.symbol}&to_currency=USD&apikey=${ALPHA_VANTAGE_KEY}`);
            const data = await response.json();
            const rate = data['Realtime Currency Exchange Rate'];
            if (rate) {
                const dailyResponse = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${item.symbol}&market=USD&apikey=${ALPHA_VANTAGE_KEY}`);
                const dailyData = await dailyResponse.json();
                const timeSeries = dailyData['Time Series (Digital Currency Daily)'];
                if(timeSeries) {
                    const dates = Object.keys(timeSeries).sort((a,b) => new Date(b) - new Date(a));
                    const latestPrice = parseFloat(timeSeries[dates[0]]['4a. close (USD)']);
                    const previousPrice = parseFloat(timeSeries[dates[1]]['4a. close (USD)']);
                    const change = latestPrice - previousPrice;
                    const changesPercentage = (change / previousPrice) * 100;

                    allData.push({
                        name: item.name,
                        price: latestPrice,
                        change: change,
                        changesPercentage: changesPercentage
                    });
                }
            }
            await delay(1000);
        }

        return NextResponse.json(allData);

    } catch (error) {
        console.error('Market Data API Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}







