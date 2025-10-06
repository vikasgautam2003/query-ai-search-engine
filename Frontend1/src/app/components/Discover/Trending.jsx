'use client';

import React from 'react';
import Image from 'next/image';
import { trendingTopics } from '../../../lib/options';

const UpArrowIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
);

const DownArrowIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

export const TrendingTopicsWidget = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Trending Topics</h3>
            <div className="space-y-3">
                {trendingTopics.map(topic => {
                    const isPositive = topic.change >= 0;
                    const faviconUrl = `/favicons/placeholder-favicon.png`; 

                    return (
                        <div key={topic.id} className="flex items-center justify-between group cursor-pointer hover:bg-gray-700 p-2 -mx-2 rounded-md transition-colors duration-200">
                            <div className="flex items-center">
                                <Image 
                                    src={faviconUrl} 
                                    alt="" 
                                    width={16} 
                                    height={16} 
                                    className="rounded-full mr-2"
                                />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">{topic.name}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="text-gray-400 mr-2">{topic.value}</span>
                                {isPositive ? (
                                    <UpArrowIcon className="text-green-500 w-4 h-4" />
                                ) : (
                                    <DownArrowIcon className="text-red-500 w-4 h-4" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
