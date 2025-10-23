


'use client';

import React, { useState, useCallback } from 'react';
import { AnswerTabView } from './WebResults/MainWebResults';
import { ImagesTabView } from './ImageTab/ImagesTabView';
import { VideosTabView } from './VideosTab/VideosTabView';
import { SourcesTabView } from './SourcesTab/SourcesTabView';
import { StepsTabView } from './StepsTab/StepsTabView';
import { BottomChatInput } from './BottomChatInput';


export const ResultsView = ({ query, data, onReset, onNewSearch }) => {
  const [activeTab, setActiveTab] = useState('Answer');
  const { answer, sources, images, relatedQuestions, videos} = data;

  const TabButton = ({ label }) => {
    const isActive = activeTab === label;
    return (
      <button
        onClick={() => setActiveTab(label)}
        className={`relative px-4 py-2 text-lg font-medium transition-colors duration-200 ${
          isActive
            ? 'text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        {label}
      </button>
    );
  };

  const handleNewSearch = (newQuery) => {
    onNewSearch(newQuery);
  };



    const handleBackToAnswer = useCallback(() => {
        setActiveTab('Answer');
    }, []);



  return (
    <div className="w-full max-w-8xl mx-auto md:p-5 bg-gray-900 rounded-xl shadow-2xl text-white relative  pr-5 pl-5">

      <h1
        className="text-xl md:text-3xl font-extrabold mb-8 text-center bg-clip-text text-white pt-10"
        style={{
          fontFamily: "'Inter', sans-serif"
        }}
      >
        Search Results for "{query}"
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-10 border-b border-gray-700 mb-8">
        <TabButton label="Answer" />
        <TabButton label="Images" />
        <TabButton label="Videos" />
        <TabButton label="Sources" />
        <TabButton label="Steps" />
      </div>

     
      <div className="mt-6 space-y-8">
        {activeTab === 'Answer' && (
          <div className="prose prose-invert max-w-none">
            <AnswerTabView
              answer={answer}
              sources={sources}
              images={images}
              relatedQuestions={relatedQuestions}
              onNewSearch={handleNewSearch}
              query={query}
            />
          </div>
        )}

        {activeTab === 'Images' && (
          <div className="w-full px-4">
    <ImagesTabView initialQuery={query} onBackToAnswer={() => setActiveTab('Answer')} />
  </div>

        )}


        {activeTab === 'Videos' && (
          <div className="w-full px-4">
            <VideosTabView videos={videos} />
          </div>

        )}

        {activeTab === 'Sources' && (
          <div className="space-y-4">
             <SourcesTabView 
                        initialQuery={query}
                        onBackToAnswer={handleBackToAnswer}
                    />
          </div>
        )}

        {activeTab === 'Steps' && (
          <div className="space-y-4">
            <StepsTabView />
          </div>
        )}
      </div>

       {activeTab === 'Steps' && <StepsTabView query={query} sources={sources} />}


       


      
       <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 z-10 ">
        <BottomChatInput onSend={handleNewSearch} />
      </div>
    </div>
  );
};


