import React, { useState, useRef } from 'react';

/**
 * Example TypeScript component showing how to use the face-swap API
 * This is a standalone example - you can integrate this into your BookCreation component
 */
const FaceSwapExample: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setError(null);
      setResultImage(null);
    }
  };

  const handleFaceSwap = async () => {
    if (!selectedFile) {
      setError('Please select a photo first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      // Create FormData with the file
      const formData = new FormData();
      formData.append('photo', selectedFile); // Field name must match backend: 'photo'

      // Get API URL from environment or use default
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      // Send POST request to face-swap endpoint
      const response = await fetch(`${API_URL}/api/face-swap`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically with boundary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Face-swap failed');
      }

      const data = await response.json();

      if (data.success && data.image) {
        // data.image is a base64 data URL (e.g., "data:image/png;base64,...")
        setResultImage(data.image);
      } else {
        throw new Error('No image returned from API');
      }
    } catch (err) {
      console.error('Face-swap error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during face-swap');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Face Swap Example</h2>

      {/* File Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Child Photo
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
          disabled={isProcessing}
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Process Button */}
      <button
        onClick={handleFaceSwap}
        disabled={!selectedFile || isProcessing}
        className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all ${
          !selectedFile || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          '✨ Transform to Wizard'
        )}
      </button>

      {/* Result Image */}
      {resultImage && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Result:</h3>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={resultImage}
              alt="Face-swapped wizard"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceSwapExample;

