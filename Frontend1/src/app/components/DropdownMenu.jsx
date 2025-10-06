// 'use client';

// import React, { useState, useRef, useEffect } from 'react';

// export const DropdownMenu = ({ trigger, children }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);


//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <div ref={dropdownRef} className="relative inline-block text-left">
           
//             <div onClick={() => setIsOpen(!isOpen)}>
//                 {trigger}
//             </div>

            
//             {isOpen && (
//                 <div 
//                     className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
//                 >
//                     <div className="py-1">
//                         {children}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };










'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const DropdownMenu = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {/* Trigger */}
            <div 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-2 px-4 py-2 rounded-xl 
                           bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                           text-white font-medium shadow-md hover:shadow-lg 
                           cursor-pointer select-none transition-all duration-200"
            >
                {trigger}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={18} />
                </motion.div>
            </div>

            {/* Dropdown list */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl 
                                   shadow-xl bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
                                   border border-gray-700 ring-1 ring-gray-600 ring-opacity-50 z-20"
                    >
                        <div className="py-2">
                            {React.Children.map(children, (child, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-white 
                                               cursor-pointer transition-all duration-200"
                                >
                                    {child}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
