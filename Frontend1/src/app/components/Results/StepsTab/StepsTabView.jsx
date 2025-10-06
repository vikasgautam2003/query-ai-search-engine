



// src/components/Tabs/StepsTabView.jsx
import React from 'react';
import Image from 'next/image';
import { SearchIcon } from '../../Icons'; // Assuming '../../Icons' is the correct path

const CheckCircleIcon = (props) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export const StepsTabView = ({ query, sources }) => {
  if (!query) {
    return <p className="text-gray-400">Search steps are not available.</p>;
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-[600px]">
      <div className="relative pl-8 md:pl-10"> {/* Adjusted padding-left for main timeline container */}
        {/* Vertical Timeline Line */}
        <div className="absolute left-3 md:left-5 top-3 bottom-3 w-0.5 bg-gray-700"></div> {/* Adjusted left for line */}

        <div className="space-y-10">
          {/* Step 1: Searching the web */}
          <div className="relative">
            {/* Timeline bullet point */}
            <div className="absolute -left-[20px] md:-left-[22px] top-1 w-6 h-6 bg-gray-700 rounded-full border-4 border-gray-900 flex items-center justify-center"></div> {/* Adjusted left to align with line */}
            
            <h3 className="text-lg font-semibold text-gray-300">
              Searching the web
            </h3>
            <div className="mt-2 ml-2 p-3 bg-gray-800 rounded-lg inline-flex items-center gap-3">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">{query}</span>
            </div>
          </div>

          {/* Step 2: Reviewing sources */}
          <div className="relative">
            {/* Timeline bullet point */}
            <div className="absolute -left-[20px] md:-left-[22px] top-1 w-6 h-6 bg-gray-700 rounded-full border-4 border-gray-900 flex items-center justify-center"></div> {/* Adjusted left to align with line */}
            
            <h3 className="text-lg font-semibold text-gray-300">
              Reviewing sources · {sources ? sources.length : 0}
            </h3>
            <div className="mt-2 ml-2 p-3 bg-gray-800 rounded-lg space-y-2 min-h-[120px]">
              {sources && sources.length > 0 ? (
                sources.map((source, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {source.favicon && (
                        <Image
                          src={source.favicon}
                          alt=""
                          width={16}
                          height={16}
                          className="rounded-full flex-shrink-0" // Added flex-shrink-0
                        />
                      )}
                      <span className="text-gray-300 truncate">
                        {source.title}
                      </span>
                    </div>
                    <span className="text-gray-500 flex-shrink-0">
                      {new URL(source.link).hostname.replace('www.', '')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Loading sources...</p>
              )}
            </div>
          </div>

          {/* Step 3: Finished */}
          <div className="relative">
            {/* Timeline bullet point with checkmark */}
            <div className="absolute -left-[20px] md:-left-[22px] top-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center"> {/* Adjusted left to align with line */}
              <CheckCircleIcon
                className="w-6 h-6 text-gray-900"
                style={{ stroke: '#1F2937', strokeWidth: 1 }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-300 pt-1">
              Finished
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};