
import React from 'react';
import { X, User, Mail, School, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { CampusEvent } from '../types';

interface RegistrationModalProps {
  event: CampusEvent;
  studentEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ event, studentEmail, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0d0b14]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#1a162e] w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-400">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-xl font-bold text-white">Join This Event</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-8 p-5 bg-[#0d0b14] rounded-3xl border border-white/5 shadow-inner">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10">
              <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-white text-lg">{event.title}</h4>
              <div className="flex items-center gap-4 mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#c084fc]" /> {event.date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#c084fc]" /> {event.venue}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#c084fc] uppercase tracking-[0.2em] ml-1">Confirm Identity</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <User className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Name</p>
                  <p className="text-sm font-bold text-slate-100">Demo Student</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Mail className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Campus Email</p>
                  <p className="text-sm font-bold text-slate-100">{studentEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 px-6 bg-white/5 text-slate-400 font-bold rounded-2xl hover:bg-white/10 hover:text-white border border-white/5 transition-all uppercase text-xs tracking-widest"
            >
              Back
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-4 px-6 bg-[#c084fc] text-slate-900 font-black rounded-2xl hover:bg-[#b06dfc] shadow-lg shadow-[#c084fc]/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              <CheckCircle2 className="w-5 h-5" />
              RSVP
            </button>
          </div>
          <p className="text-center text-[9px] text-slate-600 mt-6 uppercase font-bold tracking-widest">
            Your attendance will be logged for campus credits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
