import { useRef, useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function AudioPlayer({ data, isPlaying, onTogglePlay }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay policy fallback
          onTogglePlay(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, onTogglePlay]);

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-40 max-w-sm w-[calc(100%-3rem)] sm:w-80 glass-panel rounded-2xl p-3 border border-softpink/30 shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3">
        
        {/* Album Art Thumbnail */}
        <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
          <img src={data.albumArt} alt="Album Art" className="w-full h-full object-cover" />
          {isPlaying && (
            <div className="absolute inset-0 bg-midnight/60 backdrop-blur-[2px] flex items-end justify-center gap-0.5 p-1.5">
              <div className="w-1 bg-softpink eq-bar"></div>
              <div className="w-1 bg-rosegold eq-bar"></div>
              <div className="w-1 bg-warmwhite eq-bar"></div>
              <div className="w-1 bg-softpink eq-bar"></div>
            </div>
          )}
        </div>

        {/* Song info */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <p className="text-xs font-bold text-warmwhite truncate">{data.title}</p>
          </div>
          <p className="text-[11px] text-warmwhite/60 truncate">{data.artist}</p>
          {/* Mini Progress Bar */}
          <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-softpink to-rosegold h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Play / Pause Button */}
        <button 
          onClick={onTogglePlay}
          className="w-9 h-9 rounded-full bg-softpink text-midnight flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0 shadow-glow-pink"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-midnight" />
          ) : (
            <Play className="w-4 h-4 fill-midnight ml-0.5" />
          )}
        </button>

      </div>
      
      {/* Hidden Native Audio element */}
      <audio 
        ref={audioRef}
        loop 
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={data.src} type="audio/ogg" />
      </audio>
    </div>
  );
}
