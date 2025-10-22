
// import React from 'react';
// import Image from 'next/image';
// import { PlayIcon } from '../../Icons';

// export const VideosTabView = ({ videos }) => {
//     if (!videos || videos.length === 0) {
//         return <p className="text-gray-500 text-center py-10">No relevant videos found for this query.</p>;
//     }

//     return (
//         <div className="space-y-4">
//             {videos.map((video, index) => (
//                 <a 
//                     key={index} 
//                     href={video.link} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
//                 >
//                     <div className="relative flex-shrink-0 w-full sm:w-48 h-32 sm:h-28 rounded-md overflow-hidden mb-3 sm:mb-0">
//                         <Image 
//                             src={video.thumbnailUrl}
//                             alt={video.title}
//                             layout="fill"
//                             objectFit="cover"
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
//                             <PlayIcon className="w-8 h-8 text-white opacity-70 group-hover:opacity-90" />
//                         </div>
//                         {video.duration && (
//                             <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
//                                 {video.duration}
//                             </span>
//                         )}
//                     </div>
//                     <div className="flex-grow">
//                         <h3 className="text-md font-semibold text-blue-400 group-hover:underline line-clamp-2 mb-1">
//                             {video.title}
//                         </h3>
//                         <p className="text-sm text-gray-400 mb-2">{video.source}</p>
//                         <p className="text-xs text-gray-500 line-clamp-2">{video.snippet}</p> 
//                     </div>
//                 </a>
//             ))}
//         </div>
//     );
// };







'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlayIcon, SearchIcon } from '../../Icons';
import { useAuth } from '../../../../context/AuthContext';

export const VideosTabView = ({ videos: initialVideos, query: initialQuery }) => {
    const { isAuthenticated } = useAuth();
    const [currentQuery, setCurrentQuery] = useState(initialQuery || '');
    const [displayedVideos, setDisplayedVideos] = useState(initialVideos || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setDisplayedVideos(initialVideos || []);
        setCurrentQuery(initialQuery || '');
    }, [initialVideos, initialQuery]);

    const fetchVideosInternal = async (searchQuery) => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setError(null);
        setDisplayedVideos([]);

        try {
            const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (isAuthenticated && token) {
                headers['x-auth-token'] = token;
            }

            const response = await fetch('/api/videos-tab', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ query: searchQuery })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to fetch videos');
            }

            const data = await response.json();
            setDisplayedVideos(data.videos || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInternalSearch = (e) => {
        e.preventDefault();
        fetchVideosInternal(currentQuery);
    };

    return (
        <div className="space-y-4 min-h-screen">
            <form onSubmit={handleInternalSearch} className="relative mb-6">
                <input
                    type="text"
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                    placeholder="Search within videos..."
                    className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50"
                    disabled={loading || !currentQuery.trim()}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <SearchIcon className="w-5 h-5" />
                    )}
                </button>
            </form>

            {loading && <p className="text-gray-400 text-center">Loading videos...</p>}
            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            {!loading && !error && displayedVideos.length === 0 && (
                <p className="text-gray-500 text-center py-10">No relevant videos found for "{currentQuery}".</p>
            )}

            {!loading && !error && displayedVideos.length > 0 && (
                <div className="space-y-4 min-h-screen">
                    {displayedVideos.map((video, index) => (
                        <a
                            key={index}
                            href={video.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
                        >
                            <div className="relative flex-shrink-0 w-full sm:w-48 h-32 sm:h-28 rounded-md overflow-hidden mb-3 sm:mb-0">
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    layout="fill"
                                    className="w-full h-full object-cover rounded-md"
                                />
                                {/* <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                                    <PlayIcon className="w-8 h-8 text-white opacity-70 group-hover:opacity-90" />
                                </div> */}
                                {video.duration && (
                                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                                        {video.duration}
                                    </span>
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-md font-semibold text-blue-400 group-hover:underline line-clamp-2 mb-1">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-2">{video.source}</p>
                                <p className="text-xs text-gray-500 line-clamp-2">{video.snippet}</p>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};
