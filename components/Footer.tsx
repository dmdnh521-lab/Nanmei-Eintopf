
import React from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock, ExternalLink, CalendarDays } from 'lucide-react';
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

  return (
    <footer id="contact" className="bg-nm-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 在下方 src 处替换您的 Logo 链接 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-16 h-16 shrink-0">
                  <img 
                    src="https://i.postimg.cc/wMf9Fvsj/logo.png" 
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

          {/* Location */}
          <div className="space-y-6">
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
                className="inline-flex items-center gap-2 text-xs text-nm-blue font-bold uppercase tracking-wide hover:underline"
              >
                {t.route} <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-4 border-nm-blue pl-3">{t.contactTitle}</h4>
            <div className="space-y-4">
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
                className="flex items-center gap-3 text-gray-400 hover:text-nm-orange transition-colors group"
              >
                <CalendarDays className="text-nm-orange shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <p className="text-sm font-bold underline decoration-dotted underline-offset-4">{t.reserve}</p>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-4 border-white pl-3">{t.hoursTitle}</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-6 border-b border-gray-800 pb-2">
                <span className="flex items-center gap-2 font-bold min-w-[80px]"><Clock size={14} className="text-nm-orange"/> {t.daily}</span>
                <span className="text-white font-bold">12:00 - 23:00</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">{t.kitchenClose}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <p>&copy; {new Date().getFullYear()} Eintopf Gastro Management GmbH. {t.rights}</p>
          <div className="flex gap-6">
             <a href="#impressum" onClick={(e) => handleLinkClick(e, 'impressum')} className="hover:text-nm-orange transition-colors">{t.impressum}</a>
             <a href="#datenschutz" onClick={(e) => handleLinkClick(e, 'datenschutz')} className="hover:text-nm-orange transition-colors">{t.datenschutz}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
