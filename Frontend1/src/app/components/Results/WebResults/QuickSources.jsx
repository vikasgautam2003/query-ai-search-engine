





import React, { useRef } from "react";
import Image from "next/image";

export const QuickSources = ({ sources }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mb-8 relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-4 shadow-lg"
      >
        <span className="text-2xl">&#8249;</span>
      </button>

      {/* Scrollable Sources */}
      <div
        ref={scrollRef}
        className="flex space-x-5 overflow-x-auto pb-4 scroll-smooth hide-scrollbar pl-16 pr-16"
      >
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-56 bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-700 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3 mb-2">
              {source.fevicon && (
                <Image
                  src={source.fevicon}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
              <span className="text-xs text-gray-400 truncate">
                {new URL(source.link).hostname.replace("www.", "")}
              </span>
            </div>

            <p className="text-sm text-white font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
              {source.title}
            </p>

            <span className="block mt-2 text-xs text-gray-500">
              Visit Source →
            </span>
          </a>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-4 shadow-lg"
      >
        <span className="text-2xl">&#8250;</span>
      </button>

      {/* Hide scrollbar styling */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
