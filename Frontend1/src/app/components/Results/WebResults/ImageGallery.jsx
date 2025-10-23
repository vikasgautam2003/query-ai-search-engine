


// 'use client';

// import React, { useRef } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";


// export const ImageGallery = ({ images }) => {
//   const galleryRef = useRef();

//   if (!images || images.length === 0) return null;

//   const scroll = (direction) => {
//     if (galleryRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative mb-10">
//       {/* Left Arrow */}
//       <button
//         onClick={() => scroll("left")}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
//       >
//         <ChevronLeftIcon className="h-6 w-6 text-white" />
//       </button>

//       {/* Right Arrow */}
//       <button
//         onClick={() => scroll("right")}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
//       >
//         <ChevronRightIcon className="h-6 w-6 text-white" />
//       </button>

//       {/* Image List */}
//       <div
//         ref={galleryRef}
//         className="flex space-x-5 overflow-x-hidden pb-4"
//       >
//         {images.map((image, index) => (
//           <a
//             key={index}
//             href={image.imageUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-shrink-0 w-64 h-40 relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 group"
//           >
//             <img
//               src={image.imageUrl}
//               alt={`Image from ${image.source}`}
//               className="w-full h-full object-cover rounded-xl bg-gray-800"
//               loading="lazy"
//             />

//             {/* Subtle hover overlay */}
//             <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-10 transition-all"></div>

//             <p className="absolute bottom-2 left-3 text-sm text-white font-medium truncate bg-black bg-opacity-50 px-2 py-1 rounded">
//               {image.source}
//             </p>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };





'use client';
import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ImageModal } from "../../modals/ImageModal"; 

export const ImageGallery = ({ images }) => {
  const galleryRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const scroll = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-10">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>

      <div
        ref={galleryRef}
        className="flex space-x-5 overflow-x-hidden pb-4"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-40 relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer group"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image.imageUrl}
              alt={`Image from ${image.source}`}
              className="w-full h-full object-cover rounded-xl bg-gray-800"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-10 transition-all"></div>
            <p className="absolute bottom-2 left-3 text-sm text-white font-medium truncate bg-black bg-opacity-50 px-2 py-1 rounded">
              {image.source}
            </p>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <ImageModal
          images={images}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onSelectImage={setSelectedIndex} // Optional: can navigate thumbnails inside modal
        />
      )}
    </div>
  );
};
