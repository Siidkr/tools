import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateScrapbookCaption = async (
  imageDescription: string,
  mood: string = "nostalgic and cute"
): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `Write a short, cute, handwritten-style scrapbook caption (max 2 sentences) for a photo showing: "${imageDescription}". The mood should be ${mood}. Use emojis if appropriate. Keep it informal like a diary entry.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Making memories...";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "A beautiful moment frozen in time ✨";
  }
};