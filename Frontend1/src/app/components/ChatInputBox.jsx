











'use client';

import React, { useState, useEffect } from 'react';
import {
    SearchIcon,
    ResearchIcon,
    CpuIcon,
    PaperclipIcon,
    MicIcon,
    ArrowRightIcon,
    AudioLinesIcon
} from './Icons';
import { DropdownMenu } from './DropdownMenu';
import { aiModels, attachmentOptions } from '../../lib/options';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

export const ChatInputBox = ({ onSearch, loading, onVoiceChatClick }) => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('Search');
    const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();

    useEffect(() => {
        if (transcript) {
            setQuery(transcript);
        }
    }, [transcript]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query.trim()) {
            
            if (onVoiceChatClick) {
                onVoiceChatClick();
            }
            return;
        }

        if (loading) return;

        stopListening();
        onSearch(query, searchType);
    };

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const TabButton = ({ type }) => (
        <button
            type="button"
            onClick={() => setSearchType(type)}
            className={`qai-tab-btn flex items-center gap-2 px-3 py-1.5 rounded-md text-base font-medium transition-colors ${
                searchType === type ? 'qai-tab-active' : 'qai-tab-inactive'
            }`}
        >
            {type === 'Search' ? <SearchIcon className="w-5 h-5" /> : <ResearchIcon className="w-5 h-5" />}
            {type}
        </button>
    );

    return (
        <div className="qai-chat-box w-full max-w-3xl p-5 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-blue-500/20">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={
                            isListening
                                ? 'Listening...'
                                : searchType === 'Search'
                                ? 'Ask me anything...'
                                : 'Research your query...'
                        }
                        className="qai-chat-input w-full p-4 text-lg bg-black/20 border border-blue-500/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-600/50"
                        disabled={loading}
                    />
                </div>

                <div className="border-t border-blue-500/20 my-3"></div>

                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3">
                        <TabButton type="Search" />
                        <TabButton type="Research" />
                    </div>

                    <div className="flex items-center gap-2">
                        <DropdownMenu
                            trigger={
                                <button
                                    type="button"
                                    className="qai-icon-btn p-2 rounded-full hover:bg-blue-600/20 transition"
                                >
                                    <CpuIcon className="w-5 h-5 text-white" />
                                </button>
                            }
                        >
                            {aiModels.map((model) => (
                                <div key={model.name} className="qai-dropdown-item px-4 py-2 text-sm">
                                    <p className="font-semibold text-white">{model.name}</p>
                                    <p className="text-xs text-gray-400">{model.description}</p>
                                </div>
                            ))}
                        </DropdownMenu>

                        <DropdownMenu
                            trigger={
                                <button
                                    type="button"
                                    className="qai-icon-btn p-2 rounded-full hover:bg-blue-600/20 transition"
                                >
                                    <PaperclipIcon className="w-5 h-5 text-white" />
                                </button>
                            }
                        >
                            {attachmentOptions.map((option) => (
                                <a
                                    key={option.label}
                                    href="#"
                                    className="qai-dropdown-item block px-4 py-2 text-sm text-white hover:bg-blue-500/20"
                                >
                                    {option.label}
                                </a>
                            ))}
                        </DropdownMenu>

                        <div className="relative flex items-center justify-center">
                            {isListening && (
                                <>
                                    <span className="absolute w-12 h-12 rounded-full bg-red-500/20 animate-ping"></span>
                                    <span className="absolute w-16 h-16 rounded-full bg-red-500/10 animate-ping [animation-delay:0.3s]"></span>
                                </>
                            )}
                            <button
                                type="button"
                                onClick={handleMicClick}
                                className={`relative z-10 qai-icon-btn p-3 rounded-full transition ${
                                    isListening
                                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
                                        : 'hover:bg-blue-600/20'
                                }`}
                            >
                                <MicIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="qai-submit-btn p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : !query.trim() ? (
                                <AudioLinesIcon className="w-6 h-6 text-white" />
                            ) : (
                                <ArrowRightIcon className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
