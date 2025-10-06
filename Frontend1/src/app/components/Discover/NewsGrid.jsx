
// src/components/NewsGrid.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookmarkIcon, ShareIcon, DotsHorizontalIcon } from '../Icons';

const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
};

const NewsGridItem = ({ article }) => {
    const hasImage = article.image && article.image !== 'None';

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
        >
            {hasImage && (
                <div className="relative w-full h-40">
                    <Image
                        src={article.image}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                    />
                </div>
            )}
            <div className="p-4">
                <p className="text-sm text-gray-400 mb-1">Published {timeAgo(article.publishedAt)}</p>
                <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {article.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                    {article.description}
                </p>
                <div className="flex items-center text-gray-400 text-xs mt-4">
                    <span className="mr-3 flex items-center">
                        <Image
                            src={`https://www.google.com/s2/favicons?domain=${new URL(article.url).hostname}&sz=16`}
                            alt="Source Favicon"
                            width={16}
                            height={16}
                            className="mr-1 rounded-full"
                        />
                        {article.source.name}
                    </span>
                    <span className="mr-3">· 1 source</span>
                    <div className="flex space-x-2 ml-auto">
                        <BookmarkIcon className="w-4 h-4 hover:text-white cursor-pointer" />
                        <ShareIcon className="w-4 h-4 hover:text-white cursor-pointer" />
                        <DotsHorizontalIcon className="w-4 h-4 hover:text-white cursor-pointer" />
                    </div>
                </div>
            </div>
        </a>
    );
};

export const NewsGrid = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                const data = await response.json();
                if (data && data.length > 1) {
                    setArticles(data.slice(1, 5));
                } else {
                    setArticles([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-4 h-60 flex items-center justify-center animate-pulse">
                        <p className="text-gray-400">Loading...</p>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (articles.length === 0) {
        return <div className="text-gray-400">No additional news articles found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article, index) => (
                <NewsGridItem key={index} article={article} />
            ))}
        </div>
    );
};
