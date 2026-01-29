import React, { useState, useEffect, useRef } from 'react';
import { SheetData } from '../types';
import { ScrapbookPage } from './ScrapbookPage';
import { WashiTape } from './Decorations';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface FlipbookProps {
  sheets: SheetData[];
}

// Sound effect URL (Paper slide/turn)
const PAGE_FLIP_SFX = "https://assets.mixkit.co/active_storage/sfx/2413/2413-preview.mp3";

// Placeholder Romantic Video URL
const MEMORY_VIDEO_URL = "https://res.cloudinary.com/dpuwu7fna/video/upload/v1769692681/us_fpfein.mov";

export const Flipbook: React.FC<FlipbookProps> = ({ sheets }) => {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  
  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(PAGE_FLIP_SFX);
    if(audioRef.current) {
        audioRef.current.volume = 0.4;
    }
  }, []);

  const playFlipSound = () => {
    if (audioRef.current) {
        // Clone node allows playing overlapping sounds if flipped quickly
        const sound = audioRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = 0.4;
        sound.play().catch(e => console.log("Audio play failed (user interaction needed first)", e));
    }
  };

  const nextSheet = () => {
    if (currentSheetIndex < sheets.length) {
      playFlipSound();
      setCurrentSheetIndex(prev => prev + 1);
    }
  };

  const prevSheet = () => {
    if (currentSheetIndex > 0) {
      playFlipSound();
      setCurrentSheetIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !showVideo) nextSheet();
      if (e.key === 'ArrowLeft' && !showVideo) prevSheet();
      if (e.key === 'Escape' && showVideo) setShowVideo(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSheetIndex, showVideo]);

  // Determine if we are at the end
  const isAtEnd = currentSheetIndex === sheets.length;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] w-full max-w-7xl mx-auto px-4 pt-24 md:pt-16">
      
      {/* --- NOTIFICATION AREA (ABOVE BOOK) --- */}

      {/* 1. iOS Style Notification Trigger (Visible when at end, and video not yet shown) */}
      {isAtEnd && !showVideo && (
        <div 
          onClick={() => setShowVideo(true)}
          className="absolute top-0 md:-top-4 left-1/2 z-[90] animate-slide-down cursor-pointer w-full max-w-[380px] px-4"
        >
           <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-3.5 transition-transform hover:scale-[1.02] active:scale-95 group">
              
              {/* Icon Circle */}
              <div className="w-12 h-12 rounded-full bg-[#FF9F0A] shrink-0 shadow-sm group-hover:animate-pulse"></div>
              
              {/* Text Content */}
              <div className="flex-1 min-w-0 font-sans">
                 <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[15px] font-bold text-gray-900 truncate pr-1">
                      Our Memories <span className="font-normal text-gray-700">started a live video.</span>
                    </h3>
                    <span className="text-[13px] text-[#007AFF] font-medium whitespace-nowrap">now</span>
                 </div>
                 <p className="text-[14px] text-gray-500 truncate leading-tight">
                   Watch it before it ends!
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* 2. Actual Video Player (Polaroid Style - appears when notification clicked) */}
      {showVideo && (
        <div className="absolute top-2 md:top-6 left-1/2 z-[80] animate-zoom-in w-full flex justify-center">
           <div className="relative bg-white p-4 pb-16 shadow-2xl rounded-sm transform -rotate-1 w-[90vw] md:w-[600px] border border-gray-200">
              
              {/* Decorative Tape holding the video */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                 <WashiTape color="bg-rose-300" rotation={2} className="w-48 h-10 shadow-md" />
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute -right-4 -top-4 bg-white text-rose-500 rounded-full p-2 shadow-lg hover:scale-110 hover:bg-rose-50 transition border border-rose-100 z-30"
              >
                 <X size={24} />
              </button>

              {/* Video Player Container */}
              <div className="bg-black rounded-sm overflow-hidden aspect-video shadow-inner relative group border border-gray-100">
                 <video 
                    src={MEMORY_VIDEO_URL} 
                    className="w-full h-full object-cover"
                    controls 
                    autoPlay
                 >
                    Your browser does not support the video tag.
                 </video>
              </div>

              {/* Handwritten Caption */}
              <div className="absolute bottom-3 left-0 w-full text-center">
                 <p className="font-hand text-3xl text-gray-700">Our Favorite Moments ❤️</p>
              </div>
           </div>
        </div>
      )}

      {/* --- 3D BOOK --- */}
      <div 
        className={`relative w-full md:w-[850px] aspect-[3/2] transition-all duration-700 ${showVideo ? 'translate-y-56 scale-[0.85] opacity-40 blur-[3px]' : 'translate-y-0 scale-100 opacity-100'}`}
        style={{ perspective: '2500px' }}
      >
        
        {/* Book Spine / Base Plate (Decoration) */}
        <div className="absolute top-[2%] bottom-[2%] left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-sm shadow-2xl z-0 blur-[1px]"></div>

        {/* Sheets */}
        <div className="absolute inset-0 preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
            {sheets.map((sheet, index) => {
              const isFlipped = index < currentSheetIndex;
              
              // STACKING PHYSICS
              const thickness = 1.0; 
              
              let zTranslate = 0;
              if (isFlipped) {
                // Left Stack: Top item is last index
                zTranslate = -1 * index * thickness;
              } else {
                // Right Stack: Top item is current index
                zTranslate = (sheets.length - index) * thickness;
              }

              const zIndex = isFlipped ? index : (sheets.length - index);
              const transitionStyle = "transform 900ms cubic-bezier(0.2, 0.1, 0.15, 1)";

              return (
                <div
                  key={`sheet-${index}`}
                  className="absolute top-0 left-[50%] w-[50%] h-full origin-left cursor-pointer group"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${isFlipped ? -180 : 0}deg) translateZ(${zTranslate}px)`,
                    zIndex: zIndex,
                    transition: transitionStyle,
                  }}
                  onClick={() => {
                    if (isFlipped) {
                      if (index === currentSheetIndex - 1) prevSheet();
                    } else {
                      if (index === currentSheetIndex) nextSheet();
                    }
                  }}
                >
                  {/* FRONT FACE (Right Page) */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-[#fdfbf7] rounded-r-lg overflow-hidden shadow-sm border-y border-r border-gray-200"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                     <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10 mix-blend-multiply" />
                     <div className="absolute inset-0 bg-gradient-to-l from-black/5 via-transparent to-black/5 pointer-events-none z-10" />
                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                     
                     <ScrapbookPage data={sheet.front} isActive={!isFlipped && index === currentSheetIndex} />
                  </div>

                  {/* BACK FACE (Left Page) */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-[#fdfbf7] rounded-l-lg overflow-hidden shadow-sm border-y border-l border-gray-200"
                    style={{ 
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden' 
                    }}
                  >
                     <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-10 mix-blend-multiply" />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none z-10" />
                     <div className="absolute inset-0 bg-gradient-to-bl from-white/20 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                     <ScrapbookPage data={sheet.back} isActive={isFlipped && index === currentSheetIndex - 1} />
                  </div>
                </div>
              );
            })}
        </div>

      </div>

      {/* Controls */}
      <div className={`mt-8 flex items-center gap-6 z-50 bg-white/50 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/60 transition-opacity duration-500 ${isAtEnd || showVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button
          onClick={prevSheet}
          disabled={currentSheetIndex === 0}
          className="p-3 rounded-full bg-white hover:bg-pink-50 text-pink-600 shadow-sm disabled:opacity-30 disabled:hover:bg-white transition-all hover:scale-110 active:scale-95"
          aria-label="Previous Page"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center px-4">
             <span className="font-hand font-bold text-lg text-gray-700">
               {currentSheetIndex === 0 
                  ? "Cover" 
                  : isAtEnd 
                    ? "The End" 
                    : `Spread ${currentSheetIndex} / ${sheets.length}`
               }
             </span>
        </div>
        
        <button
          onClick={nextSheet}
          disabled={currentSheetIndex === sheets.length}
          className="p-3 rounded-full bg-white hover:bg-pink-50 text-pink-600 shadow-sm disabled:opacity-30 disabled:hover:bg-white transition-all hover:scale-110 active:scale-95"
          aria-label="Next Page"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
};