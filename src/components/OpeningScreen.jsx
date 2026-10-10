import { Heart, Sparkles, Music2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OpeningScreen({ onEnter, isEntered, data }) {
  
  const handleEnterClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FFD6E0', '#E0A96D', '#FFF5F7']
    });
    onEnter();
  };

  return (
    <section 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-midnight via-darkteal to-midnight text-center transition-all duration-1000 ${
        isEntered ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient glowing heart */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-softpink/30 rounded-full blur-2xl animate-ping opacity-60"></div>
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass-panel flex items-center justify-center border border-softpink/40 shadow-glow-pink animate-float-slow">
          <Heart className="w-10 h-10 md:w-12 md:h-12 text-softpink fill-softpink animate-pulse" />
        </div>
      </div>

      {/* Opening Text */}
      <span className="text-rosegold uppercase tracking-[0.35em] text-xs md:text-sm font-semibold mb-3">
        {data.openingSubtitle}
      </span>
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-warmwhite via-lightpink to-rosegold mb-4 max-w-3xl leading-tight">
        Happy Birthday, <span className="font-serif italic text-softpink">{data.girlfriendName}</span> ❤️
      </h1>
      <p className="text-base sm:text-xl text-warmwhite/75 font-serif italic max-w-xl mb-10 leading-relaxed px-4">
        {data.openingMessage}
      </p>

      {/* Tap to Enter Button */}
      <button 
        onClick={handleEnterClick}
        className="group relative px-8 py-4 rounded-full glass-panel border border-softpink/50 text-warmwhite font-medium text-base sm:text-lg tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-glow-pink flex items-center gap-3"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-softpink/20 to-rosegold/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <span className="relative z-10 flex items-center gap-2">
          Enter Your Surprise ✨
          <Sparkles className="w-5 h-5 text-rosegold group-hover:rotate-12 transition-transform" />
        </span>
      </button>

      {/* Music notice */}
      <div className="mt-6 flex items-center gap-2 text-warmwhite/50 text-xs tracking-wider">
        <Music2 className="w-3.5 h-3.5 text-softpink" />
        <span>🎵 Tap button to begin experience & play melody</span>
      </div>

      {/* Floating hearts decoration in opening */}
      <div className="absolute bottom-8 text-center text-warmwhite/30 text-xs tracking-widest uppercase">
        Handcrafted with all my heart
      </div>
    </section>
  );
}
