import { Heart, Smile, Sparkles, Music } from 'lucide-react';

const iconMap = {
  Smile: Smile,
  Sparkles: Sparkles,
  Music: Music,
};

export default function SpecialQualities({ items }) {
  return (
    <section id="special" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center space-y-3 mb-14">
        <span className="text-rosegold uppercase tracking-[0.25em] text-xs font-semibold">Treasured Qualities</span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">
          Things I Love About You ❤️
        </h2>
        <p className="text-warmwhite/70 max-w-md mx-auto text-sm sm:text-base font-sans">
          A few reminders of how extraordinary you are every single day.
        </p>
      </div>

      {/* Desktop: 3 in a row / Mobile: Horizontal Snap Scrolling */}
      <div className="flex sm:grid sm:grid-cols-3 gap-6 overflow-x-auto pb-6 sm:pb-0 snap-x snap-mandatory scrollbar-none">
        
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Heart;
          const borderColor = item.color === 'rosegold' ? 'border-rosegold/20' : 'border-softpink/20';
          const hoverBorderColor = item.color === 'rosegold' ? 'hover:border-rosegold/50' : 'hover:border-softpink/50';
          const bgColor = item.color === 'rosegold' ? 'bg-rosegold/15' : 'bg-softpink/15';
          const iconBorder = item.color === 'rosegold' ? 'border-rosegold/30' : 'border-softpink/30';
          const textColor = item.color === 'rosegold' ? 'text-rosegold' : 'text-softpink';
          const fillColor = item.color === 'rosegold' ? 'fill-rosegold' : 'fill-softpink';

          return (
            <div key={index} className={`min-w-[85vw] sm:min-w-0 snap-center glass-card p-8 rounded-3xl border ${borderColor} ${hoverBorderColor} transition-all flex flex-col justify-between group`}>
              <div>
                <div className={`w-14 h-14 rounded-2xl ${bgColor} border ${iconBorder} flex items-center justify-center ${textColor} mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-warmwhite mb-3">{item.title}</h3>
                <p className="text-warmwhite/75 text-sm sm:text-base leading-relaxed font-serif italic">
                  {item.description}
                </p>
              </div>
              <div className={`pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase ${textColor}`}>
                <span>Reason {String(index + 1).padStart(2, '0')}</span>
                <Heart className={`w-3.5 h-3.5 ${fillColor}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
