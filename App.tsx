
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import FullMenu from './components/FullMenu';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import AboutStory from './components/AboutStory'; 
import CookieBanner from './components/CookieBanner';
import { Language } from './types';
import { translations } from './translations';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<Language>('de');

  // Language Detection & URL Param Logic
  useEffect(() => {
    // 1. Check URL Parameter (e.g. ?lang=en)
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');

    if (langParam && ['de', 'en', 'cn'].includes(langParam)) {
      setLanguage(langParam as Language);
    } else {
      // 2. Check Local Storage
      const savedLang = localStorage.getItem('appLanguage') as Language;
      if (savedLang && ['de', 'en', 'cn'].includes(savedLang)) {
        setLanguage(savedLang);
      } else {
        // 3. Check Browser Language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('de')) {
          setLanguage('de');
        } else if (browserLang.startsWith('zh')) {
          setLanguage('cn');
        } else {
          setLanguage('de'); // Changed from 'en' to 'de' to prioritize Local SEO for crawlers
        }
      }
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    
    // Update URL without reloading to reflect language state
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  };

  const t = translations[language] || translations['de'];

  // 1. Listen for URL Hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '');
      const [basePage, anchor] = fullHash.split('#'); // Handle 'about-story#rooms'
      
      if (['full-menu', 'impressum', 'datenschutz', 'about-story'].includes(basePage)) {
        setCurrentPage(basePage);
        if (!anchor) {
             window.scrollTo(0, 0);
        } else {
             // If there's an anchor, wait a bit for render then scroll
             setTimeout(() => {
                 document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
             }, 100);
        }
      } else {
        if (!['about', 'contact', 'home'].includes(basePage) && basePage !== '') {
             setCurrentPage('home');
        } else if (currentPage !== 'home') {
             setCurrentPage('home');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  // 2. Dynamic SEO (Meta Tags & Title) Update
  useEffect(() => {
    if (!t || !t.seo) return;

    let docTitle = t.seo.title;
    if (currentPage === 'full-menu') docTitle = `${t.nav.menu} | Nanmei Eintopf Frankfurt`;
    if (currentPage === 'impressum') docTitle = `Impressum | Nanmei Eintopf`;
    if (currentPage === 'datenschutz') docTitle = `Datenschutz | Nanmei Eintopf`;
    if (currentPage === 'about-story') docTitle = `Unsere Story | Nanmei Eintopf Frankfurt`;
    
    document.title = docTitle;
    
    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t.seo.description);
    }

    // Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        metaKeywords.setAttribute('content', t.seo.keywords);
    }

    // Update HTML Lang Attribute
    document.documentElement.lang = language === 'cn' ? 'zh-CN' : language;

    // 3. Update Canonical URL Dynamically
    const baseUrl = "https://nanmei-eintopf.de";
    let currentUrl = baseUrl + "/";
    
    // Add language param if not default (de)
    if (language !== 'de') {
      currentUrl += `?lang=${language}`;
    }
    
    // Add page hash if not home
    if (currentPage !== 'home') {
      currentUrl += `#${currentPage}`;
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

  }, [currentPage, language, t]);

  const handleNavigate = (page: string) => {
    // Check if page contains an anchor like 'about-story#rooms'
    const [targetPage, anchor] = page.split('#');

    window.location.hash = page; // This triggers hashchange listener
    
    // If staying on same page but changing anchor, listener might not trigger scroll if logic prevents re-render
    // So we manually check if we need to scroll immediately if page is already current
    if (targetPage === currentPage && anchor) {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onMenuClick={() => handleNavigate('full-menu')} lang={language} />
            <About lang={language} onNavigate={handleNavigate} />
            <Menu onFullMenuClick={() => handleNavigate('full-menu')} lang={language} />
            <Gallery />
          </>
        );
      case 'full-menu':
        return <FullMenu lang={language} />;
      case 'about-story':
        return <AboutStory lang={language} />;
      case 'impressum':
        return <Impressum />;
      case 'datenschutz':
        return <Datenschutz />;
      default:
        return (
          <>
            <Hero onMenuClick={() => handleNavigate('full-menu')} lang={language} />
            <About lang={language} onNavigate={handleNavigate} />
            <Menu onFullMenuClick={() => handleNavigate('full-menu')} lang={language} />
            <Gallery />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        currentLang={language}
        onLanguageChange={changeLanguage}
      />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} lang={language} />
      
      <AIChat />
      <CookieBanner onNavigate={handleNavigate} lang={language} />
    </div>
  );
}

export default App;
