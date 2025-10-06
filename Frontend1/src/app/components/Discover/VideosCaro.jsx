










'use client';

import React, { useState, useEffect } from 'react';

const PlayIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.4)"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
);

const dummyThumbnail = "https://images.unsplash.com/photo-1581091870625-4f8a5a5d1c7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60";

function getYouTubeThumbnail(url) {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    if (match) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return null;
}

export const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                console.log("[DEBUG] Fetching videos from /api/videos...");
                const response = await fetch('/api/videos');

                console.log("[DEBUG] /api/videos status:", response.status);
                if (!response.ok) throw new Error('Failed to fetch videos');

                const data = await response.json();
                console.log("[DEBUG] Fetched videos:", data);

                const videosWithThumbnails = data.map(video => {
                    const thumb = getYouTubeThumbnail(video.link) || dummyThumbnail;
                    console.log(`[DEBUG] Video: ${video.title}, Thumbnail: ${thumb}`);
                    return {
                        ...video,
                        thumbnailUrl: thumb
                    };
                });

                setVideos(videosWithThumbnails);
            } catch (err) {
                console.error("[DEBUG] Error fetching videos:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
                console.log("[DEBUG] Finished fetching videos");
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        console.log("[DEBUG] Loading videos...");
        return <div className="bg-gray-800 rounded-lg p-4 h-64 animate-pulse">Loading...</div>;
    }

    if (error) {
        console.error("[DEBUG] Error state:", error);
        return <div className="bg-red-600 p-4 rounded text-white">Error: {error}</div>;
    }

    if (videos.length === 0) {
        console.warn("[DEBUG] No videos available");
        return <div className="bg-gray-800 p-4 rounded text-white">No videos found.</div>;
    }

    return (
        <section>
            <h3 className="text-lg font-bold mb-4 text-white">Trending Videos</h3>
            <div className="space-y-3">
                {videos.map((video, index) => (
                    <a
                        key={index}
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 bg-gray-800 rounded-lg p-2 group"
                    >
                      <div className="relative flex-shrink-0 w-28 h-20 rounded-md overflow-hidden bg-gray-700 flex justify-center items-center">
    <img 
        src={video.thumbnailUrl}
        alt={video.title}
        style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1 // ensure image is on top
        }}
    />
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <PlayIcon className="w-8 h-8 opacity-80" />
    </div>
</div>

                        <div className="flex-grow">
                            <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                                {video.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">{video.source}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
