import React, { useState, useRef, useEffect } from 'react';

interface FairyTalePage {
  pageNumber: number;
  text: string;
  illustration: string;
  protagonistPosition?: { x: number; y: number; width: number; height: number };
}

interface FairyTale {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pages: FairyTalePage[];
}

interface FairyTaleReaderProps {
  fairyTale: FairyTale;
  childPhoto: string | null;
  onBack: () => void;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FairyTaleReader: React.FC<FairyTaleReaderProps> = ({
  fairyTale,
  childPhoto,
  onBack,
  onPhotoUpload
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalPages = fairyTale.pages.length;
  const page = fairyTale.pages[currentPage];

  useEffect(() => {
    setImageLoaded(false);
    
    if (canvasRef.current && childPhoto && page.protagonistPosition) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setImageLoaded(true);
        return;
      }

      // Load illustration first
      const illustration = new Image();
      illustration.crossOrigin = 'anonymous';
      
      illustration.onload = () => {
        // Set canvas size to match illustration
        canvas.width = illustration.width;
        canvas.height = illustration.height;
        
        // Draw illustration
        ctx.drawImage(illustration, 0, 0);

        // Load and draw child photo
        const childImg = new Image();
        childImg.crossOrigin = 'anonymous';
        
        childImg.onload = () => {
          const { x, y, width, height } = page.protagonistPosition!;
          
          // Create circular clipping path
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            x + width / 2,
            y + height / 2,
            Math.min(width, height) / 2,
            0,
            Math.PI * 2
          );
          ctx.clip();
          
          // Draw child photo
          ctx.drawImage(childImg, x, y, width, height);
          ctx.restore();
          
          setImageLoaded(true);
        };
        
        childImg.onerror = () => {
          setImageLoaded(true);
        };
        
        childImg.src = childPhoto;
      };
      
      illustration.onerror = () => {
        setImageLoaded(true);
      };
      
      illustration.src = page.illustration;
    } else {
      setImageLoaded(true);
    }
  }, [currentPage, childPhoto, page]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setImageLoaded(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setImageLoaded(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ebe6e4] to-white py-12">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Πίσω
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-center flex-1">{fairyTale.title}</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Photo Upload Button */}
        {!childPhoto && (
          <div className="mb-6 text-center">
            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={onPhotoUpload}
                className="hidden"
              />
              <div className="px-6 py-3 bg-gradient-to-r from-[#1a47ff] to-[#0019ff] text-white rounded-xl font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ανέβασε Φωτογραφία Παιδιού
              </div>
            </label>
          </div>
        )}

        {/* Page Content */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden mb-8">
          {/* Illustration */}
          <div className="relative bg-gradient-to-b from-gray-100 to-gray-50 aspect-[4/3] flex items-center justify-center overflow-hidden">
            {page.protagonistPosition && childPhoto ? (
              <>
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain"
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a47ff] mx-auto mb-4"></div>
                      <p className="text-gray-500">Φόρτωση παραμυθιού...</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <img
                src={page.illustration}
                alt={`Page ${page.pageNumber}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Text Content */}
          <div className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-medium text-center">
                {page.text}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Προηγούμενη
          </button>

          <div className="flex items-center gap-2">
            {fairyTale.pages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPage ? 'bg-[#1a47ff] w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              currentPage === totalPages - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#1a47ff] to-[#0019ff] text-white hover:opacity-90'
            }`}
          >
            Επόμενη
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Page Counter */}
        <div className="text-center text-gray-500">
          Σελίδα {currentPage + 1} από {totalPages}
        </div>
      </div>
    </div>
  );
};

export default FairyTaleReader;

