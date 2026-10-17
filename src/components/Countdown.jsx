
import { useState, useEffect } from 'react';

const BIRTHDAY_TARGET = '2026-10-27T00:00:00+05:30';

export default function Countdown({ date = BIRTHDAY_TARGET }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    // Parse the target date, including its timezone.
    const target = new Date(date).getTime();

    if (Number.isNaN(target)) {
      console.error('Countdown: Invalid target date:', date);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        setIsReached(true);
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
        return;
      }

      setIsReached(false);

      const totalSeconds = Math.floor(difference / 1000);

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  return (
    <section
      id="countdown"
      className="py-16 px-6 max-w-5xl mx-auto"
    >
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-softpink/20 shadow-glass relative overflow-hidden text-center">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-softpink/10 rounded-full blur-3xl" />

        <span className="text-rosegold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase block mb-2">
          Special Milestone
        </span>

        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-warmwhite mb-2">
          The Grand Celebration Begins
        </h3>

        <p className="text-warmwhite/70 text-sm sm:text-base max-w-md mx-auto mb-8 font-sans">
          Target Date:{' '}
          <strong className="text-softpink">
            {formattedDate}
          </strong>{' '}
          — Every second is another chance to love you more.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-softpink">
              {timeLeft.days}
            </span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">
              Days
            </span>
          </div>

          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-rosegold">
              {timeLeft.hours}
            </span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">
              Hours
            </span>
          </div>

          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">
              {timeLeft.minutes}
            </span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">
              Minutes
            </span>
          </div>

          <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-bold text-softpink">
              {timeLeft.seconds}
            </span>
            <span className="text-xs uppercase tracking-widest text-warmwhite/60 mt-2 font-medium">
              Seconds
            </span>
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
