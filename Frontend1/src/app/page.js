








'use client';

import React, { useState } from 'react';
import { ChatInputBox } from './components/ChatInputBox';
import { ResultsView } from './components/Results/ResultsView';
import { ResearchResultsView } from './components/Results/ResearchResultsVoew';
import { LoadingOverlay } from './components/Animations/LoadingOverlay';
import { VoiceChatOverlay } from './components/VoiceChatOverlay';

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [view, setView] = useState('input');
    const [data, setData] = useState(null);
    const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

    const handleSearch = async (query, searchType = 'Search') => {
        setLoading(true);
        setError(null);
        setData(null);
        setView('input');

        try {
            const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['token'] = token;

            const response = await fetch('/api/search', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ query, searchType })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Search API failed`);
            }

            const searchData = await response.json();
            setData({ query, searchType, ...searchData });

            setView(searchType === 'Research' ? 'research' : 'results');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setView('input');
        setData(null);
        setError(null);
    };

    const mainClasses = `qai-home flex flex-col items-center justify-center min-h-screen p-4  transition-colors duration-500 ${
        view === 'input' ? 'qai-bg-input' : 'qai-bg-results'
    }`;

    return (
        <main className={mainClasses}>
            {loading && <LoadingOverlay />}

            <VoiceChatOverlay 
                isOpen={isVoiceChatOpen} 
                onClose={() => setIsVoiceChatOpen(false)} 
            />

            {view === 'input' ? (
                <div className="qai-home-input flex flex-col items-center w-full max-w-4xl space-y-6">
                    <div className="qai-home-title text-center mb-12">
                        <h1 className="text-7xl md:text-8xl font-bold qai-gradient-text">
                            Query<span className="text-blue-400">AI</span>
                        </h1>
                        <p className="text-gray-300 text-lg mt-2">
                            Ask anything. Research everything.
                        </p>
                    </div>
                    <ChatInputBox 
                        onSearch={handleSearch} 
                        loading={loading} 
                        onVoiceChatClick={() => setIsVoiceChatOpen(true)} 
                    />
                    {error && <p className="qai-error text-red-500 text-center">{error}</p>}
                </div>
            ) : view === 'research' && data ? (
                <div className="qai-results-container w-full max-w-8xl">
                    <ResearchResultsView
                        query={data.query}
                        data={data}
                        onReset={handleReset}
                        onNewSearch={handleSearch}
                    />
                </div>
            ) : view === 'results' && data ? (
                <div className="qai-results-container w-full max-w-8xl">
                    <ResultsView
                        query={data.query}
                        data={data}
                        onReset={handleReset}
                        onNewSearch={handleSearch}
                    />
                </div>
            ) : null}
        </main>
    );
}








