
import React, { useState, useRef, useEffect } from 'react';
import { LayoutList, LayoutGrid, Info } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FullMenuProps {
  lang: Language;
}

interface Dish {
  code: string;
  name: string; // German
  nameEn?: string; // English
  nameCn: string; // Chinese
  price: string;
  desc?: string; // German Description
  descEn?: string; // English Description
  image?: string; 
  spicy?: number; // 0-3 chilis
  rec?: boolean; 
}

interface MenuCategory {
  id: string;
  titleKey: 'D' | 'C' | 'B' | 'A' | 'E' | 'S' | 'F';
  iconColor: string;
  items: Dish[];
}

const FullMenu: React.FC<FullMenuProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('D');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const navContainerRef = useRef<HTMLDivElement>(null);
  const isManualScrolling = useRef(false);
  
  const currentLang = translations[lang] ? lang : 'de';
  const t = translations[currentLang]?.fullmenu;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x400/f3f4f6/9ca3af?text=Nanmei+Eintopf";
    e.currentTarget.onerror = null; 
  };

  const menuData: MenuCategory[] = [
    {
      id: 'D',
      titleKey: 'D',
      iconColor: 'bg-amber-500',
      items: [
        { code: "D1", name: "Gemischter Eintopf mit Garnelen", nameEn: "Mixed Meat Eintopf with Shrimp", nameCn: "荤什锦", price: "€22.80", desc: "Schweinebällchen, Garnelen, Frühstücksfleisch, Tofu, Gemüse.", descEn: "Pork meatballs, shrimp, luncheon meat, tofu, vegetables.", image: "https://i.postimg.cc/1RJChGzj/d1.png?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "D2", name: "Vegetarischer Eintopf", nameEn: "Vegetarian Eintopf", nameCn: "素三鲜", price: "€15.80", desc: "Glasnudeln, Tofu, Tomaten, Pilze.", descEn: "Glass noodles, tofu, tomatoes, mushrooms.", image: "https://i.postimg.cc/7Y5NFjdT/d2.png?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "D3", name: "Eintopf mit Hühnerfleisch & Schweinemagen", nameEn: "Chicken & Pork Stomach Eintopf", nameCn: "猪肚鸡", price: "€18.80", desc: "Kräftige Brühe mit Pfeffer-Note.", descEn: "Rich broth with a hint of pepper.", image: "https://i.postimg.cc/ZnTtyyVC/d3.png?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "D4", name: "Rindfleischstreifen in Tomaten-Eintopf", nameEn: "Beef Strips in Tomato Eintopf", nameCn: "番茄炖牛柳", price: "€18.80", desc: "Zartes Rindfleisch in fruchtiger Tomatenbrühe.", descEn: "Tender beef in fruity tomato broth.", image: "https://i.postimg.cc/yYLKk386/d4.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "D5", name: "Schweinefuß-Suppe nach Hausrezept", nameEn: "House Special Pork Trotter Soup", nameCn: "老妈蹄花汤", price: "€17.80", desc: "Reichhaltige Kollagen-Suppe mit weißen Bohnen.", descEn: "Rich collagen soup with white beans.", image: "https://i.postimg.cc/Z57xQJ8j/d5.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "D6", name: "Zartes Tofu mit Eigelbsauce", nameEn: "Silken Tofu in Egg Yolk Sauce", nameCn: "蟹黄晕豆花", price: "€15.80", desc: "Zarter Tofu in sämiger Sauce.", descEn: "Tender tofu in creamy sauce.", image: "https://i.postimg.cc/d3tDdDtL/d6.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
      ]
    },
    {
      id: 'C',
      titleKey: 'C',
      iconColor: 'bg-red-600',
      items: [
        { code: "C1", name: "Rindfleisch in scharfem Eintopf", nameEn: "Spicy Boiled Beef", nameCn: "水煮牛肉", price: "€20.80", desc: "Sichuan-Klassiker. Zartes Rindfleisch in Chiliöl.", descEn: "Sichuan classic. Tender beef in chili oil.", image: "https://i.postimg.cc/pTBppKx2/c1.jpg?q=80&w=800&auto=format&fit=crop", spicy: 3 },
        { code: "C2", name: "Entenblut mit eingelegtem Chili im Eintopf", nameEn: "Duck Blood with Pickled Peppers", nameCn: "泡椒鸭血", price: "€14.80", desc: "Scharf und säuerlich.", descEn: "Spicy and sour.", image: "https://i.postimg.cc/RhtZfcXQ/c2.jpg?q=80&w=800&auto=format&fit=crop", spicy: 1 },
        { code: "C3", name: "Zickzack-Fisch nach Zigong-Art", nameEn: "Zigong Style Jumping Fish", nameCn: "自贡跳水鱼", price: "€24.80", desc: "Fischfilet mit viel frischem Chili und Ingwer.", descEn: "Fish fillet with plenty of fresh chili and ginger.", image: "https://i.postimg.cc/kGXD8DX3/c3.jpg?q=80&w=800&auto=format&fit=crop", spicy: 2, rec: true },
        { code: "C4", name: "Kaninchen mit frischen Chilischoten", nameEn: "Fresh Pepper Rabbit", nameCn: "自贡鲜椒兔", price: "€22.80", desc: "Zigong-Spezialität. Würziges Kaninchenfleisch.", descEn: "Zigong specialty. Spicy rabbit meat.", image: "https://i.postimg.cc/RFTNNw99/c4.jpg?q=80&w=800&auto=format&fit=crop", spicy: 2 },
        { code: "C5", name: "Lammrippchen mit Salz und Pfeffer", nameEn: "Salt & Pepper Lamb Chops", nameCn: "椒盐羊排", price: "€28.80", desc: "Knusprig frittiert und gewürzt.", descEn: "Crispy fried and seasoned.", image: "https://i.postimg.cc/L82636sD/c5.jpg?q=80&w=800&auto=format&fit=crop", spicy: 1 }
      ]
    },
    {
      id: 'B',
      titleKey: 'B',
      iconColor: 'bg-nm-orange',
      items: [
        { code: "B1", name: "Garnelen mit Glasnudeln in Knoblauchsauce", nameEn: "Shrimp with Garlic & Glass Noodles", nameCn: "蒜蓉粉丝虾仁", price: "€22.80", image: "https://i.postimg.cc/50m668JT/b1.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "B2", name: "Geschmortes Rindfleisch in Sojasauce", nameEn: "Braised Beef Brisket", nameCn: "红烧牛腩", price: "€18.80", image: "https://i.postimg.cc/ryS4qbdY/b2.jpg?q=80&w=800&auto=format&fit=crop", spicy: 1 },
        { code: "B3", name: "Fischfilet in Sichuan-Pfeffer-Chili-Sauce", nameEn: "Sichuan Pepper Fish Filet", nameCn: "川香椒麻鱼", price: "€28.80", spicy: 3, image: "https://i.postimg.cc/85bjjLG3/b3.jpg?q=80&w=800&auto=format&fit=crop" },
        { code: "B4", name: "Hausgemachte Schweinefleischbällchen Suppe", nameEn: "Handmade Pork Meatball Soup", nameCn: "手工鲜肉丸子", price: "€17.80", image: "https://i.postimg.cc/tCRPGL4T/b4.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "B5", name: "Hähncheneintopf nach Nann-Stil", nameEn: "Nanmei Chicken Pot", nameCn: "喃味鸡煲", price: "€17.80", image: "https://i.postimg.cc/Jz3vVQmw/b5.jpg?q=80&w=800&auto=format&fit=crop", rec: true, spicy: 2 },
        { code: "B6", name: "Mapo-Tofu mit Hackfleisch und Chiliöl", nameEn: "Mapo Tofu", nameCn: "麻婆豆腐", price: "€14.80", spicy: 1, image: "https://i.postimg.cc/C1QgywSg/b6.jpg?q=80&w=800&auto=format&fit=crop" },
        { code: "B7", name: "Schweinefleisch in Sauerkraut-Brühe", nameEn: "Sliced Pork in Sauerkraut Soup", nameCn: "酸菜滑肉汤", price: "€16.80", image: "https://i.postimg.cc/GpQJKmY9/b7.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "B8", name: "Scharfer Sichuan-Eintopf (Mao Xue Wang)", nameEn: "Spicy Blood Curd Hotpot (Mao Xue Wang)", nameCn: "砂锅毛血旺", desc: "Mit Entenblut, Innereien und Gemüse.", descEn: "With duck blood, tripe and vegetables.", price: "€22.80", spicy: 3, image: "https://i.postimg.cc/HskkFPbW/b8.jpg?q=80&w=800&auto=format&fit=crop" }
      ]
    },
    {
      id: 'A',
      titleKey: 'A',
      iconColor: 'bg-green-600',
      items: [
        { code: "A1", name: "Hausgemachter kalter Vorspeisenteller", nameEn: "Homemade Cold Appetizers", nameCn: "风味小拌菜", price: "€6.80", image: "https://i.postimg.cc/Twcppnxs/a1.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "A2", name: "Gurkensalat mit Knoblauch", nameEn: "Smashed Cucumbers with Garlic", nameCn: "拍黄瓜", price: "€6.80", image: "https://i.postimg.cc/kX6xrgxV/a2.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "A3", name: "Kalt serviertes Hähnchen mit Frühlingszwiebeln und Salz", nameEn: "Scallion & Salt Pepper Chicken", nameCn: "喃味葱椒盐鸡", price: "€8.80", spicy: 0, image: "https://i.postimg.cc/k4yBBWCL/a3.jpg?q=80&w=800&auto=format&fit=crop" },
        { code: "A4", name: "Schweineohr in Chiliöl", nameEn: "Pork Ear in Chili Oil", nameCn: "红油耳片", price: "€9.80", spicy: 2, image: "https://i.postimg.cc/bJ948w8W/a4.png?q=80&w=800&auto=format&fit=crop" },
        { code: "A5", name: "Kalte Nudeln mit Hähnchenstreifen", nameEn: "Cold Noodles with Chicken", nameCn: "鸡丝凉面", price: "€12.80", spicy: 2, image: "https://i.postimg.cc/SsWvdqRd/a5.jpg?q=80&w=800&auto=format&fit=crop" },
        { code: "A6", name: "Rindfleisch und Pansen in scharfer Sauce", nameEn: "Sliced Beef & Tripe (Fu Qi Fei Pian)", nameCn: "夫妻肺片", price: "€10.80", spicy: 2, image: "https://i.postimg.cc/4yQgy1Gf/a6.png?q=80&w=800&auto=format&fit=crop" },
        { code: "A7", name: "Kaltes Rindfleisch mit Koriander", nameEn: "Cold Beef with Coriander", nameCn: "香菜拌牛肉", price: "€9.80", spicy: 2, image: "https://i.postimg.cc/DZyP31T8/a7.jpg?q=80&w=800&auto=format&fit=crop" },
        { code: "A8", name: "Scharfe Rindermagenstreifen", nameEn: "Spicy Shredded Tripe", nameCn: "麻辣肚丝", price: "€9.80", spicy: 2, image: "https://i.postimg.cc/rm9KK5Tg/a8.jpg?q=80&w=800&auto=format&fit=crop" },
        { code: "A9", name: "Tofustreifen mit Sesamöl", nameEn: "Tofu Strips with Sesame Oil", nameCn: "香油豆腐丝", price: "€7.80", spicy: 0, image: "https://i.postimg.cc/wMyZXC3k/a9.jpg?q=80&w=800&auto=format&fit=crop" },
        { code: "A10", name: "Kaltes eingelegtes Rindfleisch nach Hausrezept", nameEn: "House Special Marinated Beef", nameCn: "草包牛肉", price: "€11.80", rec: true, spicy: 3, image: "https://i.postimg.cc/BbryMmK3/a10.jpg?q=80&w=800&auto=format&fit=crop" },
      ]
    },
    {
      id: 'E',
      titleKey: 'E',
      iconColor: 'bg-red-500',
      items: [
        { code: "E1", name: "Doppelgekochtes Schweinefleisch", nameEn: "Double Cooked Pork", nameCn: "回锅肉", price: "€15.80", image: "https://i.postimg.cc/mk2hMh2R/e1.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E2", name: "Grüne Bohnen mit Hackfleisch", nameEn: "Minced Meat with Green Beans", nameCn: "肉末豇豆", price: "€14.80", image: "https://i.postimg.cc/26XgBkj6/e2.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E3", name: "Gebratener Kohl auf Hausart", nameEn: "Hand-Torn Cabbage", nameCn: "手撕包菜", price: "€13.80", image: "https://i.postimg.cc/brRGyB9D/e3.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E4", name: "Scharf-saure Kartoffelstreifen", nameEn: "Sour & Spicy Potato Strips", nameCn: "酸辣土豆丝", price: "€12.80", image: "https://i.postimg.cc/HxLfxcmG/e4.jpg?q=80&w=800&auto=format&fit=crop", spicy: 1 },
        { code: "E5", name: "Rindmagen nach Sichuan Art", nameEn: "Beef Tripe Sichuan Style", nameCn: "火爆毛肚", price: "€20.80", image: "https://i.postimg.cc/90FzTzFc/e5.jpg?q=80&w=800&auto=format&fit=crop", spicy: 2 },
        { code: "E5.1", name: "Knusprige Schweineaorta nach Sichuan-Art", nameEn: "Spicy Crispy Pork Aorta", nameCn: "火爆黄喉", price: "€22.80", image: "https://i.postimg.cc/63zwc07v/e51.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E6", name: "Rindfleisch mit Frühlingszwiebeln", nameEn: "Scallion Beef", nameCn: "葱爆牛肉", price: "€18.80", image: "https://i.postimg.cc/FH55ZHyR/e6.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E7", name: "Gebratene Schweine-Sehnen mit zweierlei Chili", nameEn: "Pork Tendon with Double Peppers", nameCn: "双椒猪蹄筋", price: "€16.00", image: "https://i.postimg.cc/tTdGTzdW/e7.png?q=80&w=800&auto=format&fit=crop", spicy: 2 },
        { code: "E8", name: "Entendärme in würziger Sauce", nameEn: "Spicy Duck Intestines", nameCn: "爽口鸭肠", price: "€18.80", image: "https://i.postimg.cc/x1vrFV5s/e8.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E9", name: "Zerpflücktes Schweinefleisch in würziger Sauce", nameEn: "Hand-shredded Pork Chops", nameCn: "手撕大排", price: "€18.80", image: "https://i.postimg.cc/6pcpYn87/e9.png?q=80&w=800&auto=format&fit=crop", spicy: 1 },
        { code: "E10", name: "Gebratener Luffa-Kürbis mit Knoblauch", nameEn: "Stir-fried Luffa with Garlic", nameCn: "白油丝瓜", price: "€14.80", image: "https://i.postimg.cc/gjxFMwt2/e10.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E11", name: "Gebratene grüne Bohnen und Auberginenstreifen", nameEn: "Green Beans & Eggplant", nameCn: "豆角茄条", price: "€14.80", image: "https://i.postimg.cc/0Q7gwg3R/e11.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "E12", name: "Gebratenes Saisongemüse", nameEn: "Stir-fried Seasonal Vegetables", nameCn: "炒时蔬", price: "", image: "https://i.postimg.cc/hvPhxhPJ/e12.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
      ]
    },
    {
      id: 'S',
      titleKey: 'S',
      iconColor: 'bg-yellow-500',
      items: [
        { code: "S1", name: "Frisch frittiertes knuspriges Schweinefleisch", nameEn: "Crispy Fried Pork", nameCn: "现炸农家小酥肉", price: "€7.80", image: "https://i.postimg.cc/BnHs9KSm/s1.jpg?q=80&w=800&auto=format&fit=crop", spicy: 1 },
        { code: "S2", name: "Gebratener Reis mit eingelegtem Gemüse", nameEn: "Fried Rice with Pickled Greens", nameCn: "酸菜炒饭", price: "€12.50", image: "https://i.postimg.cc/XvqRNB3Q/s2.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "S3", name: "Gebratener Reis mit Ei (Sichuan-Art)", nameEn: "Sichuan Egg Fried Rice", nameCn: "四川蛋炒饭", price: "€10.80", image: "https://i.postimg.cc/GmB0YRJH/s3.png?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "S4", name: "Reis (pro Portion)", nameEn: "Rice (per portion)", nameCn: "米饭", price: "€1.00", image: "https://i.postimg.cc/XvKVFyt7/s4.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "S5", name: "Süßes Gelee-Dessert mit Eis und Sirup (Bingfen)", nameEn: "Ice Jelly (Bingfen)", nameCn: "冰粉", price: "€3.80", image: "https://i.postimg.cc/LsF9nVQ9/s5.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
      ]
    },
    {
      id: 'F',
      titleKey: 'F',
      iconColor: 'bg-yellow-600',
      items: [
        { code: "F1", name: "Scharfe Chongqing-Nudelsuppe", nameEn: "Chongqing Spicy Noodles", nameCn: "重庆小面", price: "€12.50", image: "https://i.postimg.cc/43GGJxnf/f1.jpg?q=80&w=800&auto=format&fit=crop", spicy: 2 },
        { code: "F2", name: "Würzig angemachte Nudeln (ohne Brühe)", nameEn: "Dry Mixed Noodles", nameCn: "干拌面", price: "€12.50", image: "https://i.postimg.cc/vmvtK3pd/f2.jpg?q=80&w=800&auto=format&fit=crop", spicy: 2 },
        { code: "F3", name: "Geschmorte Rindfleisch-Nudelsuppe", nameEn: "Braised Beef Noodle Soup", nameCn: "红烧牛肉面", price: "€13.00", image: "https://i.postimg.cc/HnNHH08v/f3.jpg?q=80&w=800&auto=format&fit=crop", spicy: 1 },
        { code: "F4", name: "Klare Rindfleisch-Nudelsuppe", nameEn: "Clear Broth Beef Noodle Soup", nameCn: "清汤牛肉面", price: "€13.00", image: "https://i.postimg.cc/0yDxRwkD/f4.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "F6", name: "Reisnudelsuppe mit Huhn und Pilzen (im Tontopf)", nameEn: "Chicken & Mushroom Rice Noodles", nameCn: "砂锅鸡菌菇米线", price: "€13.50", image: "https://i.postimg.cc/TwYXDNVf/f6.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "F7", name: "Scharfe Hotpot-Reisnudelsuppe (im Tontopf)", nameEn: "Spicy Hotpot Rice Noodles", nameCn: "砂锅火锅米线", price: "€13.50", image: "https://i.postimg.cc/kXFtpmvM/f7.jpg?q=80&w=800&auto=format&fit=crop", spicy: 2 },
        { code: "F8", name: "Reisnudelsuppe mit Rindfleisch in klarer Brühe", nameEn: "Clear Broth Beef Rice Noodles", nameCn: "砂锅清汤牛肉米线", price: "€13.50", image: "https://i.postimg.cc/cH4NnkRN/f8.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
        { code: "F10", name: "Teigtaschen in Brühe (im Tontopf)", nameEn: "Dumplings in Eintopf", nameCn: "砂锅水饺", price: "€15.00", image: "https://i.postimg.cc/Bb1Sxq7f/F10.jpg?q=80&w=800&auto=format&fit=crop", spicy: 0 },
      ]
    }
  ];

  if (!t || !t.categories) return null;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace('cat-', '');
          setActiveCategory(categoryId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    menuData.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [menuData]);

  useEffect(() => {
    if (navContainerRef.current) {
      const activeBtn = document.getElementById(`nav-btn-${activeCategory}`);
      if (activeBtn) {
        const container = navContainerRef.current;
        const targetScroll = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(`cat-${id}`);
    if (element) {
      isManualScrolling.current = true;
      setActiveCategory(id);
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(() => { isManualScrolling.current = false; }, 800);
    }
  };

  return (
    <div className="bg-nm-light min-h-screen pb-20 pt-24">
      {/* 注入专属样式以隐藏滚动条 */}
      <style>{`
        .nav-scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
        .nav-scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-6 py-6 max-w-6xl">
        
        <div className="text-center mb-6 relative">
            <h2 className="text-4xl md:text-6xl font-serif font-black mb-3 text-nm-dark">
              {t.title}
            </h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">{t.subtitle}</p>
            {lang !== 'cn' && t.chineseSubtitle && <p className="text-nm-orange/80 font-serif font-bold mt-1 text-sm">{t.chineseSubtitle}</p>}
        </div>

        <div className="sticky top-[72px] md:top-[88px] z-40 bg-nm-light/90 backdrop-blur-xl py-3 md:py-4 border-b border-gray-100 mb-8 -mx-4 md:-mx-6 px-4 md:px-6 shadow-sm flex items-center gap-3 md:block">
           <div 
             ref={navContainerRef}
             className="flex overflow-x-auto gap-3 pb-1 nav-scrollbar-hide snap-x items-center flex-1 md:w-auto min-w-0"
           >
              {menuData.map((cat) => (
                <button
                  key={cat.id}
                  id={`nav-btn-${cat.id}`}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 font-bold text-sm snap-center shrink-0 border min-w-[100px] ${
                    activeCategory === cat.id 
                      ? 'bg-nm-dark text-white border-nm-dark shadow-md scale-105' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-nm-orange hover:text-nm-orange'
                  }`}
                >
                   <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${activeCategory === cat.id ? 'bg-nm-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {cat.id}
                      </span>
                      <span>{t.categories[cat.titleKey]}</span>
                   </div>
                </button>
              ))}
           </div>

           <div className="md:hidden shrink-0 flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-nm-orange text-white' : 'text-gray-400 hover:text-nm-dark'}`}
                aria-label="List View"
                >
                <LayoutList size={18} />
                </button>
                <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'card' ? 'bg-nm-orange text-white' : 'text-gray-400 hover:text-nm-dark'}`}
                aria-label="Card View"
                >
                <LayoutGrid size={18} />
                </button>
           </div>
        </div>

        <div className="space-y-12">
          {menuData.map((category) => (
              <div key={category.id} id={`cat-${category.id}`} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6 md:mb-8 border-b-2 border-nm-orange/10 pb-4">
                    <div className={`w-12 h-12 ${category.iconColor} rounded-xl flex items-center justify-center text-white font-bold shadow-lg shrink-0 text-xl`}>
                      {category.id}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-3xl font-serif font-bold text-nm-dark">{t.categories[category.titleKey]}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {category.items.map((item) => {
                      let mainName = item.name;
                      let subName = item.nameCn;
                      let description = item.desc;

                      if (lang === 'en') {
                          mainName = item.nameEn || item.name;
                          subName = item.nameCn;
                          description = item.descEn || item.desc;
                      } else if (lang === 'cn') {
                          mainName = item.nameCn;
                          subName = item.name;
                          description = ""; 
                      }

                      return (
                      <div key={`${item.code}-${item.nameCn}`} className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-nm-orange/30 transition-all duration-300 
                        ${viewMode === 'list' 
                          ? 'flex flex-row md:flex-col' 
                          : 'flex flex-col' 
                        } 
                        ${item.rec ? 'ring-2 ring-nm-orange/20' : ''}`}>
                        
                        {item.image && (
                          <div className={`relative bg-gray-100 shrink-0
                             ${viewMode === 'list' 
                                ? 'w-40 h-24 md:w-full md:h-auto md:aspect-[4/3]' 
                                : 'w-full h-auto aspect-[4/3]'
                             }
                          `}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                              onError={handleImageError}
                            />
                            {item.spicy && item.spicy > 0 ? (
                              <div className="absolute top-1 left-1 md:top-2 md:right-2 md:left-auto bg-white/90 backdrop-blur-sm border border-gray-100 text-[11px] md:text-[13px] px-1.5 py-0.5 rounded-lg shadow-md z-10 flex items-center tracking-tighter">
                                {"🌶️".repeat(item.spicy)}
                              </div>
                            ) : null}
                            {item.rec && (
                              <div className="absolute bottom-1 left-1 md:top-2 md:left-2 md:bottom-auto bg-nm-orange text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10">
                                EMPFEHLUNG
                              </div>
                            )}
                          </div>
                        )}

                        <div className={`${viewMode === 'list' ? 'p-2' : 'p-3'} md:p-5 flex flex-col flex-grow`}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                                <h3 className="text-sm md:text-lg font-serif font-bold text-nm-dark leading-tight">{mainName}</h3>
                                <h4 className="text-xs md:text-sm text-gray-500 font-medium leading-tight mt-1 line-clamp-2">{subName}</h4>
                            </div>
                            <span className="text-sm md:text-lg font-bold text-nm-orange whitespace-nowrap ml-2">{item.price}</span>
                          </div>
                          
                          {!item.image && (item.spicy || item.rec) && (
                            <div className="flex gap-2 my-2">
                                {item.spicy && item.spicy > 0 ? (
                                    <span className="bg-white border border-gray-100 shadow-sm text-[12px] px-2 py-0.5 rounded-lg tracking-tighter">
                                      {"🌶️".repeat(item.spicy)}
                                    </span>
                                ) : null}
                                {item.rec && (
                                    <span className="bg-orange-50 text-nm-orange text-[10px] font-bold px-2 py-0.5 rounded-lg border border-orange-100 uppercase tracking-widest">Empfehlung</span>
                                )}
                            </div>
                          )}

                          {description && (
                            <p className={`text-xs text-gray-400 leading-relaxed mt-1 line-clamp-2 md:line-clamp-3 
                               ${viewMode === 'card' ? 'block' : 'hidden sm:block'}
                            `}>{description}</p>
                          )}
                          
                          <div className="mt-auto pt-2">
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{item.code}</span>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
              </div>
          ))}
        </div>

        <div className="mt-20 p-6 bg-white rounded-xl border border-gray-100 flex items-start gap-4">
            <Info className="text-nm-blue shrink-0" />
            <div className="text-xs text-gray-500 leading-relaxed">
                <p className="font-bold text-nm-dark mb-1">{t.allergyTitle}</p>
                <p className="mb-4">{t.allergyText}</p>
                <p className="font-bold text-nm-dark mb-1">{t.imageNoteTitle}</p>
                <p>{t.imageNoteText}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FullMenu;
