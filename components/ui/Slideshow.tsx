import React, { useEffect, useState } from 'react';

interface SlideshowProps {
  images: string[];
  intervalMs?: number;
  imgClassName?: string;
  alt?: string;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, intervalMs = 2000, imgClassName, alt = 'slideshow image' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <img
      src={images[currentIndex]}
      alt={alt}
      className={imgClassName}
    />
  );
};

export default Slideshow;


