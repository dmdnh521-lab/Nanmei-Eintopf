
import React from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock, ExternalLink, CalendarDays, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  onNavigate: (page: string) => void;
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const t = translations[lang].footer;

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    onNavigate(target);
  };

  const getLocalizedPath = (page: string) => {
    let basePath = '/';
    if (lang === 'en') basePath = '/en/';
    if (lang === 'cn') basePath = '/cn/';
    return `${basePath}${page}`;
  };

  return (
    <footer id="contact" className="bg-nm-dark text-white pt-12 pb-8 md:pt-20 md:pb-12">
      <div className="container mx-auto px-5 sm:px-6">
        
        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet/sm, 4 cols on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 md:mb-16">
          
          {/* 1. Brand & Mascot */}
          <div className="space-y-4 md:space-y-5">
            <div className="flex items-center gap-3">
               <div className="w-14 h-14 md:w-16 md:h-16 shrink-0">
                  <img 
                    src="/images/wMf9Fvsj-logo.webp"
                    alt="Nanmei Panda Pot Mascot" 
                    className="w-full h-full object-contain brightness-110 drop-shadow-[0_0_12px_rgba(255,77,0,0.4)]"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerHTML = '<div class="w-12 h-12 bg-nm-orange rounded-lg flex items-center justify-center font-serif font-black text-2xl text-white transform -rotate-3">N</div>';
                        }
                    }}
                  />
               </div>
               <div>
                  <h3 className="text-xl font-bold tracking-wide">Nanmei Eintopf</h3>
                  <p className="text-nm-orange text-[10px] tracking-[0.2em] uppercase font-bold">Frankfurt</p>
               </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              {t.description}<br/>
              <span className="text-gray-500 mt-1 block text-xs">{t.subDescription}</span>
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://xhslink.com/m/6p4fis63XfX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF2442] hover:text-white transition-all duration-300"
                aria-label="Xiaohongshu"
              >
                <span className="font-bold text-[10px] leading-none">小红书</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-nm-orange hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-nm-blue hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* 2. Address */}
          <div className="space-y-4 md:space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-4 border-nm-orange pl-3">{t.addressTitle}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="mt-1 text-nm-orange shrink-0" size={18} />
                <p className="text-sm leading-relaxed font-medium">
                  Zeil 2<br/>
                  60313 Frankfurt am Main<br/>
                  Deutschland
                </p>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Nanmei+Eintopf+Restaurant+Zeil+2+Frankfurt" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 text-xs text-nm-blue font-bold uppercase tracking-wide hover:underline pl-7"
              >
                {t.route} <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* 3. Contact & Reservation */}
          <div className="space-y-4 md:space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-4 border-nm-blue pl-3">{t.contactTitle}</h4>
            <div className="space-y-3.5">
              <a 
                href="tel:06975796768" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="text-nm-orange shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <p className="text-sm font-medium group-hover:text-nm-orange transition-colors">069 75796768</p>
              </a>
              <a 
                href="mailto:nanmeieintopf@gmail.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="text-nm-orange shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <p className="text-sm font-medium group-hover:text-nm-orange transition-colors">nanmeieintopf@gmail.com</p>
              </a>
              <a 
                href="https://reservations.allo.restaurant/de/nan-mei-sha-guo-eintopf" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 text-nm-orange hover:text-orange-400 transition-colors group"
              >
                <CalendarDays className="text-nm-orange shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <p className="text-sm font-bold underline decoration-dotted underline-offset-4">{t.reserve}</p>
              </a>
            </div>
          </div>

          {/* 4. Opening Hours */}
          <div className="space-y-4 md:space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-4 border-white pl-3">{t.hoursTitle}</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex flex-col gap-1 border-b border-gray-800 pb-2">
                <div className="flex items-center gap-2 font-bold text-gray-300">
                  <Clock size={14} className="text-nm-orange"/> {t.daily}
                </div>
                <div className="text-white font-bold ml-6">
                  11:30 - 15:00<br/>
                  17:00 - 21:30
                </div>
              </div>
              <div className="flex items-center gap-2 text-nm-orange font-bold text-xs uppercase">
                <X size={14} /> {t.tuesdayClosed}
              </div>
              <p className="text-xs text-gray-500 mt-1 italic">{t.kitchenClose}</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright row */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <p className="text-center sm:text-left text-xs">&copy; {new Date().getFullYear()} Eintopf Gastro Management GmbH. {t.rights}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs">
             <a href={getLocalizedPath('media')} onClick={(e) => handleLinkClick(e, 'media')} className="hover:text-nm-orange transition-colors">{translations[lang].nav.media}</a>
             <a href={getLocalizedPath('impressum')} onClick={(e) => handleLinkClick(e, 'impressum')} className="hover:text-nm-orange transition-colors">{t.impressum}</a>
             <a href={getLocalizedPath('datenschutz')} onClick={(e) => handleLinkClick(e, 'datenschutz')} className="hover:text-nm-orange transition-colors">{t.datenschutz}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
