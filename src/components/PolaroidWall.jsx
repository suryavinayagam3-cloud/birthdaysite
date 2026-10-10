import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function PolaroidWall({ items }) {
  const containerRef = useRef(null);
  return (
    <div className="px-6 max-w-6xl mx-auto mb-20">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-softpink/20 relative" ref={containerRef}>
        <div className="text-center mb-10">
          <span className="text-rosegold text-xs font-semibold tracking-widest uppercase">Vintage Scrapbook</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-warmwhite mt-1">Polaroid Memory Wall</h3>
          <p className="text-warmwhite/60 text-xs mt-2 font-sans tracking-wide">Try dragging the photos around ✨</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {items.map((item, index) => (
            <motion.div 
              key={index} 
              drag
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.05, zIndex: 50, rotate: 0, cursor: 'grabbing' }}
              whileHover={{ scale: 1.03, zIndex: 20 }}
              initial={{ rotate: item.rotation }}
              className="polaroid cursor-grab bg-[#FFF5F7] text-neutral-900 p-4 pb-7 rounded-sm shadow-2xl max-w-[280px] w-full border border-neutral-200"
            >
              <div className="aspect-square bg-neutral-800 overflow-hidden mb-3">
                <img 
                  src={item.image} 
                  alt="Polaroid" 
                  className={`w-full h-full object-cover ${index % 2 === 0 ? 'grayscale-[20%] sepia-[15%]' : 'sepia-[20%]'}`} 
                />
              </div>
              <p className="font-handwriting text-3xl text-center text-neutral-800">{item.caption}</p>
              <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest mt-1">{item.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
