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
    return (
      <div className={`w-full h-full relative overflow-hidden flex flex-col items-center justify-center ${data.bgColor || 'bg-[#be123c]'}`}>
        {/* Fabric/Canvas Texture overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] mix-blend-overlay"></div>
        
        {/* VINTAGE BOOK BORDER (Rose Gold Frame) */}
        <div className="absolute inset-4 border-[3px] border-rose-300/40 rounded-sm pointer-events-none z-20">
             <div className="absolute inset-1 border border-rose-300/20 rounded-sm"></div>
             
             {/* Corner Ornaments */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-rose-300/40 rounded-tl-sm"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-rose-300/40 rounded-tr-sm"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-rose-300/40 rounded-bl-sm"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-rose-300/40 rounded-br-sm"></div>
        </div>

        {/* Cover Content */}
        <div className="z-40 flex flex-col items-center text-center p-8 w-full h-full justify-between py-16 relative">
          
          {/* Main Title with Book Effect */}
          {data.text && (
            <div className="relative mt-4">
                <h1 className="font-serif text-5xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-red-100 to-rose-200 tracking-widest relative z-50 font-bold uppercase" 
                    style={{ 
                       filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.5))',
                       fontFamily: 'serif',
                       lineHeight: '1.2'
                    }}>
                   {data.text}
                </h1>
            </div>
          )}

          {/* Central Decorative Element (Replaces Photo) */}
          {data.photos.length === 0 && (
            <div className="flex-1 flex items-center justify-center w-full">
                <div className="relative">
                    {/* Wreath / Circle Decoration */}
                    <div className="w-48 h-48 border-2 border-rose-300/30 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 border border-rose-300/20 rounded-full m-1"></div>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-rose-300/60 drop-shadow-sm">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                    {/* Side Flourishes */}
                    <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-10 h-[1px] bg-rose-300/40"></div>
                    <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-10 h-[1px] bg-rose-300/40"></div>
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
            <div className="flex flex-col items-center gap-2 w-full justify-center mb-4 opacity-80 relative z-50">
               <div className="w-16 h-[2px] bg-rose-300/40 rounded-full mb-2"></div>
               <p className="font-serif text-rose-100 text-lg tracking-[0.2em] font-medium uppercase">{data.subText}</p>
            </div>
          )}

        </div>

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