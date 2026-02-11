
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  User, 
  Bell, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ChevronLeft 
} from 'lucide-react';
import { CampusEvent, Registration, UserRole, Category } from './types';
import { INITIAL_EVENTS, CATEGORIES } from './mockData';
import EventCard from './components/EventCard';
import OrganizerDashboard from './components/OrganizerDashboard';
import GeminiAssistant from './components/GeminiAssistant';
import RegistrationModal from './components/RegistrationModal';

const App: React.FC = () => {
  // State
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [role, setRole] = useState<UserRole>('Student');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [view, setView] = useState<'Home' | 'Dashboard' | 'EventDetail'>('Home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  
  // Registration Flow State
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [eventToRegister, setEventToRegister] = useState<CampusEvent | null>(null);

  // Derived state
  const currentStudentEmail = "demo.student@campus.edu";
  
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const studentRegistrations = useMemo(() => {
    return registrations.filter(r => r.studentEmail === currentStudentEmail);
  }, [registrations]);

  const selectedEvent = useMemo(() => {
    return events.find(e => e.id === selectedEventId);
  }, [events, selectedEventId]);

  // Handlers
  const handleInitiateRSVP = (event: CampusEvent) => {
    if (event.registeredCount >= event.capacity) {
      triggerNotification("Sorry, this event is already full!", "info");
      return;
    }

    if (registrations.some(r => r.eventId === event.id && r.studentEmail === currentStudentEmail)) {
      triggerNotification("You are already registered for this event.", "info");
      return;
    }

    setEventToRegister(event);
    setIsRegModalOpen(true);
  };

  const confirmRSVP = () => {
    if (!eventToRegister) return;

    const newReg: Registration = {
      id: Math.random().toString(36).substr(2, 9),
      eventId: eventToRegister.id,
      studentEmail: currentStudentEmail,
      studentName: "Demo Student",
      timestamp: new Date().toISOString()
    };

    setRegistrations(prev => [...prev, newReg]);
    setEvents(prev => prev.map(e => 
      e.id === eventToRegister.id ? { ...e, registeredCount: e.registeredCount + 1 } : e
    ));

    setIsRegModalOpen(false);
    setEventToRegister(null);
    triggerNotification("RSVP successful! Added to your schedule.", "success");
  };

  const triggerNotification = (message: string, type: 'success' | 'info') => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleCreateEvent = () => {
    const newEvent: CampusEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: "Design Workshop: UX Foundations",
      description: "Learn the core principles of User Experience design from industry experts.",
      date: "2026-05-15",
      time: "02:00 PM",
      venue: "Innovation Hub",
      organizer: "Tech Club",
      category: "Workshop",
      department: "Computer Science",
      imageUrl: "https://picsum.photos/seed/ux/800/400",
      capacity: 25,
      registeredCount: 0
    };
    setEvents(prev => [newEvent, ...prev]);
    triggerNotification("New workshop created successfully!", "success");
  };

  const handleViewEvent = (event: CampusEvent) => {
    setSelectedEventId(event.id);
    setView('EventDetail');
  };

  const isUserRegisteredFor = (eventId: string) => {
    return registrations.some(r => r.eventId === eventId && r.studentEmail === currentStudentEmail);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0d0b14] text-slate-100">
      {/* Top Notification */}
      {showNotification && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          showNotification.type === 'success' ? 'bg-[#c084fc] text-white bloom-shadow-lavender' : 'bg-[#facc15] text-slate-900 bloom-shadow-yellow'
        }`}>
          {showNotification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
          <span className="font-bold text-sm">{showNotification.message}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 glass-morphism z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-8">
              <div 
                className="flex items-center gap-2 cursor-pointer group" 
                onClick={() => setView('Home')}
              >
                <div className="w-10 h-10 bg-[#c084fc] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-all">
                  <Compass className="text-slate-900 w-6 h-6" />
                </div>
                <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#c084fc] to-[#facc15]">CampusSphere</span>
              </div>

              <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setView('Home')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'Home' ? 'bg-white/10 text-[#c084fc]' : 'text-slate-400 hover:text-white'}`}
                >
                  Explore
                </button>
                <button 
                  onClick={() => setView('Dashboard')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'Dashboard' ? 'bg-white/10 text-[#c084fc]' : 'text-slate-400 hover:text-white'}`}
                >
                  Dashboard
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setRole(role === 'Student' ? 'Organizer' : 'Student')}
                className="hidden sm:flex px-4 py-2 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Switch to {role === 'Student' ? 'Organizer' : 'Student'}
              </button>
              
              <div className="w-10 h-10 bg-[#c084fc]/20 rounded-full flex items-center justify-center border border-[#c084fc]/30 cursor-pointer overflow-hidden hover:ring-2 hover:ring-[#c084fc]/50 transition-all">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} alt="Avatar" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {view === 'Home' && (
          <div className="animate-in fade-in duration-700 space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[#1a162e] rounded-[32px] p-8 sm:p-16 text-center shadow-2xl border border-white/5">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                 <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#c084fc]/10 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#facc15]/5 rounded-full blur-[120px]"></div>
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
                  Don't miss out on <span className="text-[#c084fc] drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]">Campus Life</span>
                </h1>
                <p className="text-slate-400 text-lg sm:text-xl mb-10 max-xl mx-auto">
                  The centralized platform for college events. Register for hackathons, workshops, and more.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Search for events..." 
                      className="w-full bg-[#0d0b14] border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-[#c084fc] focus:border-transparent placeholder:text-slate-600 shadow-inner"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => setIsAiPanelOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-[#c084fc] hover:bg-[#b06dfc] text-slate-900 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#c084fc]/20 hover:scale-105 active:scale-95"
                  >
                    <Sparkles className="w-5 h-5" />
                    Campus AI
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar whitespace-nowrap">
                  {['All', ...CATEGORIES].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                        selectedCategory === cat 
                          ? 'bg-[#c084fc] border-[#c084fc] text-slate-900 shadow-lg shadow-[#c084fc]/10' 
                          : 'bg-[#1a162e] border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <p className="text-sm font-semibold text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <Zap className="w-4 h-4 text-[#facc15]" />
                  Showing {filteredEvents.length} events
                </p>
              </div>

              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map(event => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onViewDetails={handleViewEvent}
                      isRegistered={isUserRegisteredFor(event.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-[#1a162e] rounded-3xl border border-dashed border-white/10">
                  <Search className="text-slate-600 w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-200 mb-2">No matching events found</h3>
                  <p className="text-slate-500">Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'Dashboard' && (
          <div className="animate-in fade-in duration-500">
            {role === 'Organizer' ? (
              <OrganizerDashboard 
                events={events.filter(e => e.organizer === 'Tech Club' || e.organizer === 'Arts Council' || e.organizer === 'Sports Committee')} 
                registrations={registrations}
                onCreateEvent={handleCreateEvent}
              />
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white">Your Student Life</h2>
                  <p className="text-slate-400">Manage your registrations and schedule</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-[#c084fc] to-[#a855f7] p-8 rounded-3xl text-slate-900 shadow-2xl md:col-span-2 bloom-shadow-lavender">
                    <div className="flex justify-between items-start mb-8">
                       <Zap className="w-8 h-8 opacity-50" />
                       <span className="bg-slate-900/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Verified Student</span>
                    </div>
                    <p className="text-slate-900/60 text-sm font-bold mb-1">Upcoming events confirmed</p>
                    <h3 className="text-5xl font-black">{studentRegistrations.length}</h3>
                  </div>
                  <div className="bg-[#1a162e] p-6 rounded-3xl border border-white/5 shadow-sm">
                     <p className="text-slate-500 text-sm font-medium mb-1">Clubs Joined</p>
                     <p className="text-3xl font-black text-[#c084fc]">3</p>
                  </div>
                  <div className="bg-[#1a162e] p-6 rounded-3xl border border-white/5 shadow-sm">
                     <p className="text-slate-500 text-sm font-medium mb-1">Reward Points</p>
                     <p className="text-3xl font-black text-[#facc15]">120 XP</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">Your RSVP's</h3>
                  {studentRegistrations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {studentRegistrations.map(reg => {
                        const event = events.find(e => e.id === reg.eventId);
                        if (!event) return null;
                        return (
                          <div key={reg.id} className="bg-[#1a162e] border border-white/5 p-6 rounded-3xl flex items-center gap-4 hover:border-[#c084fc]/30 transition-all group">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-all">
                              <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-bold text-slate-100 line-clamp-1 group-hover:text-[#c084fc]">{event.title}</h4>
                              <p className="text-xs text-slate-500 mb-2">{event.date} • {event.venue}</p>
                              <span className="text-[10px] bg-[#c084fc]/10 text-[#c084fc] px-2 py-1 rounded-md font-black flex items-center gap-1 w-fit border border-[#c084fc]/20">
                                <CheckCircle2 className="w-3 h-3" /> Registered
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      <p className="text-slate-500 font-medium">You haven't RSVP'd to any events yet.</p>
                      <button 
                        onClick={() => setView('Home')}
                        className="mt-4 text-[#c084fc] font-black hover:underline hover:text-[#facc15] transition-colors"
                      >
                        Find Events
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'EventDetail' && selectedEvent && (
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <button 
              onClick={() => setView('Home')}
              className="mb-8 flex items-center gap-2 text-slate-500 font-bold hover:text-[#c084fc] transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Explore
            </button>

            <div className="bg-[#1a162e] rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
              <div className="h-96 relative">
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a162e] via-[#1a162e]/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="px-4 py-1.5 bg-[#c084fc] text-slate-900 text-xs font-black rounded-full mb-4 inline-block tracking-widest uppercase">
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight drop-shadow-lg">{selectedEvent.title}</h2>
                </div>
              </div>

              <div className="p-8 sm:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-6 md:col-span-2">
                    <div>
                      <h3 className="text-xs font-black text-[#c084fc] uppercase tracking-widest mb-4">Description</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">
                        {selectedEvent.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Organizer</h4>
                        <p className="text-slate-200 font-bold">{selectedEvent.organizer}</p>
                      </div>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Department</h4>
                        <p className="text-slate-200 font-bold">{selectedEvent.department}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0d0b14] rounded-[32px] p-8 text-white shadow-xl flex flex-col justify-between border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#c084fc]/5 blur-3xl rounded-full"></div>
                    <div className="space-y-6 mb-8 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#c084fc]/10 rounded-xl flex items-center justify-center border border-[#c084fc]/20">
                          <Calendar className="w-5 h-5 text-[#c084fc]" />
                        </div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-black uppercase">Date</p>
                          <p className="text-slate-100 font-bold">{selectedEvent.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#c084fc]/10 rounded-xl flex items-center justify-center border border-[#c084fc]/20">
                          <MapPin className="w-5 h-5 text-[#c084fc]" />
                        </div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-black uppercase">Venue</p>
                          <p className="text-slate-100 font-bold">{selectedEvent.venue}</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleInitiateRSVP(selectedEvent)}
                      disabled={isUserRegisteredFor(selectedEvent.id) || selectedEvent.registeredCount >= selectedEvent.capacity}
                      className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                        isUserRegisteredFor(selectedEvent.id)
                        ? 'bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/20 cursor-default'
                        : selectedEvent.registeredCount >= selectedEvent.capacity
                        ? 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                        : 'bg-[#c084fc] hover:bg-[#b06dfc] text-slate-900 bloom-shadow-lavender'
                      }`}
                    >
                      {isUserRegisteredFor(selectedEvent.id) ? (
                        <><CheckCircle2 className="w-6 h-6" /> Registered</>
                      ) : selectedEvent.registeredCount >= selectedEvent.capacity ? (
                        'Event Full'
                      ) : (
                        'RSVP Now'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals & Panels */}
      {eventToRegister && (
        <RegistrationModal 
          isOpen={isRegModalOpen}
          event={eventToRegister}
          studentEmail={currentStudentEmail}
          onClose={() => {
            setIsRegModalOpen(false);
            setEventToRegister(null);
          }}
          onConfirm={confirmRSVP}
        />
      )}

      <GeminiAssistant 
        isOpen={isAiPanelOpen} 
        onClose={() => setIsAiPanelOpen(false)}
        events={events}
        onSelectEvent={(id) => {
          setSelectedEventId(id);
          setView('EventDetail');
          setIsAiPanelOpen(false);
        }}
      />

      {!isAiPanelOpen && (
        <button 
          onClick={() => setIsAiPanelOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#c084fc] text-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-90 group z-30 bloom-shadow-lavender"
        >
          <Sparkles className="w-7 h-7 group-hover:animate-pulse" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">© 2026 CampusSphere Platform</p>
          <p className="text-slate-600 text-[10px] mt-2">Connecting hearts and minds across the campus world.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
