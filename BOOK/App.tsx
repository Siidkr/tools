import React, { useState, useRef, useMemo } from 'react';
import { Flipbook } from './components/Flipbook';
import { OpeningSequence } from './components/OpeningSequence';
import { INITIAL_SHEETS } from './constants';
import { Book, Info, Music, VolumeX } from 'lucide-react';

// Using a reliable, direct MP3 link (Piano melody)
const BGM_URL = "/Vietsub _ Last Night On Earth - Green Day _ Lyrics Video.mp3";

// --- GARDEN BACKGROUND COMPONENT ---
const GardenBackground: React.FC = () => {
  // Generate random flowers for the bottom garden bed
  const gardenFlowers = useMemo(() => {
    const flowers = [];
    const count = 15; // Number of flowers across the bottom
    const types = ['tulip', 'daisy', 'sunflower', 'lavender'];
    
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      flowers.push({
        id: i,
        type,
        left: `${(i / count) * 100 + (Math.random() * 5 - 2)}%`, // Distribute across width
        delay: `${Math.random() * 1.5}s`, // Random bloom delay
        scale: 0.8 + Math.random() * 0.5,
        duration: `${3 + Math.random() * 2}s` // Random sway speed
      });
    }
    return flowers;
  }, []);

  // Generate falling petals
  const petals = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 10}s`
    }));
  }, []);

  const renderFlowerSvg = (type: string) => {
    switch(type) {
      case 'tulip':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-sm">
             <path d="M12 24V14" stroke="#166534" strokeWidth="2" />
             <path d="M12 24C12 24 16 20 16 16" stroke="#166534" strokeWidth="2" />
             <path d="M12 14V6" className="stroke-green-700" strokeWidth="1"/>
             <path d="M8 6 C8 6 8 13 12 14 C16 13 16 6 16 6 C16 6 14 7 12 4 C10 7 8 6 8 6Z" className="fill-rose-400" />
          </svg>
        );
      case 'daisy':
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
             <path d="M12 24V12" stroke="#15803d" strokeWidth="2" />
             <circle cx="12" cy="12" r="3" className="fill-yellow-400" />
             <path d="M12 6L13 10H17L14 12L15 16L12 14L9 16L10 12L7 10H11L12 6Z" className="fill-white stroke-gray-100" strokeWidth="0.5" />
          </svg>
        );
      case 'sunflower':
         return (
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                <path d="M12 24V14" stroke="#15803d" strokeWidth="2.5" />
                <circle cx="12" cy="14" r="5" className="fill-amber-700" />
                <circle cx="12" cy="14" r="8" className="stroke-yellow-500" strokeWidth="3" strokeDasharray="2 1" fill="none" />
            </svg>
         );
      case 'lavender':
         return (
            <svg viewBox="0 0 24 24" className="w-full h-full opacity-90">
               <path d="M12 24V8" stroke="#15803d" strokeWidth="1.5" />
               <circle cx="12" cy="8" r="1.5" className="fill-purple-400" />
               <circle cx="12" cy="11" r="1.5" className="fill-purple-400" />
               <circle cx="10" cy="13" r="1.5" className="fill-purple-400" />
               <circle cx="14" cy="15" r="1.5" className="fill-purple-400" />
            </svg>
         );
      default: return null;
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
       {/* Gradient Ground */}
       <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-emerald-100/60 via-emerald-50/20 to-transparent"></div>

       {/* Falling Petals */}
       {petals.map((petal) => (
         <div 
           key={`petal-${petal.id}`}
           className="absolute top-[-5%] text-pink-200/60 animate-float-slow"
           style={{
             left: petal.left,
             animationDelay: petal.delay,
             animationDuration: petal.duration
           }}
         >
           <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C10 0 14 6 10 10C6 6 10 0 10 0Z" />
           </svg>
         </div>
       ))}

       {/* Garden Bed */}
       <div className="absolute bottom-[-10px] w-full flex justify-between items-end px-4 md:px-10">
          {gardenFlowers.map((flower) => (
            <div
              key={`flower-${flower.id}`}
              className="relative animate-bloom origin-bottom"
              style={{
                left: 'auto', // Handled by flex/margin or absolute if needed, but flex wrap is easier
                width: '60px',
                height: '80px',
                animationDelay: flower.delay,
                transform: `scale(${flower.scale})`
              }}
            >
               <div className="w-full h-full animate-sway origin-bottom" style={{ animationDuration: flower.duration }}>
                 {renderFlowerSvg(flower.type)}
               </div>
            </div>
          ))}
       </div>
       
       {/* Foreground Grass Blade Accents (Static SVG overlay) */}
       <div className="absolute bottom-0 w-full h-12 opacity-30 text-emerald-600">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
             <path d="M0 100 L20 60 L40 100 L60 70 L80 100 M100 100 L110 50 L120 100" fill="none" stroke="currentColor" strokeWidth="2" />
             <path d="M1100 100 L1120 40 L1140 100 L1160 60 L1180 100" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
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
        audioRef.current.play().catch(e => console.log("Playback failed", e));
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
      
      {/* Background Audio Player */}
      <audio ref={audioRef} src={BGM_URL} loop />

      {/* RENDER OPENING SEQUENCE OR APP */}
      {!hasStarted ? (
        <OpeningSequence onOpen={handleAppOpen} onMusicStart={handleMusicStart} />
      ) : (
        <>
          {/* Header / Nav - Only visible after opening */}
          <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none animate-fade-in">
            <div className="flex items-center gap-3 pointer-events-auto bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm border border-white/50">
              <div className="bg-emerald-500 text-white p-2 rounded-full">
                <Book size={20} />
              </div>
              <h1 className="font-hand font-bold text-2xl tracking-wide text-gray-800 hidden sm:block">
                MemoryLane
              </h1>
            </div>

            <div className="flex items-center gap-3">
                {/* Music Toggle */}
                <button 
                    onClick={toggleMusic}
                    className={`pointer-events-auto backdrop-blur-sm p-3 rounded-full shadow-sm transition-all duration-300 border border-white/50 ${isPlaying ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
                    title={isPlaying ? "Pause Music" : "Play Music"}
                >
                    {isPlaying ? <Music size={24} /> : <VolumeX size={24} />}
                </button>

                {/* Info Toggle */}
                <button 
                onClick={() => setShowInfo(!showInfo)}
                className="pointer-events-auto bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-white transition-colors text-gray-600"
                >
                <Info size={24} />
                </button>
            </div>
          </nav>

          {/* Main Content */}
          <main className="w-full h-full flex flex-col items-center justify-center pt-10 animate-[float_4s_ease-in-out_1] relative z-10">
            <Flipbook sheets={INITIAL_SHEETS} />
          </main>

          {/* NEW GARDEN BACKGROUND */}
          <GardenBackground />
        </>
      )}

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all font-hand">
            <h2 className="text-3xl font-bold mb-4 text-emerald-600">About MemoryLane</h2>
            <p className="text-xl text-gray-700 mb-6">
              Welcome to your digital garden of memories. 🌷
              <br/><br/>
              ✨ Click the pages or use arrow keys to flip.
              <br/>
              🎵 Enjoy the calming music.
              <br/>
              💖 Watch the flowers bloom!
            </p>
            <button 
              onClick={() => setShowInfo(false)}
              className="w-full bg-emerald-700 text-white py-3 rounded-xl font-bold hover:bg-emerald-800 transition-colors"
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