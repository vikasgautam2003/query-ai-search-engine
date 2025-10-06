

















// src/components/NewsCarousel.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export const NewsCarousel = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) throw new Error('Failed to fetch news');
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const scrollToIndex = (index) => {
        if (carouselRef.current) {
            const childWidth = carouselRef.current.children[0]?.clientWidth || 0;
            carouselRef.current.scrollTo({
                left: index * (childWidth + 24), // 24px gap
                behavior: 'smooth',
            });
            setCurrentIndex(index);
        }
    };

    const nextSlide = () => {
        scrollToIndex((currentIndex + 1) % articles.length);
    };

    const prevSlide = () => {
        scrollToIndex((currentIndex - 1 + articles.length) % articles.length);
    };

    if (loading) return <div className="text-gray-400 p-6">Loading news...</div>;
    if (error) return <div className="text-red-500 p-6">Error: {error}</div>;

    return (
        <section className="p-6 relative">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Top Headlines</h2>

            <div className="relative">
                {/* Carousel */}
                <div
                    ref={carouselRef}
                    className="flex gap-6 overflow-x-hidden scroll-smooth snap-x snap-mandatory"
                >
                    {articles.map((article, index) => (
                        <a
                            key={index}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="snap-start flex-shrink-0 w-[300px] bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4"
                        >
                            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                <Image
                                    src={article.image || '/placeholder-image.png'}
                                    alt={article.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    {article.source?.name || "Unknown"}
                                </p>
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {article.description || "No description available."}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full shadow-lg"
                >
                    ‹
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full shadow-lg"
                >
                    ›
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {articles.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${
                                currentIndex === index ? "bg-gray-900" : "bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
