
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, currentLang, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang]?.nav;

  const getLocalizedPath = (page: string) => {
    let basePath = '/';
    if (currentLang === 'en') basePath = '/en/';
    if (currentLang === 'cn') basePath = '/cn/';

    if (page === 'home') return basePath;
    if (page.startsWith('home#')) {
      const anchor = page.split('#')[1];
      return `${basePath}#${anchor}`;
    }
    return `${basePath}${page}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  if (!t) return null;

  const isLightMode = currentPage === 'full-menu' || currentPage === 'impressum' || currentPage === 'datenschutz' || currentPage === 'about-story' || currentPage === 'media' || isScrolled;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    closeMobileMenu();
    onNavigate(target);
    
    if (target.startsWith('home#')) {
        const elementId = target.split('#')[1];
        if (currentPage !== 'home') {
            setTimeout(() => {
                const element = document.getElementById(elementId);
                element?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(elementId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isLightMode
          ? 'bg-nm-light/95 border-gray-200 backdrop-blur-md py-3 shadow-sm' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* 在下方 src 处替换您的 Logo 链接 */}
        <a 
          href={getLocalizedPath('home')} 
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <div className="w-14 h-14 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
               <img 
                 src="https://i.postimg.cc/wMf9Fvsj/logo.png" 
                 alt="Nanmei Panda Pot Logo" 
                 className="w-full h-full object-contain drop-shadow-lg"
                 onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = '<div class="w-12 h-12 bg-nm-orange rounded-lg flex items-center justify-center shadow-lg"><span class="text-white font-serif font-black text-2xl">N</span></div>';
                    }
                 }}
               />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className={`font-serif font-bold text-xl leading-none tracking-wider transition-colors uppercase ${isLightMode ? 'text-nm-dark' : 'text-white drop-shadow-md'}`}>Nanmei Eintopf</span>
            <span className={`text-[10px] tracking-[0.1em] font-sans font-medium opacity-80 mt-1 ${isLightMode ? 'text-nm-orange' : 'text-white/90 drop-shadow-md'}`}>喃妹砂锅 Frankfurt</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7">
          <a href={getLocalizedPath('home')} onClick={(e) => handleLinkClick(e, 'home')} className={`text-sm uppercase tracking-widest font-bold hover:text-nm-orange transition-colors ${isLightMode ? 'text-gray-600' : 'text-white'}`}>{t.home}</a>
          <a href={getLocalizedPath('about-story')} onClick={(e) => handleLinkClick(e, 'about-story')} className={`text-sm uppercase tracking-widest font-bold hover:text-nm-orange transition-colors ${isLightMode ? 'text-gray-600' : 'text-white'}`}>{t.about}</a>
          <a href={getLocalizedPath('full-menu')} onClick={(e) => handleLinkClick(e, 'full-menu')} className={`text-sm uppercase tracking-widest font-bold hover:text-nm-orange transition-colors ${isLightMode ? 'text-gray-600' : 'text-white'}`}>{t.menu}</a>
          <a href={getLocalizedPath('media')} onClick={(e) => handleLinkClick(e, 'media')} className={`text-sm uppercase tracking-widest font-bold hover:text-nm-orange transition-colors ${isLightMode ? 'text-gray-600' : 'text-white'}`}>{t.press}</a>
          <a href={getLocalizedPath('home#contact')} onClick={(e) => handleLinkClick(e, 'home#contact')} className={`text-sm uppercase tracking-widest font-bold hover:text-nm-orange transition-colors ${isLightMode ? 'text-gray-600' : 'text-white'}`}>{t.contact}</a>
          
          <div className={`h-4 w-[1px] mx-1 ${isLightMode ? 'bg-gray-300' : 'bg-white/30'}`}></div>
          
          <div className="relative" ref={langMenuRef}>
             <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wide hover:text-nm-orange transition-colors ${isLightMode ? 'text-gray-600' : 'text-white'}`}
             >
                <Globe size={14} />
                {currentLang.toUpperCase()}
             </button>
             {isLangMenuOpen && (
                 <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 w-24 overflow-hidden animate-fade-in-up origin-top-right">
                     <button onClick={() => handleLanguageSelect('de')} className="block w-full text-left px-4 py-3 text-xs font-bold text-gray-600 hover:bg-nm-light hover:text-nm-orange transition-colors border-b border-gray-50 last:border-0">DE</button>
                     <button onClick={() => handleLanguageSelect('en')} className="block w-full text-left px-4 py-3 text-xs font-bold text-gray-600 hover:bg-nm-light hover:text-nm-orange transition-colors border-b border-gray-50 last:border-0">EN</button>
                     <button onClick={() => handleLanguageSelect('cn')} className="block w-full text-left px-4 py-3 text-xs font-bold text-gray-600 hover:bg-nm-light hover:text-nm-orange transition-colors border-b border-gray-50 last:border-0">CN</button>
                 </div>
             )}
          </div>

          <a
            href="https://reservations.allo.restaurant/de/nan-mei-sha-guo-eintopf"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-2 border-2 rounded-full transition-all duration-300 uppercase tracking-widest text-xs font-bold shadow-lg ${
                isLightMode
                ? 'border-nm-orange text-nm-orange hover:bg-nm-orange hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-nm-orange'
            }`}
          >
            {t.reserve}
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-5 md:hidden">
            <div className="flex items-center gap-3">
                <button onClick={() => onLanguageChange('de')} className={`text-xs font-bold transition-colors ${currentLang === 'de' ? 'text-nm-orange' : (isLightMode ? 'text-nm-dark/70' : 'text-white/80')}`}>DE</button>
                <span className={`text-[10px] ${isLightMode ? 'text-gray-300' : 'text-white/30'}`}>|</span>
                <button onClick={() => onLanguageChange('en')} className={`text-xs font-bold transition-colors ${currentLang === 'en' ? 'text-nm-orange' : (isLightMode ? 'text-nm-dark/70' : 'text-white/80')}`}>EN</button>
                <span className={`text-[10px] ${isLightMode ? 'text-gray-300' : 'text-white/30'}`}>|</span>
                <button onClick={() => onLanguageChange('cn')} className={`text-xs font-bold transition-colors ${currentLang === 'cn' ? 'text-nm-orange' : (isLightMode ? 'text-nm-dark/70' : 'text-white/80')}`}>CN</button>
            </div>

            <button
            className={`${isLightMode ? 'text-nm-dark' : 'text-white'} hover:text-nm-orange transition-colors`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-nm-light border-t border-gray-100 shadow-2xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-8 space-y-6">
           <a href={getLocalizedPath('home')} onClick={(e) => handleLinkClick(e, 'home')} className="text-nm-dark hover:text-nm-orange text-xl font-serif font-bold">{t.home}</a>
           <a href={getLocalizedPath('about-story')} onClick={(e) => handleLinkClick(e, 'about-story')} className="text-nm-dark hover:text-nm-orange text-xl font-serif font-bold">{t.about}</a>
           <a href={getLocalizedPath('full-menu')} onClick={(e) => handleLinkClick(e, 'full-menu')} className="text-nm-dark hover:text-nm-orange text-xl font-serif font-bold">{t.menu}</a>
           <a href={getLocalizedPath('media')} onClick={(e) => handleLinkClick(e, 'media')} className="text-nm-dark hover:text-nm-orange text-xl font-serif font-bold">{t.press}</a>
           <a href={getLocalizedPath('home#contact')} onClick={(e) => handleLinkClick(e, 'home#contact')} className="text-nm-dark hover:text-nm-orange text-xl font-serif font-bold">{t.contact}</a>
           
           <a
            href="https://reservations.allo.restaurant/de/nan-mei-sha-guo-eintopf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-nm-orange text-white text-center uppercase tracking-widest text-sm font-bold rounded-lg shadow-md block mt-4"
            onClick={closeMobileMenu}
          >
            {t.bookTable}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
