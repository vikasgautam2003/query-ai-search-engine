// src/components/MarketDataWidget.jsx
'use client';

import React, { useState, useEffect } from 'react';

const MarketItem = ({ name, price, change, percentChange }) => {
    const isPositive = change >= 0;
    const priceFormatted = price ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
    const changeFormatted = change ? change.toFixed(2) : 'N/A';

    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-400">{name}</span>
            <span className="text-lg font-semibold text-white">{priceFormatted}</span>
            <div className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                <span>{isPositive ? '+' : ''}{changeFormatted}</span>
                <span className="ml-2">({isPositive ? '+' : ''}{percentChange ? percentChange.toFixed(2) : 'N/A'}%)</span>
            </div>
        </div>
    );
};

export const MarketDataWidget = () => {
    const [marketData, setMarketData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch('/api/market-data');
                if (!response.ok) {
                    throw new Error('Failed to fetch market data');
                }
                const data = await response.json();
                setMarketData(data);
           } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarketData();
    }, []);

    if (loading) {
        return <div className="bg-gray-800 rounded-lg p-4 h-48 flex justify-center items-center"><p className="text-gray-400">Loading Market Data...</p></div>;
    }
    if (error) {
        return <div className="bg-gray-800 rounded-lg p-4 h-48 flex justify-center items-center"><p className="text-red-500">Error: {error}</p></div>;
    }
    if (!marketData) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-4 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Market Outlook</h3>
            <div className="grid grid-cols-2 gap-4">
                {marketData.map(item => (
                    <MarketItem 
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        change={item.change}
                        percentChange={item.changesPercentage}
                    />
                ))}
            </div>
        </div>
    );
};