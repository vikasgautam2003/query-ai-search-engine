'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const categories = ['Technology', 'Business', 'Science', 'Health'];

const NewsCard = ({ article }) => (
    <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-gray-800 rounded-lg overflow-hidden group"
    >
        <div className="relative w-full h-40">
            <Image 
                src={article.image || '/placeholder-image.png'}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform"
                unoptimized
            />
        </div>
        <div className="p-4">
            <h3 className="text-md font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                {article.title}
            </h3>
            <p className="text-sm text-gray-400 mt-2">{article.source.name}</p>
        </div>
    </a>
);

export const CategorizedNews = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch news for the currently active category
                const response = await fetch(`/api/news?category=${activeCategory.toLowerCase()}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${activeCategory} news`);
                }
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [activeCategory]); // Re-run this effect whenever the activeCategory changes

    return (
        <section>
            <div className="flex space-x-4 border-b border-gray-700 mb-6">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`py-2 text-lg transition-colors ${
                            activeCategory === category
                                ? 'border-b-2 border-white font-semibold text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-lg p-4 h-60 animate-pulse"></div>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500">Error: {error}</p>}
            
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
            )}
        </section>
    );
};