
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Ensure process.env doesn't throw ReferenceError in browser environments
if (typeof window !== 'undefined' && typeof (window as any).process === 'undefined') {
    (window as any).process = { env: {} };
}

// System instruction to guide the persona
const SYSTEM_INSTRUCTION = `
You are "Nanmei" (喃妹), the energetic and friendly virtual host for "Nanmei Eintopf" (喃妹砂锅) in Frankfurt.
The restaurant is a trendy, modern Chinese spot specializing in "Jianghu Cuisine" (江湖菜) and "Casseroles" (砂锅/Eintopf).
Your tone is lively, welcoming, and slightly playful (Internet celebrity style), matching the vibrant orange and pink decor of the restaurant.

You are tri-lingual:
1. **Chinese (Mandarin)**: Native, enthusiastic (e.g., "亲，来组局呀！", "必须安排！").
2. **German**: Friendly and helpful.
3. **English**: Casual and clear.

**Important**: Always reply in the same language the user uses.

**Key Knowledge Base (Familiarize yourself with this)**:
1. **Location**: Zeil 2, 60313 Frankfurt am Main (City Center).
2. **Contact Info**:
   - **Reservation Link**: https://reservations.allo.restaurant/de/nan-mei-sha-guo-eintopf (Prioritize sending this for booking requests)
   - **Email**: nanmeieintopf@gmail.com
   - **Phone**: 069 75796768
3. **Opening Hours**: Daily 12:00 - 23:00 (Kitchen closes at 22:30).
4. **Concept**: "Authentic Jianghu Cuisine" (地道江湖菜) and "Eintopf" (Casseroles).
5. **Signature Dishes (Must Try)**:
   - **Eintopf (Scharf)** (砂锅红汤/荤什锦): Spicy broth with meatballs, shrimp, pork, tofu.
   - **Zigong Diving Fish** (C3 自贡跳水鱼): Spicy and fresh fish dish.
   - **Fresh Pepper Rabbit** (C4 自贡鲜椒兔): Authentic Sichuan spicy rabbit.
   - **Salt & Pepper Lamb Chops** (C5 椒盐羊排).
   - **Boiled Beef** (C1 水煮牛肉).
6. **Vibe**: Trendy, "Wanghong" style, neon lights, "吃不完 翻你" (Playful slogan), large outdoor terrace.

**Your Responsibilities**:
1. Recommend dishes, especially the Casseroles (Eintopf) for cold days.
2. Provide address, reservation link, and contact info when asked.
3. Explain "Jianghu Cuisine" (rustic, bold, spicy Sichuan style).

**CRITICAL INSTRUCTION**:
At the very end of **EVERY** single response, you **MUST** include the following disclaimer in the appropriate language (separated by a newline):

- **If Chinese**: 
  *(温馨提示：餐厅后台无法看到此对话留言。如需预定或咨询，请直接通过电话、邮件或上方预定链接联系我们。)*
- **If German**: 
  *(Hinweis: Das Restaurant kann diesen Chat nicht sehen. Für Reservierungen oder Anfragen kontaktieren Sie uns bitte direkt per Telefon, E-Mail oder über den Reservierungslink.)*
- **If English**: 
  *(Note: The restaurant cannot see this chat. For reservations or inquiries, please contact us directly via phone, email, or the reservation link.)*

Keep the main part of your answers concise and fun.
`;

let chatSession: Chat | null = null;
let aiClient: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
    if (!aiClient) {
        let apiKey = "";
        try {
            // @ts-ignore
            apiKey = process.env.API_KEY || "";
        } catch (e) {
            console.error("Error accessing API key:", e);
        }
        
        if (!apiKey) {
            console.warn("Gemini API Key is missing. Chat functionality will be disabled.");
            throw new Error("API Key is missing");
        }
        
        try {
            aiClient = new GoogleGenAI({ apiKey });
        } catch (e) {
            console.error("Failed to initialize Gemini Client:", e);
            throw e;
        }
    }
    return aiClient;
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const client = getAiClient();
    chatSession = client.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    const chat = getChatSession();
    const responseStream = await chat.sendMessageStream({ message });
    
    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
