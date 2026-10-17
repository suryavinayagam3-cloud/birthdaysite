import { useState } from 'react';
import { Mail, LockOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetter({ data, date }) {
  const [letterOpened, setLetterOpened] = useState(false);

  const toggleLetter = () => {
    if (!letterOpened) {
      setLetterOpened(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#FFB6C1', '#FFF5F7']
      });
    } else {
      setLetterOpened(false);
    }
  };

  return (
    <section id="letter" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <div className="space-y-3 mb-12">
        <span className="text-rosegold uppercase tracking-[0.25em] text-xs font-semibold">From My Heart To Yours</span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">
          A Little Letter For You 💌
        </h2>
        <p className="text-warmwhite/70 max-w-md mx-auto text-sm sm:text-base font-sans">
          Tap the envelope below to open your personalized birthday letter.
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative max-w-lg mx-auto cursor-pointer" onClick={toggleLetter}>
        
        {/* Closed Envelope Front Graphic */}
        <div className={`glass-panel p-8 sm:p-10 rounded-3xl border-2 border-rosegold/40 shadow-2xl transition-all duration-500 hover:scale-[1.02] ${letterOpened ? 'opacity-40' : 'opacity-100'}`}>
          <div className="w-16 h-16 mx-auto rounded-full bg-softpink/15 border border-softpink/40 flex items-center justify-center text-softpink mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-warmwhite">To My Beloved meenu</p>
          <p className="text-xs text-rosegold tracking-widest uppercase mt-1">Sealed with genuine love</p>
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-softpink/20 text-softpink text-xs font-semibold tracking-wider">
            <span>Tap To {letterOpened ? 'Close' : 'Open'} Envelope</span>
            <LockOpen className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* The Letter (Appears / Unfolds when tapped) */}
        <div className={`mt-8 text-left bg-[#FFF5F7] text-neutral-800 p-8 sm:p-12 rounded-2xl shadow-2xl border border-neutral-300 relative transition-all duration-700 ${letterOpened ? 'block' : 'hidden'}`}>
          <div className="absolute top-4 right-4 text-xs font-serif italic text-neutral-400">
            {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          
          <p className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-6">
            {data.greeting}
          </p>

          <div className="space-y-4 font-serif text-base sm:text-lg text-neutral-700 leading-relaxed">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <p className="font-handwriting text-3xl text-neutral-800">
              {data.closing}
            </p>
            <span className="text-xs uppercase tracking-widest text-neutral-500 mt-2 sm:mt-0 font-sans">
              {data.signature}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
