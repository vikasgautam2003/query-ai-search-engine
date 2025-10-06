// src/components/FeaturedNewsCard.jsx
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

export const FeaturedNewsCard = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) throw new Error('Failed to fetch news');
                const data = await response.json();
                setArticle(data && data.length > 0 ? data[0] : null);
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
            <div className="bg-gray-800 rounded-lg p-6 h-[400px] flex items-center justify-center animate-pulse">
                <p className="text-gray-400">Loading featured news...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-800 rounded-lg p-6 h-[400px] flex items-center justify-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="bg-gray-800 rounded-lg p-6 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">No featured article found.</p>
            </div>
        );
    }

    const hasImage = article.image && article.image !== 'None';

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className={`p-6 ${hasImage ? '' : 'md:col-span-2'}`}>
                    <p className="text-sm text-gray-400 mb-2">Published {timeAgo(article.publishedAt)}</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors duration-300 line-clamp-3">
                        {article.title}
                    </h2>
                    <p className="text-base text-gray-300 mb-4 line-clamp-3">
                        {article.description}
                    </p>
                    <div className="flex items-center text-gray-400 text-sm mt-4">
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
                        <div className="flex space-x-3 ml-auto">
                            <BookmarkIcon className="w-5 h-5 hover:text-white cursor-pointer" />
                            <ShareIcon className="w-5 h-5 hover:text-white cursor-pointer" />
                            <DotsHorizontalIcon className="w-5 h-5 hover:text-white cursor-pointer" />
                        </div>
                    </div>
                </div>
                {hasImage && (
                    <div className="relative h-64 md:h-auto">
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
            </div>
        </a>
    );
};
