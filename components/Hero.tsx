
import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  onMenuClick: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onMenuClick, lang }) => {
  const t = translations[lang].hero;

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background - Video Embed */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Optimized CSS to simulate object-fit: cover for iframe */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <iframe 
                src="https://streamable.com/e/ox3h3o?autoplay=1&muted=1&loop=1&controls=0&nocontrols=1" 
                frameBorder="0" 
                allow="autoplay; fullscreen" 
                className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-[55%] -translate-y-[40%] pointer-events-none filter brightness-[0.7] scale-[1.5] transform-gpu"
                style={{ pointerEvents: 'none' }}
                title="Hero Video"
            ></iframe>
        </div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-left px-6 w-full max-w-7xl mx-auto mt-8 md:mt-0">
        
        <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <MapPin size={16} className="text-nm-orange" />
          <span className="text-white font-bold tracking-wider text-xs md:text-sm uppercase">
            {t.address}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white mb-2 tracking-tight drop-shadow-2xl">
          {lang !== 'cn' && <span>Nanmei </span>}
          <span className="text-nm-orange">{t.title}</span>
        </h1>
        <h2 className="text-2xl md:text-5xl font-sans font-bold text-white/80 mb-8 tracking-[0.2em] uppercase">
          {t.subtitle}
        </h2>
        
        <p className="text-white max-w-2xl text-lg md:text-2xl font-serif font-medium leading-relaxed tracking-wide drop-shadow-md border-l-4 border-nm-orange pl-6 mb-10">
          "{t.slogan}"
          <br/>
          <span className="text-sm md:text-lg opacity-90 font-sans font-light mt-2 block text-gray-200">
            {t.subSlogan}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
           <a 
            href="#full-menu"
            onClick={(e) => { e.preventDefault(); onMenuClick(); }}
            className="px-8 py-4 bg-nm-orange text-white rounded-lg shadow-[0_4px_14px_0_rgba(255,77,0,0.5)] hover:shadow-[0_6px_20px_rgba(255,77,0,0.4)] hover:bg-orange-600 transition-all duration-300 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            {t.viewMenu} <span className="text-lg">→</span>
          </a>
          <a 
            href="https://reservations.allo.restaurant/de/nan-mei-sha-guo-eintopf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-nm-dark rounded-lg shadow-lg hover:bg-nm-light transition-all duration-300 font-bold uppercase tracking-widest text-sm text-center"
          >
            {t.bookTable}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a href="#about" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown size={32} strokeWidth={2} />
        </a>
      </div>

      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
