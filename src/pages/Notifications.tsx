import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useApp } from '../context/AppContext'
import {
  Bell, ShoppingCart, Droplets, Utensils, Pill,
  FlaskConical, Shield, Calendar, Activity, Syringe,
  Search, SlidersHorizontal, CheckCheck
} from 'lucide-react'

const categoryConfig: Record<string, { icon: any; label: string }> = {
  'all': { icon: Bell, label: 'All Notifications' },
  'orders': { icon: ShoppingCart, label: 'Orders' },
  'water': { icon: Droplets, label: 'Water Intake' },
  'food': { icon: Utensils, label: 'Food Intake' },
  'exercise': { icon: Activity, label: 'Exercise' },
  'reports': { icon: FlaskConical, label: 'Reports' },
  'medicine': { icon: Pill, label: 'Medicine' },
  'appointments': { icon: Calendar, label: 'Appointments' },
  'blood-pressure': { icon: Activity, label: 'Blood Pressure' },
  'diabetic': { icon: Droplets, label: 'Diabetic Tracker' },
}

const filterTabs = ['All', 'Read', 'Unread', 'Threads']

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('All')
  const containerRef = useRef<HTMLDivElement>(null)

  const categories = Object.entries(categoryConfig)

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'Unread' && n.read) return false
    if (activeTab === 'Read' && !n.read) return false
    return true
  })

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      )
    }
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medicine': return Pill
      case 'water': return Droplets
      case 'diet': return Utensils
      case 'lab': return FlaskConical
      case 'security': return Shield
      case 'appointment': return Calendar
      case 'exercise': return Activity
      case 'vaccine': return Syringe
      default: return Bell
    }
  }

  return (
    <div className="p-8 max-w-[1440px] mx-auto" ref={containerRef}>
      <div className="grid grid-cols-12 gap-6">
        {/* Left - Categories */}
        <div className="col-span-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Notifications</h1>
            <p className="text-sm text-slate-400">Select the activities you want to get the notifications for</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map(([key, cfg]) => {
              const Icon = cfg.icon
              const isActive = activeCategory === key
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-2xl transition-all ${isActive ? 'bg-navy text-white shadow-lg' : 'bg-white shadow-soft hover:shadow-card text-slate-600'}`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-coral' : 'text-slate-400'}`} />
                  <span className="text-xs font-medium text-center">{cfg.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right - Notification List */}
        <div className="col-span-8">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {filterTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-rose-100 text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card">
                <Search className="w-4 h-4 text-slate-500" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              </button>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center hover:bg-coral/20" title="Mark all read">
                  <CheckCheck className="w-4 h-4 text-coral" />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="space-y-2">
            {filteredNotifications.map((notif) => {
              const Icon = getNotificationIcon(notif.type)
              return (
                <button
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all ${notif.read ? 'bg-white/50' : 'bg-white shadow-soft hover:shadow-card'}`}
                >
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-coral mt-2 flex-shrink-0" />}
                  {notif.read && <span className="w-2 h-2 rounded-full bg-transparent mt-2 flex-shrink-0" />}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-slate-100' : 'bg-coral/10'}`}>
                    <Icon className={`w-5 h-5 ${notif.read ? 'text-slate-400' : 'text-coral'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className={`text-sm font-semibold ${notif.read ? 'text-slate-600' : 'text-slate-800'}`}>{notif.title}</h3>
                      <span className="text-[10px] text-slate-400 flex-shrink-0">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{notif.message}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
