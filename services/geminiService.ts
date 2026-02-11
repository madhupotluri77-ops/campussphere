
import { CampusEvent } from "../types";

/**
 * Frontend Service
 * Now acts as a bridge to our secure /api/gemini backend.
 * This keeps the API_KEY hidden from the client's browser.
 */

export async function getEventRecommendations(interests: string, events: CampusEvent[]) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'recommend',
        interests,
        events
      })
    });

    if (!response.ok) throw new Error('Failed to fetch recommendations from proxy');
    return await response.json();
  } catch (error) {
    console.error("Proxy Recommendation Error:", error);
    // Fallback: simple client-side keyword matching if the proxy is unavailable
    return events
      .filter(e => 
        interests.toLowerCase().split(' ').some(word => 
          e.title.toLowerCase().includes(word) || e.description.toLowerCase().includes(word)
        )
      )
      .slice(0, 3)
      .map(e => ({ eventId: e.id, reasoning: "Matches your interests!" }));
  }
}

export async function generateEventSlogan(eventTitle: string, eventDesc: string) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'slogan',
        eventTitle,
        eventDesc
      })
    });

    if (!response.ok) throw new Error('Failed to fetch slogan from proxy');
    const data = await response.json();
    return data.slogan;
  } catch (error) {
    return "Join us for an unforgettable experience!";
  }
}
