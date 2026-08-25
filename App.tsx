
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
import { MediaPress } from './components/MediaPress';
import CookieBanner from './components/CookieBanner';
import { Language } from './types';
import { translations } from './translations';

// Simple pathname parser helper
const getPageFromPathname = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  if (path.includes('about-story')) return 'about-story';
  if (path.includes('full-menu')) return 'full-menu';
  if (path.includes('media')) return 'media';
  if (path.includes('impressum')) return 'impressum';
  if (path.includes('datenschutz')) return 'datenschutz';
  return 'home';
};

// Simple language parser helper
const getLangFromPathname = () => {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;
  if (path.startsWith('/en/') || path === '/en') return 'en';
  if (path.startsWith('/cn/') || path === '/cn') return 'cn';
  return null;
};

interface AppProps {
  initialPage?: string;
  initialLang?: Language;
}

function App({ initialPage, initialLang }: AppProps = {}) {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window === 'undefined') return initialPage || 'home';
    const hashPage = window.location.hash.replace('#', '').split('#')[0];
    if (['full-menu', 'impressum', 'datenschutz', 'about-story', 'media'].includes(hashPage)) return hashPage;
    return initialPage || getPageFromPathname();
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return initialLang || 'de';
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam && ['de', 'en', 'cn'].includes(langParam)) return langParam as Language;
    
    const pathLang = getLangFromPathname();
    if (pathLang) return pathLang;

    const savedLang = localStorage.getItem('appLanguage') as Language;
    if (savedLang && ['de', 'en', 'cn'].includes(savedLang)) return savedLang as Language;

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('zh')) return 'cn';
    return 'de';
  });

  // Listen for navigation back/forward (PopState)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPathname());
      const pathLang = getLangFromPathname();
      if (pathLang) {
        setLanguage(pathLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    
    // Update path-based language URL
    let targetPage = currentPage === 'home' ? '' : currentPage;
    let targetUrl = '/';
    if (lang === 'en') {
      targetUrl = targetPage ? `/en/${targetPage}` : '/en/';
    } else if (lang === 'cn') {
      targetUrl = targetPage ? `/cn/${targetPage}` : '/cn/';
    } else {
      targetUrl = targetPage ? `/${targetPage}` : '/';
    }

    window.history.pushState({}, '', targetUrl);
  };

  const t = translations[language] || translations['de'];

  // 2. Dynamic SEO (Meta Tags & Title) Update
  useEffect(() => {
    if (!t || !t.seo) return;

    let docTitle = t.seo.title;
    if (currentPage === 'full-menu') docTitle = `${t.nav.menu} | Nanmei Eintopf Frankfurt`;
    if (currentPage === 'media') docTitle = t.mediaPress?.seoTitle || `Presse & Reviews | Nanmei Eintopf Frankfurt`;
    if (currentPage === 'impressum') docTitle = `Impressum | Nanmei Eintopf`;
    if (currentPage === 'datenschutz') docTitle = `Datenschutz | Nanmei Eintopf`;
    if (currentPage === 'about-story') docTitle = `Unsere Story | Nanmei Eintopf Frankfurt`;
    
    document.title = docTitle;
    
    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', currentPage === 'media' ? (t.mediaPress?.seoDescription || t.seo.description) : t.seo.description);
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
    let currentUrl = baseUrl;
    
    if (language === 'en') currentUrl += '/en';
    if (language === 'cn') currentUrl += '/cn';
    
    if (currentPage !== 'home') {
      currentUrl += `/${currentPage}`;
    } else {
      currentUrl += '/';
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
    const [targetPage, anchor] = page.split('#');

    // Calculate language base path
    let basePath = '/';
    if (language === 'en') basePath = '/en/';
    if (language === 'cn') basePath = '/cn/';

    let targetUrl = basePath;
    if (targetPage !== 'home' && targetPage !== '') {
      targetUrl = `${basePath}${targetPage}`;
    }
    if (anchor) {
      targetUrl = `${targetUrl}#${anchor}`;
    }

    window.history.pushState({}, '', targetUrl);
    setCurrentPage(targetPage === '' ? 'home' : targetPage);

    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
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
      case 'media':
        return <MediaPress lang={language} onNavigate={handleNavigate} />;
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
