import React from 'react';

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const RelatedQuestions = ({ questions, onQuestionClick }) => {
    if (!questions || questions.length === 0) return null;

    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold text-white mb-4">Related</h3>
            <div className="space-y-3">
                {questions.map((question, index) => (
                    <button 
                        key={index}
                        onClick={() => onQuestionClick(question)}
                        className="w-full flex justify-between items-center text-left p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <span className="text-gray-300">{question}</span>
                        <span className="text-gray-500"><PlusIcon /></span>
                    </button>
                ))}
            </div>
        </div>
    );
};