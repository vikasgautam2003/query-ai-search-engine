


'use client';

import React, { useEffect, useState } from 'react';


const messages = [
  "Thinking...",
  "Analyzing...",
  "Processing data...",
  "Generating insights...",
  "Finalizing..."
];

export const LoadingOverlay = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <div className="loader"></div>
        <p
          className="loading-message"
          data-text={messages[currentMessageIndex]}
        >
          {messages[currentMessageIndex]}
        </p>
      </div>
    </div>
  );
};
