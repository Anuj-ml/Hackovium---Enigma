import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Search, Heart, Star, Phone, Video, MessageCircle,
  CalendarDays, Stethoscope, Hospital, Ambulance,
  Pill, Syringe, FlaskConical, Users, GraduationCap,
} from 'lucide-react'

const services = [
  { icon: Stethoscope, label: 'Doctor', color: 'bg-coral/10 text-coral' },
  { icon: Hospital, label: 'Hospital', color: 'bg-blue-50 text-blue-500' },
  { icon: Ambulance, label: 'Ambulance', color: 'bg-amber-50 text-amber-500' },
  { icon: Pill, label: 'Medicines', color: 'bg-emerald-50 text-emerald-500' },
  { icon: Users, label: 'Nursing', color: 'bg-violet-50 text-violet-500' },
  { icon: Syringe, label: 'Covid-19', color: 'bg-rose-50 text-rose-500' },
  { icon: FlaskConical, label: 'Lab Test', color: 'bg-cyan-50 text-cyan-500' },
  { icon: Video, label: 'Tele Health', color: 'bg-teal-50 text-teal-500' },
  { icon: GraduationCap, label: 'Education', color: 'bg-indigo-50 text-indigo-500' },
]

const specialties = [
  { name: 'Heart', icon: Heart, doctors: 12, color: 'bg-rose-50 text-rose-500' },
  { name: 'Radiologist', icon: FlaskConical, doctors: 8, color: 'bg-violet-50 text-violet-500' },
  { name: 'Oncologist', icon: Stethoscope, doctors: 6, color: 'bg-amber-50 text-amber-500' },
  { name: 'Pediatrician', icon: Baby, doctors: 10, color: 'bg-cyan-50 text-cyan-500' },
  { name: 'Ortho', icon: Users, doctors: 9, color: 'bg-emerald-50 text-emerald-500' },
  { name: 'Dental', icon: Users, doctors: 7, color: 'bg-blue-50 text-blue-500' },
  { name: 'Liver', icon: Heart, doctors: 5, color: 'bg-orange-50 text-orange-500' },
  { name: 'Knee', icon: Users, doctors: 8, color: 'bg-pink-50 text-pink-500' },
  { name: 'Ophthalmologist', icon: Users, doctors: 11, color: 'bg-teal-50 text-teal-500' },
  { name: 'Surgeon', icon: Stethoscope, doctors: 6, color: 'bg-slate-100 text-slate-600' },
  { name: 'Physiatrist', icon: Users, doctors: 4, color: 'bg-indigo-50 text-indigo-500' },
]

function Baby(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.8-1H11a6 6 0 0 0-2.5 4.8v.01"/><path d="M6.1 16.4c.7.8 1.6 1.4 2.6 1.8"/><path d="M17.9 16.4c-.7.8-1.6 1.4-2.6 1.8"/></svg> }

export default function FindDoctor() {
  const { doctors, appointments } = useApp()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Doctors')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      )
    }
  }, [])

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const tabs = ['Doctors', 'Facilities', 'Hospitals']

  return (
    <div className="p-8 max-w-[1440px] mx-auto" ref={containerRef}>
      <div className="grid grid-cols-12 gap-6">
        {/* Left - Services */}
        <div className="col-span-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">What do you need?</h1>
            <p className="text-sm text-slate-400 mb-6">Select your requirement</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <button
                key={s.label}
                onClick={() => navigate(s.label === 'Doctor' ? '/find-doctor' : s.label === 'Tele Health' ? '/video-call' : '/chat')}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-soft hover:shadow-card transition-all hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-slate-600">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Find Doctor */}
        <div className="col-span-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Find Doctor</h2>
              <p className="text-xs text-slate-400">Make an appointment, Find a doctor.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search doctors..."
                  className="pl-10 pr-4 py-2.5 bg-white rounded-full text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-coral/30 w-56"
                />
              </div>
              <button className="text-sm text-slate-500 hover:text-coral">See All</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-coral/10 text-coral' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Specialties */}
          <div className="grid grid-cols-4 gap-3">
            {specialties.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setSearchQuery(s.name)}
                className={`flex items-center gap-3 p-3 rounded-2xl ${i === 1 ? 'bg-coral text-white' : 'bg-white shadow-soft hover:shadow-card'} transition-all hover:scale-[1.02]`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 1 ? 'bg-white/20' : s.color}`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className={`text-xs font-semibold ${i === 1 ? 'text-white' : 'text-slate-700'}`}>{s.name}</p>
                  <p className={`text-[10px] ${i === 1 ? 'text-white/70' : 'text-slate-400'}`}>{s.doctors} Doctors</p>
                </div>
              </button>
            ))}
          </div>

          {/* Appointments */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Your Appointments</h2>
                <p className="text-xs text-slate-400">Your appointments are listed here.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center">
                  <Search className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-slate-400" />
                </button>
                <button onClick={() => navigate('/find-doctor')} className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center">
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {appointments.map(apt => (
                <div key={apt.id} className="bg-white rounded-3xl p-5 shadow-soft hover:shadow-card transition-all">
                  <div className="flex flex-col items-center text-center mb-4">
                    <img src={apt.doctorImage} alt={apt.doctorName} className="w-14 h-14 rounded-full object-cover mb-2 ring-2 ring-coral/20" />
                    <h3 className="text-sm font-semibold text-slate-800">{apt.doctorName}</h3>
                    <p className="text-xs text-slate-400">{apt.hospital}</p>
                  </div>
                  <div className="bg-coral/5 rounded-xl p-2 mb-3 text-center">
                    <p className="text-xs font-medium text-coral">{apt.specialty}</p>
                    <p className="text-[10px] text-slate-400">{apt.type}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div>
                      <p className="text-[10px] text-slate-400">Date</p>
                      <p className="font-medium text-cyan-600">{apt.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Time</p>
                      <p className="font-medium text-cyan-600">{apt.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => navigate('/video-call')} className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center hover:bg-coral/20">
                      <Video className="w-3.5 h-3.5 text-coral" />
                    </button>
                    <button onClick={() => navigate('/chat')} className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center hover:bg-cyan/20">
                      <MessageCircle className="w-3.5 h-3.5 text-cyan-600" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor List */}
          <div className="grid grid-cols-2 gap-4">
            {filteredDoctors.map(doc => (
              <div key={doc.id} className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-all flex items-center gap-4 cursor-pointer"
                onClick={() => navigate('/chat')}>
                <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 truncate">{doc.name}</h3>
                  <p className="text-xs text-coral">{doc.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-slate-600">{doc.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">({(doc.reviews / 1000).toFixed(1)}k reviews)</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${doc.available ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {doc.available ? 'Available' : 'Busy'}
                  </span>
                  <button onClick={e => { e.stopPropagation(); navigate('/video-call') }} className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center hover:bg-coral/20">
                    <Video className="w-3.5 h-3.5 text-coral" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
