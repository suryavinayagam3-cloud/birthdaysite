import { useState, useEffect } from 'react';

export default function Countdown({ date }) {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    const target = new Date(date).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsReached(true);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, [date]);

  return (
    <section id="countdown" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-softpink/20 shadow-glass relative overflow-hidden text-center">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-softpink/10 rounded-full blur-3xl"></div>
        
        <span className="text-rosegold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase block mb-2">Special Milestone</span>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-warmwhite mb-2">
          The Grand Celebration Begins
        </h3>
        <p className="text-warmwhite/70 text-sm sm:text-base max-w-md mx-auto mb-8 font-sans">
          Target Date: <strong className="text-softpink">
            {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </strong> — Every second is another chance to love you more.
        </p>

        {/* Countdown Grid: 4 Horizontal on desktop, 2x2 on small mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-softpink">{timeLeft.days}</span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">Days</span>
          </div>
          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-rosegold">{timeLeft.hours}</span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">Hours</span>
          </div>
          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">{timeLeft.minutes}</span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">Minutes</span>
          </div>
          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-softpink">{timeLeft.seconds}</span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">Seconds</span>
          </div>
        </div>

        {isReached && (
          <div className="mt-8 p-4 rounded-xl bg-softpink/20 border border-softpink text-warmwhite font-serif text-xl sm:text-2xl font-bold animate-pulse">
            ✨ Today Is Your Day, My Love! Happy Birthday! ❤️ ✨
          </div>
        )}
      </div>
    </section>
  );
}
