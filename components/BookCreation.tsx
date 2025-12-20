import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TypingBubble from './TypingBubble';
import ImageUploadArea from './ImageUploadArea';
import ImageReveal from './ui/image-tiles';

interface BookCreationProps {
  onClose: () => void;
}

const BookCreation: React.FC<BookCreationProps> = ({ onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [firstBubbleFinished, setFirstBubbleFinished] = useState(false);
  const [secondBubbleFinished, setSecondBubbleFinished] = useState(false);
  const [thirdBubbleFinished, setThirdBubbleFinished] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterDescription, setCharacterDescription] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setStep(2);
  };

  const handleFirstBubbleFinish = () => {
    setFirstBubbleFinished(true);
  };

  const handleSecondBubbleFinish = () => {
    setSecondBubbleFinished(true);
  };

  const handleThirdBubbleFinish = () => {
    setThirdBubbleFinished(true);
  };

  const handleNameSubmit = () => {
    if (characterName.trim()) {
      setStep(3);
    }
  };

  const handleDescriptionSelect = (description: string) => {
    setCharacterDescription(description);
    // Here you would proceed to the next step or submit
  };

  return (
    <div className="fixed inset-0 bg-[#ebe6e4] z-50 overflow-y-auto">
      <div className="container mx-auto max-w-7xl px-6 pt-10 pb-24">
        {/* Navigation Row */}
        <nav className="flex items-center justify-between mb-20 md:mb-32">
          {/* Logo - Clickable to go back */}
          <button onClick={onClose} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="/logo/2.png"
              alt="MagicTales Logo"
              className="w-20 h-20 object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-[#0e0e0e]">MagicTales</span>
          </button>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-6 py-2.5 rounded-lg btn-outline-soft text-sm font-medium hover:bg-white transition-all">
              Login
            </button>
            <button className="px-5 py-2.5 rounded-lg btn-outline-soft text-sm font-medium flex items-center gap-2 hover:bg-white transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Book a call
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold"
            >
              Preview Your Book ⟶
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start justify-center min-h-[60vh] gap-8 lg:gap-12 max-w-[1100px] mx-auto px-4">
          {/* Left Side - Chat Bubbles and Input */}
          <div className="flex-1 w-full lg:max-w-md">
            {/* First Typing Bubble */}
            <div className="flex justify-start mb-6">
              <TypingBubble
                text="Let's turn someone you love into the star of the story in under 60 seconds. ✨ Can you upload a clear photo with one face?"
                onFinished={handleFirstBubbleFinish}
              />
            </div>

            {/* Upload Area - Show after first bubble finishes */}
            {firstBubbleFinished && (
              <div className="mb-6 animate-in fade-in duration-300">
                <ImageUploadArea onFileUpload={handleFileUpload} />
              </div>
            )}

            {/* Second Typing Bubble - Show after upload */}
            {step === 2 && (
              <div className="animate-in fade-in duration-300">
                <TypingBubble
                  text="Thanks! What's their name?"
                  onFinished={handleSecondBubbleFinish}
                />
              </div>
            )}

            {/* Name Input - Show after second bubble finishes */}
            {secondBubbleFinished && step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-6"
              >
                <input
                  type="text"
                  placeholder="Enter character name..."
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && characterName.trim()) {
                      handleNameSubmit();
                    }
                  }}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a47ff] focus:border-transparent text-gray-800 placeholder-gray-400"
                />
                {characterName.trim() && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleNameSubmit}
                    className="mt-3 w-full px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold"
                  >
                    Continue
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Third Typing Bubble - Show after name is submitted */}
            {step === 3 && (
              <div className="animate-in fade-in duration-300">
                <TypingBubble
                  text="How should we describe them in the story?"
                  onFinished={handleThirdBubbleFinish}
                  darkMode={true}
                />
              </div>
            )}

            {/* Description Buttons - Show after third bubble finishes */}
            {thirdBubbleFinished && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-6 flex gap-3 justify-center flex-wrap"
              >
                <button
                  onClick={() => handleDescriptionSelect('skip')}
                  className="px-6 py-3 bg-transparent border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Skip
                </button>
                <button
                  onClick={() => handleDescriptionSelect('girl')}
                  className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200"
                >
                  Girl
                </button>
                <button
                  onClick={() => handleDescriptionSelect('boy')}
                  className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200"
                >
                  Boy
                </button>
              </motion.div>
            )}

            {/* Video Reveal Section - Show below upload area */}
            {firstBubbleFinished && (
              <div className="flex justify-center mt-8 mb-6">
                <ImageReveal
                  leftImage=""
                  middleImage=""
                  rightImage=""
                  leftVideo="/1.mp4"
                  middleVideo="/2.mp4"
                  rightVideo="/3.mp4"
                />
              </div>
            )}
          </div>

          {/* Right Side - Uploaded Image Preview */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-1 w-full lg:max-w-sm flex justify-center lg:justify-start"
            >
              <div className="bg-white rounded-2xl p-4 shadow-xl overflow-hidden w-full max-w-xs relative">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded character"
                    className="w-full h-full object-cover"
                  />
                  {/* Character Name Overlay - Bottom */}
                  {characterName.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-0 right-0 px-4"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <p className="text-gray-800 font-semibold text-center">{characterName}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCreation;

