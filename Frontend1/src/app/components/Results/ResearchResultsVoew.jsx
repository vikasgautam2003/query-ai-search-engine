// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { ResearchIcon, ListOrderedIcon, ImageIcon, BookIcon, ExternalLinkIcon, LightbulbIcon } from '../Icons';
// import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// export const ResearchResultsView = ({ query, data, onReset, onNewSearch }) => {
//     const [activeTab, setActiveTab] = useState('Research');

//     const { answer, sources, images, relatedQuestions } = data;

//     const renderAnswerWithCitations = (text, allSources) => {
//         return text.split(/(\[\d+\])/g).map((part, index) => {
//             const match = part.match(/^\[(\d+)\]$/);
//             if (match) {
//                 const sourceIndex = parseInt(match[1], 10) - 1;
//                 if (allSources && allSources[sourceIndex]) {
//                     return (
//                         <a
//                             key={index}
//                             href={`#source-${sourceIndex}`}
//                             className="text-blue-400 hover:underline px-0.5"
//                             title={allSources[sourceIndex].title}
//                         >
//                             {part}
//                         </a>
//                     );
//                 }
//             }
//             return part;
//         });
//     };

//     return (
//         <div className="w-full max-w-5xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-lg shadow-xl my-8 relative">
//             <button
//                 onClick={onReset}
//                 className="absolute top-6 right-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
//             >
//                 &larr; New Research
//             </button>

//             <h1 className="text-4xl font-extrabold text-white mb-6 pr-32">
//                 {query}
//             </h1>

//             <div className="flex border-b border-gray-700 mb-6">
//                 <TabButton icon={<ResearchIcon className="w-5 h-5" />} label="Research" isActive={activeTab === 'Research'} onClick={() => setActiveTab('Research')} />
//                 <TabButton icon={<ImageIcon className="w-5 h-5" />} label="Images" isActive={activeTab === 'Images'} onClick={() => setActiveTab('Images')} />
//                 <TabButton icon={<BookIcon className="w-5 h-5" />} label="Sources" isActive={activeTab === 'Sources'} onClick={() => setActiveTab('Sources')} count={sources.length} />
//             </div>

//             <div className="min-h-[400px]">
//                 {activeTab === 'Research' && (
//                     <div className="mb-8">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                             {sources.slice(0, 4).map((source, index) => (
//                                 <SourceCard key={index} id={`source-${index}`} source={source} />
//                             ))}
//                         </div>

//                         <div className="prose prose-invert max-w-none text-gray-200">
//                             <Markdown remarkPlugins={[remarkGfm]}>
//                                 {answer}
//                             </Markdown>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'Images' && (
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {images.length > 0 ? (
//                             images.map((img, index) => (
//                                 <a key={index} href={img.imageUrl} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden group">
//                                     <Image
//                                         src={img.thumbnailUrl || img.imageUrl}
//                                         alt={`Result image ${index + 1}`}
//                                         width={200}
//                                         height={150}
//                                         className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
//                                     />
//                                     {img.source && <p className="text-xs text-gray-500 mt-1">{img.source}</p>}
//                                 </a>
//                             ))
//                         ) : (
//                             <p className="text-gray-500 col-span-full">No relevant images found for this research query.</p>
//                         )}
//                     </div>
//                 )}

//                 {activeTab === 'Sources' && (
//                     <div className="space-y-4">
//                         {sources.length > 0 ? (
//                             sources.map((source, index) => (
//                                 <SourceCard key={index} id={`source-${index}`} source={source} isFullWidth />
//                             ))
//                         ) : (
//                             <p className="text-gray-500">No external sources were found for this research query.</p>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {relatedQuestions && relatedQuestions.length > 0 && (
//                 <div className="mt-10 pt-6 border-t border-gray-800">
//                     <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//                         <LightbulbIcon className="w-6 h-6 text-yellow-400" /> Related Questions
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         {relatedQuestions.map((question, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => onNewSearch(question, 'Research')}
//                                 className="text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 transition-colors"
//                             >
//                                 {question}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// const TabButton = ({ icon, label, isActive, onClick, count }) => (
//     <button
//         className={`flex items-center gap-2 px-5 py-3 text-base font-medium transition-colors border-b-2
//             ${isActive ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-600'}
//         `}
//         onClick={onClick}
//     >
//         {icon}
//         {label}
//         {count !== undefined && <span className="ml-1 text-xs px-2 py-0.5 bg-gray-700 rounded-full">{count}</span>}
//     </button>
// );

// const SourceCard = ({ source, id, isFullWidth = false }) => (
//     <a 
//         id={id} 
//         href={source.link} 
//         target="_blank" 
//         rel="noopener noreferrer" 
//         className={`block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors group relative ${isFullWidth ? 'col-span-full' : ''}`}
//     >
//         <h3 className="text-lg font-semibold text-blue-400 group-hover:underline mb-1">
//             {source.title}
//         </h3>
//         <p className="text-gray-400 text-sm line-clamp-2 mb-2">{source.snippet}</p>
//         <div className="flex items-center text-gray-500 text-xs">
//             {source.favicon && (
//                 <Image src={source.favicon} alt="Favicon" width={16} height={16} className="mr-2 rounded" />
//             )}
//             <span className="truncate">{new URL(source.link).hostname}</span>
//             <ExternalLinkIcon className="w-3 h-3 ml-2 text-gray-500 group-hover:text-blue-400" />
//         </div>
//     </a>
// );





























// // src/components/ResearchResultsView.jsx
// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// // Ensure this path to Icons is correct in your project structure
// import { ResearchIcon, ImageIcon, BookIcon, ExternalLinkIcon, LightbulbIcon } from '../Icons'; 
// import { BottomChatInput } from './BottomChatInput'; // Ensure this path is correct

// // NEW: A dedicated component for the inline citation tags
// const Citation = ({ number, source }) => {
//     // Fallback if source is not found (should ideally not happen if backend provides it)
//     if (!source || !source.link) return <span className="text-gray-400 text-xs px-1">[{number}]</span>; 
    
//     try {
//         const hostname = new URL(source.link).hostname.replace('www.', '');
//         return (
//             <a 
//                 href={source.link} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded-md mx-1 hover:bg-gray-600 hover:text-white transition-colors whitespace-nowrap"
//                 title={source.title} // Tooltip on hover
//             >
//                 {hostname}
//             </a>
//         );
//     } catch (e) {
//         console.error("Error parsing source link for citation:", source.link, e);
//         return <span className="text-gray-400 text-xs px-1">[{number}]</span>; // Fallback for bad URL
//     }
// };

// export const ResearchResultsView = ({ query, data, onReset, onNewSearch }) => {
//     const [activeTab, setActiveTab] = useState('Research');

//     // Destructure with default empty arrays to prevent errors if data is null/undefined
//     const { answer = '', sources = [], images = [], relatedQuestions = [] } = data || {};

//     const handleNewSearch = (newQuery) => {
//         // Pass the searchType as 'Research' for follow-up questions
//         onNewSearch(newQuery, 'Research'); 
//     };

//     const TabButton = ({ icon, label, isActive, onClick, count }) => (
//         <button
//             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2
//                 ${isActive ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-600'}
//             `}
//             onClick={onClick}
//         >
//             {icon}
//             {label}
//             {count !== undefined && <span className="ml-1 text-xs px-2 py-0.5 bg-gray-700 rounded-full">{count}</span>}
//         </button>
//     );

//     const SourceCard = ({ source, id }) => (
//         <a
//             id={id} // Used for anchor linking from inline citations (though currently disabled for simplicity)
//             href={source.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors group shadow"
//         >
//             {/* Added line-clamp-1 to title for consistent height */}
//             <h3 className="text-sm font-semibold text-blue-400 group-hover:underline mb-1 line-clamp-1">
//                 {source.title}
//             </h3>
//             {/* Shortened snippet for initial cards, but kept for full list in 'Sources' tab */}
//             {activeTab === 'Research' && (
//                 <p className="text-gray-400 text-xs line-clamp-2 mb-2">{source.snippet}</p>
//             )}
//             <div className="flex items-center text-gray-500 text-xs mt-auto">
//                 {source.favicon && (
//                     <Image src={source.favicon} alt="Favicon" width={16} height={16} className="mr-2 rounded" />
//                 )}
//                 <span className="truncate">{source.link ? new URL(source.link).hostname : ''}</span>
//                 <ExternalLinkIcon className="w-3 h-3 ml-2 text-gray-500 group-hover:text-blue-400" />
//             </div>
//         </a>
//     );

//     return (
//         <div className="w-full max-w-8xl mx-auto p-4 bg-gray-900 rounded-xl shadow-xl text-white relative">

//             {/* Back Button */}
//             <button
//                 onClick={onReset}
//                 className="absolute top-4 right-4 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300"
//             >
//                 &larr; New Research
//             </button>

//             {/* Main Query Title - adjusted sizing to match screenshot */}
//             <h1 className="text-2xl md:text-3xl font-bold mb-4 text-left">
//                 {query}
//             </h1>

//             {/* Tabs */}
//             <div className="flex justify-start border-b border-gray-700 mb-4 space-x-2"> {/* Reduced space-x */}
//                 <TabButton icon={<ResearchIcon className="w-4 h-4" />} label="Research" isActive={activeTab === 'Research'} onClick={() => setActiveTab('Research')} />
//                 {/* Steps tab is commented out as it requires specific AI output parsing for steps */}
//                 {/* <TabButton icon={<ListOrderedIcon className="w-4 h-4" />} label="Steps" isActive={activeTab === 'Steps'} onClick={() => setActiveTab('Steps')} /> */}
//                 <TabButton icon={<ImageIcon className="w-4 h-4" />} label="Images" isActive={activeTab === 'Images'} onClick={() => setActiveTab('Images')} />
//                 {/* Show source count on tab */}
//                 <TabButton icon={<BookIcon className="w-4 h-4" />} label="Sources" isActive={activeTab === 'Sources'} onClick={() => setActiveTab('Sources')} count={sources.length} />
//             </div>

//             {/* Source Cards (Top - visible only in Research tab, up to 4) */}
//             {activeTab === 'Research' && sources.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-6">
//                     {sources.slice(0, 4).map((source, idx) => (
//                         <SourceCard key={idx} id={`source-${idx}`} source={source} />
//                     ))}
//                 </div>
//             )}

//             {/* Content Display Area */}
//             <div className="min-h-[300px] space-y-6 pb-20"> {/* Added pb-20 for space above bottom input */}
//                 {activeTab === 'Research' && (
//                     <div className="space-y-6">
//                         {/* No "Detailed Answer" heading needed if content directly follows */}
//                         <div className="prose prose-invert max-w-none text-gray-200 space-y-4 text-justify">
//                             <Markdown
//                                 remarkPlugins={[remarkGfm]}
//                                 components={{
//                                     // Custom text renderer to find and replace citation numbers with our Citation component
//                                     text: ({ children }) => {
//                                         const textContent = String(children);
//                                         // Regex to match [number] patterns
//                                         const citationRegex = /\[(\d+)\]/g;
                                        
//                                         // If no citations, render as normal text
//                                         if (!citationRegex.test(textContent)) {
//                                             return <>{children}</>;
//                                         }
                                        
//                                         const parts = textContent.split(citationRegex);

//                                         return (
//                                             <>
//                                                 {parts.map((part, index) => {
//                                                     // Odd indices are the captured numbers, even are regular text
//                                                     if (index % 2 === 1) {
//                                                         const sourceIndex = parseInt(part, 10) - 1; // Convert to 0-based index
//                                                         const source = sources[sourceIndex];
//                                                         return <Citation key={index} number={part} source={source} />;
//                                                     }
//                                                     return part;
//                                                 })}
//                                             </>
//                                         );
//                                     },
//                                     // Optionally, you can add custom rendering for h1, h2, ul, li etc.
//                                     // For example, to control the styling of list items more precisely
//                                     ul: ({ node, ...props }) => <ul className="list-disc pl-5" {...props} />,
//                                     ol: ({ node, ...props }) => <ol className="list-decimal pl-5" {...props} />,
//                                     li: ({ node, ...props }) => <li className="my-1" {...props} />,
//                                     p: ({ node, ...props }) => <p className="mb-4" {...props} />,
//                                 }}
//                             >
//                                 {answer}
//                             </Markdown>
//                         </div>

//                         {/* Moved explicit citation list to 'Sources' tab to declutter 'Research' tab */}
//                     </div>
//                 )}

//                 {activeTab === 'Images' && (
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {images.length > 0 ? (
//                             images.map((img, idx) => (
//                                 <a key={idx} href={img.imageUrl} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden group shadow">
//                                     <Image
//                                         src={img.thumbnailUrl || img.imageUrl}
//                                         alt={`Result image ${idx + 1}`}
//                                         width={200}
//                                         height={150}
//                                         className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
//                                     />
//                                     {img.source && <p className="text-xs text-gray-500 mt-1">{img.source}</p>}
//                                 </a>
//                             ))
//                         ) : (
//                             <p className="text-gray-500 col-span-full">No relevant images found.</p>
//                         )}
//                     </div>
//                 )}

//                 {activeTab === 'Sources' && (
//                     <div className="space-y-4">
//                         <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">All Sources</h2>
//                         {sources.length > 0 ? (
//                             sources.map((source, idx) => <SourceCard key={idx} id={`source-${idx}`} source={source} />)
//                         ) : (
//                             <p className="text-gray-500">No sources found for this research query.</p>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Related Questions */}
//             {relatedQuestions.length > 0 && (
//                 <div className="mt-8 pt-4 border-t border-gray-800">
//                     <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                         <LightbulbIcon className="w-5 h-5 text-yellow-400" /> Related Questions
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         {relatedQuestions.map((question, idx) => (
//                             <button
//                                 key={idx}
//                                 onClick={() => handleNewSearch(question)}
//                                 className="text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 transition-colors"
//                             >
//                                 {question}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Bottom Chat Input */}
//             {/* Added styling to make it sticky at the bottom */}
//             <div className="sticky bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-10 p-3 flex justify-center">
//                 <div className="w-full max-w-8xl">
//                     <BottomChatInput onSend={handleNewSearch} />
//                 </div>
//             </div>
//         </div>
//     );
// };



















'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ResearchIcon, ImageIcon, BookIcon, ExternalLinkIcon, LightbulbIcon } from '../Icons';
import { BottomChatInput } from './BottomChatInput';
import { ImagesTabView } from './ImageTab/ImagesTabView';

const Citation = ({ number, source }) => {
    if (!source || !source.link) return <span className="text-gray-400 text-xs px-1">[{number}]</span>;
    try {
        const hostname = new URL(source.link).hostname.replace('www.', '');
        return (
            <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded-md mx-1 hover:bg-gray-600 hover:text-white transition-colors whitespace-nowrap"
                title={source.title}
            >
                {hostname}
            </a>
        );
    } catch (e) {
        return <span className="text-gray-400 text-xs px-1">[{number}]</span>;
    }
};

export const ResearchResultsView = ({ query, data, onReset, onNewSearch }) => {
    const [activeTab, setActiveTab] = useState('Research');
    const { answer = '', sources = [], relatedQuestions = [] } = data || {};

    const handleNewSearch = (newQuery) => {
        onNewSearch(newQuery, 'Research');
    };

    const TabButton = ({ icon, label, isActive, onClick, count }) => (
        <button
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2
                ${isActive ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-600'}
            `}
            onClick={onClick}
        >
            {icon}
            {label}
            {count !== undefined && <span className="ml-1 text-xs px-2 py-0.5 bg-gray-700 rounded-full">{count}</span>}
        </button>
    );

    const SourceCard = ({ source, id }) => (
        <a
            id={id}
            href={source.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors group shadow"
        >
            <h3 className="text-sm font-semibold text-blue-400 group-hover:underline mb-1 line-clamp-1">
                {source.title}
            </h3>
            <p className="text-gray-400 text-xs line-clamp-2 mb-2">{source.snippet}</p>
            <div className="flex items-center text-gray-500 text-xs mt-auto">
                {source.favicon && (
                    <Image src={source.favicon} alt="Favicon" width={16} height={16} className="mr-2 rounded" />
                )}
                <span className="truncate">{source.link ? new URL(source.link).hostname : ''}</span>
                <ExternalLinkIcon className="w-3 h-3 ml-2 text-gray-500 group-hover:text-blue-400" />
            </div>
        </a>
    );

    return (
        <div className="w-full max-w-8xl mx-auto p-4 bg-gray-900 rounded-xl shadow-xl text-white relative">

            <button
                onClick={onReset}
                className="absolute top-4 right-4 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300"
            >
                &larr; New Research
            </button>

            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-left">
                {query}
            </h1>

            <div className="flex justify-start border-b border-gray-700 mb-4 space-x-2">
                <TabButton icon={<ResearchIcon className="w-4 h-4" />} label="Research" isActive={activeTab === 'Research'} onClick={() => setActiveTab('Research')} />
                <TabButton icon={<ImageIcon className="w-4 h-4" />} label="Images" isActive={activeTab === 'Images'} onClick={() => setActiveTab('Images')} />
                <TabButton icon={<BookIcon className="w-4 h-4" />} label="Sources" isActive={activeTab === 'Sources'} onClick={() => setActiveTab('Sources')} count={sources.length} />
            </div>

            {activeTab === 'Research' && sources.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-6">
                    {sources.slice(0, 4).map((source, idx) => (
                        <SourceCard key={idx} id={`source-${idx}`} source={source} />
                    ))}
                </div>
            )}

            <div className="min-h-[300px] space-y-6 pb-20">
             {activeTab === 'Research' && (
  <div className="flex justify-center">
    <div className="prose prose-invert max-w-7xl text-gray-200 space-y-6 text-left text-lg leading-relaxed px-4">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          text: ({ children }) => {
            const textContent = String(children);
            const citationRegex = /\[(\d+)\]/g;
            if (!citationRegex.test(textContent)) return <span className="break-words">{children}</span>;

            const parts = textContent.split(citationRegex);
            return (
              <>
                {parts.map((part, index) => {
                  if (index % 2 === 1) {
                    const sourceIndex = parseInt(part, 10) - 1;
                    const source = sources[sourceIndex];
                    return <Citation key={index} number={part} source={source} />;
                  }
                  return <span key={index}>{part}</span>;
                })}
              </>
            );
          },
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4">{props.children}</h1>
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-7 mb-3">{props.children}</h2>
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mt-6 mb-2">{props.children}</h3>
          ),
          p: ({ node, ...props }) => (
            <p className="mb-6 text-lg leading-relaxed indent-8">{props.children}</p>
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-10 mb-6 space-y-2 text-lg leading-relaxed">{props.children}</ul>
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-10 mb-6 space-y-2 text-lg leading-relaxed">{props.children}</ol>
          ),
          li: ({ node, ...props }) => (
            <li className="my-2">{props.children}</li>
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-white">{props.children}</strong>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className="p-4 bg-gray-800 rounded-md overflow-x-auto text-sm my-4">
                <code className={`language-${match[1]}`} {...props}>{children}</code>
              </pre>
            ) : (
              <code className="bg-gray-800 text-purple-300 px-1 py-0.5 rounded text-sm">{children}</code>
            );
          },
        }}
      >
        {answer}
      </Markdown>
    </div>
  </div>
)}


                {activeTab === 'Images' && (
                    <div className="w-full px-4">
                        <ImagesTabView initialQuery={query} onBackToAnswer={() => setActiveTab('Research')} />
                    </div>
                )}

                {activeTab === 'Sources' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">All Sources</h2>
                        {sources.length > 0 ? (
                            sources.map((source, idx) => <SourceCard key={idx} id={`source-${idx}`} source={source} />)
                        ) : (
                            <p className="text-gray-500">No sources found for this research query.</p>
                        )}
                    </div>
                )}
            </div>

            {data.relatedQuestions && data.relatedQuestions.length > 0 && (
                <div className="mt-8 pt-4 border-t border-gray-800">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <LightbulbIcon className="w-5 h-5 text-yellow-400" /> Related Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.relatedQuestions.map((question, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleNewSearch(question)}
                                className="text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-md text-sm text-gray-300 transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="sticky bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-10 p-3 flex justify-center">
                <div className="w-full max-w-8xl">
                    <BottomChatInput onSend={handleNewSearch} />
                </div>
            </div>
        </div>
    );
};
