import React, { useState, useRef, useMemo } from 'react';
import { Flipbook } from './components/Flipbook';
import { OpeningSequence } from './components/OpeningSequence';
import { INITIAL_SHEETS } from './constants';
import { Book, Info, Music, VolumeX, Heart } from 'lucide-react';

// --- BACKGROUND MUSIC URL ---
// Updated to user provided Cloudinary link: Green Day - Last Night On Earth
const BGM_URL = "https://res.cloudinary.com/dpuwu7fna/video/upload/v1770935217/Vietsub___Last_Night_On_Earth_-_Green_Day___Lyrics_Video_yn5fmk.mp3";

// --- VALENTINE BACKGROUND COMPONENT ---
const ValentineBackground: React.FC = () => {
  // Generate random flowers/hearts for the bottom garden bed
  const gardenItems = useMemo(() => {
    const items = [];
    const count = 18; // Number of items across the bottom
    const types = ['rose', 'heart', 'tulip', 'heart_balloon'];
    
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      items.push({
        id: i,
        type,
        left: `${(i / count) * 100 + (Math.random() * 5 - 2)}%`, // Distribute across width
        delay: `${Math.random() * 1.5}s`, // Random bloom delay
        scale: 0.8 + Math.random() * 0.5,
        duration: `${3 + Math.random() * 2}s` // Random sway speed
      });
    }
    return items;
  }, []);

  // Generate falling hearts (instead of petals)
  const floatingHearts = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 8}s`,
      size: 15 + Math.random() * 20
    }));
  }, []);

  // Floating Words
  const floatingWords = useMemo(() => {
    const words = ["Love", "XOXO", "Forever", "Cute", "Us", "Sweet"];
    return [...Array(6)].map((_, i) => ({
      id: i,
      text: words[i % words.length],
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 60}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`
    }));
  }, []);

  const renderGardenItem = (type: string) => {
    switch(type) {
      case 'rose':
         return (
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                <path d="M12 24V14" stroke="#15803d" strokeWidth="2" />
                <path d="M12 14 L10 16 M12 18 L14 16" stroke="#15803d" strokeWidth="2" />
                <circle cx="12" cy="10" r="6" className="fill-rose-600" />
                <path d="M12 10l-2 -2m2 2l2 -2m-2 2l-2 2m2 -2l2 2" stroke="rgba(255,255,255,0.3)" />
            </svg>
         );
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-sm">
             <path d="M12 24V16" stroke="#166534" strokeWidth="1.5" />
             <path d="M12 16C12 16 8 10 12 6C16 10 12 16 12 16Z" className="fill-pink-500" />
             <path d="M6 10C6 10 9 13 12 16" stroke="none" /> 
             {/* Actual Heart Shape Top */}
             <path d="M12 16 C9 13 4 10 4 6 C4 3 7 2 9 4 C11 6 12 7 12 7 C12 7 13 6 15 4 C17 2 20 3 20 6 C20 10 15 13 12 16" className="fill-pink-400" />
          </svg>
        );
      case 'tulip':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-sm">
             <path d="M12 24V14" stroke="#166534" strokeWidth="2" />
             <path d="M12 24C12 24 16 20 16 16" stroke="#166534" strokeWidth="2" />
             <path d="M12 14V6" className="stroke-green-700" strokeWidth="1"/>
             <path d="M8 6 C8 6 8 13 12 14 C16 13 16 6 16 6 C16 6 14 7 12 4 C10 7 8 6 8 6Z" className="fill-red-500" />
          </svg>
        );
      case 'heart_balloon':
         return (
            <svg viewBox="0 0 24 24" className="w-full h-full opacity-90">
               <path d="M12 24V14" stroke="#9ca3af" strokeWidth="1" strokeDasharray="2 1" />
               <path d="M12 14 C9 11 5 8 5 5 C5 2 8 1 9.5 2.5 C11 4 12 5 12 5 C12 5 13 4 14.5 2.5 C16 1 19 2 19 5 C19 8 15 11 12 14Z" className="fill-rose-300" />
            </svg>
         );
      default: return null;
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
       {/* Gradient Ground - Changed to Pink/Red tones */}
       <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-rose-200 via-pink-100/50 to-transparent"></div>

       {/* Floating Words */}
       {floatingWords.map((word) => (
         <div 
            key={`word-${word.id}`}
            className="absolute text-pink-200/40 font-hand font-bold text-4xl animate-float-slow select-none"
            style={{
                left: word.left,
                top: word.top,
                animationDelay: word.delay,
                animationDuration: word.duration
            }}
         >
            {word.text}
         </div>
       ))}

       {/* Falling Hearts */}
       {floatingHearts.map((item) => (
         <div 
           key={`heart-${item.id}`}
           className="absolute top-[-10%] text-pink-300/60 animate-float-slow"
           style={{
             left: item.left,
             animationDelay: item.delay,
             animationDuration: item.duration,
             width: item.size,
             height: item.size
           }}
         >
           <Heart fill="currentColor" stroke="none" className="w-full h-full" />
         </div>
       ))}

       {/* Garden Bed */}
       <div className="absolute bottom-[-10px] w-full flex justify-between items-end px-4 md:px-10">
          {gardenItems.map((item) => (
            <div
              key={`item-${item.id}`}
              className="relative animate-bloom origin-bottom"
              style={{
                left: 'auto',
                width: '60px',
                height: '80px',
                animationDelay: item.delay,
                transform: `scale(${item.scale})`
              }}
            >
               <div className="w-full h-full animate-sway origin-bottom" style={{ animationDuration: item.duration }}>
                 {renderGardenItem(item.type)}
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};


const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.5;
        // Promise handling for better debugging
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Playback failed (interaction needed):", error);
            });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Called immediately when user clicks "Begin Journey"
  const handleMusicStart = () => {
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Auto-play prevented:", error);
              setIsPlaying(false);
            });
        }
    }
  };

  // Called after animation ends
  const handleAppOpen = () => {
    setHasStarted(true);
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-hidden relative selection:bg-pink-200">
      
      {/* Background Audio Player with Silent Error Handling */}
      <audio 
        ref={audioRef} 
        src={BGM_URL} 
        loop 
        onError={() => console.log("Audio load failed. Check network or URL.")}
      />

      {/* RENDER OPENING SEQUENCE OR APP */}
      {!hasStarted ? (
        <OpeningSequence onOpen={handleAppOpen} onMusicStart={handleMusicStart} />
      ) : (
        <>
          {/* Header / Nav - Only visible after opening */}
          <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none animate-fade-in">
            <div className="flex items-center gap-3 pointer-events-auto bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm border border-rose-200">
              <div className="bg-rose-500 text-white p-2 rounded-full">
                <Book size={20} />
              </div>
              <h1 className="font-hand font-bold text-2xl tracking-wide text-rose-800 hidden sm:block">
                My Valentine
              </h1>
            </div>

            <div className="flex items-center gap-3">
                {/* Music Toggle */}
                <button 
                    onClick={toggleMusic}
                    className={`pointer-events-auto backdrop-blur-sm p-3 rounded-full shadow-sm transition-all duration-300 border border-white/50 ${isPlaying ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/80 text-rose-500 hover:bg-white'}`}
                    title={isPlaying ? "Pause Music" : "Play Music"}
                >
                    {isPlaying ? <Music size={24} /> : <VolumeX size={24} />}
                </button>

                {/* Info Toggle */}
                <button 
                onClick={() => setShowInfo(!showInfo)}
                className="pointer-events-auto bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white transition-colors text-rose-500"
                >
                <Info size={24} />
                </button>
            </div>
          </nav>

          {/* Main Content */}
          <main className="w-full h-full flex flex-col items-center justify-center pt-10 animate-[float_4s_ease-in-out_1] relative z-10">
            <Flipbook sheets={INITIAL_SHEETS} />
          </main>

          {/* NEW VALENTINE BACKGROUND */}
          <ValentineBackground />
        </>
      )}

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all font-hand border-2 border-rose-100">
            <h2 className="text-3xl font-bold mb-4 text-rose-600">Our Love Story</h2>
            <p className="text-xl text-gray-700 mb-6">
              Welcome to this special Valentine's gift. 💖
              <br/><br/>
              ✨ Flip the pages to see our memories.
              <br/>
              🎵 Listen to the melody.
              <br/>
              🌹 Happy Valentine's Day!
            </p>
            <button 
              onClick={() => setShowInfo(false)}
              className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600 transition-colors"
            >
              Close Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;