
import React, { useEffect, useState } from 'react';
import { Flame, Heart, Users, MapPin, ChefHat, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutStoryProps {
  lang: Language;
}

// Image Collections
const heroImages = [
  "https://i.postimg.cc/JhZyC92M/101.jpg?q=80&w=2000&auto=format&fit=crop",
  "https://i.postimg.cc/9fZ4HvnH/105.jpg?q=80&w=2522&auto=format&fit=crop", 
  "https://i.postimg.cc/mD4PL8vd/107.jpg?q=80&w=2000&auto=format&fit=crop"
];

const cultureImages = [
  "https://i.postimg.cc/L8kCMH12/yanshang.png?q=80&w=1000&auto=format&fit=crop", // Room like
  "https://i.postimg.cc/Qdg4rXTs/yangong.png?q=80&w=1000&auto=format&fit=crop", // Interior
  "https://i.postimg.cc/CxCPVFqw/huiguan.png?q=80&w=1000&auto=format&fit=crop"  // Table
];

const roomImages = [
  "https://i.postimg.cc/FRvYrDMK/106.jpg?q=80&w=1000&auto=format&fit=crop", // Room like
  "https://i.postimg.cc/qBnZGXMP/bao2.jpg?q=80&w=1000&auto=format&fit=crop", // Interior
  "https://i.postimg.cc/Wprf76bQ/bao3.jpg?q=80&w=1000&auto=format&fit=crop"  // Table
];

const nanmeiImages = [
  "https://i.postimg.cc/ZRmWbVG7/109.jpg?q=80&w=1000&auto=format&fit=crop",
  "https://i.postimg.cc/mD4PL8vd/107.jpg?q=80&w=1000&auto=format&fit=crop",
  "https://i.postimg.cc/JhZyC92M/101.jpg?q=80&w=1000&auto=format&fit=crop"
];

const casseroleImages = [
  "https://i.postimg.cc/50m668JT/b1.jpg?q=80&w=1000&auto=format&fit=crop", // Fish
  "https://i.postimg.cc/brJ94CsN/d1.png?q=80&w=1000&auto=format&fit=crop", // Rabbit
  "https://i.postimg.cc/HxCf9cHC/d4.jpg?q=80&w=1000&auto=format&fit=crop"  // Atmosphere
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
  
  if (!t) return null;

  useEffect(() => {
    if (!window.location.hash.includes('#')) {
        window.scrollTo(0, 0);
    }
  }, []);

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
      <style>{`
        @keyframes pulse-orange-glow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 0, 0.7); filter: brightness(1); }
          50% { transform: scale(1.08); box-shadow: 0 0 25px 15px rgba(255, 77, 0, 0); filter: brightness(1.2); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 0, 0); filter: brightness(1); }
        }
        .animate-wanghong-active {
          animation: pulse-orange-glow 1.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden mb-20">
         <StoryCarousel 
            images={heroImages} 
            overlayClass="absolute inset-0 bg-black/60 md:bg-black/50"
            imgClass="w-full h-full object-cover filter brightness-[0.6]"
         />
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

      {/* Stats Bar */}
      <div className="container mx-auto px-6 mb-24 relative z-20 -mt-32">
         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 grid grid-cols-3 gap-2 md:gap-8 border-b-4 border-nm-orange">
             <div className="flex flex-col items-center text-center space-y-2 border-r border-gray-100 last:border-0 px-1">
                 <ChefHat className="text-nm-orange mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
                 <span className="font-serif font-bold text-sm md:text-2xl text-nm-dark">{t.stat1}</span>
                 <span className="text-gray-500 text-[10px] md:text-sm uppercase tracking-wider leading-tight">{t.stat1Desc}</span>
             </div>
             <div className="flex flex-col items-center text-center space-y-2 border-r border-gray-100 last:border-0 px-1">
                 <MapPin className="text-nm-orange mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
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

      <div className="container mx-auto px-6 max-w-6xl space-y-24 md:space-y-40">
         
         {/* Chapter 1: Who is Nanmei */}
         <div id="story-nanmei" className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                <div className="absolute -top-4 -left-4 w-full h-full border border-nm-orange/30 rounded-2xl"></div>
                <div className="relative z-10 w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-gray-100">
                    <StoryCarousel images={nanmeiImages} interval={3800} />
                    {/* Animated Badge - Active Movement */}
                    <div className="absolute bottom-6 right-6 bg-white py-3 px-6 rounded-xl shadow-xl flex items-center gap-3 border border-nm-orange/40 animate-wanghong-active z-20">
                        <img src="https://i.postimg.cc/wMf9Fvsj/logo.png" className="w-6 h-6" alt="logo" />
                        <span className="text-nm-dark font-serif font-bold text-sm tracking-tighter">Wanghong Style</span>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-[2px] w-12 bg-nm-orange"></div>
                    <span className="text-nm-orange font-bold uppercase tracking-widest text-sm">{t.chapter1}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-nm-dark leading-tight">{t.nanmeiTitle}</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {renderText(t.nanmeiText)}
                </p>
            </div>
         </div>

         {/* Chapter 2: Why Casserole */}
         <div id="story-casserole" className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2 relative flex justify-center">
                <div className="relative z-10 w-full max-w-[450px] aspect-square rounded-full shadow-2xl overflow-hidden border-8 border-white bg-gray-100">
                    <StoryCarousel images={casseroleImages} interval={3200} />
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-nm-orange/5 rounded-full blur-3xl"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-[2px] w-12 bg-nm-orange"></div>
                    <span className="text-nm-orange font-bold uppercase tracking-widest text-sm">{t.chapter2}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-nm-dark leading-tight">{t.casseroleTitle}</h2>
                <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-line prose prose-orange max-w-none">
                    {renderText(t.casseroleText)}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                    <span className="bg-nm-orange/5 text-nm-orange px-4 py-2 rounded-full text-xs font-bold border border-nm-orange/10">#Eintopf</span>
                    <span className="bg-nm-orange/5 text-nm-orange px-4 py-2 rounded-full text-xs font-bold border border-nm-orange/10">#Soulfood</span>
                    <span className="bg-nm-orange/5 text-nm-orange px-4 py-2 rounded-full text-xs font-bold border border-nm-orange/10">#Zigong</span>
                </div>
            </div>
         </div>

         {/* Section 1: Culture (Yanbang Cai) */}
         <div id="story-culture" className="flex flex-col md:flex-row items-center gap-12 md:gap-20 scroll-mt-32">
            <div className="w-full md:w-1/2 relative group h-[400px] md:h-[500px]">
                <div className="absolute -top-4 -left-4 w-full h-full border-4 border-nm-orange/20 rounded-2xl group-hover:top-4 group-hover:left-4 transition-all duration-500 z-0"></div>
                <div className="relative z-10 w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-gray-100">
                    <StoryCarousel images={cultureImages} interval={3500} />
                </div>
                {/* Decorative Label moved to top-right and downsized */}
                <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-white/90 p-2 md:p-4 rounded-lg md:rounded-xl shadow-lg z-20 backdrop-blur-sm border border-gray-100">
                     <span className="block text-nm-orange font-bold text-[10px] md:text-xs uppercase tracking-widest mb-0.5 md:mb-1">Tradition</span>
                     <span className="font-serif font-bold text-nm-dark text-sm md:text-xl">Yanbang • Zigong</span>
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="text-nm-orange" size={20} />
                    <span className="text-nm-orange font-bold uppercase tracking-widest text-sm">{t.cultureLabel}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-nm-dark leading-tight">{t.cultureTitle}</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {renderText(t.cultureText)}
                </p>
            </div>
         </div>

         {/* Section 2: Rooms (3 Rooms, 8-12 pax) */}
         <div id="story-rooms" className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20 scroll-mt-32">
            <div className="w-full md:w-1/2 relative group h-[400px] md:h-[500px]">
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-nm-blue/10 rounded-2xl group-hover:bottom-4 group-hover:right-4 transition-all duration-500 z-0"></div>
                <div className="relative z-10 w-full h-full rounded-2xl shadow-2xl overflow-hidden border-4 border-white bg-gray-100">
                     <StoryCarousel images={roomImages} interval={3000} />
                </div>
                <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-nm-blue text-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg z-20">
                     <span className="block font-bold text-lg md:text-2xl mb-0.5 md:mb-1">3</span>
                     <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-90">Private Rooms</span>
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="text-nm-blue" size={20} />
                    <span className="text-nm-blue font-bold uppercase tracking-widest text-sm">{t.roomsLabel}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-nm-dark leading-tight">{t.roomsTitle}</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {renderText(t.roomsText)}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                    <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold">8 - 12 Guests</span>
                </div>
            </div>
         </div>

         {/* Section 3: Location (Zeil 2 + Transport) */}
         <div id="story-location" className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 scroll-mt-32">
             <div className="flex flex-col md:flex-row gap-10 items-start">
                 <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="text-nm-orange" size={20} />
                        <span className="text-nm-orange font-bold uppercase tracking-widest text-sm">{t.locationLabel}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-black text-nm-dark">{t.locationTitle}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                        {renderText(t.locationText)}
                    </p>
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=Nanmei+Eintopf+Restaurant+Zeil+2+Frankfurt" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-nm-blue font-bold hover:underline mt-2"
                    >
                        <MapPin size={18} /> Google Maps
                    </a>
                 </div>
                 <div className="w-full md:w-1/3 h-64 md:h-auto rounded-2xl overflow-hidden shadow-inner border border-gray-200">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.5583929457896!2d8.68652307689104!3d50.11361497152988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0ea3b0000001%3A0x123456789abc!2sZeil%202%2C%2060313%20Frankfurt%20am%20Main!5e0!3m2!1sde!2sde!4v1710930000000!5m2!1sde!2sde" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, minHeight: '250px' }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Zeil 2"
                     ></iframe>
                 </div>
             </div>
         </div>

         {/* CTA */}
         <div className="bg-nm-dark rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <Heart className="text-nm-orange w-16 h-16 mx-auto animate-pulse" fill="currentColor" />
                <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
                    {t.section3Title}
                </h2>
                
                <div className="pt-4">
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
