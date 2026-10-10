export default function StoryTimeline({ items }) {
  return (
    <section id="story" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center space-y-3 mb-16">
        <span className="text-rosegold uppercase tracking-[0.25em] text-xs font-semibold">Chapters of Us</span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">
          Every Memory Has A Story
        </h2>
        <p className="text-warmwhite/70 max-w-lg mx-auto text-sm sm:text-base font-sans">
          From the first hello that turned into hours of talking, to all the quiet sunset walks we treasure.
        </p>
      </div>

      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-softpink via-rosegold to-blueteal transform md:-translate-x-1/2"></div>

        <div className="space-y-12 md:space-y-16">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center">
                {/* Desktop Left Side */}
                <div className={`md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0 ${!isLeft ? 'order-2 md:order-1 mt-4 md:mt-0' : ''}`}>
                  {isLeft ? (
                    <>
                      <span className={`text-xs font-semibold tracking-wider uppercase ${item.color === 'softpink' ? 'text-softpink' : 'text-rosegold'}`}>{item.date}</span>
                      <h3 className="font-serif text-2xl font-bold text-warmwhite mt-1">{item.title}</h3>
                      <p className="text-warmwhite/75 text-sm sm:text-base mt-2 font-serif italic">{item.description}</p>
                    </>
                  ) : (
                    item.image && (
                      <div className="rounded-2xl overflow-hidden glass-card p-2 border border-white/10 max-w-sm ml-auto">
                        <img src={item.image} alt={item.title} className="w-full h-44 object-cover rounded-xl" />
                      </div>
                    )
                  )}
                </div>

                {/* Node Icon */}
                <div className={`absolute left-2 md:left-1/2 w-6 h-6 rounded-full bg-midnight border-2 ${item.color === 'softpink' ? 'border-softpink' : 'border-rosegold'} transform -translate-x-1/2 flex items-center justify-center z-10 shadow-glow-${item.color === 'softpink' ? 'pink' : 'gold'}`}>
                  <div className={`w-2 h-2 rounded-full ${item.color === 'softpink' ? 'bg-softpink' : 'bg-rosegold'} ${index === items.length - 1 ? 'animate-ping' : ''}`}></div>
                </div>

                {/* Desktop Right Side */}
                <div className={`md:w-1/2 md:pl-12 pl-12 md:pl-12 ${!isLeft ? 'order-1 md:order-2' : 'mt-4 md:mt-0'}`}>
                  {!isLeft ? (
                    <>
                      <span className={`text-xs font-semibold tracking-wider uppercase ${item.color === 'softpink' ? 'text-softpink' : 'text-rosegold'}`}>{item.date}</span>
                      <h3 className="font-serif text-2xl font-bold text-warmwhite mt-1">{item.title}</h3>
                      <p className="text-warmwhite/75 text-sm sm:text-base mt-2 font-serif italic">{item.description}</p>
                    </>
                  ) : (
                    item.image ? (
                      <div className="rounded-2xl overflow-hidden glass-card p-2 border border-white/10 max-w-sm">
                        <img src={item.image} alt={item.title} className="w-full h-44 object-cover rounded-xl" />
                      </div>
                    ) : item.quote && (
                      <div className="glass-card p-6 rounded-2xl border border-softpink/30 max-w-sm">
                        <p className="text-rosegold font-handwriting text-3xl leading-relaxed">{item.quote}</p>
                        <span className="text-xs text-warmwhite/50 block mt-3">— Forever and always</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
