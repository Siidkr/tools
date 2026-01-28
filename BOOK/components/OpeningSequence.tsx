import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

interface OpeningSequenceProps {
  onOpen: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onOpen }) => {
  // States: 'closed' -> 'opening' (flap moves) -> 'reading' (letter slides out) -> 'exiting' (fade out)
  const [stage, setStage] = useState<'closed' | 'opening' | 'reading' | 'exiting'>('closed');

  const handleOpenEnvelope = () => {
    if (stage !== 'closed') return;
    
    setStage('opening');
    
    // After flap opens, slide the letter out
    setTimeout(() => {
      setStage('reading');
    }, 600);
  };

  const handleEnterApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStage('exiting');
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fdf2f8] transition-opacity duration-1000 ${stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-pink-200/60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random()})`
            }}
          >
            <Heart fill="currentColor" size={40 + Math.random() * 40} />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">
        
        {/* ENVELOPE CONTAINER */}
        <div 
          onClick={handleOpenEnvelope}
          className={`relative w-80 h-52 transition-all duration-700 transform ${stage === 'reading' ? 'translate-y-24' : 'cursor-pointer hover:scale-105'} ${stage === 'exiting' ? 'scale-110 opacity-0' : ''}`}
        >
          {/* 1. Envelope Inside (Liner/Back) */}
          <div className="absolute inset-0 bg-[#fce7f3] rounded-md shadow-2xl overflow-hidden border border-rose-100">
             {/* Diagonal Stripes Pattern for the Liner */}
             <div className="absolute inset-0 opacity-20" style={{ 
                 backgroundImage: 'repeating-linear-gradient(45deg, #be185d 0, #be185d 1px, transparent 0, transparent 15px)' 
             }}></div>
          </div>

          {/* 2. THE LETTER */}
          <div 
            className={`absolute left-4 right-4 bg-[#fffdf7] shadow-sm transition-all duration-[1500ms] ease-in-out flex flex-col p-6 items-center
              ${stage === 'closed' ? 'top-4 bottom-4 z-10 opacity-0' : ''}
              ${stage === 'opening' ? 'top-4 bottom-4 z-10' : ''}
              /* Slide up animation */
              ${stage === 'reading' ? '-top-[420px] bottom-auto min-h-[480px] w-[340px] -left-2 z-50 scale-100 rotate-1 shadow-2xl rounded-lg' : ''}
            `}
            style={{
                backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
                backgroundSize: '100% 24px',
                lineHeight: '24px'
            }}
          >
             {/* Content of the Letter */}
             <div className={`flex flex-col h-full w-full transition-opacity duration-700 delay-500 ${stage === 'reading' ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* Decorative Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-rose-200/80 rotate-1 shadow-sm"></div>

                {/* Letter Text */}
                <div className="font-hand text-gray-700 text-lg mt-4 space-y-4">
                    <p className="font-bold text-2xl text-rose-600">My Dearest,</p>
                    
                    <p>
                        Welcome to our own little digital garden. I've collected our precious moments here—like pressing flowers in an old book—so they never fade.
                    </p>
                    
                    <p>
                        Every page tells a part of our story, every photo holds a memory I cherish.
                    </p>

                    <p>
                        Are you ready to walk down memory lane with me?
                    </p>

                    <p className="text-right mt-8 text-rose-500 font-bold">
                        With all my love,<br/>
                        Us
                    </p>
                </div>

                {/* Button */}
                <button 
                    onClick={handleEnterApp}
                    className="mt-auto self-center flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-emerald-700 transition-transform hover:scale-105 active:scale-95 group font-sans tracking-wide text-sm font-semibold uppercase mb-2"
                >
                    Begin Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

          {/* 3. Envelope Pockets (The visible paper folds) */}
          
          {/* Side Folds (Left & Right) */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-md overflow-hidden">
             {/* Left Triangle */}
             <div className="absolute top-0 left-0 w-0 h-0 border-t-[104px] border-b-[104px] border-l-[140px] border-t-transparent border-b-transparent border-l-rose-200"></div>
             {/* Right Triangle */}
             <div className="absolute top-0 right-0 w-0 h-0 border-t-[104px] border-b-[104px] border-r-[140px] border-t-transparent border-b-transparent border-r-rose-200"></div>
          </div>

          {/* Bottom Fold (Main Pocket) */}
          <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
             <div className="w-0 h-0 border-l-[160px] border-r-[160px] border-b-[110px] border-l-transparent border-r-transparent border-b-rose-300 drop-shadow-sm mx-auto rounded-b-md"></div>
          </div>

          {/* 4. The Flap (Top Triangle) */}
          <div 
            className={`absolute top-0 left-0 w-full h-0 z-40 transition-transform duration-700 ease-in-out origin-top ${stage !== 'closed' ? 'rotate-x-180 z-0' : 'z-40'}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
             {/* The Flap Border */}
             <div className="w-0 h-0 border-l-[160px] border-r-[160px] border-t-[110px] border-l-transparent border-r-transparent border-t-rose-400 drop-shadow-md mx-auto rounded-t-md"></div>
          </div>

          {/* 5. Wax Seal */}
          <div 
            className={`absolute top-[48%] left-1/2 -translate-x-1/2 w-16 h-16 bg-red-700 rounded-full border-4 border-red-800 shadow-xl flex items-center justify-center z-50 transition-all duration-500 ${stage !== 'closed' ? 'opacity-0 scale-150 pointer-events-none' : 'hover:scale-110'}`}
          >
             <div className="absolute inset-0 border border-white/20 rounded-full"></div>
             <Heart fill="#9f1239" className="text-[#700f24] drop-shadow-sm animate-pulse" size={28} />
          </div>

        </div>

        {/* Initial Prompt Text */}
        <div className={`mt-12 text-center transition-opacity duration-500 ${stage !== 'closed' ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="font-hand text-3xl md:text-4xl text-rose-800 mb-2 font-bold tracking-wider">
            A Memory For You
          </h1>
          <p className="font-sans text-rose-400 text-sm uppercase tracking-[0.3em] animate-pulse">
            Click the seal to open
          </p>
        </div>

      </div>
    </div>
  );
};