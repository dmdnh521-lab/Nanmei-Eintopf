// Media & Press Coverage Component - Nanmei Eintopf Frankfurt
import React, { useState } from 'react';
import { Award, CheckCircle2, ExternalLink, MessageSquare, Newspaper, Share2, Utensils } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface MediaPressProps {
  lang: Language;
  onNavigate?: (page: string) => void;
}

export const MediaPress: React.FC<MediaPressProps> = ({ lang, onNavigate }) => {
  const t = translations[lang].mediaPress;
  const [activeTab, setActiveTab] = useState<'all' | 'press' | 'guides' | 'reviews'>('all');

  const filteredArticles = activeTab === 'all' 
    ? t.articles
    : t.articles.filter(item => item.category === activeTab);

  return (
    <div className="bg-nm-light min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-gray-200/80 bg-white/70 backdrop-blur-sm">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-nm-orange/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-nm-pink/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-nm-dark leading-tight mb-6">
              {t.heroTitle} <span className="text-nm-orange underline decoration-nm-orange/30 decoration-wavy decoration-2">{t.heroHighlight}</span>
            </h1>

            <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          <button
            id="tab-all"
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-nm-dark text-white shadow-md shadow-nm-dark/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {t.tabs.all}
          </button>

          <button
            id="tab-press"
            onClick={() => setActiveTab('press')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all inline-flex items-center gap-2 ${
              activeTab === 'press'
                ? 'bg-nm-dark text-white shadow-md shadow-nm-dark/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Newspaper size={16} />
            {t.tabs.press}
          </button>

          <button
            id="tab-guides"
            onClick={() => setActiveTab('guides')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all inline-flex items-center gap-2 ${
              activeTab === 'guides'
                ? 'bg-nm-dark text-white shadow-md shadow-nm-dark/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Award size={16} />
            {t.tabs.guides}
          </button>

          <button
            id="tab-reviews"
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all inline-flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'bg-nm-dark text-white shadow-md shadow-nm-dark/20'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <MessageSquare size={16} />
            {t.tabs.reviews}
          </button>
        </div>

        {/* Featured & Main Press Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredArticles.map((article, idx) => {
            const isFeatured = idx === 0 && activeTab === 'all';
            return (
              <article
                key={article.id}
                id={`article-${article.id}`}
                className={`bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isFeatured ? 'lg:col-span-2 border-nm-orange/30 bg-gradient-to-br from-white via-white to-nm-orange/5 ring-1 ring-nm-orange/20' : ''
                }`}
              >
                <div>
                  {/* Card Header Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-bold text-xs md:text-sm text-nm-dark bg-gray-100 px-3 py-1 rounded-lg">
                        {article.publisher}
                      </span>
                      {article.date && (
                        <span className="text-xs text-gray-500 font-medium">{article.date}</span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-nm-orange/10 text-nm-orange">
                      <CheckCircle2 size={13} />
                      {article.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className={`font-serif font-black text-nm-dark leading-snug mb-4 hover:text-nm-orange transition-colors ${
                    isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                  }`}>
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                    {article.excerpt}
                  </p>

                  {/* Dishes mentioned in the source */}
                  {article.mentionedDishes.length > 0 && (
                    <div className="mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                        <Utensils size={14} className="text-nm-orange" />
                        <span>{t.mentionedDishes}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {article.mentionedDishes.map((dish, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-nm-orange/10 hover:text-nm-orange transition-colors"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action Link */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-nm-orange hover:text-nm-dark transition-colors group"
                  >
                    <span>{t.viewSource}</span>
                    <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: article.title,
                          text: article.excerpt,
                          url: window.location.href,
                        }).catch(() => {});
                      }
                    }}
                    className="text-gray-400 hover:text-nm-dark text-xs font-medium flex items-center gap-1 transition-colors"
                    title="Share"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Media Inquiries & Reservation CTA */}
        <section className="mt-16 bg-nm-dark text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-nm-orange/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h3 className="text-2xl md:text-3xl font-serif font-black mb-4 text-white">
              {t.contactMediaTitle}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              {t.contactMediaText}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="media-book-table-btn"
                onClick={() => onNavigate?.('home#reserve')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-nm-orange hover:bg-nm-orange-hover text-white font-bold text-sm md:text-base shadow-lg shadow-nm-orange/30 transition-all cursor-pointer"
              >
                {t.bookTableBtn}
              </button>

              <a
                href={`mailto:${t.contactEmail}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm md:text-base border border-white/20 transition-all text-center"
              >
                {t.contactEmail}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
