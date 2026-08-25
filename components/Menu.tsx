
import React from 'react';
import { MenuItem, Language } from '../types';
import { translations } from '../translations';

interface MenuProps {
  onFullMenuClick: () => void;
  lang: Language;
}

const Menu: React.FC<MenuProps> = ({ onFullMenuClick, lang }) => {
  // Defensive fallback
  const currentLang = translations[lang] ? lang : 'de';
  const t = translations[currentLang].menu;

  const highlights: Partial<MenuItem>[] = [
    {
      id: 1,
      image: "/images/WzHz5MW0-d4.webp",
      price: "€18.80",
      category: "soup"
    },
    {
      id: 2,
      image: "/images/kGXD8DX3-c3.webp",
      price: "€24.80",
      category: "seafood"
    },
    {
      id: 3,
      image: "/images/RFTNNw99-c4.webp",
      price: "€22.80",
      category: "meat"
    },
    {
      id: 4,
      image: "/images/pTBppKx2-c1.webp",
      price: "€20.80",
      category: "meat"
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x400/f3f4f6/9ca3af?text=Nanmei+Eintopf";
    e.currentTarget.onerror = null; 
  };

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="bg-nm-orange text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase inline-block mb-4 shadow-md">
            {t.recommendation}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-nm-dark font-bold mb-4">{t.highlights}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 mb-12 scrollbar-hide">
          {highlights.map((item) => {
             // @ts-ignore
             const itemData = t.items[item.id];
             
             // Safety check: skip rendering if data is missing to avoid crash
             if (!itemData) return null;

             return (
                <div key={item.id} className="min-w-[85%] md:min-w-0 snap-center group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                    src={item.image} 
                    alt={itemData.name} 
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-nm-orange text-white font-bold px-3 py-1 rounded-lg shadow-md">
                    {item.price}
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-nm-dark mb-1 group-hover:text-nm-orange transition-colors">
                      {itemData.name.split(/(\(.*?\)|（.*?）)/).map((part: string, i: number) => 
                        (part.startsWith('(') || part.startsWith('（')) 
                          ? <span key={i} className="text-[0.75em] font-normal opacity-70 block">{part}</span> 
                          : part
                      )}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{itemData.desc}</p>
                </div>
                </div>
             );
          })}
        </div>

        <div className="text-center">
          <a
            href="#full-menu"
            onClick={(e) => { e.preventDefault(); onFullMenuClick(); }}
            className="inline-flex items-center gap-2 px-10 py-4 bg-nm-orange text-white rounded-lg hover:bg-orange-600 transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-xl shadow-orange-500/20 transform hover:-translate-y-1"
          >
            {t.viewFull} <span className="text-lg">→</span>
          </a>
        </div>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Menu;
