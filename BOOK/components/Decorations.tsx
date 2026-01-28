import React, { useMemo } from 'react';

interface WashiTapeProps {
  color?: string;
  rotation?: number;
  className?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({ color = "bg-rose-200", rotation = 0, className = "" }) => (
  <div 
    className={`absolute h-8 w-28 opacity-90 shadow-sm ${color} ${className}`}
    style={{ 
      transform: `rotate(${rotation}deg)`,
      // Jagged edges
      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 98% 5%, 100% 8%, 98% 10%, 100% 15%, 98% 90%, 100% 95%, 98% 100%, 2% 100%, 0% 98%, 2% 95%, 0% 90%, 2% 10%, 0% 8%, 2% 5%, 0% 2%)',
      backdropFilter: 'blur(2px)',
      mixBlendMode: 'multiply'
    }}
  >
    {/* Floral Pattern Texture on Tape */}
    <div className="absolute inset-0 opacity-30" style={{ 
        backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)',
        backgroundSize: '12px 12px'
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
    {/* Small Tulip Accent on the polaroid frame */}
    <div className="absolute bottom-2 right-3 opacity-30 text-rose-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2C9 2 8 6 8 9C8 12 10 13 12 13C14 13 16 12 16 9C16 6 15 2 12 2Z" />
           <path d="M12 13V22" stroke="currentColor" strokeWidth="1.5" />
           <path d="M12 22C12 22 16 20 16 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
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
  let moveAnimation = "animate-sway"; // Default to sway for flowers
  if (type === 'butterfly') moveAnimation = "animate-float";
  if (type === 'sparkle' || type === 'star') moveAnimation = "animate-twinkle";
  if (type === 'emoji') moveAnimation = "animate-wiggle";

  const styleWithDelay = { animationDelay: randomDelay };

  // Render Logic: Mapping types to FRESH FLOWERS
  const renderContent = () => {
    
    // 1. DAISY (Replaces Star/Sparkle)
    if (type === 'star' || type === 'sparkle') {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`text-white w-12 h-12 drop-shadow-md ${interactClasses} ${className}`}>
           <circle cx="12" cy="12" r="3" className="text-yellow-400" />
           {/* Petals */}
           <path d="M12 2C12.8 2 13.5 5 13.5 8.5C13.5 8.8 13.4 9 13.3 9.3C15 8.3 18 7.5 18 8.5C18 9 16 10.5 14.5 11.2C17 11.5 19.5 12.5 19.5 13.5C19.5 14.5 16 15 14.2 15C15.5 17 16.5 20 15.5 20.5C14.5 21 13 17.5 12.2 16C11 19 9.5 21 8.5 20.5C7.5 20 8.5 16.5 9.5 15C7 15.5 4 15.5 4 14.5C4 13.5 7 12 9.2 11.5C7 10.5 5.5 8.5 6 8C6.5 7.5 9.5 8.5 10.8 9.5C10.6 9.2 10.5 8.9 10.5 8.5C10.5 5 11.2 2 12 2Z" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5"/>
        </svg>
      );
    }

    // 2. SUNFLOWER (Replaces generic Flower)
    if (type === 'flower') {
        return (
            <svg viewBox="0 0 24 24" className={`w-14 h-14 drop-shadow-md ${interactClasses} ${className}`}>
                <circle cx="12" cy="12" r="4" className="text-amber-800 fill-current" />
                <path d="M12 2L13 7L16 3L16 8L20 6L18 10L22 12L18 14L20 18L16 16L16 21L13 17L12 22L11 17L8 21L8 16L4 18L6 14L2 12L6 10L4 6L8 8L8 3L11 7L12 2Z" className="text-yellow-400 fill-current -z-10" />
            </svg>
        )
    }

    // 3. TULIP (Replaces Heart/Lips - The Main Theme)
    if (type === 'heart' || type === 'lips') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`w-14 h-14 drop-shadow-md ${interactClasses} ${className}`}>
           {/* Stem */}
           <path d="M12 14V22" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
           <path d="M12 22C12 22 18 20 18 14" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
           
           {/* Tulip Head */}
           <path d="M7 4C7 4 7 12 12 14C17 12 17 4 17 4C17 4 14.5 5 12 2C9.5 5 7 4 7 4Z" className="fill-pink-500" />
           <path d="M12 14V4" className="stroke-pink-600/20" strokeWidth="1" />
        </svg>
      );
    }

    // 4. LILY / ORCHID (Replaces Bow)
    if (type === 'bow') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={`text-fuchsia-300 w-14 h-14 drop-shadow-md ${interactClasses} ${className}`}>
                <path d="M12 18C10 14 6 12 2 12C6 12 10 10 12 6C14 10 18 12 22 12C18 12 14 14 12 18Z" className="fill-white"/>
                <path d="M12 12L10 14M12 12L14 14M12 12L12 15" stroke="orange" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 8Q12 12 16 8" className="fill-fuchsia-300 opacity-80" />
                <path d="M8 16Q12 12 16 16" className="fill-fuchsia-300 opacity-80" />
            </svg>
        );
    }

    // 5. LAVENDER / FERN (Replaces Arrow/Swirl)
    if (type === 'arrow' || type === 'swirl') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-purple-500 w-16 h-16 opacity-90 ${interactClasses} ${className}`}>
                {/* Stem */}
                <path d="M12 22C12 22 14 15 12 4" stroke="#15803d" />
                {/* Leaves/Buds */}
                <circle cx="10" cy="18" r="1.5" className="fill-purple-400 stroke-none"/>
                <circle cx="14" cy="16" r="1.5" className="fill-purple-400 stroke-none"/>
                <circle cx="11" cy="14" r="1.5" className="fill-purple-400 stroke-none"/>
                <circle cx="13" cy="12" r="1.5" className="fill-purple-500 stroke-none"/>
                <circle cx="11" cy="10" r="1.5" className="fill-purple-500 stroke-none"/>
                <circle cx="13" cy="8" r="1.5" className="fill-purple-600 stroke-none"/>
                <circle cx="12" cy="5" r="1.5" className="fill-purple-600 stroke-none"/>
            </svg>
        )
    }

    // 6. ROSE (Kept but refined)
    if (type === 'rose') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`text-rose-600 w-16 h-16 drop-shadow-sm ${interactClasses} ${className}`}>
           <circle cx="12" cy="10" r="6" className="fill-rose-500" />
           <path d="M12 10l-2 -2m2 2l2 -2m-2 2l-2 2m2 -2l2 2" stroke="rgba(255,255,255,0.3)" />
           <path d="M12 16L12 22" stroke="#15803d" strokeWidth="2" />
           <path d="M12 19L9 17" stroke="#15803d" strokeWidth="2" />
           <path d="M12 21L15 19" stroke="#15803d" strokeWidth="2" />
        </svg>
      );
    }

    // 7. PRESSED FLOWER CARD (Replaces Letter/Ticket)
    if (type === 'letter' || type === 'ticket') {
        return (
            <div className={`relative bg-[#fdfbf7] w-14 h-16 shadow-md border border-gray-200 p-1 flex items-center justify-center ${interactClasses} ${className}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-100/50 rounded-full blur-md"></div>
                {/* Tiny Dried Flower SVG */}
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-amber-600">
                    <path d="M12 4L14 10L20 12L14 14L12 20L10 14L4 12L10 10L12 4Z" fill="currentColor" opacity="0.6"/>
                    <path d="M12 20V24" stroke="green" />
                </svg>
            </div>
        )
    }

    // 8. BUTTERFLY (Kept)
    if (type === 'butterfly') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={`text-blue-300 w-12 h-12 drop-shadow-sm ${interactClasses} ${className}`}>
               <path d="M12 21s-1-3-1-6 1-6 1-6 1 3 1 6-1 6-1 6z" className="text-blue-800"/>
               <path d="M11 15c-4 4-8-1-8-5s3-6 8-3" className="fill-blue-100 opacity-80"/>
               <path d="M13 15c4 4 8-1 8-5s-3-6-8-3" className="fill-blue-100 opacity-80"/>
            </svg>
        );
    }

    if (type === 'emoji') {
      return <span className={`text-4xl drop-shadow-md select-none inline-block ${interactClasses} ${className}`}>{content}</span>;
    }
    
    // Default fallback to tape
    if (type === 'tape') {
       return <div className={`w-8 h-4 bg-green-100/60 rotate-45 border border-white/40 ${interactClasses} ${className}`}></div>
    }

    return null;
  };

  return (
    <div className={`${moveAnimation}`} style={styleWithDelay}>
      {renderContent()}
    </div>
  );
};