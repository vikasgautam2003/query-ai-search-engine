





// src/components/WeatherWidget.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                if (!response.ok) throw new Error('Failed to fetch weather data');
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading || error || !weather || !weather.current) {
        return (
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center h-48 shadow-lg">
                <p className={`text-sm ${error ? 'text-red-400' : 'text-gray-400'}`}>
                    {error ? `Error: ${error}` : "Loading weather..."}
                </p>
            </div>
        );
    }

    const current = weather.current;
    const forecast = weather.forecast;

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl border border-gray-700">
            {/* Current Weather Section */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <span className="text-5xl font-bold">{current.temp}°C</span>
                    {current.icon && (
                        <Image
                            src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
                            alt={current.description}
                            width={70}
                            height={70}
                            className=""
                        />
                    )}
                </div>
                <div className="text-right">
                    <p className="text-lg font-medium capitalize">{current.description}</p>
                    <p className="text-sm text-gray-400">{current.city}</p>
                    <p className="text-xs text-gray-500">
                        H: {current.feelsLike}° L: {current.feelsLike}°
                    </p>
                </div>
            </div>

            {/* Forecast Section */}
            <div className="flex justify-between space-x-2 border-t border-gray-700 pt-4">
                {forecast.map((day, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-2 bg-gray-800/60 rounded-lg w-full"
                    >
                        <p className="text-xs text-gray-400">{getDayName(day.date)}</p>
                        <Image
                            src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                            alt=""
                            width={35}
                            height={35}
                        />
                        <p className="text-sm font-semibold">{day.avgTemp}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
