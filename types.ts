
export type Language = 'de' | 'en' | 'cn';

export interface MenuItem {
  id: number;
  name: string; // German
  nameEn: string; // English
  nameCn: string; // Chinese
  description: string; // German
  descriptionEn: string; // English
  descriptionCn: string; // Chinese
  price: string;
  image: string;
  category: 'soup' | 'meat' | 'veg' | 'seafood';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
