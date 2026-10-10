import { Heart, Cake, Home, BookOpen, Camera, Mail, Gift } from 'lucide-react';

export default function Navigation({ onSecretTrigger }) {
  return (
    <>
      {/* DESKTOP / TABLET FLOATING GLASS NAVIGATION (1024px+ and 768px+) */}
      <header className="hidden md:block fixed top-6 inset-x-0 z-40 px-6 max-w-5xl mx-auto">
        <nav className="glass-pill rounded-full px-6 py-3.5 flex items-center justify-between shadow-glass border border-softpink/20">
          {/* Logo / Monogram */}
          <a href="#hero" className="flex items-center gap-2 text-warmwhite hover:text-softpink transition-colors">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-deepteal to-blueteal border border-softpink/40 flex items-center justify-center font-serif font-bold text-softpink text-sm">
              A
            </span>
            <span className="font-serif italic font-semibold text-lg tracking-wide">Forever Yours</span>
          </a>

          {/* Desktop Links */}
          <div className="flex items-center gap-6 text-xs lg:text-sm font-medium tracking-wide text-warmwhite/80">
            <a href="#hero" className="hover:text-softpink transition-colors">Home</a>
            <a href="#story" className="hover:text-softpink transition-colors">Story</a>
            <a href="#memories" className="hover:text-softpink transition-colors">Memories</a>
            <a href="#special" className="hover:text-softpink transition-colors">Special</a>
            <a href="#cake" className="hover:text-softpink transition-colors">Cake</a>
            <a href="#wishes" className="hover:text-softpink transition-colors">Wishes</a>
            <a href="#letter" className="hover:text-softpink transition-colors">Letter</a>
            <a href="#gift" className="hover:text-softpink transition-colors">Gift</a>
          </div>

          {/* Mini Audio Indicator & Secret Trigger */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onSecretTrigger}
              title="A tiny secret..." 
              className="text-warmwhite/40 hover:text-softpink transition-colors p-1.5 rounded-full hover:bg-white/5 active:scale-90"
            >
              <Heart className="w-4 h-4 text-softpink/70 fill-softpink/30 hover:fill-softpink" />
            </button>
            <a href="#cake" className="px-4 py-1.5 rounded-full bg-softpink/15 hover:bg-softpink/25 border border-softpink/40 text-softpink text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5">
              <span>Make a Wish</span>
              <Cake className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* MOBILE UI BOTTOM NAVIGATION (320px - 767px) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass-pill border-t border-softpink/20 px-4 py-2 pb-safe flex items-center justify-around shadow-2xl">
        <a href="#hero" className="flex flex-col items-center py-1 text-warmwhite/70 hover:text-softpink transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </a>
        <a href="#story" className="flex flex-col items-center py-1 text-warmwhite/70 hover:text-softpink transition-colors">
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Story</span>
        </a>
        <a href="#memories" className="flex flex-col items-center py-1 text-warmwhite/70 hover:text-softpink transition-colors">
          <Camera className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Memories</span>
        </a>
        <a href="#wishes" className="flex flex-col items-center py-1 text-warmwhite/70 hover:text-softpink transition-colors">
          <Mail className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Wishes</span>
        </a>
        <a href="#gift" className="flex flex-col items-center py-1 text-warmwhite/70 hover:text-softpink transition-colors">
          <Gift className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Gift</span>
        </a>
      </nav>
    </>
  );
}
