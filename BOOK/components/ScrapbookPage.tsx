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
      <div className={`w-full h-full relative overflow-hidden flex flex-col items-center justify-center ${data.bgColor || 'bg-[#1e293b]'}`}>
        {/* Fabric/Canvas Texture overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] mix-blend-overlay"></div>
        
        {/* TULIP VINE BORDER */}
        <div className="absolute inset-3 border-[2px] border-emerald-800/20 rounded-sm pointer-events-none z-20">
             {/* Top Left Tulip Corner */}
             <div className="absolute -top-2 -left-2 text-rose-400">
                 <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                     <path d="M10 10 Q 50 10, 50 50" stroke="#166534" strokeWidth="2" fill="none" />
                     <path d="M10 10 Q 10 50, 50 50" stroke="#166534" strokeWidth="2" fill="none" />
                     {/* Tulips */}
                     <path d="M10 10 L 5 5 M 10 10 L 15 5" stroke="#166534" strokeWidth="2" />
                     <circle cx="10" cy="10" r="4" className="fill-rose-500" />
                     <circle cx="50" cy="50" r="4" className="fill-rose-500" />
                     <circle cx="30" cy="30" r="3" className="fill-yellow-400" />
                 </svg>
             </div>
             {/* Bottom Right Tulip Corner */}
             <div className="absolute -bottom-2 -right-2 rotate-180 text-rose-400">
                 <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                     <path d="M10 10 Q 50 10, 50 50" stroke="#166534" strokeWidth="2" fill="none" />
                     <path d="M10 10 Q 10 50, 50 50" stroke="#166534" strokeWidth="2" fill="none" />
                     <circle cx="10" cy="10" r="4" className="fill-rose-500" />
                     <circle cx="50" cy="50" r="4" className="fill-rose-500" />
                     <circle cx="30" cy="30" r="3" className="fill-yellow-400" />
                 </svg>
             </div>
        </div>

        {/* Cover Content */}
        <div className="z-40 flex flex-col items-center text-center p-8 w-full relative">
          
          {/* Main Title with Garden Theme */}
          {data.text && (
            <div className="relative mb-4">
                <h1 className="font-hand text-5xl md:text-7xl text-rose-50 tracking-widest relative z-50 font-bold" 
                    style={{ 
                    textShadow: '2px 2px 0px rgba(22, 101, 52, 0.4)',
                    }}>
                {data.text}
                </h1>
                <div className="absolute -bottom-2 w-full h-3 bg-rose-300/40 -rotate-1 rounded-full blur-[1px]"></div>
            </div>
          )}

          {/* Subtitle */}
          {data.subText && (
            <div className="flex items-center gap-4 w-full justify-center mb-8 opacity-90 relative z-50">
               <span className="text-emerald-200">~ 🌷 ~</span>
               <p className="font-hand text-emerald-50 text-xl tracking-wide font-bold">{data.subText}</p>
               <span className="text-emerald-200">~ 🌷 ~</span>
            </div>
          )}

          {/* Central Photo/Window */}
          {data.photos.length > 0 && (
            <div className="relative p-3 bg-[#fdfbf7] rounded-sm shadow-2xl mb-8 transform rotate-1 hover:scale-[1.02] transition-transform duration-500 z-40">
              {/* Tape on photo */}
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

          {/* Bottom Copy/Decoration */}
          <div className="mt-4 text-emerald-100/60 font-mono text-xs tracking-[0.3em] uppercase relative z-40">
            A Garden of Memories
          </div>
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
  
  // Custom TULIP Pattern SVG Data URI (Replaces previous pattern)
  const tulipPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 25 V32 M20 32 Q23 30 24 28' stroke='%23166534' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cpath d='M17 22 Q17 28 20 29 Q23 28 23 22 Q23 22 21 23 20 21 Q19 23 17 22 Z' fill='%23fb7185' opacity='0.4'/%3E%3C/svg%3E")`;

  const paperStyle = `w-full h-full relative overflow-hidden ${
    data.pattern === 'grid' 
      ? 'bg-[size:20px_20px] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]' 
      : data.pattern === 'dots' 
        ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:20px_20px]' 
        : data.pattern === 'hearts' // Maps to Tulip pattern now
          ? 'bg-[size:40px_40px]'
          : ''
  } ${data.bgColor || 'bg-[#fff0f5]'}`;

  return (
    <div className={paperStyle} style={data.pattern === 'hearts' ? { backgroundImage: tulipPattern } : {}}>
      {/* Decorative Corner Tape - Lower Z to stay under content */}
      <WashiTape color="bg-rose-200" rotation={-45} className="-top-3 -left-8 w-32 z-10" />
      <WashiTape color="bg-green-100" rotation={45} className="-bottom-3 -right-8 w-32 z-10" />

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
          <div className="mt-8 relative z-50 bg-[#fff9fa]/95 backdrop-blur-sm p-5 pl-6 rounded-lg shadow-md transform rotate-1 max-w-[90%] border-l-4 border-rose-300 max-h-[40%] overflow-y-auto scrollbar-hide">
             {/* Internal tape for the note */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-50">
               <WashiTape color="bg-rose-200" rotation={2} className="w-16 h-5 opacity-90 shadow-sm" />
             </div>
             <p className="font-hand text-xl md:text-2xl text-gray-800 leading-relaxed text-center">
               {data.text}
             </p>
          </div>
        )}

        {/* Page Number - Z-index 20 */}
        <div className="absolute bottom-4 font-mono text-gray-400 text-[10px] tracking-widest uppercase z-20 flex items-center gap-2">
          <span>🌷</span> {data.pageNumber === 0 ? 'Cover' : `${data.pageNumber}`} <span>🌷</span>
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