
import React, { useEffect, useState } from 'react';
import { Flame, Heart, Users, UtensilsCrossed, Sparkles, ChefHat } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutStoryProps {
  lang: Language;
}

// Image Collections
const heroImages = [
  "https://i.postimg.cc/JhZyC92M/101.jpg?q=80&w=2000&auto=format&fit=crop",
  "https://i.postimg.cc/9fZ4HvnH/105.jpg?q=80&w=2522&auto=format&fit=crop", // From Home Hero
  "https://i.postimg.cc/mD4PL8vd/107.jpg?q=80&w=2000&auto=format&fit=crop"
];

const vibeImages = [
  "https://i.postimg.cc/ZRmWbVG7/109.jpg?q=80&w=1000&auto=format&fit=crop",
  "https://i.postimg.cc/FRvYrDMK/106.jpg?q=80&w=1000&auto=format&fit=crop", // Gallery
  "https://i.postimg.cc/Y97vrb5D/108.jpg?q=80&w=1000&auto=format&fit=crop"  // Gallery
];

const foodImages = [
  "https://i.postimg.cc/kGXD8DX3/c3.jpg?q=80&w=1000&auto=format&fit=crop", // Beef Tomato
  "https://i.postimg.cc/rsFzWzFR/%E5%9B%BE%E7%89%87%2020251215212056.jpg?q=80&w=1000&auto=format&fit=crop", // Mixed Meat
  "https://i.postimg.cc/rm9KK5Tg/a8.jpg?q=80&w=1000&auto=format&fit=crop", // Fish
  "https://i.postimg.cc/RFTNNw99/c4.jpg?q=80&w=1000&auto=format&fit=crop"  // Chicken Stomach
];

// Reusable Carousel Component
const StoryCarousel: React.FC<{ 
    images: string[], 
    interval?: number, 
    overlayClass?: string,
    imgClass?: string 
}> = ({ images, interval = 4000, overlayClass = "", imgClass = "w-full h-full object-cover" }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="absolute inset-0 w-full h-full">
            {images.map((img, i) => (
                <div 
                    key={i} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        i === index ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img 
                        src={img} 
                        alt="Slide" 
                        className={imgClass}
                    />
                    {overlayClass && <div className={overlayClass}></div>}
                </div>
            ))}
        </div>
    );
};

const AboutStory: React.FC<AboutStoryProps> = ({ lang }) => {
  const currentLang = translations[lang] ? lang : 'de';
  const t = translations[currentLang].aboutStory;
  
  // Defensive fallback in case translation is missing
  if (!t) return null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper to render bold text from markdown-style **text**
  const renderText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-nm-orange font-black">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
  };

  return (
    <div className="bg-nm-light min-h-screen pb-20 pt-20 overflow-x-hidden">
      
      {/* Hero Section with Carousel */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden mb-20">
         <StoryCarousel 
            images={heroImages} 
            overlayClass="absolute inset-0 bg-black/60 md:bg-black/50" // Slightly darker for text readability
            imgClass="w-full h-full object-cover filter brightness-[0.6]"
         />
         {/* Gradient Overlay for bottom text transition */}
         <div className="absolute inset-0 bg-gradient-to-t from-nm-light via-transparent to-transparent pointer-events-none"></div>

         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-block mb-4 p-2 border-2 border-nm-orange rounded-full text-nm-orange bg-black/20 backdrop-blur-sm">
                <Flame size={24} />
            </div>
            <h1 className="text-4xl md:text-7xl font-serif font-black text-white mb-6 leading-tight drop-shadow-2xl">
               {t.heroTitle}
            </h1>
            <h2 className="text-xl md:text-3xl font-sans font-light text-white/90 tracking-widest uppercase drop-shadow-md">
               {t.heroSubtitle}
            </h2>
         </div>
      </section>

      {/* Stats / Highlights Bar */}
      <div className="container mx-auto px-6 mb-24 relative z-20 -mt-32">
         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 grid grid-cols-3 gap-2 md:gap-8 border-b-4 border-nm-orange">
             <div className="flex flex-col items-center text-center space-y-2 border-r border-gray-100 last:border-0 px-1">
                 <ChefHat className="text-nm-orange mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
                 <span className="font-serif font-bold text-sm md:text-2xl text-nm-dark">{t.stat1}</span>
                 <span className="text-gray-500 text-[10px] md:text-sm uppercase tracking-wider leading-tight">{t.stat1Desc}</span>
             </div>
             <div className="flex flex-col items-center text-center space-y-2 border-r border-gray-100 last:border-0 px-1">
                 <Sparkles className="text-nm-orange mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
                 <span className="font-serif font-bold text-sm md:text-2xl text-nm-dark">{t.stat2}</span>
                 <span className="text-gray-500 text-[10px] md:text-sm uppercase tracking-wider leading-tight">{t.stat2Desc}</span>
             </div>
             <div className="flex flex-col items-center text-center space-y-2 px-1">
                 <Users className="text-nm-orange mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
                 <span className="font-serif font-bold text-sm md:text-2xl text-nm-dark">{t.stat3}</span>
                 <span className="text-gray-500 text-[10px] md:text-sm uppercase tracking-wider leading-tight">{t.stat3Desc}</span>
             </div>
         </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl space-y-24 md:space-y-32">
         
         {/* Story Section 1: Persona (Carousel) */}
         <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 relative group h-[500px]">
                <div className="absolute -top-4 -left-4 w-full h-full border-4 border-nm-orange/20 rounded-2xl group-hover:top-4 group-hover:left-4 transition-all duration-500 z-0"></div>
                
                <div className="relative z-10 w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-gray-100">
                    <StoryCarousel images={vibeImages} interval={3500} />
                </div>

                <div className="absolute bottom-10 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 animate-bounce">
                    <span className="text-4xl">💃</span>
                    <span className="font-brand font-bold text-nm-dark text-lg">Wanghong Style</span>
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-12 h-1 bg-nm-orange"></span>
                    <span className="text-nm-orange font-bold uppercase tracking-widest text-sm">Story Chapter 1</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-nm-dark leading-tight">{t.section1Title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {renderText(t.section1Text)}
                </p>
                <div className="pt-4">
                    <UtensilsCrossed className="text-nm-orange/50 w-24 h-24 absolute right-0 opacity-10" />
                </div>
            </div>
         </div>

         {/* Story Section 2: Product (Reverse Layout with Carousel) */}
         <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 relative group h-[500px]">
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-nm-pink/30 rounded-full group-hover:bottom-4 group-hover:right-4 transition-all duration-500 z-0"></div>
                
                <div className="relative z-10 w-full h-full rounded-full shadow-2xl overflow-hidden border-8 border-white bg-gray-100">
                     <StoryCarousel images={foodImages} interval={3000} />
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-12 h-1 bg-nm-orange"></span>
                    <span className="text-nm-orange font-bold uppercase tracking-widest text-sm">Story Chapter 2</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-nm-dark leading-tight">{t.section2Title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {renderText(t.section2Text)}
                </p>
                <div className="flex gap-4 mt-4 flex-wrap">
                     <span className="px-4 py-2 bg-orange-100 text-nm-orange rounded-full font-bold text-sm">#Eintopf</span>
                     <span className="px-4 py-2 bg-orange-100 text-nm-orange rounded-full font-bold text-sm">#Soulfood</span>
                     <span className="px-4 py-2 bg-orange-100 text-nm-orange rounded-full font-bold text-sm">#Zigong</span>
                </div>
            </div>
         </div>

         {/* Story Section 3: CTA */}
         <div className="bg-nm-dark rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute -top-20 -left-20 w-96 h-96 bg-nm-orange/20 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-nm-blue/20 rounded-full blur-3xl"></div>

             <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <Heart className="text-nm-orange w-16 h-16 mx-auto animate-pulse" fill="currentColor" />
                <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
                    {t.section3Title}
                </h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    {renderText(t.section3Text)}
                </p>
                
                <div className="pt-8">
                    <a 
                        href="https://reservations.allo.restaurant/de/nan-mei-sha-guo-eintopf" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block px-10 py-5 bg-nm-orange text-white text-lg font-bold uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(255,77,0,0.5)] hover:bg-white hover:text-nm-orange hover:shadow-none transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {t.ctaButton}
                    </a>
                </div>
             </div>
         </div>

      </div>
    </div>
  );
};

export default AboutStory;
