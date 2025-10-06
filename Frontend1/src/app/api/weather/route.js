// src/app/api/weather/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
        if (!OPENWEATHER_API_KEY) throw new Error("OPENWEATHER_API_KEY is not set in .env.local");

        const city = request.nextUrl.searchParams.get('city') || 'Chandigarh';
        const units = 'metric';

        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${OPENWEATHER_API_KEY}`
        );
        if (!currentWeatherResponse.ok) throw new Error(`OpenWeatherMap current weather request failed: ${currentWeatherResponse.statusText}`);
        const currentWeatherData = await currentWeatherResponse.json();

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${OPENWEATHER_API_KEY}`
        );
        if (!forecastResponse.ok) throw new Error(`OpenWeatherMap forecast request failed: ${forecastResponse.statusText}`);
        const forecastData = await forecastResponse.json();

        const dailyForecasts = {};
        forecastData.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyForecasts[date]) dailyForecasts[date] = { temps: [], icons: [] };
            dailyForecasts[date].temps.push(item.main.temp);
            dailyForecasts[date].icons.push(item.weather[0].icon);
        });

        const nextFourDays = Object.keys(dailyForecasts)
            .sort()
            .slice(1, 5)
            .map(date => {
                const dayData = dailyForecasts[date];
                const avgTemp = Math.round(dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length);

                const iconCounts = {};
                dayData.icons.forEach(icon => iconCounts[icon] = (iconCounts[icon] || 0) + 1);
                const mainIcon = Object.keys(iconCounts).reduce((a, b) => iconCounts[a] > iconCounts[b] ? a : b, dayData.icons[0]);

                return { date, avgTemp, icon: mainIcon };
            });

        return NextResponse.json({
            current: {
                temp: Math.round(currentWeatherData.main.temp),
                feelsLike: Math.round(currentWeatherData.main.feels_like),
                description: currentWeatherData.weather[0].description,
                icon: currentWeatherData.weather[0].icon,
                city: currentWeatherData.name
            },
            forecast: nextFourDays
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
