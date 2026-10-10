import { useState } from 'react';
import GalleryViewer from './GalleryViewer';

export default function Gallery({ items }) {
  const [viewerIndex, setViewerIndex] = useState(null);

  return (
    <section id="memories" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center space-y-3 mb-14">
        <span className="text-softpink uppercase tracking-[0.25em] text-xs font-semibold">Visual Keepsakes</span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-warmwhite">
          Our Beautiful Memories 📸
        </h2>
        <p className="text-warmwhite/70 max-w-md mx-auto text-sm sm:text-base font-sans">
          Click or tap any memory to view it in full-screen cinematic resolution.
        </p>
      </div>

      {/* DESKTOP MASONRY & MOBILE SNAP FEED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {items.map((item, index) => (
          <div key={index} className="gallery-card group cursor-pointer" onClick={() => setViewerIndex(index)}>
            <div className="glass-card rounded-2xl overflow-hidden p-3 border border-white/10 hover:border-softpink/40 transition-all duration-300">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full glass-panel text-[11px] font-semibold tracking-wider border border-white/10 ${index % 2 === 0 ? 'text-rosegold' : 'text-softpink'}`}>
                  {item.badge}
                </div>
                <div className="absolute bottom-3 inset-x-3 text-warmwhite">
                  <p className="font-serif font-bold text-lg">{item.title}</p>
                  <p className="text-xs text-warmwhite/70">{item.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewerIndex !== null && (
        <GalleryViewer items={items} initialIndex={viewerIndex} onClose={() => setViewerIndex(null)} />
      )}
    </section>
  );
}
