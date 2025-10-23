
// 'use client';
// import React, { useEffect, useState } from 'react';

// const CloseIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// export const VideoPlayerModal = ({ videoUrl, onClose }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onClose]);

//   if (!videoUrl) return null;

//   let embedUrl = null;
//   try {
//     const url = new URL(videoUrl);
//     const host = url.hostname.toLowerCase();
//     if (host.includes('youtube.com') || host.includes('youtu.be')) {
//       let videoId = url.searchParams.get('v');
//       if (!videoId && host.includes('youtu.be')) {
//         videoId = url.pathname.slice(1);
//       }
//       if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
//     }
//   } catch (e) {
//     // fallthrough to fallback UI below
//   }

//   if (!embedUrl) {
//     return (
//       <div
//         className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[110] p-4"
//         onClick={onClose}
//       >
//         <div
//           className="bg-gray-800 p-6 rounded-lg text-white max-w-2xl w-full text-center"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <p className="mb-4">Could not load video player for this source.</p>
//           <a
//             href={videoUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-400 underline mb-4 inline-block"
//           >
//             Open video externally
//           </a>
//           <div className="flex justify-center">
//             <button onClick={onClose} className="mt-2 px-4 py-2 bg-blue-600 rounded">
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[110] p-4"
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         // note: these classes preserve your look but increase size and add animation & depth
//         className={
//           'relative bg-black rounded-lg shadow-2xl w-full max-w-7xl ' +
//           'sm:h-[60vh] md:h-[75vh] lg:h-[80vh] overflow-hidden transform transition-all duration-280 ' +
//           (mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0')
//         }
//         style={{ willChange: 'transform, opacity' }}
//       >
//         <button
//           onClick={onClose}
//           aria-label="Close video player"
//           className="absolute top-3 right-3 z-20 rounded-full p-2 bg-black bg-opacity-50 hover:bg-opacity-75 transition shadow-md"
//         >
//           <CloseIcon className="w-6 h-6 text-white" />
//         </button>

//         <iframe
//           src={embedUrl}
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//           className="absolute inset-0 w-full h-full"
//         />
//       </div>
//     </div>
//   );
// };












// 'use client';
// import React, { useEffect, useState } from 'react';

// const CloseIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// export const VideoPlayerModal = ({ videoUrl, onClose }) => {
//   const [videoData, setVideoData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getVideoId = (url) => {
//     try {
//       const parsed = new URL(url);
//       if (parsed.hostname.includes('youtube.com')) return parsed.searchParams.get('v');
//       if (parsed.hostname === 'youtu.be') return parsed.pathname.substring(1);
//     } catch {
//       console.error('Invalid URL:', url);
//       return null;
//     }
//   };

//   const videoId = getVideoId(videoUrl);

//   useEffect(() => {
//     if (!videoId) return;

//     const fetchVideoDetails = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(`/api/video-details?videoId=${videoId}`);
//         if (!res.ok) throw new Error('Failed to fetch video details');
//         const data = await res.json();
//         console.log('Fetched video data:', data);
//         setVideoData(data);
//       } catch (err) {
//         console.error(err);
//         setError('Could not load video details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideoDetails();
//   }, [videoId]);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [onClose]);

//   if (!videoUrl || !videoId) return null;

//   const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

//   const safeString = (val) => {
//     if (!val) return '';
//     if (typeof val === 'string') return val;
//     if (typeof val === 'object' && val.content) return val.content;
//     return '';
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[110] p-4"
//       onClick={onClose}
//     >
//       <div
//         className="relative bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-white bg-black bg-opacity-50 rounded-full p-1.5 hover:bg-opacity-80 transition z-10"
//           aria-label="Close video player"
//         >
//           <CloseIcon className="w-6 h-6" />
//         </button>

//         <div className="relative aspect-video bg-black">
//           <iframe
//             width="100%"
//             height="100%"
//             src={embedUrl}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="absolute top-0 left-0 w-full h-full rounded-t-xl"
//           ></iframe>
//         </div>

//         <div className="p-5 text-gray-100">
//           {loading && <p className="text-gray-400">Loading video details...</p>}
//           {error && <p className="text-red-500">{error}</p>}

//           {!loading && videoData && (
//             <>
//               <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
//                 {safeString(videoData.title)}
//               </h2>

//               {videoData.channel && (
//                 <div className="flex items-center space-x-3 mb-3">
//                   {videoData.channel.thumbnail && (
//                     <img
//                       src={videoData.channel.thumbnail}
//                       alt={safeString(videoData.channel.name)}
//                       className="w-10 h-10 rounded-full"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold">{safeString(videoData.channel.name)}</p>
//                     {videoData.published_date && (
//                       <p className="text-gray-400 text-sm">
//                         {safeString(videoData.published_date)}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {videoData.views && (
//                 <p className="text-gray-400 text-sm mb-3">{safeString(videoData.views)}</p>
//               )}

//               {videoData.description && (
//                 <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line border-t border-gray-700 pt-3">
//                   {safeString(videoData.description).slice(0, 500)}
//                   {safeString(videoData.description).length > 500 ? '...' : ''}
//                 </p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };




'use client';
import React, { useEffect, useState } from 'react';

const CloseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const VideoPlayerModal = ({ videoUrl, onClose }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVideoId = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtube.com')) return parsed.searchParams.get('v');
      if (parsed.hostname === 'youtu.be') return parsed.pathname.substring(1);
    } catch {
      console.error('Invalid URL:', url);
      return null;
    }
  };

  const videoId = getVideoId(videoUrl);

  useEffect(() => {
    if (!videoId) return;
    const fetchVideoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/video-details?videoId=${videoId}`);
        if (!res.ok) throw new Error('Failed to fetch video details');
        const data = await res.json();
        console.log('Fetched video data:', data);
        setVideoData(data);
      } catch (err) {
        console.error(err);
        setError('Could not load video details');
      } finally {
        setLoading(false);
      }
    };
    fetchVideoDetails();
  }, [videoId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!videoUrl || !videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const safeString = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val.content) return val.content;
    return '';
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[110] p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-8xl h-[92vh] overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition z-10"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        {/* Video */}
        <div className="flex-[2] relative bg-black">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>

        {/* Info Panel */}
        <div className="flex-[1] p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800">
          {loading && <p className="text-gray-400">Loading video details...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && videoData && (
            <>
              <h2 className="text-2xl font-bold text-gradient-to-r from-blue-400 to-purple-500 mb-4">
                {safeString(videoData.title)}
              </h2>

              {videoData.channel && (
                <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-800 rounded-xl shadow-inner">
                  {videoData.channel.thumbnail && (
                    <img
                      src={videoData.channel.thumbnail}
                      alt={safeString(videoData.channel.name)}
                      className="w-12 h-12 rounded-full border-2 border-blue-500"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-white">{safeString(videoData.channel.name)}</p>
                    {videoData.published_date && (
                      <p className="text-gray-400 text-sm">{safeString(videoData.published_date)}</p>
                    )}
                  </div>
                </div>
              )}

              {videoData.views && (
                <p className="text-gray-300 text-sm mb-4">
                  Views: <span className="font-medium text-blue-400">{safeString(videoData.views)}</span>
                </p>
              )}

              {videoData.description && (
                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line border-t border-gray-700 pt-3">
                  {safeString(videoData.description)}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
