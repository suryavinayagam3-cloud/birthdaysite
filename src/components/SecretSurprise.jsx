import { Sparkles } from 'lucide-react';

export default function SecretSurprise({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
      <div className="relative max-w-lg w-full glass-panel p-8 sm:p-12 rounded-3xl border-2 border-rosegold/50 shadow-glow-gold animate-float-slow">
        
        <div className="w-20 h-20 rounded-full bg-softpink/20 border border-softpink/50 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-rosegold animate-spin" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-rosegold font-semibold block mb-2">Hidden Easter Egg</span>
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-warmwhite mb-4">
          You Found The Little Secret ❤️
        </h3>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-serif italic text-base sm:text-lg text-warmwhite/90 leading-relaxed mb-8">
          <p>
            "{message}"
          </p>
        </div>

        <button 
          onClick={onClose}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-softpink to-rosegold text-midnight font-bold text-sm tracking-wider hover:opacity-90 transition-opacity"
        >
          Hold This Close Forever ✨
        </button>

      </div>
    </div>
  );
}
