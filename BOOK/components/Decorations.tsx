import React, { useMemo } from 'react';

interface WashiTapeProps {
  color?: string;
  rotation?: number;
  className?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({ color = "bg-rose-300", rotation = 0, className = "" }) => (
  <div 
    className={`absolute h-8 w-28 opacity-95 shadow-sm ${color} ${className}`}
    style={{ 
      transform: `rotate(${rotation}deg)`,
      // Jagged edges
      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 98% 5%, 100% 8%, 98% 10%, 100% 15%, 98% 90%, 100% 95%, 98% 100%, 2% 100%, 0% 98%, 2% 95%, 0% 90%, 2% 10%, 0% 8%, 2% 5%, 0% 2%)',
      backdropFilter: 'blur(2px)',
    }}
  >
    {/* Heart Pattern Texture on Tape */}
    <div className="absolute inset-0 opacity-40" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='white'/%3E%3C/svg%3E")`,
        backgroundSize: '16px 16px',
        backgroundRepeat: 'space'
    }}></div>
  </div>
);

interface PolaroidFrameProps {
  children: React.ReactNode;
  rotation?: number;
  className?: string;
}

export const PolaroidFrame: React.FC<PolaroidFrameProps> = ({ children, rotation = 0, className = "" }) => (
  <div 
    className={`bg-white p-3 pb-10 shadow-lg transform transition-transform hover:scale-105 duration-300 ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <div className="overflow-hidden bg-gray-50 border border-gray-100">
      {children}
    </div>
    {/* Heart Doodle Accent on the polaroid frame */}
    <div className="absolute bottom-3 right-3 opacity-60 text-rose-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    </div>
  </div>
);

interface StickerIconProps {
  type: string;
  content?: string;
  className?: string;
}

export const StickerIcon: React.FC<StickerIconProps> = ({ type, content, className = "" }) => {
  // Base interaction classes (hover effects)
  const interactClasses = "transform transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer ease-out active:scale-95";

  // Generate a random delay between 0 and 2 seconds
  const randomDelay = useMemo(() => `${Math.random() * 2}s`, []);

  // Determine continuous animation
  let moveAnimation = "animate-sway"; 
  if (type === 'sparkle' || type === 'star') moveAnimation = "animate-twinkle";
  if (type === 'emoji') moveAnimation = "animate-wiggle";
  if (type === 'arrow') moveAnimation = "animate-float";

  const styleWithDelay = { animationDelay: randomDelay };

  // --- VALENTINE THEMED STICKERS ---
  const renderContent = () => {
    
    // 1. DOODLE HEART (Replaces Star/Sparkle generic)
    if (type === 'star' || type === 'sparkle') {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`text-rose-400 w-10 h-10 drop-shadow-md ${interactClasses} ${className}`}>
           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="fill-pink-400" stroke="white" strokeWidth="1.5" strokeDasharray="2 1"/>
           {/* Sparkle lines */}
           <path d="M2 2L4 4M20 2L18 4" stroke="gold" strokeWidth="2" />
        </svg>
      );
    }

    // 2. ROSE (Valentine classic)
    if (type === 'flower' || type === 'rose') {
        return (
            <svg viewBox="0 0 24 24" className={`w-14 h-14 drop-shadow-md ${interactClasses} ${className}`}>
                {/* Stem */}
                <path d="M12 22C12 22 14 16 12 12" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 16C12 16 15 15 16 13" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 19C12 19 9 18 8 16" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Flower */}
                <circle cx="12" cy="10" r="5" className="fill-red-600" />
                <path d="M12 10l-2 -2m2 2l2 -2m-2 2l-2 2m2 -2l2 2" stroke="rgba(255,100,100,0.5)" />
                <path d="M12 5C15 5 17 8 17 10C17 14 12 15 12 15C12 15 7 14 7 10C7 8 9 5 12 5Z" className="fill-red-500 opacity-80" />
            </svg>
        )
    }

    // 3. KISS / LIPS
    if (type === 'lips' || type === 'kiss') {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-10 text-rose-500 drop-shadow-md ${interactClasses} ${className}`}>
           <path d="M12 15c-3 0-5 2-8 0-1-1-1-2 0-3 2-2 6-1 8 1 2-2 6-3 8-1 1 1 1 2 0 3-3 2-5 0-8 0z" className="fill-red-500"/>
           <path d="M12 15c-2 3-5 3-7 2 3 2 6 1 7-2 1 3 4 4 7 2-2 1-5 1-7-2z" className="fill-red-600"/>
        </svg>
      );
    }

    // 4. HEART BALLOON (Replaces Bow)
    if (type === 'bow') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={`text-pink-400 w-14 h-16 drop-shadow-md ${interactClasses} ${className}`}>
                <path d="M12 22V14" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 1" />
                <path d="M12 14.5 C 19 10 20 4 12 4 C 4 4 5 10 12 14.5 Z" className="fill-rose-300"/>
                <circle cx="10" cy="8" r="1.5" className="fill-white opacity-40"/>
            </svg>
        );
    }

    // 5. CUPID ARROW (Replaces Arrow/Swirl)
    if (type === 'arrow' || type === 'swirl') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-red-500 w-16 h-16 ${interactClasses} ${className}`}>
                {/* Shaft */}
                <path d="M5 19L19 5" />
                {/* Arrow Head (Heart) */}
                <path d="M19 5 L17 9 M19 5 L15 7" />
                <path d="M19 5 C 21 3 22 4 19 7 C 18 6 18 6 19 5" className="fill-red-500 stroke-none"/>
                {/* Feathers */}
                <path d="M5 19 L7 21" />
                <path d="M5 19 L3 17" />
                <path d="M7 17 L9 19" />
            </svg>
        )
    }

    // 6. LOVE LETTER (Replaces Letter/Ticket)
    if (type === 'letter' || type === 'ticket') {
        return (
            <div className={`relative bg-white w-14 h-10 shadow-md border border-gray-100 flex items-center justify-center transform rotate-3 ${interactClasses} ${className}`}>
                {/* Envelope Lines */}
                <div className="absolute inset-0 border-t border-gray-200"></div>
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-r-[28px] border-t-transparent border-r-gray-50"></div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-l-[28px] border-t-transparent border-l-gray-50"></div>
                
                {/* Wax Seal */}
                <div className="absolute z-10 w-4 h-4 bg-red-600 rounded-full shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-800 rounded-full opacity-50"></div>
                </div>
            </div>
        )
    }

    // 7. HEART (Standard)
    if (type === 'heart') {
       return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`text-rose-500 w-12 h-12 drop-shadow-sm ${interactClasses} ${className}`}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
       )
    }

    // 8. BUTTERFLY (Keep, make pink)
    if (type === 'butterfly') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={`text-pink-300 w-12 h-12 drop-shadow-sm ${interactClasses} ${className}`}>
               <path d="M12 21s-1-3-1-6 1-6 1-6 1 3 1 6-1 6-1 6z" className="text-rose-800"/>
               <path d="M11 15c-4 4-8-1-8-5s3-6 8-3" className="fill-pink-100 opacity-80"/>
               <path d="M13 15c4 4 8-1 8-5s-3-6-8-3" className="fill-pink-100 opacity-80"/>
            </svg>
        );
    }
    
    // 9. TEDDY BEAR (New Cute Ornament)
    if (type === 'teddy') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={`text-amber-600 w-14 h-14 drop-shadow-md ${interactClasses} ${className}`}>
                {/* Ears */}
                <circle cx="5" cy="5" r="3" className="fill-amber-700"/>
                <circle cx="19" cy="5" r="3" className="fill-amber-700"/>
                {/* Head */}
                <circle cx="12" cy="10" r="8" className="fill-amber-600"/>
                {/* Eyes */}
                <circle cx="9" cy="8" r="1" className="fill-black"/>
                <circle cx="15" cy="8" r="1" className="fill-black"/>
                {/* Snout */}
                <ellipse cx="12" cy="11" rx="2.5" ry="2" className="fill-amber-200"/>
                <circle cx="12" cy="10.5" r="0.8" className="fill-black"/>
                {/* Mouth */}
                <path d="M11 12 Q12 13 13 12" stroke="black" strokeWidth="0.5" fill="none"/>
                {/* Body */}
                <path d="M7 16 C6 22 18 22 17 16" className="fill-amber-600"/>
                 {/* Arms */}
                <circle cx="5" cy="18" r="2.5" className="fill-amber-700"/>
                <circle cx="19" cy="18" r="2.5" className="fill-amber-700"/>
            </svg>
        );
    }

    if (type === 'emoji') {
      return <span className={`text-4xl drop-shadow-md select-none inline-block ${interactClasses} ${className}`}>{content}</span>;
    }
    
    // Default fallback to tape (Pink)
    if (type === 'tape') {
       return <div className={`w-8 h-4 bg-rose-300/60 rotate-45 border border-white/40 shadow-sm ${interactClasses} ${className}`}></div>
    }

    return null;
  };

  return (
    <div className={`${moveAnimation}`} style={styleWithDelay}>
      {renderContent()}
    </div>
  );
};