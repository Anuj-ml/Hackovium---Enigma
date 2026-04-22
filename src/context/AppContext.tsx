import React, { createContext, useContext, useState, useCallback } from 'react'

export interface Doctor {
  id: string
  name: string
  specialty: string
  hospital: string
  image: string
  rating: number
  reviews: number
  available: boolean
  nextAvailable: string
  phone: string
  email: string
  address: string
  about: string
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  type: 'text' | 'voice' | 'prescription'
  audioUrl?: string
  prescription?: {
    medicines: { name: string; dosage: string; qty: number }[]
  }
}

export interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  doctorImage: string
  specialty: string
  hospital: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
  type: string
}

export interface CalendarEvent {
  id: string
  title: string
  type: 'blood-pressure' | 'fasting' | 'after-meal' | 'appointment' | 'lab-test' | 'pill-reminder'
  date: string
  time: string
  value?: string
  note?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  icon: string
  timestamp: string
  read: boolean
}

export interface Workout {
  id: string
  name: string
  type: string
  calories: number
  duration: string
  sets?: number
  reps?: number
  color: string
}

interface AppState {
  activePage: string
  setActivePage: (page: string) => void
  doctors: Doctor[]
  messages: Record<string, Message[]>
  sendMessage: (doctorId: string, message: Message) => void
  appointments: Appointment[]
  calendarEvents: CalendarEvent[]
  notifications: Notification[]
  markNotificationRead: (id: string) => void
  markAllRead: () => void
  unreadCount: number
  workouts: Workout[]
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('/')

  const doctors: Doctor[] = [
    {
      id: '1', name: 'Dr. Jhony Grille', specialty: 'Oncologist', hospital: 'Oliver Medical',
      image: '/avatars/dr-jhony.jpg', rating: 4.9, reviews: 2800, available: true, nextAvailable: 'Today',
      phone: '+1 212 923 1406', email: 'jhony.mdg@mail.com',
      address: '170 William Street, New York', about: 'MD Physician, Oncologist. A graduate of George Washington University Medical School.'
    },
    {
      id: '2', name: 'Dr. Segnil Grille', specialty: 'Dermatologist', hospital: 'Canberra Medical',
      image: '/avatars/dr-segnil.jpg', rating: 4.8, reviews: 1900, available: true, nextAvailable: 'Tomorrow',
      phone: '+1 312 555 8923', email: 'segnil@canberra.md',
      address: '155 Forest Gate, New York', about: 'Board-certified dermatologist specializing in skin cancer detection and treatment.'
    },
    {
      id: '3', name: 'Dr. Benjamin Fedrel', specialty: 'Neurologist', hospital: 'Austin Medical',
      image: '/avatars/dr-benjamin.jpg', rating: 4.7, reviews: 1500, available: false, nextAvailable: 'Mon, Aug 28',
      phone: '+1 512 555 0147', email: 'ben.fedrel@austin.md',
      address: '450 Medical Blvd, Austin TX', about: 'Specialist in neurological disorders, stroke recovery, and migraine treatment.'
    },
    {
      id: '4', name: 'Dr. Sofia Frank', specialty: 'Cardiologist', hospital: 'MedCare Center',
      image: '/avatars/dr-sofia.jpg', rating: 4.9, reviews: 3200, available: true, nextAvailable: 'Today',
      phone: '+1 713 555 0298', email: 'sofia.frank@medcare.org',
      address: '890 Heart Lane, Houston TX', about: 'Interventional cardiologist with 15+ years of experience in cardiac care.'
    },
    {
      id: '5', name: 'Dr. Alex Black', specialty: 'Therapist', hospital: 'MindCare Institute',
      image: '/avatars/dr-alex.jpg', rating: 4.6, reviews: 980, available: true, nextAvailable: 'Today',
      phone: '+1 415 555 0763', email: 'alex.black@mindcare.io',
      address: '234 Wellness St, San Francisco', about: 'Licensed therapist specializing in anxiety, depression, and cognitive behavioral therapy.'
    },
    {
      id: '6', name: 'Dr. Wesley Cain', specialty: 'Radiologist', hospital: 'Metro Imaging',
      image: '/avatars/dr-wesley.jpg', rating: 4.8, reviews: 1200, available: false, nextAvailable: 'Wed, Aug 30',
      phone: '+1 646 555 0331', email: 'wesley.cain@metro.img',
      address: '567 Scan Ave, New York', about: 'Expert in diagnostic imaging, MRI, CT scans, and ultrasound interpretation.'
    },
  ]

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      { id: 'm1', senderId: 'user', text: "Hello Dr. Jhony Grille, I've been diagnosed with diabetes. What do I need to do?", timestamp: '10:22 AM', type: 'text' },
      { id: 'm2', senderId: '1', text: "Hello! First, don't worry. We'll manage this together. Diabetes means your blood sugar is high. We'll work on diet, exercise, and maybe meds to control it.", timestamp: '10:23 AM', type: 'text' },
      { id: 'm3', senderId: 'user', text: 'What foods should I eat?', timestamp: '10:24 AM', type: 'text' },
      { id: 'm4', senderId: '1', text: 'Focus on whole grains, veggies, lean protein. Limit sugar and processed foods. Portion control is key.', timestamp: '10:25 AM', type: 'text' },
      { id: 'm5', senderId: 'user', text: '', timestamp: '10:26 AM', type: 'voice', audioUrl: '#' },
      { id: 'm6', senderId: '1', text: 'Well, I would recommend medicine.', timestamp: '10:27 AM', type: 'text' },
      { id: 'm7', senderId: '1', text: '', timestamp: '10:28 AM', type: 'prescription', prescription: {
        medicines: [
          { name: 'Neoprent Tab.', dosage: '500mg', qty: 10 },
          { name: 'Tussin Cough Dm Tab.', dosage: '200mg', qty: 10 },
          { name: 'Benadryl Tab.', dosage: '25mg', qty: 10 },
        ]
      }},
    ]
  })

  const sendMessage = useCallback((doctorId: string, message: Message) => {
    setMessages(prev => ({
      ...prev,
      [doctorId]: [...(prev[doctorId] || []), message]
    }))
  }, [])

  const appointments: Appointment[] = [
    { id: 'a1', doctorId: '1', doctorName: 'Dr. Jhony Grille', doctorImage: '/avatars/dr-jhony.jpg', specialty: 'Therapist', hospital: 'Oliver Medical Center', date: '14 Aug 2023', time: '01:00 PM', status: 'upcoming', type: 'Psychiatrist' },
    { id: 'a2', doctorId: '2', doctorName: 'Dr. Segnil Grille', doctorImage: '/avatars/dr-segnil.jpg', specialty: 'Dermatologist', hospital: 'Canberra Medical Unit', date: '21 Aug 2023', time: '10:30 PM', status: 'upcoming', type: 'Skin & Hair Specialist' },
    { id: 'a3', doctorId: '3', doctorName: 'Dr. Benjamin Fedrel', doctorImage: '/avatars/dr-benjamin.jpg', specialty: 'Neurologist', hospital: 'Austin Medical Center', date: '26 Aug 2023', time: '04:30 PM', status: 'upcoming', type: 'Spinal cord and Nerves' },
  ]

  const calendarEvents: CalendarEvent[] = [
    { id: 'e1', title: 'Blood pressure', type: 'blood-pressure', date: '2023-08-22', time: '7:00 AM', value: '78 mm - 124 mm' },
    { id: 'e2', title: 'Pills', type: 'pill-reminder', date: '2023-08-22', time: '7:00 AM' },
    { id: 'e3', title: 'Blood pressure', type: 'blood-pressure', date: '2023-08-24', time: '10:00 AM', value: '78 mm - 124 mm' },
    { id: 'e4', title: 'Fasting', type: 'fasting', date: '2023-08-23', time: '8:00 AM', value: '126 mg/dL' },
    { id: 'e5', title: 'Blood pressure', type: 'blood-pressure', date: '2023-08-25', time: '7:00 AM', value: '84 mm - 134 mm' },
    { id: 'e6', title: 'Fasting', type: 'fasting', date: '2023-08-26', time: '8:00 AM', value: '89 mg/dL' },
    { id: 'e7', title: 'Calcium blood test', type: 'lab-test', date: '2023-08-25', time: '10:00 AM', note: 'Sun Pathology' },
    { id: 'e8', title: 'Body check up', type: 'appointment', date: '2023-08-22', time: '12:00 PM', note: 'Sun Pathology' },
    { id: 'e9', title: 'Dr. Alex Black', type: 'appointment', date: '2023-08-27', time: '11:00 AM', note: 'Dentist 11:00 - 12:00 am' },
    { id: 'e10', title: 'Fasting', type: 'fasting', date: '2023-08-24', time: '1:00 PM', value: '166 mg/dL' },
    { id: 'e11', title: 'Fasting', type: 'fasting', date: '2023-08-26', time: '1:00 PM', value: '186 mg/dL' },
    { id: 'e12', title: 'Blood pressure', type: 'blood-pressure', date: '2023-08-27', time: '7:00 AM', value: '90 mm - 120 mm' },
    { id: 'e13', title: 'Pills', type: 'pill-reminder', date: '2023-08-22', time: '1:00 PM' },
    { id: 'e14', title: 'Pills', type: 'pill-reminder', date: '2023-08-23', time: '7:00 AM' },
    { id: 'e15', title: 'Pills', type: 'pill-reminder', date: '2023-08-23', time: '1:00 PM' },
    { id: 'e16', title: 'Pills', type: 'pill-reminder', date: '2023-08-24', time: '7:00 AM' },
    { id: 'e17', title: 'Pills', type: 'pill-reminder', date: '2023-08-24', time: '1:00 PM' },
    { id: 'e18', title: 'Pills', type: 'pill-reminder', date: '2023-08-25', time: '1:00 PM' },
    { id: 'e19', title: 'Pills', type: 'pill-reminder', date: '2023-08-26', time: '1:00 PM' },
    { id: 'e20', title: 'Pills', type: 'pill-reminder', date: '2023-08-27', time: '1:00 PM' },
    { id: 'e21', title: 'Pills', type: 'pill-reminder', date: '2023-08-27', time: '7:00 AM' },
  ]

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', title: 'Time for Meds', message: "Don't forget to take your medication. Your health is important to us.", type: 'medicine', icon: 'pill', timestamp: '24 Aug 2023 at 9:30 am', read: false },
    { id: 'n2', title: 'Hydration Reminder', message: 'Take a moment to sip some water. Staying hydrated is key to your well-being.', type: 'water', icon: 'droplet', timestamp: '24 Aug 2023 at 9:30 am', read: false },
    { id: 'n3', title: 'A new diet plan for you!', message: 'Hey Ivan Jackson, We have a new diet plan for you.', type: 'diet', icon: 'apple', timestamp: '24 Aug 2023 at 9:30 am', read: false },
    { id: 'n4', title: 'Nourish Your Body', message: "It's mealtime! Fuel your body with a nutritious meal for a healthier you.", type: 'diet', icon: 'utensils', timestamp: '24 Aug 2023 at 9:30 am', read: true },
    { id: 'n5', title: 'Prescription Update', message: 'A new prescription awaits you. Log in to view the details and stay on track', type: 'medicine', icon: 'file-text', timestamp: '24 Aug 2023 at 9:30 am', read: false },
    { id: 'n6', title: 'Lab Results Ready', message: 'Your lab report is in. Sign in to the app to access your latest health insights.', type: 'lab', icon: 'flask', timestamp: '24 Aug 2023 at 9:30 am', read: false },
    { id: 'n7', title: 'Password Updated', message: "Success! Your password has been changed. If this wasn't you, reach out to us.", type: 'security', icon: 'shield', timestamp: '24 Aug 2023 at 9:30 am', read: true },
    { id: 'n8', title: 'Upcoming Appointment', message: "You have a scheduled medical appointment. Don't forget to mark your calendar.", type: 'appointment', icon: 'calendar', timestamp: '24 Aug 2023 at 9:30 am', read: false },
    { id: 'n9', title: 'Time to Move', message: 'Get active! Remember to engage in your daily exercise routine for a healthier you.', type: 'exercise', icon: 'activity', timestamp: '24 Aug 2023 at 9:30 am', read: true },
    { id: 'n10', title: 'Vaccine Due Soon', message: 'Stay protected. A vaccination is due soon. Make sure to schedule your appointment', type: 'vaccine', icon: 'syringe', timestamp: '24 Aug 2023 at 9:30 am', read: false },
  ])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const workouts: Workout[] = [
    { id: 'w1', name: 'Back Goblet Squat', type: 'Training', calories: 350, duration: '45m | 2 Rounds', sets: 3, reps: 12, color: 'bg-rose-50 text-rose-600' },
    { id: 'w2', name: 'Weighted Chin Up', type: 'Training', calories: 480, duration: '20m | 4 Rounds', sets: 4, reps: 8, color: 'bg-amber-50 text-amber-600' },
    { id: 'w3', name: 'Stretching', type: 'Training', calories: 180, duration: '10m | Relaxation', sets: 1, reps: 6, color: 'bg-teal-50 text-teal-600' },
  ]

  return (
    <AppContext.Provider value={{
      activePage, setActivePage, doctors, messages, sendMessage,
      appointments, calendarEvents, notifications, markNotificationRead, markAllRead,
      unreadCount, workouts
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
