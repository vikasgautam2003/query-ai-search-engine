

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, SearchIcon } from '../../Icons';

export const ImagesTabView = ({ initialQuery, onBackToAnswer }) => {
  const [currentQuery, setCurrentQuery] = useState(initialQuery || '');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentQuery) {
      fetchImages(currentQuery);
    }
  }, [currentQuery]);

  const fetchImages = async (query) => {
    setLoading(true);
    setError(null);
    setImages([]);

    try {
      const response = await fetch('/api/image-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch images');
      }

      const data = await response.json();
      setImages(data.images);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.imageSearchInput.value;
    if (newQuery.trim() && newQuery !== currentQuery) {
      setCurrentQuery(newQuery);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToAnswer}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back to Answer
        </button>
        <form
          onSubmit={handleSearchSubmit}
          className="flex-grow max-w-md mx-auto relative"
        >
          <input
            type="text"
            name="imageSearchInput"
            placeholder={`Search images for "${initialQuery || ''}" or new query...`}
            defaultValue={currentQuery}
            className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </form>
        <div className="w-48"></div>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-center text-gray-400">Loading images...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && images.length === 0 && (
        <p className="text-center text-gray-400">
          No images found for "{currentQuery}".
        </p>
      )}

      {/* Google Images–style grid */}
     {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
  {images.map((image, index) => (
    <motion.a
      key={index}
      href={image.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-lg overflow-hidden group bg-gray-800 aspect-square"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <div className="relative w-full h-full">
       <img
            src={image.thumbnailUrl || image.imageUrl} // fallback in case thumbnailUrl missing
            alt={image.title || `Image from ${image.source}`}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
            loading="lazy"
            />

      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
        <p className="text-xs truncate text-white">{image.source}</p>
      </div>
    </motion.a>
  ))}
</div> */}



<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
  {images.map((image, index) => (
    <a
      key={index}
      href={image.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-lg overflow-hidden shadow-lg group transform transition-all hover:scale-105"
    >
      <img
        src={image.thumbnailUrl || image.imageUrl}
        alt={image.title || `Image from ${image.source}`}
        width={"100%"}
        height={"100%"}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <p className="absolute bottom-1 left-2 text-xs text-white font-medium truncate w-[calc(100%-1rem)]">
        {image.source}
      </p>
    </a>
  ))}
</div>




    </div>
  );
};
