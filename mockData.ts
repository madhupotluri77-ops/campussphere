
import { CampusEvent, Category } from './types';

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'bgmi-2026',
    title: 'BGMI Campus Championship 2026',
    description: 'The ultimate battle royale returns to campus! Assemble your squad and compete in the BGMI Esports Tournament. Huge prize pool, professional casting, and campus glory await.',
    date: '2026-03-20',
    time: '10:00 AM',
    venue: 'Main Indoor Stadium & Gaming Lounge',
    organizer: 'Esports Society',
    category: 'Sports',
    department: 'All Departments',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    capacity: 200,
    registeredCount: 142
  },
  {
    id: '1',
    title: 'Hackathon 2026: Innovate Campus',
    description: 'A 24-hour coding challenge to solve real-world campus problems. Build apps, bots, or hardware projects.',
    date: '2026-03-15',
    time: '09:00 AM',
    venue: 'Main Auditorium Hall',
    organizer: 'Tech Club',
    category: 'Technical',
    department: 'Computer Science',
    imageUrl: 'https://picsum.photos/seed/hack/800/400',
    capacity: 100,
    registeredCount: 45
  },
  {
    id: '2',
    title: 'Annual Cultural Fest - Rivaayat',
    description: 'A grand celebration of art, music, and dance. Experience the diverse culture of our student body.',
    date: '2026-04-10',
    time: '04:00 PM',
    venue: 'Campus Open Air Theatre',
    organizer: 'Arts Council',
    category: 'Cultural',
    department: 'All Departments',
    imageUrl: 'https://picsum.photos/seed/fest/800/400',
    capacity: 500,
    registeredCount: 230
  },
  {
    id: '3',
    title: 'Inter-College Basketball Championship',
    description: 'Support our team as they battle for the trophy. High energy and great snacks guaranteed!',
    date: '2026-05-05',
    time: '03:30 PM',
    venue: 'Sports Complex',
    organizer: 'Sports Committee',
    category: 'Sports',
    department: 'General',
    imageUrl: 'https://picsum.photos/seed/ball/800/400',
    capacity: 200,
    registeredCount: 88
  },
  {
    id: '4',
    title: 'AI and Ethics Seminar',
    description: 'A panel discussion on the future of AI and its ethical implications in modern society.',
    date: '2026-03-25',
    time: '11:00 AM',
    venue: 'Seminar Hall B',
    organizer: 'IEEE Student Branch',
    category: 'Academic',
    department: 'Electronics & IT',
    imageUrl: 'https://picsum.photos/seed/ai/800/400',
    capacity: 80,
    registeredCount: 75
  },
  {
    id: '5',
    title: 'Pottery Workshop: Hand Building',
    description: 'Learn the basics of hand-building pottery techniques in this hands-on 3-hour session.',
    date: '2026-05-22',
    time: '02:00 PM',
    venue: 'Art Studio - Level 2',
    organizer: 'Creative Arts Club',
    category: 'Workshop',
    department: 'Fine Arts',
    imageUrl: 'https://picsum.photos/seed/pottery/800/400',
    capacity: 15,
    registeredCount: 12
  }
];

export const CATEGORIES: Category[] = ['Technical', 'Cultural', 'Sports', 'Academic', 'Career', 'Social', 'Workshop'];
