import React from 'react';
import { PageData } from '../types';
import { PolaroidFrame, WashiTape, StickerIcon } from './Decorations';

interface ScrapbookPageProps {
  data: PageData;
  isActive: boolean;
}

export const ScrapbookPage: React.FC<ScrapbookPageProps> = ({ data, isActive }) => {
  // Special rendering for Cover Layout
  if (data.layout === 'cover') {
    const isBackCover = data.id === 'cover-back';

    return (
      <div className={`w-full h-full relative overflow-hidden flex flex-col items-center justify-center ${data.bgColor || 'bg-[#be123c]'}`}>
        {/* Fabric/Canvas Texture overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] mix-blend-overlay"></div>
        
        {/* VINTAGE BOOK BORDER (Gold/Rose Frame) */}
        <div className="absolute inset-4 border-[3px] border-[#fbbf24] opacity-50 rounded-sm pointer-events-none z-20">
             <div className="absolute inset-1 border border-[#fbbf24] opacity-30 rounded-sm"></div>
             
             {/* Corner Ornaments */}
             <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-[#fbbf24] rounded-tl-sm opacity-60"></div>
             <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-[#fbbf24] rounded-tr-sm opacity-60"></div>
             <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-[#fbbf24] rounded-bl-sm opacity-60"></div>
             <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-[#fbbf24] rounded-br-sm opacity-60"></div>
        </div>

        {isBackCover ? (
          // --- BACK COVER DESIGN (Unique Note Card Style) ---
          <div className="z-40 flex flex-col items-center justify-center h-full w-full relative p-6">
              
              {/* Taped Note Card */}
              <div className="bg-[#fffdf5] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transform rotate-1 relative max-w-sm w-full mx-auto border border-stone-200">
                  {/* Tape */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <WashiTape color="bg-rose-300" rotation={-2} className="w-32 h-8 shadow-sm" />
                  </div>

                  {/* The Question */}
                  <div className="flex flex-col items-center gap-4 mt-2">
                      <p className="font-hand text-3xl md:text-4xl text-center text-gray-800 leading-relaxed font-bold">
                        {data.text || "Would you be my Valentine?"}
                      </p>
                      
                      <div className="w-16 h-[2px] bg-rose-200 rounded-full"></div>

                      {/* Cute Checkboxes */}
                      <div className="flex flex-col gap-3 w-full pl-6 mt-2 font-marker text-xl text-gray-600">
                          <div className="flex items-center gap-3 group cursor-pointer">
                              <div className="w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center bg-white group-hover:border-rose-400 transition-colors">
                                <span className="text-rose-500 font-bold transform -rotate-12 scale-125">✓</span>
                              </div>
                              <span className="group-hover:text-rose-500 transition-colors">Yes!</span>
                          </div>
                          <div className="flex items-center gap-3 group cursor-pointer">
                              <div className="w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center bg-white group-hover:border-rose-400 transition-colors">
                                <span className="text-rose-500 font-bold transform -rotate-12 scale-125">✓</span>
                              </div>
                              <span className="group-hover:text-rose-500 transition-colors">Absolutely!</span>
                          </div>
                      </div>
                      
                      {/* Signature */}
                      <div className="self-end mt-4 text-gray-400 font-serif italic text-sm">
                         — from me to you
                      </div>
                  </div>
              </div>

              {/* Book Footer / Barcode */}
              <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
                  <div className="font-mono text-[10px] text-amber-200 tracking-[0.3em] uppercase">Limited Edition • 2025</div>
                  {/* Fake Barcode - FIXED: Using inline styles for width to avoid Tailwind JIT issues */}
                  <div className="flex items-end gap-[2px] h-8 mix-blend-screen opacity-80">
                      {[4,2,3,1,4,2,1,3,2,4,1,2,3,4,2,1].map((w, i) => (
                          <div key={i} className="bg-amber-100 h-full" style={{ width: `${w * 3}px` }}></div>
                      ))}
                  </div>
              </div>

          </div>
        ) : (
          // --- FRONT COVER DESIGN (Standard Title) ---
          <div className="z-40 flex flex-col items-center text-center p-8 w-full h-full justify-between py-16 relative">
            
            {/* Main Title with Book Effect */}
            {data.text && (
              <div className="relative mt-8">
                  <h1 className="font-serif text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-amber-100 to-amber-300 tracking-widest relative z-50 font-bold uppercase" 
                      style={{ 
                        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.6))',
                        fontFamily: 'serif',
                        lineHeight: '1.2',
                        letterSpacing: '0.1em'
                      }}>
                    {data.text}
                  </h1>
                  <div className="w-32 h-[1px] bg-amber-200/50 mx-auto mt-4 shadow-sm"></div>
              </div>
            )}

            {/* Central Decorative Element (Replaces Photo) */}
            {data.photos.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 my-4">
                  {/* Big Ornate Heart */}
                  <div className="relative w-64 h-64 flex items-center justify-center">
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl text-rose-300/80 animate-pulse" style={{ animationDuration: '3s' }}>
                          {/* Decorative Flourishes */}
                          <defs>
                            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fca5a5" />
                              <stop offset="100%" stopColor="#e11d48" />
                            </linearGradient>
                          </defs>
                          
                          {/* Outer Heart Outline */}
                          <path fill="none" stroke="url(#heartGradient)" strokeWidth="1.5" d="M100,175 C40,125 10,85 10,50 C10,25 30,10 55,10 C75,10 90,25 100,40 C110,25 125,10 145,10 C170,10 190,25 190,50 C190,85 160,125 100,175 Z" opacity="0.6" />
                          
                          {/* Inner Heart Filled */}
                          <path fill="url(#heartGradient)" d="M100,165 C45,115 20,80 20,50 C20,30 35,20 55,20 C70,20 85,30 95,45 L100,55 L105,45 C115,30 130,20 145,20 C165,20 180,30 180,50 C180,80 155,115 100,165 Z" opacity="0.9" />
                          
                          {/* Shine */}
                          <ellipse cx="60" cy="50" rx="15" ry="8" fill="white" opacity="0.2" transform="rotate(-45, 60, 50)" />
                      </svg>
                      
                      {/* Center Text/Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pt-4">
                        <span className="font-serif italic text-white text-5xl font-bold drop-shadow-md opacity-90">Us</span>
                      </div>
                  </div>
              </div>
            )}

            {/* Photo fallback (if photo still exists in data) */}
            {data.photos.length > 0 && (
              <div className="relative p-3 bg-[#fdfbf7] rounded-sm shadow-2xl mb-8 transform rotate-1 hover:scale-[1.02] transition-transform duration-500 z-40">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/80 rotate-1 shadow-sm z-50"></div>
                <div className="p-1 border border-gray-200">
                  <img 
                    src={data.photos[0].url} 
                    alt="Cover" 
                    className="w-48 h-64 object-cover filter contrast-110 saturate-[0.8]"
                  />
                </div>
              </div>
            )}

            {/* Subtitle / Footer */}
            {data.subText && (
              <div className="flex flex-col items-center gap-2 w-full justify-center mb-8 opacity-90 relative z-50">
                <div className="w-8 h-[2px] bg-amber-200/50 rounded-full mb-2"></div>
                <p className="font-serif text-amber-100 text-sm md:text-base tracking-[0.3em] font-medium uppercase">{data.subText}</p>
              </div>
            )}

          </div>
        )}

        {/* Stickers for Cover (background decoration) */}
        {data.stickers.map((sticker) => (
            <div
            key={sticker.id}
            className="absolute z-30 pointer-events-none"
            style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            }}
            >
            <StickerIcon type={sticker.type} content={sticker.content} />
            </div>
        ))}
      </div>
    );
  }

  // STANDARD INTERNAL PAGE RENDERING
  
  // Custom TULIP/HEART Pattern SVG Data URI
  const heartPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L23 17 Q25 15 26 17 Q27 19 23 23 L20 26 L17 23 Q13 19 14 17 Q15 15 17 17 Z' fill='%23fb7185' opacity='0.2'/%3E%3C/svg%3E")`;

  const paperStyle = `w-full h-full relative overflow-hidden ${
    data.pattern === 'grid' 
      ? 'bg-[size:20px_20px] bg-[linear-gradient(to_right,#fda4af_1px,transparent_1px),linear-gradient(to_bottom,#fda4af_1px,transparent_1px)]' // Pink Grid
      : data.pattern === 'dots' 
        ? 'bg-[radial-gradient(#f43f5e_1px,transparent_1px)] bg-[size:20px_20px]' // Red dots
        : data.pattern === 'hearts' 
          ? 'bg-[size:40px_40px]'
          : ''
  } ${data.bgColor || 'bg-[#fff0f5]'}`;

  return (
    <div className={paperStyle} style={data.pattern === 'hearts' ? { backgroundImage: heartPattern } : {}}>
      {/* Decorative Corner Tape - Lower Z to stay under content */}
      <WashiTape color="bg-rose-300" rotation={-45} className="-top-3 -left-8 w-32 z-10" />
      <WashiTape color="bg-red-200" rotation={45} className="-bottom-3 -right-8 w-32 z-10" />

      {/* Content Container */}
      <div className="p-6 md:p-10 h-full flex flex-col items-center justify-center relative">
        
        {/* Photos Container - Z-Index 40 to be above stickers */}
        <div className={`flex flex-wrap gap-6 items-center justify-center w-full transition-all duration-500 delay-100 relative z-40 ${isActive ? 'opacity-100 scale-100' : 'opacity-90 scale-[0.98]'}`}>
          {data.photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <PolaroidFrame rotation={photo.rotation} className="max-w-[140px] md:max-w-[180px]">
                <img 
                  src={photo.url} 
                  alt="Memory" 
                  className="w-full h-auto aspect-square object-cover filter contrast-[1.05] hover:sepia-0 transition-all duration-500" 
                />
              </PolaroidFrame>
              
              {/* Handwritten Caption */}
              {photo.caption && (
                <div 
                  className="absolute -bottom-10 left-0 w-full text-center font-hand text-gray-700 text-lg md:text-xl leading-6 -rotate-1 bg-white/50 backdrop-blur-[1px] px-2 py-1 rounded-sm shadow-sm"
                  style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.8)' }}
                >
                   {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Text Area - Z-Index 50 (HIGHEST) to ensure readability */}
        {data.text && (
          <div className="mt-8 relative z-50 bg-[#fff9fa]/95 backdrop-blur-sm p-5 pl-6 rounded-lg shadow-md transform rotate-1 max-w-[90%] border-l-4 border-rose-400 max-h-[40%] overflow-y-auto scrollbar-hide">
             {/* Internal tape for the note */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50">
               <WashiTape color="bg-rose-300" rotation={2} className="w-16 h-5 opacity-90 shadow-sm" />
             </div>
             <p className="font-hand text-xl md:text-2xl text-gray-800 leading-relaxed text-center">
               {data.text}
             </p>
          </div>
        )}

        {/* Page Number - Z-index 20 */}
        <div className="absolute bottom-4 font-mono text-rose-300 text-[10px] tracking-widest uppercase z-20 flex items-center gap-2">
          <span>❤️</span> {data.pageNumber === 0 ? 'Cover' : `${data.pageNumber}`} <span>❤️</span>
        </div>
      </div>

      {/* Stickers (Absolute Positioned) - Z-Index 30 (Between paper and content) */}
      {data.stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute z-30 pointer-events-none"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
          }}
        >
          <StickerIcon type={sticker.type} content={sticker.content} />
        </div>
      ))}
    </div>
  );
};