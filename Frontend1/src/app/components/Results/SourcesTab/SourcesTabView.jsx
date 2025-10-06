'use client';

import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import { ArrowLeftIcon, SearchIcon } from '../../Icons'; 

export const SourcesTabView = ({ initialQuery, onBackToAnswer }) => {
    const [currentQuery, setCurrentQuery] = useState(initialQuery || '');
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentQuery) {
            fetchSources(currentQuery);
        }
    }, [currentQuery]);

    const fetchSources = async (query) => {
        setLoading(true);
        setError(null);
        setSources([]);

        try {
            const response = await fetch('/api/source-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to fetch sources');
            }

            const data = await response.json();
            setSources(data.sources);
        } catch (err) {
            console.error("Error fetching sources:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const newQuery = e.target.elements.sourceSearchInput.value;
        if (newQuery.trim() && newQuery !== currentQuery) {
            setCurrentQuery(newQuery);
        }
    };

    return (
        <div className="p-4 bg-gray-900 text-white">
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={onBackToAnswer} 
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back to Answer
                </button>
                <form onSubmit={handleSearchSubmit} className="flex-grow max-w-md mx-auto relative">
                    <input
                        type="text"
                        name="sourceSearchInput"
                        placeholder={`Search sources for "${initialQuery}" or new query...`}
                        defaultValue={currentQuery}
                        className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                        disabled={loading}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                        <SearchIcon className="w-5 h-5" />
                    </button>
                </form>
                <div className="w-48"></div>
            </div>
            <div className="space-y-4 min-h-[515px]">
            {loading && <p className="text-center text-gray-400">Loading sources...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}

            {!loading && !error && sources.length === 0 && (
                <p className="text-center text-gray-400">No sources found for "{currentQuery}".</p>
            )}

            <div className="space-y-4">
                {sources.map((source, index) => (
                    <a key={index} href={source.link} target="_blank" rel="noopener noreferrer" 
                       className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <div className="flex items-center space-x-2 mb-1">
                            {source.favicon && 
                                <Image 
                                    src={source.favicon} 
                                    alt="" 
                                    width={16} 
                                    height={16} 
                                    className="rounded-full"
                                />
                            }
                            <span className="text-sm text-gray-400 font-semibold truncate">
                                {new URL(source.link).hostname.replace('www.', '')}
                            </span>
                            <span className="text-xs text-gray-500 truncate">{source.link}</span>
                        </div>
                        <p className="text-lg text-blue-400 font-semibold mt-1">{source.title}</p>
                        <p className="text-sm text-gray-300 mt-1">{source.snippet}</p>
                    </a>
                ))}
            </div>
        </div>
    </div>
    );
};
