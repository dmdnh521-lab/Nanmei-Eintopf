
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface CookieBannerProps {
  onNavigate: (page: string) => void;
  lang: Language;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate, lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[lang].cookie;

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    onNavigate(target);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] animate-fade-in-up">
      <div className="bg-white/95 backdrop-blur-xl border-t-4 border-nm-orange shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 md:p-8">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-start gap-5">
             <div className="hidden md:flex w-12 h-12 bg-orange-50 rounded-full items-center justify-center shrink-0 text-2xl border border-orange-100">
                🍪
             </div>
             <div className="text-gray-600 text-sm leading-relaxed">
                <h4 className="font-serif font-black text-nm-dark text-lg mb-1">{t.title}</h4>
                <p className="max-w-2xl">
                  {t.text}
                </p>
             </div>
          </div>

          <div className="flex gap-4 shrink-0 w-full md:w-auto">
            <a 
              href="#datenschutz"
              onClick={(e) => handleLinkClick(e, 'datenschutz')}
              className="flex-1 md:flex-none px-6 py-3 text-center border-2 border-gray-100 hover:border-gray-300 text-gray-500 hover:text-nm-dark font-bold rounded-xl transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center"
            >
              {t.policy}
            </a>
            <button 
              onClick={handleAccept}
              className="flex-1 md:flex-none px-8 py-3 bg-nm-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-widest text-xs"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
