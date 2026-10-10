import { Heart, Sparkle, Mail, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ data }) {
  return (
    <section id="hero" className="min-h-screen pt-24 md:pt-36 pb-20 px-6 flex flex-col justify-center max-w-6xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Mobile: Portrait First / Desktop: Right Column Photo */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6 order-1 lg:order-2 flex justify-center"
        >
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group">
            {/* Ambient Glow behind portrait */}
            <div className="absolute -inset-2 bg-gradient-to-r from-softpink/30 to-rosegold/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Main Portrait Frame */}
            <div className="relative rounded-3xl overflow-hidden glass-card p-3 shadow-2xl border border-softpink/30">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img 
                  src={data.heroPortrait} 
                  alt="Birthday Girl Portrait" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent"></div>
                
                {/* Floating badge on photo */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-rosegold font-medium uppercase tracking-wider">The Birthday Girl</p>
                    <p className="font-serif font-bold text-warmwhite text-lg">{data.girlfriendName} Rose</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-softpink/20 border border-softpink/40 flex items-center justify-center">
                    <Sparkle className="w-5 h-5 text-softpink" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Sticker Accent */}
            <div className="absolute -bottom-5 -left-4 glass-pill px-4 py-2 rounded-full border border-rosegold/40 flex items-center gap-2 shadow-lg animate-float-slow">
              <span className="text-lg">✨</span>
              <span className="text-xs font-semibold text-rosegold tracking-wide">
                {new Date(data.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 order-2 lg:order-1 text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-softpink/30 text-softpink text-xs font-semibold tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-softpink" />
            <span>{data.heroTagline}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-warmwhite leading-tight">
            {data.heroHeading} <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-softpink via-lightpink to-rosegold">{data.heroHighlight}</span> ❤️
          </h2>

          <p className="text-warmwhite/80 text-base sm:text-lg leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
            {data.heroMessage}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#cake" className="px-7 py-3.5 rounded-full bg-gradient-to-r from-softpink to-rosegold text-midnight font-bold text-sm tracking-wider shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <span>Blow The Candles</span>
              <Sparkle className="w-4 h-4" />
            </a>
            <a href="#letter" className="px-7 py-3.5 rounded-full glass-panel hover:bg-white/10 text-warmwhite font-medium text-sm tracking-wider border border-white/20 transition-all flex items-center gap-2">
              <span>Read My Letter</span>
              <Mail className="w-4 h-4 text-softpink" />
            </a>
          </div>

          {/* Personalized mini details */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center">
            {data.heroStats.map((stat, i) => (
              <div key={i} className="glass-card p-3 rounded-xl border border-white/5">
                <span className={`block font-bold font-serif text-xl ${i===1?'text-softpink':'text-rosegold'}`}>{stat.value}</span>
                <span className="text-[11px] text-warmwhite/60 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="mt-16 text-center">
        <a href="#countdown" className="inline-flex flex-col items-center text-warmwhite/40 hover:text-softpink transition-colors text-xs uppercase tracking-widest gap-2">
          <span>Scroll down into our world</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
