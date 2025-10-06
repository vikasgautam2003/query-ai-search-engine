




'use client';

import React from 'react';
import Image from 'next/image';

export default function DashboardPage() {
    const tools = [
        { id: 1, title: "Topic Explainer", description: "Paste a complex topic and get a simple, clear explanation powered by advanced AI.", href: "https://xplain-your-topic-explainer.onrender.com/", active: true, img: "/X.png" },
        { id: 2, title: "News Providence", description: "Provide a topic and get recent curated news with clarity and precision.", href: "https://nexora-your-news-reporter.onrender.com/", active: true, img: "/Nex.png" },
        { id: 3, title: "Code Debugger", description: "Paste a block of code and discover its errors with detailed fixes.", href: "#", active: false, img: "/soon.png" },
        { id: 4, title: "Creative Writer", description: "Give the AI a prompt, a style, and a tone, and get creative results instantly.", href: "#", active: false, img: "/soon.png" }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-12 text-white">
            <div className="absolute inset-0 qai-bg-slow"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90"></div>

            <div className="relative z-10 max-w-7xl w-full">
                <h1 className="text-6xl md:text-7xl font-extrabold text-center qai-anim-text mb-20 drop-shadow-lg tracking-wide">
                    AI ⚡ Arsenal
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {tools.map((tool) => (
                        <div
                            key={tool.id}
                            className={`group relative transform hover:scale-[1.02] transition-all duration-500 ${tool.active ? 'qai-card-glow' : 'opacity-70'}`}
                        >
                            <div className="relative w-full h-72 md:h-96 overflow-hidden qai-rounded-4xl shadow-xl">
                                <Image
                                    src={tool.img}
                                    alt={tool.title}
                                    fill
                                    className={`object-cover transition-all duration-700 group-hover:scale-105 ${tool.active ? '' : 'grayscale'}`}
                                />
                                {!tool.active && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                        <span className="text-2xl font-bold text-white tracking-wider">
                                            Coming Soon
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="relative mt-6 p-8 bg-white/5 backdrop-blur-xl qai-rounded-3xl border border-white/10 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">{tool.title}</h2>
                                <p className="text-gray-300 text-lg leading-relaxed">{tool.description}</p>

                                {tool.active && (
                                    <a
                                        href={tool.href}
                                        className="mt-8 inline-block px-8 py-3 text-lg font-semibold tracking-wide qai-rounded-3xl bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-700 hover:to-pink-600 transition-all duration-500 shadow-xl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Explore →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
