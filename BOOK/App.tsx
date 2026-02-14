import React, { useState, useRef, useEffect } from 'react';
import { Flipbook } from './components/Flipbook';
import { OpeningSequence } from './components/OpeningSequence';
import { INITIAL_SHEETS } from './constants';
import { Book, Info, Music, VolumeX, Heart, Sparkles } from 'lucide-react';

// --- BACKGROUND MUSIC URL ---
// User provided Cloudinary link: Green Day - Last Night On Earth
const BGM_URL = "https://res.cloudinary.com/dpuwu7fna/video/upload/v1770935217/Vietsub___Last_Night_On_Earth_-_Green_Day___Lyrics_Video_yn5fmk.mp3";

// --- ROMANTIC BACKGROUND COMPONENT ---
const ValentineBackground: React.FC = () => {
  
  // STATE DEFINITIONS FOR STABLE RENDERING (HYDRATION FIX)
  const [risingHearts, setRisingHearts] = useState<any[]>([]);
  const [lightOrbs, setLightOrbs] = useState<any[]>([]);
  const [shootingStars, setShootingStars] = useState<any[]>([]);
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    // 1. Rising Hearts
    setRisingHearts([...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 10}s`,
      scale: 0.5 + Math.random() * 0.8,
      opacity: 0.3 + Math.random() * 0.4
    })));

    // 2. Bokeh/Light Orbs
    setLightOrbs([...Array(6)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${200 + Math.random() * 300}px`,
      duration: `${20 + Math.random() * 20}s`,
      delay: `${Math.random() * 5}s`
    })));

    // 3. Shooting Stars
    setShootingStars([...Array(3)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${50 + Math.random() * 50}%`,
      delay: `${5 + Math.random() * 25}s`
    })));

    // 4. Sparkles
    setSparkles([...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: 10 + Math.random() * 10
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#fff0f5]">
       
       {/* 1. Base Gradient Layer - Deep Romantic Hues */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200 via-rose-100 to-rose-50 opacity-60"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-rose-200/40 via-transparent to-transparent"></div>

       {/* 2. Moving Bokeh Orbs (Soft blobs) */}
       {lightOrbs.map((orb) => (
         <div 
            key={`orb-${orb.id}`}
            className="absolute rounded-full bg-rose-300/20 blur-[80px] animate-float"
            style={{
                width: orb.size,
                height: orb.size,
                left: orb.left,
                top: orb.top,
                animationDuration: orb.duration,
                animationDelay: orb.delay
            }}
         />
       ))}

       {/* 3. Rising Hearts (Like Lanterns) */}
       {risingHearts.map((item) => (
         <div 
           key={`rising-heart-${item.id}`}
           className="absolute bottom-[-10%] text-rose-400 animate-float-up"
           style={{
             left: item.left,
             animationDelay: item.delay,
             animationDuration: item.duration,
             transform: `scale(${item.scale})`,
             opacity: item.opacity
           }}
         >
           <Heart fill="currentColor" stroke="none" className="drop-shadow-glow" />
         </div>
       ))}

       {/* 4. Shooting Stars */}
       {shootingStars.map((star) => (
          <div 
            key={`star-${star.id}`}
            className="absolute w-[200px] h-[2px] bg-gradient-to-l from-transparent via-white to-transparent animate-shooting-star opacity-0"
            style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay
            }}
          >
             {/* Glowing Head of Star */}
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] rounded-full"></div>
          </div>
       ))}

       {/* 5. Static Sparkles (Twinkling) - NOW USING STATE */}
       {sparkles.map((sparkle) => (
          <div
            key={`sparkle-${sparkle.id}`}
            className="absolute text-rose-300 animate-twinkle"
            style={{
                left: sparkle.left,
                top: sparkle.top,
                animationDelay: sparkle.delay
            }}
          >
              <Sparkles size={sparkle.size} strokeWidth={1} />
          </div>
       ))}

       {/* 6. Soft Cloud Layer at Bottom (To ground the book) */}
       <div className="absolute bottom-0 w-full h-32 opacity-60">
           <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
              <path fill="#ffffff" fillOpacity="0.6" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
       </div>
       <div className="absolute bottom-0 w-full h-24 opacity-40">
           <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
              <path fill="#fbcfe8" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
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

  const toggleMusic = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0.5;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Playback failed:", error);
        }
      }
    }
  };

  // Called immediately when user clicks "Begin Journey"
  const handleMusicStart = async () => {
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Auto-play prevented (browsers require interaction):", error);
          setIsPlaying(false);
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
        preload="auto"
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
                Happy Valentine Days
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

          {/* NEW ROMANTIC BACKGROUND */}
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