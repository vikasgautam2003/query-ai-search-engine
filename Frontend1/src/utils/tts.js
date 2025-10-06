// src/utils/tts.js
export const speak = (text) => {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
        // Stop any currently speaking utterance to prevent overlap
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Optional: Configure voice, pitch, rate
        utterance.pitch = 1; // From 0 to 2
        utterance.rate = 1;  // From 0.1 to 10
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.error("Text-to-Speech is not supported by this browser.");
    }
};