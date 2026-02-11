
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, Users, Calendar, TrendingUp, ChevronRight, X, Mail, Clock, Download } from 'lucide-react';
import { CampusEvent, Registration } from '../types';

interface OrganizerDashboardProps {
  events: CampusEvent[];
  registrations: Registration[];
  onCreateEvent: () => void;
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ events, registrations, onCreateEvent }) => {
  const [selectedEventAttendees, setSelectedEventAttendees] = useState<CampusEvent | null>(null);

  const chartData = events.map(event => ({
    name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
    count: event.registeredCount,
    capacity: event.capacity
  }));

  const totalRegistrations = registrations.length;
  const activeEvents = events.length;
  const avgAttendance = activeEvents > 0 ? (totalRegistrations / activeEvents).toFixed(1) : 0;

  const eventAttendees = selectedEventAttendees 
    ? registrations.filter(r => r.eventId === selectedEventAttendees.id)
    : [];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Organizer Central</h2>
          <p className="text-slate-500 text-sm font-medium">Control panel for your campus initiatives</p>
        </div>
        <button 
          onClick={onCreateEvent}
          className="px-8 py-4 bg-[#facc15] hover:bg-[#eab308] text-slate-900 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-yellow-500/10 transition-all active:scale-95 uppercase text-xs tracking-widest"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a162e] p-8 rounded-[32px] border border-white/5 shadow-2xl bloom-shadow-lavender/5 group hover:border-[#c084fc]/30 transition-all">
          <div className="w-14 h-14 bg-[#c084fc]/10 text-[#c084fc] rounded-2xl flex items-center justify-center mb-6 border border-[#c084fc]/20 group-hover:scale-110 transition-all">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Total RSVP's</p>
          <p className="text-4xl font-black text-white">{totalRegistrations}</p>
        </div>
        <div className="bg-[#1a162e] p-8 rounded-[32px] border border-white/5 shadow-2xl bloom-shadow-yellow/5 group hover:border-[#facc15]/30 transition-all">
          <div className="w-14 h-14 bg-[#facc15]/10 text-[#facc15] rounded-2xl flex items-center justify-center mb-6 border border-[#facc15]/20 group-hover:scale-110 transition-all">
            <Calendar className="w-6 h-6" />
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Live Events</p>
          <p className="text-4xl font-black text-white">{activeEvents}</p>
        </div>
        <div className="bg-[#1a162e] p-8 rounded-[32px] border border-white/5 shadow-2xl bloom-shadow-lavender/5 group hover:border-white/20 transition-all">
          <div className="w-14 h-14 bg-white/5 text-slate-300 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-all">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Avg per Event</p>
          <p className="text-4xl font-black text-white">{avgAttendance}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="bg-[#1a162e] p-10 rounded-[40px] border border-white/5 shadow-2xl lg:col-span-3">
          <h3 className="text-xs font-black mb-10 text-slate-500 uppercase tracking-[0.3em]">Audience Analytics</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d284a" />
                <XAxis dataKey="name" fontSize={10} stroke="#475569" axisLine={false} tickLine={false} />
                <YAxis fontSize={10} stroke="#475569" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#2d284a'}}
                  contentStyle={{ backgroundColor: '#0d0b14', borderRadius: '16px', border: '1px solid #2d284a', padding: '12px' }}
                  itemStyle={{ color: '#c084fc', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" fill="#c084fc" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1a162e] p-10 rounded-[40px] border border-white/5 shadow-2xl lg:col-span-2">
          <h3 className="text-xs font-black mb-10 text-slate-500 uppercase tracking-[0.3em]">My Projects</h3>
          <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
            {events.map((event) => (
              <button 
                key={event.id} 
                onClick={() => setSelectedEventAttendees(event)}
                className="w-full flex items-center justify-between p-5 bg-[#0d0b14]/50 rounded-3xl border border-white/5 hover:border-[#c084fc]/30 transition-all group text-left shadow-inner"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                    <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm group-hover:text-[#c084fc] transition-colors">{event.title}</h4>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-[#c084fc] bg-[#c084fc]/10 px-3 py-1.5 rounded-xl border border-[#c084fc]/20">
                    {event.registeredCount} RSVPs
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-[#c084fc] transition-all group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Attendee Management Panel */}
      {selectedEventAttendees && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <div 
            className="absolute inset-0 bg-[#0d0b14]/80 backdrop-blur-md animate-in fade-in" 
            onClick={() => setSelectedEventAttendees(null)}
          />
          <div className="relative w-full max-w-md bg-[#1a162e] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/5">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#c084fc] text-slate-900">
              <div>
                <h3 className="font-black text-xl uppercase tracking-widest">Registrations</h3>
                <p className="text-slate-900/60 text-[10px] font-bold uppercase mt-1 line-clamp-1">{selectedEventAttendees.title}</p>
              </div>
              <button onClick={() => setSelectedEventAttendees(null)} className="p-2 hover:bg-slate-900/10 rounded-xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Participant Registry</span>
                <span className="text-[10px] font-black text-[#c084fc] bg-[#c084fc]/10 px-3 py-1.5 rounded-full border border-[#c084fc]/20">
                  {eventAttendees.length} Verified
                </span>
              </div>

              {eventAttendees.length > 0 ? (
                eventAttendees.map((attendee) => (
                  <div key={attendee.id} className="p-5 bg-[#0d0b14]/50 rounded-[32px] border border-white/5 hover:border-[#c084fc]/20 transition-all group shadow-inner">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#c084fc]/10 rounded-2xl flex items-center justify-center border border-[#c084fc]/20 font-black text-[#c084fc] text-lg">
                          {attendee.studentName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-100">{attendee.studentName}</h4>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mt-1">
                            <Mail className="w-3 h-3 text-[#c084fc]/60" /> {attendee.studentEmail}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-600 uppercase tracking-tighter">
                          <Clock className="w-2.5 h-2.5" /> 
                          {new Date(attendee.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <p className="text-[8px] font-black text-slate-700 mt-1 uppercase">
                          {new Date(attendee.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-32 opacity-10">
                  <Users className="w-24 h-24 mx-auto mb-6" />
                  <p className="font-black text-xl uppercase tracking-widest">Empty Registry</p>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-white/5 bg-[#0d0b14]/30">
              <button 
                onClick={() => alert('Registry exported to secure cloud!')}
                className="w-full py-5 bg-[#1a162e] border border-white/10 rounded-2xl text-xs font-black text-slate-300 hover:text-white hover:border-[#c084fc] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] shadow-lg"
              >
                <Download className="w-4 h-4" />
                Export Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;
