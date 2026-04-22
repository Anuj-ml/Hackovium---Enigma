import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Plus, ChevronLeft, ChevronRight, Calendar as CalIcon,
  Pill, Droplets, Utensils, FlaskConical, Stethoscope
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const eventTypeConfig: Record<string, { color: string; bg: string; icon: any }> = {
  'blood-pressure': { color: 'text-rose-500', bg: 'bg-rose-50 border-rose-200', icon: Heart },
  'fasting': { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Droplets },
  'after-meal': { color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', icon: Utensils },
  'appointment': { color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-200', icon: Stethoscope },
  'lab-test': { color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200', icon: FlaskConical },
  'pill-reminder': { color: 'text-slate-600', bg: 'bg-slate-100 border-slate-200', icon: Pill },
}

function Heart(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> }

const typeFilters = [
  { key: 'blood-pressure', label: 'Blood Pressure' },
  { key: 'fasting', label: 'Diabetes Fasting' },
  { key: 'after-meal', label: 'After Meal' },
  { key: 'appointment', label: 'Appointment' },
  { key: 'lab-test', label: 'Lab Test' },
  { key: 'pill-reminder', label: 'Pill Reminder' },
]

export default function HealthCalendar() {
  const { calendarEvents } = useApp()
  const [view, setView] = useState<'W' | 'M'>('W')
  const [activeFilters, setActiveFilters] = useState<string[]>(typeFilters.map(t => t.key))
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2023, 7, 22)) // Aug 22, 2023
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      )
    }
  }, [])

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  const timeSlots = Array.from({ length: 15 }, (_, i) => i + 7) // 7 AM to 9 PM

  const getEventsForSlot = (date: Date, hour: number) => {
    const dateStr = date.toISOString().split('T')[0]
    const hourStr = `${hour}:00`
    return calendarEvents.filter(e => {
      if (!activeFilters.includes(e.type)) return false
      return e.date === dateStr && e.time.startsWith(hourStr)
    })
  }

  const toggleFilter = (key: string) => {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    )
  }

  return (
    <div className="p-8 max-w-[1440px] mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Health Calendar</h1>
          <div className="flex bg-white rounded-full p-1 shadow-soft">
            <button onClick={() => setView('W')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'W' ? 'bg-coral text-white' : 'text-slate-500 hover:text-slate-700'}`}>W</button>
            <button onClick={() => setView('M')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${view === 'M' ? 'bg-coral text-white' : 'text-slate-500 hover:text-slate-700'}`}>M</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { const d = new Date(currentWeekStart); d.setDate(d.getDate() - 7); setCurrentWeekStart(d) }} className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card">
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <span className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-full shadow-soft">
            <CalIcon className="w-4 h-4 inline mr-2" />
            {currentWeekStart.toLocaleDateString('en', { month: 'short', day: 'numeric' })} - {new Date(currentWeekStart.getTime() + 6 * 86400000).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <button onClick={() => { const d = new Date(currentWeekStart); d.setDate(d.getDate() + 7); setCurrentWeekStart(d) }} className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card">
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button onClick={() => setShowAddModal(true)} className="w-10 h-10 rounded-full bg-coral text-white flex items-center justify-center shadow-coral hover:scale-95 transition-transform">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {typeFilters.map(tf => {
          const isActive = activeFilters.includes(tf.key)
          const cfg = eventTypeConfig[tf.key]
          return (
            <button
              key={tf.key}
              onClick={() => toggleFilter(tf.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isActive ? cfg.bg + ' ' + cfg.color : 'bg-white text-slate-400'}`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-current' : 'bg-slate-300'}`} />
              {tf.label}
            </button>
          )
        })}
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-8 border-b border-slate-100">
          <div className="p-4 text-xs font-medium text-slate-400">Time</div>
          {weekDays.map((d, i) => (
            <div key={i} className={`p-4 text-center ${i === 0 ? 'bg-coral/5' : ''}`}>
              <p className={`text-lg font-bold ${i === 0 ? 'text-coral' : 'text-slate-700'}`}>{d.getDate()}</p>
              <p className="text-xs text-slate-400">{d.toLocaleDateString('en', { month: 'short' })}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="max-h-[600px] overflow-y-auto">
          {timeSlots.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-slate-50 min-h-[70px]">
              <div className="p-3 text-xs text-slate-400 font-medium border-r border-slate-50">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
              {weekDays.map((d, di) => {
                const events = getEventsForSlot(d, hour)
                return (
                  <div key={di} className={`p-1 border-r border-slate-50 relative ${di === 0 ? 'bg-coral/[0.02]' : ''}`}>
                    {events.map(ev => {
                      const cfg = eventTypeConfig[ev.type]
                      const Icon = cfg.icon
                      return (
                        <div key={ev.id} className={`p-2 rounded-xl border ${cfg.bg} mb-1 cursor-pointer hover:shadow-soft transition-shadow`}>
                          <div className="flex items-center gap-1 mb-0.5">
                            <Icon className={`w-3 h-3 ${cfg.color}`} />
                            <span className={`text-[10px] font-semibold ${cfg.color}`}>{ev.title}</span>
                          </div>
                          {ev.value && <p className="text-[10px] text-slate-500">{ev.value}</p>}
                          {ev.note && <p className="text-[10px] text-slate-400">{ev.note}</p>}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-3xl p-6 w-[400px] shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Add Health Event</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Event title" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30" />
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 bg-white">
                {typeFilters.map(tf => <option key={tf.key} value={tf.key}>{tf.label}</option>)}
              </select>
              <div className="flex gap-3">
                <input type="date" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30" />
                <input type="time" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30" />
              </div>
              <input type="text" placeholder="Value/Note (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30" />
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl bg-coral text-white text-sm font-medium hover:bg-coral-dark">Add Event</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
