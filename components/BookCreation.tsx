import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TypingBubble from './TypingBubble';
import ImageUploadArea from './ImageUploadArea';
import ImageReveal from './ui/image-tiles';
import Slideshow from './ui/Slideshow';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface BookCreationProps {
  onClose: () => void;
}

const BookCreation: React.FC<BookCreationProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [firstBubbleFinished, setFirstBubbleFinished] = useState(false);
  const [secondBubbleFinished, setSecondBubbleFinished] = useState(false);
  const [thirdBubbleFinished, setThirdBubbleFinished] = useState(false);
  const [fourthBubbleFinished, setFourthBubbleFinished] = useState(false);
  const [fifthBubbleFinished, setFifthBubbleFinished] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterDescription, setCharacterDescription] = useState<string | null>(null);
  const [characterAge, setCharacterAge] = useState('');
  const [feedbackAccepted, setFeedbackAccepted] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleFileUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    
    // Convert file to base64 for API
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setUploadedImageBase64(base64String);
    };
    reader.readAsDataURL(file);
    
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
    setStep(4);
  };

  const handleAgeSubmit = async () => {
    if (characterAge.trim() && uploadedImageBase64) {
      setStep(5);
      setIsGenerating(true);
      
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/image/generate-wizard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageBase64: uploadedImageBase64,
            characterName: characterName,
            characterAge: characterAge,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate image');
        }

        const data = await response.json();
        if (data.success && data.image) {
          setGeneratedImage(data.image);
          setFifthBubbleFinished(true);
        } else {
          throw new Error('No image returned from API');
        }
      } catch (error) {
        console.error('Error generating wizard image:', error);
        // Fallback to placeholder on error
        setGeneratedImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop');
        setFifthBubbleFinished(true);
        alert('Failed to generate wizard image. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const regenerateImage = async () => {
    if (!uploadedImageBase64) {
      console.error('No uploaded image to regenerate from');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null); // Clear current image while generating
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/image/generate-wizard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: uploadedImageBase64, // Use the same original image
          characterName: characterName,
          characterAge: characterAge,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to regenerate image');
      }

      const data = await response.json();
      if (data.success && data.image) {
        setGeneratedImage(data.image);
      } else {
        throw new Error('No image returned from API');
      }
    } catch (error) {
      console.error('Error regenerating wizard image:', error);
      alert('Failed to regenerate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageFeedback = (liked: boolean) => {
    if (liked) {
      setFeedbackAccepted(true);
    } else {
      // Regenerate with the same original image
      regenerateImage();
    }
  };

  const submitEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return;
    }
    console.log('Saving email:', userEmail);
    // Here you can persist email and proceed
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
            <LanguageSelector />
            <button className="px-6 py-2.5 rounded-lg btn-outline-soft text-sm font-medium hover:bg-white transition-all">
              {t('nav.login')}
            </button>
            <button className="px-5 py-2.5 rounded-lg btn-outline-soft text-sm font-medium flex items-center gap-2 hover:bg-white transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {t('nav.bookCall')}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold"
            >
              {t('nav.previewBook')}
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
                text={t('bookCreation.firstMessage')}
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
                  text={t('bookCreation.thanks')}
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
                  placeholder={t('bookCreation.enterName')}
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
                    {t('bookCreation.continue')}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Third Typing Bubble - Show after name is submitted */}
            {step === 3 && (
              <div className="animate-in fade-in duration-300">
                <TypingBubble
                  text={t('bookCreation.describe')}
                  onFinished={handleThirdBubbleFinish}
                  darkMode={true}
                />
              </div>
            )}

            {/* Description Buttons - Show after third bubble finishes */}
            {thirdBubbleFinished && step === 3 && (
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
                  {t('bookCreation.skip')}
                </button>
                <button
                  onClick={() => handleDescriptionSelect('girl')}
                  className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200"
                >
                  {t('bookCreation.girl')}
                </button>
                <button
                  onClick={() => handleDescriptionSelect('boy')}
                  className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200"
                >
                  {t('bookCreation.boy')}
                </button>
              </motion.div>
            )}

            {/* Fourth Typing Bubble - Show after description is selected */}
            {step === 4 && (
              <div className="animate-in fade-in duration-300">
                <TypingBubble
                  text={t('bookCreation.howOld').replace('{name}', characterName || t('bookCreation.they'))}
                  onFinished={() => setFourthBubbleFinished(true)}
                />
              </div>
            )}

            {/* Age Input - Show after fourth bubble finishes */}
            {fourthBubbleFinished && step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-6"
              >
                <input
                  type="text"
                  placeholder={t('bookCreation.enterAge')}
                  value={characterAge}
                  onChange={(e) => setCharacterAge(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && characterAge.trim()) {
                      handleAgeSubmit();
                    }
                  }}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a47ff] focus:border-transparent text-gray-800 placeholder-gray-400"
                />
                {characterAge.trim() && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleAgeSubmit}
                    className="mt-3 w-full px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold"
                  >
                    {t('bookCreation.continue')}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Fifth Typing Bubble - Show after age is submitted */}
            {step === 5 && !isGenerating && (
              <div className="animate-in fade-in duration-300">
                <TypingBubble
                  text={t('bookCreation.hereTheyAre').replace('{name}', characterName || t('bookCreation.them'))}
                  onFinished={() => setFifthBubbleFinished(true)}
                />
              </div>
            )}

            {/* Loading State - Generating wizard image */}
            {step === 5 && isGenerating && (
              <div className="animate-in fade-in duration-300">
                <TypingBubble
                  text="Creating magic... ✨ Transforming your photo into a wizard costume!"
                  onFinished={() => {}}
                />
                <div className="mt-6 flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-200">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-[#1a47ff] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">Generating your magical wizard image...</p>
                  <p className="text-gray-400 text-xs mt-2">This may take a few moments</p>
                </div>
              </div>
            )}

            {/* Email Capture Prompt after positive feedback */}
            {feedbackAccepted && (
              <div className="mt-6 animate-in fade-in duration-300">
                <TypingBubble
                  text={t('bookCreation.almostThere')}
                  onFinished={() => {}}
                  darkMode={true}
                />
                <div className="mt-4">
                  <div className="text-center text-sm text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: t('bookCreation.terms') }} />
                  <input
                    type="email"
                    placeholder={t('bookCreation.emailPlaceholder')}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') submitEmail();
                    }}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a47ff] focus:border-transparent text-gray-800 placeholder-gray-400"
                  />
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={submitEmail}
                    className="mt-3 w-full px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold"
                  >
                    {t('bookCreation.continue')}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Feedback Buttons - Show after fifth bubble finishes */}
            {fifthBubbleFinished && !feedbackAccepted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-6 flex gap-3 justify-center flex-wrap"
              >
                <button
                  onClick={() => handleImageFeedback(false)}
                  disabled={isGenerating}
                  className={`px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold ${
                    isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {isGenerating ? 'Regenerating...' : t('bookCreation.dontLike')}
                </button>
                <button
                  onClick={() => handleImageFeedback(true)}
                  disabled={isGenerating}
                  className={`px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold ${
                    isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {t('bookCreation.looksGreat')}
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

          {/* Right Side - Uploaded Image Preview or Generated Image */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-1 w-full lg:max-w-sm flex justify-center lg:justify-start"
            >
              <div className="bg-white rounded-2xl p-4 shadow-xl overflow-hidden w-full max-w-xs relative">
                {/* Original Uploaded Image */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative mb-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded character"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Character Description Badge - Top Right */}
                  {characterDescription && characterDescription !== 'skip' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-gray-800 rounded-lg px-4 py-2 shadow-lg">
                        <p className="text-white font-semibold text-sm capitalize">{characterDescription}</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Character Name Overlay - Bottom */}
                  {characterName.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-20 left-0 right-0 px-4"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <p className="text-gray-800 font-semibold text-center">{characterName}</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Character Age Overlay - Bottom */}
                  {characterAge.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-12 left-0 right-0 px-4"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <p className="text-gray-800 font-semibold text-center">{characterAge} {t('bookCreation.yearsOld')}</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Character Description Overlay - Bottom (if skip) */}
                  {characterDescription === 'skip' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-0 right-0 px-4"
                    >
                      <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <p className="text-white font-semibold text-center capitalize">{characterDescription}</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Generated Wizard Image - Below Original */}
                {step === 5 && generatedImage && !isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <div className="mb-2">
                      <p className="text-sm font-semibold text-gray-700 text-center mb-2">
                        ✨ Your Magical Transformation ✨
                      </p>
                    </div>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative border-2 border-purple-300 shadow-lg">
                      <img
                        src={generatedImage}
                        alt="Generated wizard character"
                        className="w-full h-full object-cover"
                      />
                      {/* Magic sparkle effect badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-3 py-1.5 shadow-lg">
                          <p className="text-white font-bold text-xs">✨ MAGIC ✨</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCreation;

