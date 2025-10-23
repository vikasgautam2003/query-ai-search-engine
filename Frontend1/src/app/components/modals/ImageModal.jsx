

// 'use client';
// import React, { useEffect } from 'react';
// import Image from 'next/image';

// const CloseIcon = (props) => (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//         <line x1="18" y1="6" x2="6" y2="18"></line>
//         <line x1="6" y1="6" x2="18" y2="18"></line>
//     </svg>
// );

// const ChevronLeftIcon = (props) => (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="m15 18-6-6 6-6"></path>
//     </svg>
// );

// const ChevronRightIcon = (props) => (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//         <path d="m9 18 6-6-6-6"></path>
//     </svg>
// );

// const ExternalLinkIcon = (props) => (
//      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
//         <path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//     </svg>
// );

// export const ImageModal = ({ images, selectedIndex, onClose, onSelectImage }) => {
//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === 'Escape') onClose();
//             if (event.key === 'ArrowLeft' && selectedIndex > 0) onSelectImage(selectedIndex - 1);
//             if (event.key === 'ArrowRight' && selectedIndex < images.length - 1) onSelectImage(selectedIndex + 1);
//         };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [onClose, selectedIndex, images.length, onSelectImage]);

//     if (selectedIndex === null || selectedIndex < 0 || selectedIndex >= images.length) return null;

//     const selectedImage = images[selectedIndex];
//     const canGoPrev = selectedIndex > 0;
//     const canGoNext = selectedIndex < images.length - 1;

//     const prevImage = (e) => { e.stopPropagation(); if (canGoPrev) onSelectImage(selectedIndex - 1); };
//     const nextImage = (e) => { e.stopPropagation(); if (canGoNext) onSelectImage(selectedIndex + 1); };

//     return (
//         <div
//             className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[110] p-4 backdrop-blur-sm"
//             onClick={onClose}
//         >
//             <div
//                 className="relative flex w-full max-w-8xl h-[90vh] bg-gray-950 rounded-lg shadow-2xl overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <div className="relative flex-grow h-full bg-black flex items-center justify-center overflow-hidden">
//                     <Image
//                         key={selectedIndex}
//                         src={selectedImage.imageUrl}
//                         alt={selectedImage.title || `Image ${selectedIndex + 1}`}
//                         layout="fill"
//                         objectFit="contain"
//                         className="animate-[fadeIn_0.3s_ease-out]"
//                         unoptimized
//                         priority
//                     />
//                     <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 text-white p-3 rounded-lg max-w-xs shadow">
//                          {selectedImage.title && <h2 className="text-sm font-semibold mb-1 truncate">{selectedImage.title}</h2>}
//                          {selectedImage.source && (
//                              <a
//                                  href={selectedImage.link || '#'}
//                                  target="_blank"
//                                  rel="noopener noreferrer"
//                                  className="text-xs text-blue-300 hover:underline truncate block"
//                              >
//                                  Source: {selectedImage.source} <ExternalLinkIcon />
//                              </a>
//                          )}
//                     </div>
//                 </div>

//                 <div className="w-64 md:w-80 flex-shrink-0 h-full bg-gray-900 border-l border-gray-700 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//                     <div className="grid grid-cols-3 gap-3">
//                         {images.map((img, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => onSelectImage(index)}
//                                 className={`relative w-full aspect-square rounded-md overflow-hidden focus:outline-none transition transform duration-200 ease-in-out border-2 ${
//                                     selectedIndex === index ? 'border-blue-500 scale-105 shadow-lg' : 'border-transparent hover:border-gray-500'
//                                 }`}
//                             >
//                                 <Image
//                                     src={img.thumbnailUrl || img.imageUrl}
//                                     alt={img.title || `Thumbnail ${index + 1}`}
//                                     layout="fill"
//                                     objectFit="cover"
//                                 />
//                                 {selectedIndex === index && <div className="absolute inset-0 bg-black bg-opacity-40"></div>}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {canGoPrev && (
//                      <button
//                         onClick={prevImage}
//                         className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-60 p-3 rounded-full hover:bg-opacity-90 transition text-white"
//                         aria-label="Previous image"
//                     >
//                         <ChevronLeftIcon className="w-6 h-6" />
//                     </button>
//                 )}
//                 {canGoNext && (
//                     <button
//                         onClick={nextImage}
//                         className="absolute right-[calc(20rem+1rem)] top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-60 p-3 rounded-full hover:bg-opacity-90 transition text-white"
//                         aria-label="Next image"
//                    >
//                         <ChevronRightIcon className="w-6 h-6" />
//                     </button>
//                 )}

//                  <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 z-20 bg-gray-800 bg-opacity-60 p-2 rounded-full hover:bg-opacity-90 transition text-white"
//                     aria-label="Close image viewer"
//                  >
//                     <CloseIcon className="w-6 h-6" />
//                 </button>

//             </div>
//         </div>
//     );
// };












'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

const CloseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ExternalLinkIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1 opacity-70 group-hover:opacity-100">
    <path d="M15 3h6v6"></path>
    <path d="M10 14 21 3"></path>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  </svg>
);

export const ImageModal = ({ images, selectedIndex, onClose, onSelectImage }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (selectedIndex === null || selectedIndex < 0 || selectedIndex >= images.length) return null;

  const selectedImage = images[selectedIndex];
  const sidebarWidthClass = 'w-72 lg:w-[28rem]';

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[110] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[95vw] h-[93vh] bg-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
      
        <div className="relative flex-grow h-full bg-black flex items-center justify-center p-4 z-10">
          <Image
            key={selectedIndex}
            src={selectedImage.imageUrl}
            alt={selectedImage.title || `Image ${selectedIndex + 1}`}
            layout="fill"
            objectFit="contain"
            className="rounded-xl animate-[fadeIn_0.3s_ease-out]"
            unoptimized
            priority
          />
        
          <div className="absolute top-4 left-4 z-20 bg-black/60 text-white p-3 rounded-xl max-w-[60%] shadow-lg">
            {selectedImage.title && <h2 className="text-base font-semibold mb-1 truncate">{selectedImage.title}</h2>}
            {selectedImage.source && (
              <a
                href={selectedImage.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-300 hover:underline truncate block group"
              >
                Source: {selectedImage.source} <ExternalLinkIcon />
              </a>
            )}
          </div>
      
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 bg-gray-700/60 hover:bg-gray-600/80 p-2 rounded-full transition text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close image viewer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>


        <div className={`${sidebarWidthClass} flex-shrink-0 h-full bg-gray-900 border-l border-gray-700 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 z-20`}>
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onSelectImage(index)}
                className={`relative w-full aspect-square rounded-lg overflow-hidden focus:outline-none transition-all transform duration-200 ease-in-out border-2 ${
                  selectedIndex === index ? 'border-blue-500 scale-105 shadow-lg z-30' : 'border-transparent hover:border-gray-600 opacity-70 hover:opacity-100'
                }`}
                aria-label={`Select image ${index + 1}`}
              >
                <Image
                  src={img.thumbnailUrl || img.imageUrl}
                  alt={img.title || `Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {selectedIndex === index && <div className="absolute inset-0 ring-2 ring-inset ring-blue-500/50 rounded-lg"></div>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
