
export type Category = 'Technical' | 'Cultural' | 'Sports' | 'Academic' | 'Career' | 'Social' | 'Workshop';

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  category: Category;
  department: string;
  imageUrl: string;
  capacity: number;
  registeredCount: number;
}

export interface Registration {
  id: string;
  eventId: string;
  studentName: string;
  studentEmail: string;
  timestamp: string;
}

export type UserRole = 'Student' | 'Organizer';

export interface AppState {
  events: CampusEvent[];
  registrations: Registration[];
  userRole: UserRole;
  currentStudentEmail: string;
}
