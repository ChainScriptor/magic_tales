import React, { useState, useEffect } from 'react';

interface TypingBubbleProps {
    text: string;
    onFinished?: () => void;
    delay?: number;
    darkMode?: boolean;
}

const TypingBubble: React.FC<TypingBubbleProps> = ({
    text,
    onFinished,
    delay = 35,
    darkMode = false
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, delay);

            return () => clearTimeout(timer);
        } else if (isTyping && displayedText.length === text.length) {
            setIsTyping(false);
            if (onFinished) {
                setTimeout(() => onFinished(), 300);
            }
        }
    }, [displayedText, text, delay, isTyping, onFinished]);

    return (
        <div className="flex justify-start mb-4">
            <div className={`relative rounded-2xl rounded-tl-sm px-6 py-4 shadow-md max-w-md ${darkMode ? 'bg-white' : 'bg-white'
                }`}>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-800' : 'text-gray-800'
                    }`}>
                    {displayedText}
                    {isTyping && displayedText.length < text.length && (
                        <span className={`inline-block w-0.5 h-4 ml-1.5 animate-pulse align-middle ${darkMode ? 'bg-gray-800' : 'bg-gray-800'
                            }`}>|</span>
                    )}
                </p>
                {/* Speech bubble tail */}
                <div className="absolute -left-2 bottom-0 w-3 h-3">
                    <div className={`w-3 h-3 transform rotate-45 ${darkMode ? 'bg-white' : 'bg-white'
                        }`}></div>
                </div>
            </div>
        </div>
    );
};

export default TypingBubble;

