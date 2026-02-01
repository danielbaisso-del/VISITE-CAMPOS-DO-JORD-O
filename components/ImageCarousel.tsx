import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TOURS } from '../constants';

interface CarouselSlide {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  website?: string;
}

const ImageCarousel: React.FC = () => {
  const tarunduIndex = TOURS.findIndex(tour => tour.id === 'tarundu');
  const [currentIndex, setCurrentIndex] = useState(tarunduIndex >= 0 ? tarunduIndex : 0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const animationRef = useRef<number | null>(null);

  const slides: CarouselSlide[] = TOURS.map(tour => ({
    id: tour.id,
    title: tour.title,
    category: tour.category,
    imageUrl: tour.imageUrl,
    website: tour.website
  }));

  const totalSlides = slides.length;

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + totalSlides) % totalSlides;
  };

  const nextSlide = useCallback(() => {
    setSlideDirection('left');
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setSlideDirection('right');
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => {
      setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
    });
  }, [totalSlides]);

  // Auto-play a cada 2 segundos
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Reset direction after animation
  useEffect(() => {
    const timer = setTimeout(() => setSlideDirection(null), 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    setTouchStart(null);
  };

  const handleSlideClick = (slide: CarouselSlide, position: number) => {
    if (position === 0 && slide.website) {
      window.open(slide.website, '_blank', 'noopener,noreferrer');
    } else if (position < 0) {
      prevSlide();
    } else if (position > 0) {
      nextSlide();
    }
  };

  const getSlideStyles = (position: number): React.CSSProperties => {
    // Base positions for each slot
    const basePositions: Record<number, { x: number; scale: number; rotateY: number; z: number; brightness: number }> = {
      [-2]: { x: -130, scale: 0.55, rotateY: 35, z: -200, brightness: 0.3 },
      [-1]: { x: -68, scale: 0.8, rotateY: 18, z: -80, brightness: 0.5 },
      [0]: { x: 0, scale: 1, rotateY: 0, z: 0, brightness: 1 },
      [1]: { x: 68, scale: 0.8, rotateY: -18, z: -80, brightness: 0.5 },
      [2]: { x: 130, scale: 0.55, rotateY: -35, z: -200, brightness: 0.3 },
    };

    const pos = basePositions[position] || { x: position > 0 ? 150 : -150, scale: 0.4, rotateY: position > 0 ? -40 : 40, z: -300, brightness: 0 };
    
    return {
      transform: `translateX(${pos.x}%) translateZ(${pos.z}px) scale(${pos.scale}) rotateY(${pos.rotateY}deg)`,
      filter: `brightness(${pos.brightness})`,
      zIndex: 10 - Math.abs(position) * 3,
      opacity: Math.abs(position) <= 2 ? 1 : 0,
      transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
    };
  };

  const visiblePositions = [-2, -1, 0, 1, 2];

  return (
    <div className="w-full py-6 overflow-hidden">
      {/* Carousel Container */}
      <div
        className="relative w-full max-w-3xl mx-auto h-[220px] md:h-[260px]"
        style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 3D Slides Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {visiblePositions.map(position => {
            const slideIndex = getSlideIndex(position);
            const slide = slides[slideIndex];
            const styles = getSlideStyles(position);
            const isCenter = position === 0;

            return (
              <div
                key={`pos-${position}-${slideIndex}`}
                className="absolute w-[260px] md:w-[320px] h-[170px] md:h-[210px] rounded-xl overflow-hidden cursor-pointer"
                style={{
                  ...styles,
                  boxShadow: isCenter 
                    ? '0 20px 40px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.1)' 
                    : '0 8px 20px -8px rgba(0, 0, 0, 0.4)',
                  willChange: 'transform, filter',
                }}
                onClick={() => handleSlideClick(slide, position)}
              >
                {/* Image with smooth loading */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className={`w-full h-full object-cover ${isCenter ? 'hover:scale-105' : ''}`}
                  style={{ 
                    transition: 'transform 0.4s ease-out',
                  }}
                  draggable={false}
                />

                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                  style={{ opacity: isCenter ? 1 : 0.7 }}
                />

                {/* Content */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-4"
                  style={{
                    transform: isCenter ? 'translateY(0)' : 'translateY(10px)',
                    opacity: isCenter ? 1 : 0,
                    transition: 'all 0.4s ease-out',
                    transitionDelay: isCenter ? '0.15s' : '0s',
                  }}
                >
                  <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-white/90 text-[10px] font-semibold mb-1.5 uppercase tracking-wide">
                    {slide.category}
                  </span>
                  <h3 className="text-white text-sm md:text-base font-bold leading-tight drop-shadow-lg">
                    {slide.title}
                  </h3>
                  {slide.website && (
                    <div className="flex items-center gap-1 mt-2 text-white/70 text-xs">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Clique para visitar</span>
                    </div>
                  )}
                </div>

                {/* Glow effect on hover for center */}
                {isCenter && (
                  <div 
                    className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100"
                    style={{ 
                      transition: 'opacity 0.3s ease',
                      boxShadow: 'inset 0 0 40px rgba(100, 150, 255, 0.25)' 
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-slate-700 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Anterior"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-slate-700 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Próximo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center items-center gap-1.5 mt-5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setSlideDirection(index > currentIndex ? 'left' : 'right');
              setCurrentIndex(index);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'w-6 h-2 bg-gradient-to-r from-blue-500 to-indigo-600' 
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-2">
        <span className="text-slate-400 text-xs tracking-wider">
          <span className="text-blue-600 font-semibold">{currentIndex + 1}</span>
          <span className="mx-1">/</span>
          <span>{totalSlides}</span>
        </span>
      </div>
    </div>
  );
};

export default ImageCarousel;
