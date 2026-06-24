import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { translations } from './translations';
import { Language } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pages to prerender
const PAGES = ['home', 'about-story', 'full-menu', 'impressum', 'datenschutz'];
const LANGUAGES: Language[] = ['de', 'en', 'cn'];

const templatePath = path.resolve(__dirname, 'dist/index.html');
if (!fs.existsSync(templatePath)) {
  console.error("Build directory 'dist/index.html' not found. Please run 'vite build' first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// Ensure directory exists
function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

console.log("Starting static pre-rendering (SSG)...");

for (const lang of LANGUAGES) {
  for (const page of PAGES) {
    const t = translations[lang] || translations['de'];
    
    // Determine the correct page title and descriptions for meta tags
    let docTitle = t.seo.title;
    if (page === 'full-menu') docTitle = `${t.nav.menu} | Nanmei Eintopf Frankfurt`;
    if (page === 'impressum') docTitle = `Impressum | Nanmei Eintopf`;
    if (page === 'datenschutz') docTitle = `Datenschutz | Nanmei Eintopf`;
    if (page === 'about-story') docTitle = `Unsere Story | Nanmei Eintopf Frankfurt`;

    const docDesc = t.seo.description;
    const docKeywords = t.seo.keywords;

    // Calculate Canonical URL
    const baseUrl = "https://nanmei-eintopf.de";
    let canonicalUrl = baseUrl;
    if (lang === 'en') canonicalUrl += '/en';
    if (lang === 'cn') canonicalUrl += '/cn';
    
    if (page !== 'home') {
      canonicalUrl += `/${page}`;
    } else {
      canonicalUrl += '/';
    }

    // Render the React app to a static string
    let appHtml = "";
    try {
      appHtml = ReactDOMServer.renderToString(
        React.createElement(App, { initialPage: page, initialLang: lang })
      );
    } catch (err) {
      console.error(`Error rendering page ${page} (${lang}):`, err);
      // Fallback to empty string if it fails, so we still produce the file
    }

    // Replace the template parts
    let html = template;
    
    // Replace <div id="root"></div>
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    
    // Replace title
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${docTitle}</title>`);
    
    // Replace or insert meta tags
    // 1. Lang attribute
    const htmlLang = lang === 'cn' ? 'zh-CN' : lang;
    html = html.replace('<html lang="de">', `<html lang="${htmlLang}">`);
    html = html.replace('<html>', `<html lang="${htmlLang}">`);

    // 2. Meta description
    if (html.includes('name="description"')) {
      html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${docDesc}"`);
    } else {
      html = html.replace('</head>', `<meta name="description" content="${docDesc}">\n</head>`);
    }

    // 3. Meta keywords
    if (html.includes('name="keywords"')) {
      html = html.replace(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${docKeywords}"`);
    } else {
      html = html.replace('</head>', `<meta name="keywords" content="${docKeywords}">\n</head>`);
    }

    // 4. Canonical link
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
    if (html.includes('rel="canonical"')) {
      html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, canonicalTag);
    } else {
      html = html.replace('</head>', `${canonicalTag}\n</head>`);
    }

    // 5. Alternate hreflang links (extremely good for SEO)
    const alternateTags = `
    <link rel="alternate" hreflang="de" href="${baseUrl}${page === 'home' ? '/' : `/${page}`}" />
    <link rel="alternate" hreflang="en" href="${baseUrl}/en${page === 'home' ? '/' : `/${page}`}" />
    <link rel="alternate" hreflang="zh" href="${baseUrl}/cn${page === 'home' ? '/' : `/${page}`}" />
    <link rel="alternate" hreflang="x-default" href="${baseUrl}${page === 'home' ? '/' : `/${page}`}" />
    `;
    html = html.replace('</head>', `${alternateTags}\n</head>`);

    // Determine output file path
    let outDir = path.resolve(__dirname, 'dist');
    
    // Localization subfolder
    if (lang !== 'de') {
      outDir = path.join(outDir, lang);
    }
    
    // Page subfolder
    if (page !== 'home') {
      outDir = path.join(outDir, page);
    }

    ensureDir(outDir);
    const outFile = path.join(outDir, 'index.html');
    fs.writeFileSync(outFile, html, 'utf-8');
    console.log(`Pre-rendered: ${lang.toUpperCase()} - ${page} -> ${path.relative(__dirname, outFile)}`);
  }
}

console.log("Pre-rendering successfully completed!");
