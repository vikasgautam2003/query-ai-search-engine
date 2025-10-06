// 'use client';
// import { useState, useEffect, useRef } from 'react';

// export const useSpeechRecognition = () => {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (!SpeechRecognition) {
//             console.error("Speech Recognition is not supported by this browser.");
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.continuous = true;
//         recognition.interimResults = true;
//         recognition.lang = 'en-US';

//         recognition.onresult = (event) => {
//             let finalTranscript = '';
//             for (let i = event.resultIndex; i < event.results.length; ++i) {
//                 if (event.results[i].isFinal) {
//                     finalTranscript += event.results[i][0].transcript;
//                 }
//             }
//             setTranscript(prev => prev + finalTranscript);
//         };
        
//         recognition.onerror = (event) => {
//             console.error("Speech recognition error:", event.error);
//         };
        
//         recognition.onend = () => {
//             if (recognitionRef.current) {
//                 setIsListening(false);
//             }
//         };

//         recognitionRef.current = recognition;
//     }, []);

//     const startListening = () => {
//         if (recognitionRef.current && !isListening) {
//             setTranscript('');
//             recognitionRef.current.start();
//             setIsListening(true);
//         }
//     };

//     const stopListening = () => {
//         if (recognitionRef.current && isListening) {
//             recognitionRef.current.stop();
//             setIsListening(false);
//         }
//     };


//      const resetTranscript = () => {
//         setTranscript('');
//     };

//     return {
//         isListening,
//         transcript,
//         startListening,
//         stopListening,
        
//     };
// };










'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech Recognition is not supported by this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            setTranscript(prev => prev + finalTranscript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                setTranscript('');
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.warn("Speech recognition already started:", error);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [isListening]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript
    };
};
