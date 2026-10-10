import { Heart } from 'lucide-react';

export default function FinalSection({ data }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center p-6 text-center overflow-hidden mt-10">
      {/* Blurred Background photo */}
      <div className="absolute inset-0 z-0">
        <img src={data.heroPortrait} alt="Background" className="w-full h-full object-cover blur-md scale-105 opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-darkteal/90 to-midnight"></div>
        <div className="absolute inset-0 bg-softpink/5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full glass-panel mx-auto flex items-center justify-center border border-softpink/40 shadow-glow-pink">
          <Heart className="w-8 h-8 text-softpink fill-softpink animate-pulse" />
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-bold text-warmwhite">
          {data.finalHeading}
        </h2>

        <p className="font-serif italic text-lg sm:text-2xl text-warmwhite/85 max-w-2xl mx-auto leading-relaxed">
          {data.finalQuote}
        </p>

        <p className="font-serif text-base sm:text-xl text-rosegold tracking-wide">
          {data.finalSubquote}
        </p>

        <div className="pt-8">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-pill border border-softpink/30 text-xs text-warmwhite/80 uppercase tracking-widest font-semibold">
            Made with love ❤️ for {data.girlfriendName}
          </span>
        </div>
      </div>
    </section>
  );
}
