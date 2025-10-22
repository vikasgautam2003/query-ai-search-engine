










'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ResearchIcon, ImageIcon, BookIcon, ExternalLinkIcon, LightbulbIcon, PlayIcon } from '../Icons';
import { BottomChatInput } from './BottomChatInput';
import { ImagesTabView } from './ImageTab/ImagesTabView';
import { VideosTabView } from './VideosTab/VideosTabView';

const Citation = ({ number, source }) => {
    if (!source || !source.link) return <span className="text-gray-400 text-xs px-1">[{number}]</span>;
    try {
        const hostname = new URL(source.link).hostname.replace('www.', '');
        return (
            <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded-md mx-1 hover:bg-gray-600 hover:text-white transition-colors whitespace-nowrap"
                title={source.title}
            >
                {hostname}
            </a>
        );
    } catch (e) {
        return <span className="text-gray-400 text-xs px-1">[{number}]</span>;
    }
};

export const ResearchResultsView = ({ query, data, onReset, onNewSearch }) => {
    const [activeTab, setActiveTab] = useState('Research');
    const { answer = '', sources = [], relatedQuestions = [], videos } = data || {};

    const handleNewSearch = (newQuery) => {
        onNewSearch(newQuery, 'Research');
    };

    const TabButton = ({ icon, label, isActive, onClick, count }) => (
        <button
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2
                ${isActive ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-600'}
            `}
            onClick={onClick}
        >
            {icon}
            {label}
            {count !== undefined && <span className="ml-1 text-xs px-2 py-0.5 bg-gray-700 rounded-full">{count}</span>}
        </button>
    );

    const SourceCard = ({ source, id }) => (
        <a
            id={id}
            href={source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors group shadow"
        >
            <h3 className="text-sm font-semibold text-blue-400 group-hover:underline mb-1 line-clamp-1">
                {source.title}
            </h3>
            <p className="text-gray-400 text-xs line-clamp-2 mb-2">{source.snippet}</p>
            <div className="flex items-center text-gray-500 text-xs mt-auto">
                {source.favicon && (
                    <Image src={source.favicon} alt="Favicon" width={16} height={16} className="mr-2 rounded" />
                )}
                <span className="truncate">{source.link ? new URL(source.link).hostname : ''}</span>
                <ExternalLinkIcon className="w-3 h-3 ml-2 text-gray-500 group-hover:text-blue-400" />
            </div>
        </a>
    );

    return (
        <div className="w-full max-w-8xl mx-auto pt-10 pl-5 pr-5 bg-gray-900 rounded-xl shadow-xl text-white relative">

            <button
                onClick={onReset}
                className="absolute top-4 right-4 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300"
            >
                &larr; New Research
            </button>

            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-left p-5">
                {query}
            </h1>

            <div className="flex justify-start border-b border-gray-700 mb-4 space-x-2">
                <TabButton icon={<ResearchIcon className="w-4 h-4" />} label="Research" isActive={activeTab === 'Research'} onClick={() => setActiveTab('Research')} />
                <TabButton icon={<ImageIcon className="w-4 h-4" />} label="Images" isActive={activeTab === 'Images'} onClick={() => setActiveTab('Images')} />
                <TabButton icon={<PlayIcon className="w-4 h-4" />} label="Videos" isActive={activeTab === 'Videos'} onClick={() => setActiveTab('Videos')} />
                <TabButton icon={<BookIcon className="w-4 h-4" />} label="Sources" isActive={activeTab === 'Sources'} onClick={() => setActiveTab('Sources')} count={sources.length} />
            </div>

            {activeTab === 'Research' && sources.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-6">
                    {sources.slice(0, 4).map((source, idx) => (
                        <SourceCard key={idx} id={`source-${idx}`} source={source} />
                    ))}
                </div>
            )}

            <div className="min-h-[300px] space-y-6">
             {activeTab === 'Research' && (
                      <div className="flex justify-center mt-10">
                        <div className="prose prose-invert max-w-8xl text-gray-200 space-y-6 text-left text-lg px-4">
                          <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              text: ({ children }) => {
                                const textContent = String(children);
                                const citationRegex = /\[(\d+)\]/g;
                                if (!citationRegex.test(textContent)) return <span className="break-words">{children}</span>;

                                const parts = textContent.split(citationRegex);
                                return (
                                  <>
                                    {parts.map((part, index) => {
                                      if (index % 2 === 1) {
                                        const sourceIndex = parseInt(part, 10) - 1;
                                        const source = sources[sourceIndex];
                                        return <Citation key={index} number={part} source={source} />;
                                      }
                                      return <span key={index}>{part}</span>;
                                    })}
                                  </>
                                );
                              },
                              h1: ({ node, ...props }) => (
                                <h1 className="text-3xl font-bold mt-8 mb-4">{props.children}</h1>
                              ),
                              h2: ({ node, ...props }) => (
                                <h2 className="text-2xl font-bold mt-7 mb-3">{props.children}</h2>
                              ),
                              h3: ({ node, ...props }) => (
                                <h3 className="text-xl font-bold mt-6 mb-2">{props.children}</h3>
                              ),
                              p: ({ node, ...props }) => (
                                <p className="mb-6 text-lg leading-relaxed indent-8">{props.children}</p>
                              ),
                              ul: ({ node, ...props }) => (
                                <ul className="list-disc pl-10 mb-6 space-y-2 text-lg leading-relaxed">{props.children}</ul>
                              ),
                              ol: ({ node, ...props }) => (
                                <ol className="list-decimal pl-10 mb-6 space-y-2 text-lg leading-relaxed">{props.children}</ol>
                              ),
                              li: ({ node, ...props }) => (
                                <li className="my-2">{props.children}</li>
                              ),
                              strong: ({ node, ...props }) => (
                                <strong className="font-semibold text-white">{props.children}</strong>
                              ),
                              code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <pre className="p-4 bg-gray-800 rounded-md overflow-x-auto text-sm my-4">
                                    <code className={`language-${match[1]}`} {...props}>{children}</code>
                                  </pre>
                                ) : (
                                  <code className="bg-gray-800 text-purple-300 px-1 py-0.5 rounded text-sm">{children}</code>
                                );
                              },
                            }}
                          >
                            {answer}
                          </Markdown>
                        </div>
                      </div>
                    )}


                {activeTab === 'Images' && (
                    <div className="w-full px-4">
                        <ImagesTabView initialQuery={query} onBackToAnswer={() => setActiveTab('Research')} />
                    </div>
                )}

                {activeTab === 'Videos' && (
                   <div className="w-full px-4">
                    <VideosTabView videos={videos}  />
                  </div>
                )}

                {activeTab === 'Sources' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">All Sources</h2>
                        {sources.length > 0 ? (
                            sources.map((source, idx) => <SourceCard key={idx} id={`source-${idx}`} source={source} />)
                        ) : (
                            <p className="text-gray-500">No sources found for this research query.</p>
                        )}
                    </div>
                )}
            </div>

            {data.relatedQuestions && data.relatedQuestions.length > 0 && (
                <div className="mt-8 pt-4 border-t border-gray-800">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <LightbulbIcon className="w-5 h-5 text-yellow-400" /> Related Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.relatedQuestions.map((question, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleNewSearch(question)}
                                className="text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="sticky bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-10 p-3 flex justify-center">
                <div className="w-full max-w-8xl">
                    <BottomChatInput onSend={handleNewSearch} />
                </div>
            </div>
        </div>
    );
};
