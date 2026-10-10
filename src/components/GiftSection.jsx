import { Gift } from 'lucide-react';

export default function GiftSection({ giftUrl }) {
  return (
    <section id="gift" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-rosegold/30 shadow-glass relative overflow-hidden">
        
        <span className="text-rosegold text-xs uppercase tracking-[0.3em] font-semibold">The Grand Reveal</span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite mt-2 mb-3">
          There's One More Little Surprise... 🎁
        </h2>
        <p className="text-warmwhite/70 max-w-md mx-auto text-sm sm:text-base mb-10">
          I prepared something special just for you. Whenever you are ready, click below to open your gift.
        </p>

        {/* Animated Gift Box Graphic */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-10 relative group">
          <div className="absolute inset-0 bg-rosegold/20 rounded-3xl blur-2xl group-hover:scale-125 transition-transform"></div>
          <div className="relative w-full h-full rounded-3xl glass-card border border-rosegold/50 flex flex-col items-center justify-center text-rosegold shadow-glow-gold animate-float-slow">
            <Gift className="w-16 h-16 text-rosegold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest text-warmwhite/60 mt-2 font-semibold">Special Delivery</span>
          </div>
        </div>

        {/* Real Anchor Element for Gift URL */}
        <div className="max-w-xs mx-auto">
          <a 
            href={giftUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full py-4 rounded-full bg-gradient-to-r from-rosegold via-lightpink to-softpink text-midnight font-bold text-base tracking-wider shadow-glow-gold hover:scale-105 active:scale-95 transition-all text-center"
          >
            Open Your Gift →
          </a>
          <p className="text-[11px] text-warmwhite/40 mt-3">Link configured via birthday settings</p>
        </div>

      </div>
    </section>
  );
}
