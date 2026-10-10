import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);

    // Show smoke & sparkles confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FFD6E0', '#E0A96D', '#FFFFFF', '#FF80AB']
    });
  };

  return (
    <section id="cake" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-softpink/30 shadow-cake-glow relative overflow-hidden">
        
        <span className="text-rosegold text-xs uppercase tracking-[0.3em] font-semibold">Interactive Moment</span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite mt-2 mb-3">
          Make A Wish ✨
        </h2>
        <p className="text-warmwhite/70 max-w-md mx-auto text-sm sm:text-base mb-10">
          Close your eyes, think of your deepest wish, and tap the cake to blow out the candles!
        </p>

        {/* 3D Interactive Cake Container */}
        <div 
          className="cake-container mx-auto w-64 sm:w-80 h-72 relative cursor-pointer select-none group" 
          onClick={handleBlowCandles}
        >
          <div className="cake-body w-full h-full flex flex-col items-center justify-end pb-8">
            
            {/* Candles Group */}
            <div className="flex items-end gap-6 mb-2 relative z-20">
              {/* Candle 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-3.5 h-5 bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-100 rounded-full shadow-[0_0_15px_#ff9800] mb-0.5 transition-all duration-500 ${candlesBlown ? 'opacity-0 scale-0 -translate-y-2' : 'cake-flame'}`}></div>
                <div className="w-1 h-2 bg-neutral-400"></div>
                <div className="w-3 h-10 bg-gradient-to-r from-softpink via-lightpink to-rosegold rounded-t-sm shadow-sm"></div>
              </div>

              {/* Center Candle (Taller) */}
              <div className="flex flex-col items-center">
                <div className={`w-4 h-6 bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-100 rounded-full shadow-[0_0_20px_#ff9800] mb-0.5 transition-all duration-500 ${candlesBlown ? 'opacity-0 scale-0 -translate-y-2' : 'cake-flame'}`}></div>
                <div className="w-1 h-2 bg-neutral-400"></div>
                <div className="w-3.5 h-12 bg-gradient-to-r from-rosegold via-warmwhite to-softpink rounded-t-sm shadow-sm"></div>
              </div>

              {/* Candle 3 */}
              <div className="flex flex-col items-center">
                <div className={`w-3.5 h-5 bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-100 rounded-full shadow-[0_0_15px_#ff9800] mb-0.5 transition-all duration-500 ${candlesBlown ? 'opacity-0 scale-0 -translate-y-2' : 'cake-flame'}`}></div>
                <div className="w-1 h-2 bg-neutral-400"></div>
                <div className="w-3 h-10 bg-gradient-to-r from-softpink via-lightpink to-rosegold rounded-t-sm shadow-sm"></div>
              </div>
            </div>

            {/* Frosting & Berries on Top Tier */}
            <div className="relative z-10 -mb-1 flex gap-3">
              <span className="text-sm">🍓</span>
              <span className="text-xs">🍒</span>
              <span className="text-sm">🍓</span>
            </div>

            {/* Cake Layer 1 (Top Tier) */}
            <div className="w-40 sm:w-48 h-16 rounded-t-2xl bg-gradient-to-b from-lightpink to-softpink shadow-md relative overflow-hidden border-t-2 border-white/60">
              {/* Decorative cream drips */}
              <div className="absolute inset-x-0 top-0 h-4 flex justify-around">
                <div className="w-4 h-4 bg-warmwhite rounded-b-full shadow-sm"></div>
                <div className="w-4 h-5 bg-warmwhite rounded-b-full shadow-sm"></div>
                <div className="w-4 h-3.5 bg-warmwhite rounded-b-full shadow-sm"></div>
                <div className="w-4 h-5 bg-warmwhite rounded-b-full shadow-sm"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
            </div>

            {/* Cake Layer 2 (Bottom Tier - Wider) */}
            <div className="w-56 sm:w-[17rem] h-20 rounded-t-2xl bg-gradient-to-b from-softpink via-[#f395a8] to-deepteal/80 shadow-2xl relative overflow-hidden border-t-2 border-white/50">
              {/* Frosting piping */}
              <div className="absolute inset-x-0 top-0 h-4 flex justify-between px-2">
                <div className="w-4 h-4 bg-warmwhite rounded-b-full"></div>
                <div className="w-4 h-4 bg-warmwhite rounded-b-full"></div>
                <div className="w-4 h-4 bg-warmwhite rounded-b-full"></div>
                <div className="w-4 h-4 bg-warmwhite rounded-b-full"></div>
                <div className="w-4 h-4 bg-warmwhite rounded-b-full"></div>
                <div className="w-4 h-4 bg-warmwhite rounded-b-full"></div>
              </div>
              {/* Gold leaf details */}
              <div className="absolute bottom-2 inset-x-0 text-center text-rosegold/70 text-xs tracking-widest font-serif font-bold">
                ARIA'S SWEETEST YEAR
              </div>
            </div>

            {/* Cake Platter / Stand */}
            <div className="w-64 sm:w-[19rem] h-4 bg-gradient-to-r from-rosegold via-rosegoldLight to-rosegold rounded-full shadow-2xl border-t border-white/80"></div>
          </div>
        </div>

        {/* Post-Blow Wish Reveal Message */}
        {candlesBlown && (
          <div className="mt-8 max-w-lg mx-auto p-6 rounded-2xl glass-card border border-softpink/40 animate-pulse-glow">
            <div className="text-3xl mb-2">✨💫</div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-softpink">
              "Your wish is now somewhere among the stars ❤️"
            </p>
            <p className="text-sm text-warmwhite/80 mt-2">
              May every single dream you hold in your heart unfold beautifully this year.
            </p>
          </div>
        )}

        {/* Instruction button */}
        <div className="mt-6">
          <button 
            onClick={handleBlowCandles}
            disabled={candlesBlown}
            className={`px-6 py-2.5 rounded-full glass-panel border tracking-wider text-warmwhite transition-all shadow-sm ${candlesBlown ? 'opacity-70 text-xs' : 'border-softpink/30 hover:border-softpink text-xs font-semibold'}`}
          >
            {candlesBlown ? '✨ Wish Sent to the Stars!' : '🎂 Click / Tap Here to Blow Candles'}
          </button>
        </div>

      </div>
    </section>
  );
}
