
import React from 'react';
import { Calendar, MapPin, Clock, Users, Tag } from 'lucide-react';
import { CampusEvent } from '../types';

interface EventCardProps {
  event: CampusEvent;
  onViewDetails: (event: CampusEvent) => void;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails, isRegistered }) => {
  const progress = (event.registeredCount / event.capacity) * 100;
  const isFull = event.registeredCount >= event.capacity;

  return (
    <div className="bg-[#1a162e] rounded-3xl border border-white/5 overflow-hidden hover:border-[#c084fc]/30 transition-all duration-300 group flex flex-col h-full bloom-shadow-lavender/5">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a162e] via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#0d0b14]/80 backdrop-blur-md text-[#c084fc] text-[10px] font-black rounded-full border border-[#c084fc]/20 tracking-wider uppercase">
            {event.category}
          </span>
        </div>
        {isRegistered && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-[#facc15] text-slate-900 text-[10px] font-black rounded-full shadow-lg shadow-yellow-500/20 animate-pulse uppercase tracking-wider">
              Going
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-1 group-hover:text-[#c084fc] transition-colors">
          {event.title}
        </h3>
        <p className="text-slate-500 text-xs mb-4 line-clamp-2 flex-grow leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 mr-2 text-[#c084fc]/70" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 mr-2 text-[#c084fc]/70" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 mr-2 text-[#c084fc]/70" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-black text-slate-500 uppercase">Available</span>
            <span className="text-[10px] font-black text-[#c084fc]">{event.registeredCount}/{event.capacity}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1 mb-6">
            <div 
              className={`h-1 rounded-full transition-all duration-700 ${isFull ? 'bg-[#f43f5e]' : 'bg-[#c084fc]'} shadow-[0_0_8px_rgba(192,132,252,0.5)]`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          <button
            onClick={() => onViewDetails(event)}
            className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              isRegistered 
              ? 'bg-white/5 text-[#c084fc] border border-[#c084fc]/20 hover:bg-[#c084fc]/10' 
              : isFull 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
              : 'bg-[#0d0b14] text-white border border-white/10 hover:border-[#c084fc] group-hover:bg-[#c084fc] group-hover:text-slate-900 transition-all shadow-lg'
            }`}
          >
            {isRegistered ? 'View Status' : isFull ? 'Closed' : 'Attend Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
