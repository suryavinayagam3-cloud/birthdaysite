import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryViewer({ items, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const item = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-warmwhite hover:text-softpink transition-colors z-20">
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel hidden sm:flex items-center justify-center text-warmwhite hover:text-softpink transition-colors z-20">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel hidden sm:flex items-center justify-center text-warmwhite hover:text-softpink transition-colors z-20">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="max-w-4xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full max-h-[70vh] flex items-center justify-center group">
          <img src={item.image} alt={item.title} className="max-h-[70vh] max-w-full rounded-2xl shadow-2xl object-contain border border-white/10" />
          
          {/* Mobile swipe hints (visual only for now, can add touch handlers if needed) */}
          <div className="absolute inset-y-0 left-0 w-1/4 sm:hidden" onClick={handlePrev}></div>
          <div className="absolute inset-y-0 right-0 w-1/4 sm:hidden" onClick={handleNext}></div>
        </div>
        
        <div className="mt-6 text-center space-y-1">
          <span className="px-3 py-1 rounded-full glass-pill text-xs text-rosegold font-semibold">{item.badge}</span>
          <h4 className="font-serif text-2xl font-bold text-warmwhite mt-2">{item.title}</h4>
          <p className="text-sm text-warmwhite/70 max-w-md mx-auto">{item.fullCaption || item.caption}</p>
        </div>
      </div>
    </div>
  );
}
