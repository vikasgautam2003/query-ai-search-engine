'use client';

import React, { useState, useEffect } from 'react';

// A small book icon for decoration
const BookIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </svg>
);


export const HistoryWidget = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/history');
                if (!response.ok) {
                    throw new Error('Failed to fetch historical events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return <div className="bg-gray-800 rounded-lg p-4 h-48 animate-pulse"></div>;
    }

    if (error || events.length === 0) {
        return null; // Don't render the component if there's an error or no events
    }

    return (
        <section className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <BookIcon className="w-6 h-6 mr-3 text-blue-400"/>
                On This Day in History
            </h2>
            <div className="space-y-4">
                {events.map((event, index) => (
                    <a 
                        key={index} 
                        href={event.wikipediaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block border-l-4 border-gray-700 pl-4 hover:bg-gray-700/50 py-2 transition-colors rounded"
                    >
                        <p className="font-bold text-blue-400">{event.year}</p>
                        <p className="text-gray-300">{event.description}</p>
                    </a>
                ))}
            </div>
        </section>
    );
};