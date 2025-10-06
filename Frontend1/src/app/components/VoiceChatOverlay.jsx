









// // src/components/VoiceChatOverlay.jsx
// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { MicIcon, SlashIcon, LoaderIcon } from './Icons';
// import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
// import { speak } from '../../utils/tts';
// import { useAuth } from '../../context/AuthContext';

// export const VoiceChatOverlay = ({ isOpen, onClose }) => {
//     const { isAuthenticated } = useAuth();
//     const {
//         isListening,
//         transcript,
//         startListening,
//         stopListening,
//         resetTranscript
//     } = useSpeechRecognition();

//     const [conversation, setConversation] = useState([]);
//     const [isThinking, setIsThinking] = useState(false);
//     const [latestUserQuery, setLatestUserQuery] = useState('');
//     const [answerBlocks, setAnswerBlocks] = useState([]);
//     const latestUserQueryRef = useRef('');
//     const chatEndRef = useRef(null);

//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [conversation, isThinking, transcript]);

//     useEffect(() => {
//         if (isOpen) {
//             setConversation([]);
//             setAnswerBlocks([]);
//             resetTranscript();
//             startListening();
//         } else {
//             stopListening();
//             speak('');
//         }
//         return () => {
//             stopListening();
//             speak('');
//         };
//     }, [isOpen, startListening, stopListening, resetTranscript]);

//     const handleVoiceQuery = useCallback(async (queryText) => {
//         if (!queryText.trim() || isThinking) return;

//         stopListening();
//         setIsThinking(true);
//         setConversation(prev => [...prev, { type: 'user', text: queryText }]);
//         latestUserQueryRef.current = queryText;
//         setLatestUserQuery(queryText);

//         try {
//             const token = localStorage.getItem('token');
//             const headers = { 'Content-Type': 'application/json' };
//             if (token) headers['x-auth-token'] = token;

//             const conversationHistory = conversation.map(msg => ({
//                 sender: msg.type,
//                 text: msg.text
//             }));
//             conversationHistory.push({ sender: 'user', text: queryText });

//             const response = await fetch('/api/search', {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify({
//                     query: queryText,
//                     conversationHistory: conversationHistory
//                 })
//             });

//             if (!response.ok) {
//                 const errData = await response.json();
//                 throw new Error(errData.error || `AI response failed`);
//             }

//             const responseData = await response.json();
//             const aiAnswer = responseData.answer;

//             // Split answer into blocks for grid display
//             const blocks = aiAnswer.split('\n').filter(Boolean);
//             setAnswerBlocks(blocks);

//             // SPEAK the AI answer
//             speak(aiAnswer);

//         } catch (error) {
//             console.error('Voice chat error:', error);
//             const errorMessage = `Sorry, I encountered an error: ${error.message}.`;
//             setAnswerBlocks([errorMessage]);
//             speak(errorMessage);
//         } finally {
//             setIsThinking(false);
//             resetTranscript();
//             startListening();
//         }
//     }, [isThinking, stopListening, conversation, startListening, resetTranscript]);

//     // Listen for pause in speech
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             const currentTranscript = transcript.trim();
//             if (isListening && currentTranscript && currentTranscript !== latestUserQueryRef.current) {
//                 handleVoiceQuery(currentTranscript);
//             }
//         }, 1500);

//         return () => clearTimeout(handler);
//     }, [transcript, isListening, handleVoiceQuery]);

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center z-[100] p-6 text-white">
            
//             {/* Close Button */}
//             <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl font-bold p-2"
//             >
//                 ✕
//             </button>

//             {/* Spoken Text Header */}
//             <div className="mb-6 text-center animate-fade-in">
//                 <h2 className="text-3xl md:text-4xl font-bold text-gradient">
//                     "{transcript || latestUserQuery}"
//                 </h2>
//                 {isThinking && (
//                     <p className="italic text-blue-400 flex items-center justify-center gap-2 mt-2">
//                         AI is thinking
//                         <span className="dots-animation flex gap-1">
//                             <span className="dot"></span>
//                             <span className="dot"></span>
//                             <span className="dot"></span>
//                         </span>
//                     </p>
//                 )}
//             </div>

//             {/* Answer Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl overflow-y-auto p-4 bg-gray-900 rounded-xl shadow-xl scrollbar-thin scrollbar-thumb-gray-700">
//                 {answerBlocks.map((block, index) => (
//                     <div
//                         key={index}
//                         className={`p-5 rounded-lg shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 transform transition hover:scale-105 animate-slide-up`}
//                         style={{ animationDelay: `${index * 150}ms` }}
//                     >
//                         <p className="text-white text-lg">{block}</p>
//                     </div>
//                 ))}
//                 {isThinking && (
//                     <div className="col-span-full p-5 rounded-lg shadow-lg bg-gray-700 animate-pulse">
//                         <p className="text-white text-lg italic">Thinking...</p>
//                     </div>
//                 )}
//             </div>

//             {/* Mic Button */}
//             <div className="flex flex-col items-center gap-3 w-full max-w-md mt-6">
//                 <button
//                     onClick={isListening ? stopListening : startListening}
//                     className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 transform ${isListening ? 'bg-red-600 scale-110 shadow-lg' : 'bg-blue-600 hover:scale-105 shadow-md'}`}
//                 >
//                     {isListening ? (
//                         <SlashIcon className="w-10 h-10 text-white animate-bounce" />
//                     ) : (
//                         <MicIcon className="w-10 h-10 text-white animate-bounce" />
//                     )}
//                 </button>
//                 <p className="text-gray-400 text-sm">
//                     {isListening ? "Listening..." : "Click to speak"}
//                 </p>
//             </div>

//             {/* Animations */}
//             <style jsx>{`
//                 .animate-fade-in { animation: fadeIn 0.5s ease-out; }
//                 .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
//                 .dots-animation { display: flex; }
//                 .dot { width: 8px; height: 8px; background: white; border-radius: 50%; animation: bounceDots 1s infinite; }
//                 .dot:nth-child(2) { animation-delay: 0.2s; }
//                 .dot:nth-child(3) { animation-delay: 0.4s; }
//                 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//                 @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//                 @keyframes bounceDots { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
//             `}</style>
//         </div>
//     );
// };























// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { MicIcon, SlashIcon } from './Icons';
// import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
// import { speak } from '../../utils/tts';

// export const VoiceChatOverlay = ({ isOpen, onClose }) => {
//   const { isListening, transcript, startListening, stopListening, resetTranscript } =
//     useSpeechRecognition();

//   const [conversation, setConversation] = useState([]);
//   const [isThinking, setIsThinking] = useState(false);
//   const [latestUserQuery, setLatestUserQuery] = useState('');
//   const latestUserQueryRef = useRef('');
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [conversation, isThinking]);

//   useEffect(() => {
//     if (isOpen) {
//       setConversation([]);
//       resetTranscript();
//       startListening();
//     } else {
//       stopListening();
//       speak('');
//     }
//     return () => {
//       stopListening();
//       speak('');
//     };
//   }, [isOpen, startListening, stopListening, resetTranscript]);

//   const handleVoiceQuery = useCallback(
//     async (queryText) => {
//       if (!queryText.trim() || isThinking) return;

//       stopListening();
//       setIsThinking(true);
//       setLatestUserQuery(queryText);
//       latestUserQueryRef.current = queryText;

//       try {
//         const response = await fetch('/api/search', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ query: queryText }),
//         });

//         if (!response.ok) throw new Error('AI response failed');
//         const data = await response.json();
//         const aiAnswer = data.answer;

//         const blocks = aiAnswer.split('\n').filter(Boolean);
//         setConversation((prev) => [...prev, { type: 'ai', blocks }]);
//         speak(aiAnswer);
//       } catch (error) {
//         const errorMessage = `Error: ${error.message}`;
//         setConversation((prev) => [...prev, { type: 'ai', blocks: [errorMessage] }]);
//         speak(errorMessage);
//       } finally {
//         setIsThinking(false);
//         resetTranscript();
//         startListening();
//       }
//     },
//     [isThinking, stopListening, startListening, resetTranscript]
//   );

//   // Detect pause in speech
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       const currentTranscript = transcript.trim();
//       if (isListening && currentTranscript && currentTranscript !== latestUserQueryRef.current) {
//         handleVoiceQuery(currentTranscript);
//       }
//     }, 1500);

//     return () => clearTimeout(handler);
//   }, [transcript, isListening, handleVoiceQuery]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex flex-col z-[100] text-white">
//       {/* Close */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold p-2"
//       >
//         ✕
//       </button>

//       {/* User query always on top */}
//       <div className="text-center py-6">
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-200">
//           {transcript || latestUserQuery || 'Say something...'}
//         </h2>
//       </div>

//       {/* Thinking State Centered */}
//       {isThinking && (
//         <div className="flex-1 flex items-center justify-center">
//           <h1 className="text-2xl md:text-4xl font-bold text-blue-400 animate-pulse">
//             AI is thinking
//             <span className="dots-animation inline-flex ml-2">
//               <span className="dot"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//             </span>
//           </h1>
//         </div>
//       )}

//       {/* AI Answers in Cards */}
//       {!isThinking && conversation.length > 0 && (
//         <div className="flex-1 overflow-y-auto px-6 pb-6">
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
//             {conversation.map((msg, idx) =>
//               msg.type === 'ai'
//                 ? msg.blocks.map((block, bIdx) => (
//                     <div
//                       key={`${idx}-${bIdx}`}
//                       className="p-5 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transition transform hover:scale-[1.02] animate-slide-up"
//                       style={{ animationDelay: `${bIdx * 100}ms` }}
//                     >
//                       <p className="text-gray-200 leading-relaxed">{block}</p>
//                     </div>
//                   ))
//                 : null
//             )}
//           </div>
//           <div ref={chatEndRef}></div>
//         </div>
//       )}

//       {/* Mic button */}
//       <div className="flex flex-col items-center gap-3 pb-10 relative">
//         <div
//           className={`absolute w-36 h-36 rounded-full ${
//             isListening ? 'bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 animate-pulse-ring' : 'hidden'
//           }`}
//         ></div>
//         <button
//           onClick={isListening ? stopListening : startListening}
//           className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform ${
//             isListening ? 'bg-red-600 scale-110 shadow-2xl' : 'bg-blue-600 hover:scale-105 shadow-lg'
//           }`}
//         >
//           {isListening ? (
//             <SlashIcon className="w-10 h-10 text-white animate-ping-slow" />
//           ) : (
//             <MicIcon className="w-10 h-10 text-white animate-pulse" />
//           )}
//         </button>
//         <p className="text-gray-300 text-sm">{isListening ? 'Listening...' : 'Tap to speak'}</p>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         .animate-slide-up {
//           animation: slideUp 0.4s ease-out forwards;
//         }
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes pulseRing {
//           0% {
//             transform: scale(0.9);
//             opacity: 0.7;
//           }
//           70% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//           100% {
//             opacity: 0;
//           }
//         }
//         .animate-pulse-ring {
//           animation: pulseRing 1.5s infinite;
//         }
//         .animate-ping-slow {
//           animation: ping 1.5s infinite;
//         }
//         .dot {
//           width: 8px;
//           height: 8px;
//           margin: 0 2px;
//           background: white;
//           border-radius: 50%;
//           animation: blink 1.4s infinite both;
//         }
//         .dot:nth-child(2) {
//           animation-delay: 0.2s;
//         }
//         .dot:nth-child(3) {
//           animation-delay: 0.4s;
//         }
//         @keyframes blink {
//           0% {
//             opacity: 0.2;
//             transform: scale(0.8);
//           }
//           20% {
//             opacity: 1;
//             transform: scale(1);
//           }
//           100% {
//             opacity: 0.2;
//             transform: scale(0.8);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };








// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { MicIcon, SlashIcon } from './Icons';
// import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
// import { speak } from '../../utils/tts';

// export const VoiceChatOverlay = ({ isOpen, onClose }) => {
//   const { isListening, transcript, startListening, stopListening, resetTranscript } =
//     useSpeechRecognition();

//   const [conversation, setConversation] = useState([]);
//   const [isThinking, setIsThinking] = useState(false);
//   const [latestUserQuery, setLatestUserQuery] = useState('');
//   const latestUserQueryRef = useRef('');
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [conversation, isThinking]);

//   useEffect(() => {
//     if (isOpen) {
//       setConversation([]);
//       resetTranscript();
//       startListening();
//     } else {
//       stopListening();
//       speak('');
//     }
//     return () => {
//       stopListening();
//       speak('');
//     };
//   }, [isOpen, startListening, stopListening, resetTranscript]);

//   const handleVoiceQuery = useCallback(
//     async (queryText) => {
//       if (!queryText.trim() || isThinking) return;

//       stopListening();
//       setIsThinking(true);
//       setLatestUserQuery(queryText);
//       latestUserQueryRef.current = queryText;

//       try {
//         const response = await fetch('/api/search', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ query: queryText }),
//         });

//         if (!response.ok) throw new Error('AI response failed');
//         const data = await response.json();
//         const aiAnswer = data.answer;
//         const images = data.images || []; 
//         console.log("Images from backend:", data.images);


//         const blocks = aiAnswer.split('\n').filter(Boolean);

//         setConversation((prev) => [
//           ...prev,
//           { type: 'ai', blocks, images },
//         ]);

//         speak(aiAnswer);
//       } catch (error) {
//         const errorMessage = `Error: ${error.message}`;
//         setConversation((prev) => [
//           ...prev,
//           { type: 'ai', blocks: [errorMessage], images: [] },
//         ]);
//         speak(errorMessage);
//       } finally {
//         setIsThinking(false);
//         resetTranscript();
//         startListening();
//       }
//     },
//     [isThinking, stopListening, startListening, resetTranscript]
//   );

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       const currentTranscript = transcript.trim();
//       if (isListening && currentTranscript && currentTranscript !== latestUserQueryRef.current) {
//         handleVoiceQuery(currentTranscript);
//       }
//     }, 1500);
//     return () => clearTimeout(handler);
//   }, [transcript, isListening, handleVoiceQuery]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-[9999] text-white overflow-hidden">
//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold z-50"
//       >
//         ✕
//       </button>

//       {/* User Query Display */}
//       <div className="text-center py-6 z-20">
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-200">
//           {transcript || latestUserQuery || 'Say something...'}
//         </h2>
//       </div>

//       {/* Thinking State */}
//       {isThinking && (
//         <div className="flex-1 flex items-center justify-center z-10">
//           <h1 className="text-3xl md:text-5xl font-bold text-blue-400 animate-pulse text-center">
//             AI is thinking
//             <span className="dots-animation inline-flex ml-2">
//               <span className="dot"></span>
//               <span className="dot"></span>
//               <span className="dot"></span>
//             </span>
//           </h1>
//         </div>
//       )}

//       {/* AI Answers Grid */}
//       {!isThinking && conversation.length > 0 && (
//         <div className="flex-1 overflow-y-auto px-6 pb-6 z-20">
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
//             {conversation.map((msg, idx) =>
//               msg.type === 'ai'
//                 ? msg.blocks.map((block, bIdx) => (
//                     <div
//                       key={`${idx}-${bIdx}`}
//                       className="p-5 rounded-xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transition-transform transform hover:scale-[1.02] animate-slide-up flex flex-col gap-4"
//                       style={{ animationDelay: `${bIdx * 100}ms` }}
//                     >
//                       <p className="text-gray-200 leading-relaxed">{block}</p>
//                       {msg.images && msg.images[bIdx] && (
//                         <img
//                           src={msg.images[bIdx]}
//                           alt="Related"
//                           className="rounded-lg object-cover w-full h-48 border border-gray-700"
//                         />
//                       )}
//                     </div>
//                   ))
//                 : null
//             )}
//           </div>
//           <div ref={chatEndRef}></div>
//         </div>
//       )}

//       {/* Mic Button */}
//       <div className="flex flex-col items-center gap-3 pb-10 relative">
//         <div
//           className={`absolute w-36 h-36 rounded-full ${
//             isListening ? 'bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 animate-pulse-ring' : 'hidden'
//           }`}
//         ></div>
//         <button
//           onClick={isListening ? stopListening : startListening}
//           className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform ${
//             isListening ? 'bg-red-600 scale-110 shadow-2xl' : 'bg-blue-600 hover:scale-105 shadow-lg'
//           }`}
//         >
//           {isListening ? (
//             <SlashIcon className="w-10 h-10 text-white animate-ping-slow" />
//           ) : (
//             <MicIcon className="w-10 h-10 text-white animate-pulse" />
//           )}
//         </button>
//         <p className="text-gray-300 text-sm">{isListening ? 'Listening...' : 'Tap to speak'}</p>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         .animate-slide-up {
//           animation: slideUp 0.4s ease-out forwards;
//         }
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes pulseRing {
//           0% {
//             transform: scale(0.9);
//             opacity: 0.7;
//           }
//           70% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//           100% {
//             opacity: 0;
//           }
//         }
//         .animate-pulse-ring {
//           animation: pulseRing 1.5s infinite;
//         }
//         .animate-ping-slow {
//           animation: ping 1.5s infinite;
//         }
//         .dot {
//           width: 8px;
//           height: 8px;
//           margin: 0 2px;
//           background: white;
//           border-radius: 50%;
//           animation: blink 1.4s infinite both;
//         }
//         .dot:nth-child(2) {
//           animation-delay: 0.2s;
//         }
//         .dot:nth-child(3) {
//           animation-delay: 0.4s;
//         }
//         @keyframes blink {
//           0% {
//             opacity: 0.2;
//             transform: scale(0.8);
//           }
//           20% {
//             opacity: 1;
//             transform: scale(1);
//           }
//           100% {
//             opacity: 0.2;
//             transform: scale(0.8);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };













'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MicIcon, SlashIcon } from './Icons';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { speak } from '../../utils/tts';

export const VoiceChatOverlay = ({ isOpen, onClose }) => {
  const { isListening, transcript, startListening, stopListening, resetTranscript } =
    useSpeechRecognition();

  const [conversation, setConversation] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [latestUserQuery, setLatestUserQuery] = useState('');
  const latestUserQueryRef = useRef('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isThinking]);

  useEffect(() => {
    if (isOpen) {
      setConversation([]);
      resetTranscript();
      startListening();
    } else {
      stopListening();
      speak('');
    }
    return () => {
      stopListening();
      speak('');
    };
  }, [isOpen, startListening, stopListening, resetTranscript]);

  const handleVoiceQuery = useCallback(
    async (queryText) => {
      if (!queryText.trim() || isThinking) return;

      stopListening();
      setIsThinking(true);
      setLatestUserQuery(queryText);
      latestUserQueryRef.current = queryText;

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryText }),
        });

        if (!response.ok) throw new Error('AI response failed');
        const data = await response.json();
        const aiAnswer = data.answer;
        const images = data.images || [];
        console.log('Images from backend:', data.images);

        const blocks = aiAnswer.split('\n').filter(Boolean);

        setConversation((prev) => [
          ...prev,
          { type: 'ai', blocks, images },
        ]);

        speak(aiAnswer);
      } catch (error) {
        const errorMessage = `Error: ${error.message}`;
        setConversation((prev) => [
          ...prev,
          { type: 'ai', blocks: [errorMessage], images: [] },
        ]);
        speak(errorMessage);
      } finally {
        setIsThinking(false);
        resetTranscript();
        startListening();
      }
    },
    [isThinking, stopListening, startListening, resetTranscript]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentTranscript = transcript.trim();
      if (isListening && currentTranscript && currentTranscript !== latestUserQueryRef.current) {
        handleVoiceQuery(currentTranscript);
      }
    }, 1500);
    return () => clearTimeout(handler);
  }, [transcript, isListening, handleVoiceQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-[9999] text-white overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold z-50"
      >
        ✕
      </button>

      {/* User Query Display */}
      <div className="text-center py-6 z-20">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-200">
          {transcript || latestUserQuery || 'Say something...'}
        </h2>
      </div>

      {/* Thinking State */}
      {isThinking && (
        <div className="flex-1 flex items-center justify-center z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-400 animate-pulse text-center">
            AI is thinking
            <span className="dots-animation inline-flex ml-2">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </h1>
        </div>
      )}

      {/* AI Answers Grid */}
      {!isThinking && conversation.length > 0 && (
        <div className="flex-1 overflow-y-auto px-6 pb-6 z-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {conversation.map((msg, idx) =>
              msg.type === 'ai'
                ? msg.blocks.map((block, bIdx) => (
                    <div
                      key={`${idx}-${bIdx}`}
                      className="p-5 rounded-xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transition-transform transform hover:scale-[1.02] animate-slide-up flex flex-col gap-4"
                      style={{ animationDelay: `${bIdx * 100}ms` }}
                    >
                      <p className="text-gray-200 leading-relaxed">{block}</p>
                      {msg.images && msg.images[bIdx] && (
                        <a
                          href={msg.images[bIdx].link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={msg.images[bIdx].thumbnailUrl || msg.images[bIdx].imageUrl}
                            alt={msg.images[bIdx].source || 'Related'}
                            className="rounded-lg object-cover w-full h-48 border border-gray-700"
                          />
                        </a>
                      )}
                    </div>
                  ))
                : null
            )}
          </div>
          <div ref={chatEndRef}></div>
        </div>
      )}

      {/* Mic Button */}
      <div className="flex flex-col items-center gap-3 pb-10 relative">
        <div
          className={`absolute w-36 h-36 rounded-full ${
            isListening
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 animate-pulse-ring'
              : 'hidden'
          }`}
        ></div>
        <button
          onClick={isListening ? stopListening : startListening}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform ${
            isListening
              ? 'bg-red-600 scale-110 shadow-2xl'
              : 'bg-blue-600 hover:scale-105 shadow-lg'
          }`}
        >
          {isListening ? (
            <SlashIcon className="w-10 h-10 text-white animate-ping-slow" />
          ) : (
            <MicIcon className="w-10 h-10 text-white animate-pulse" />
          )}
        </button>
        <p className="text-gray-300 text-sm">{isListening ? 'Listening...' : 'Tap to speak'}</p>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseRing {
          0% {
            transform: scale(0.9);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-pulse-ring {
          animation: pulseRing 1.5s infinite;
        }
        .animate-ping-slow {
          animation: ping 1.5s infinite;
        }
        .dot {
          width: 8px;
          height: 8px;
          margin: 0 2px;
          background: white;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};
