// src/components/PersonalizationWidget.jsx
'use client';

import React, { useState } from 'react';
import { interestCategories } from '../../../lib/options'

export const PersonalizationWidget = () => {
    const [selectedInterests, setSelectedInterests] = useState(['Tech & Science', 'Finance']); // Default selections

    const handleInterestClick = (interest) => {
        setSelectedInterests(prev => 
            prev.includes(interest)
                ? prev.filter(item => item !== interest) // Deselect if already selected
                : [...prev, interest] // Select if not already selected
        );
    };

    const handleSave = () => {
        // In a real app, you'd save this to a user's profile in a database.
        console.log("Saving user interests:", selectedInterests);
        alert(`Interests saved: ${selectedInterests.join(', ')}`);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 text-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Make it yours</h3>
                <button className="text-gray-400 hover:text-white text-xl">&times;</button>
            </div>
            <p className="text-sm text-gray-400 mb-4">
                Select topics and interests to customize your Discover experience.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {interestCategories.map(interest => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                        <button
                            key={interest}
                            onClick={() => handleInterestClick(interest)}
                            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                                isSelected 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-700'
                            }`}
                        >
                           {isSelected ? '✓ ' : ''}{interest}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Save Interests
            </button>
        </div>
    );
};