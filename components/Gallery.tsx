
import React from 'react';

// 这里是画廊的图片列表。
// 您可以把链接换成您自己的图片链接（例如 "/images/photo1.jpg" 或 "https://..."）
const galleryImages = [
  "/images/x15CCRdm-gallery1.webp",
  "/images/ncYVRkqV-gallery3.webp",
  "/images/yNr8h8cc-gallery2.webp",
  "/images/vHbr40zv-gallery6.webp",
  "/images/wTCw4Xcz-gallery5.webp",
  "/images/v8SqfF45-gallery4.webp"
];

const Gallery: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x600/f3f4f6/9ca3af?text=Nanmei+Eintopf";
    e.currentTarget.onerror = null; // prevent looping
  };

  return (
    <section id="gallery" className="py-0 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {galleryImages.map((imgUrl, index) => (
          <div key={index} className="relative aspect-square group overflow-hidden border-r border-b border-white/50">
            <img 
              src={imgUrl} 
              alt={`Gallery ${index + 1}`} 
              loading="lazy"
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-100 group-hover:brightness-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-nm-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <span className="text-white font-serif font-bold text-xl md:text-2xl drop-shadow-md tracking-wider">Nanmei Eintopf</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
