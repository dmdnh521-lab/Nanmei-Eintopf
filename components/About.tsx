import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutProps {
  lang: Language;
}

const aboutImages = [
  "https://i.postimg.cc/JhZyC92M/101.jpg?q=80&w=1000&auto=format&fit=crop", 
  "https://i.postimg.cc/FRvYrDMK/106.jpg?q=80&w=1000&auto=format&fit=crop", 
  "https://i.postimg.cc/ZRmWbVG7/109.jpg?q=80&w=1000&auto=format&fit=crop"  
];

const About: React.FC<AboutProps> = ({ lang }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t = translations[lang].about;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/800x600/f3f4f6/9ca3af?text=Nanmei+Eintopf";
    e.currentTarget.onerror = null; 
  };

  // Helper to render markdown-like bold text
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-nm-light relative overflow-visible">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-nm-pink/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-nm-orange/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h4 className="text-nm-orange uppercase tracking-widest font-bold text-sm mb-4">{t.concept}</h4>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-nm-dark mb-6">
              {t.title} <span className="text-nm-orange">{t.titleHighlight}</span>
            </h2>
            <h3 className="text-2xl font-brand text-gray-800 mb-6">{t.subTitle}</h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              {renderText(t.description1)}
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {renderText(t.description2)}
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed border-l-4 border-nm-orange pl-4 italic bg-white/60 py-2 rounded-r-lg">
              {renderText(t.description3)}
              <span className="text-sm not-italic mt-1 block font-bold text-nm-dark">{t.waiting}</span>
            </p>
            
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="border-l-4 border-nm-orange pl-2 md:pl-3 bg-white/50 p-2 rounded-r-lg">
                <span className="block text-sm md:text-lg font-bold text-nm-dark">{t.features.location}</span>
                <span className="text-[10px] md:text-xs text-gray-500">{t.features.locationDesc}</span>
              </div>
              <div className="border-l-4 border-nm-blue pl-2 md:pl-3 bg-white/50 p-2 rounded-r-lg">
                <span className="block text-sm md:text-lg font-bold text-nm-dark">{t.features.rooms}</span>
                <span className="text-[10px] md:text-xs text-gray-500">{t.features.roomsDesc}</span>
              </div>
              <div className="border-l-4 border-nm-pink pl-2 md:pl-3 bg-white/50 p-2 rounded-r-lg">
                <span className="block text-sm md:text-lg font-bold text-nm-dark">{t.features.taste}</span>
                <span className="text-[10px] md:text-xs text-gray-500">{t.features.tasteDesc}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2 relative">
             <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl shadow-2xl overflow-hidden bg-gray-100 z-10">
                
                {aboutImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Ambience ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                ))}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                  {aboutImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-nm-orange w-6' : 'bg-white/70 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
             </div>

             <div className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 w-32 h-32 md:w-48 md:h-48 bg-nm-blue rounded-full flex items-center justify-center z-20 shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-brand text-sm md:text-xl font-bold text-center leading-tight uppercase whitespace-pre-line">
                    {t.badge}
                </span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;