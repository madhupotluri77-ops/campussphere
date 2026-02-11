
import { GoogleGenAI, Type } from "@google/genai";

// This function runs only on the server
export default async function handler(req: any, res: any) {
  // Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, interests, events, eventTitle, eventDesc } = req.body;
  
  // Initialize AI with the hidden environment variable
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    if (action === 'recommend') {
      const eventList = events.map((e: any) => `${e.id}: ${e.title} (${e.category}) - ${e.description}`).join('\n');
      const prompt = `Based on the following student interests: "${interests}", recommend exactly 3 events from this list. Provide a short reasoning for each.
      
      Available Events:
      ${eventList}
      
      Return the response as JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                eventId: { type: Type.STRING },
                reasoning: { type: Type.STRING }
              },
              required: ["eventId", "reasoning"]
            }
          }
        }
      });
      return res.status(200).json(JSON.parse(response.text || "[]"));
    }

    if (action === 'slogan') {
      const prompt = `Generate a catchy 1-sentence slogan for an event titled "${eventTitle}" described as: "${eventDesc}".`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return res.status(200).json({ slogan: response.text });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error: any) {
    console.error("Backend AI Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
