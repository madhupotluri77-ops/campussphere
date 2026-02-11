
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, X, Bookmark } from 'lucide-react';
import { getEventRecommendations } from '../services/geminiService';
import { CampusEvent } from '../types';

interface GeminiAssistantProps {
  events: CampusEvent[];
  onSelectEvent: (eventId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ events, onSelectEvent, isOpen, onClose }) => {
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!interests.trim()) return;
    setLoading(true);
    const results = await getEventRecommendations(interests, events);
    setRecommendations(results);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#1a162e] shadow-2xl z-50 animate-in slide-in-from-right duration-500 flex flex-col border-l border-white/5 backdrop-blur-xl">
      <div className="p-8 bg-[#c084fc] text-slate-900 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <h2 className="text-xl font-black uppercase tracking-widest">Campus AI</h2>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-900/10 rounded-lg transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <div className="bg-[#0d0b14] p-6 rounded-[32px] border border-white/5 shadow-inner">
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-4">
            Event Personalization
          </p>
          <div className="relative">
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Tell me what you love..."
              className="w-full bg-[#1a162e] p-5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-[#c084fc] text-slate-200 text-sm h-32 resize-none transition-all placeholder:text-slate-700 font-medium"
            />
            <button
              onClick={handleRecommend}
              disabled={loading || !interests.trim()}
              className="absolute bottom-4 right-4 p-3 bg-[#c084fc] text-slate-900 rounded-xl hover:bg-[#b06dfc] disabled:bg-slate-800 disabled:text-slate-600 transition-all shadow-lg"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Recommended for you</h3>
          {recommendations.length === 0 && !loading && (
            <div className="text-center py-16 text-slate-700">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p className="text-sm font-bold">Awaiting your prompt...</p>
            </div>
          )}
          
          {loading && (
            <div className="space-y-4 animate-pulse">
              {[1, 2].map(i => (
                <div key={i} className="h-32 bg-white/5 rounded-3xl"></div>
              ))}
            </div>
          )}

          {recommendations.map((rec) => {
            const event = events.find(e => e.id === rec.eventId);
            if (!event) return null;
            return (
              <div key={event.id} className="bg-[#1a162e] border border-white/5 rounded-3xl p-6 hover:border-[#c084fc]/30 transition-all shadow-lg hover:bg-white/[0.02] group">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-slate-100 text-base leading-tight group-hover:text-[#c084fc]">{event.title}</h4>
                  <span className="text-[8px] bg-white/5 text-slate-500 px-2 py-0.5 rounded uppercase font-black border border-white/5">{event.category}</span>
                </div>
                <p className="text-xs text-slate-500 mb-4 italic leading-relaxed">"{rec.reasoning}"</p>
                <button
                  onClick={() => onSelectEvent(event.id)}
                  className="text-[10px] font-black text-[#c084fc] flex items-center gap-2 hover:text-[#facc15] transition-colors uppercase tracking-widest"
                >
                  <Bookmark className="w-3 h-3" />
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8 border-t border-white/5 bg-[#0d0b14]/50">
        <p className="text-[9px] text-center text-slate-600 font-black uppercase tracking-widest">Gemini Engine v2.5 • Campus Intelligence</p>
      </div>
    </div>
  );
};

export default GeminiAssistant;
