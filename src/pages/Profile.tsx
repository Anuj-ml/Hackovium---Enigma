import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Mail, Phone, MapPin, Calendar, Droplets,
  Ruler, Weight, Heart, Edit3, ChevronRight, Shield,
  Bell, Moon, LogOut
} from 'lucide-react'

export default function Profile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alexandra Mitchell',
    email: 'alex.mitchell@email.com',
    phone: '+1 212 555 0134',
    address: '245 Park Avenue, New York, NY 10022',
    birthDate: 'March 15, 1992',
    bloodType: 'O+',
    height: '165 cm',
    weight: '62 kg',
    age: 31,
  })

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [])

  const healthStats = [
    { label: 'BMI', value: '22.8', status: 'Normal', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Blood Pressure', value: '120/80', status: 'Optimal', color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Heart Rate', value: '72 bpm', status: 'Normal', color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Blood Sugar', value: '98 mg/dL', status: 'Normal', color: 'text-amber-500', bg: 'bg-amber-50' },
  ]

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', desc: 'Manage alert preferences', toggle: true },
        { icon: Moon, label: 'Dark Mode', desc: 'Switch appearance', toggle: true },
        { icon: Shield, label: 'Privacy & Security', desc: 'Password, 2FA', action: true },
      ]
    },
    {
      title: 'Health Data',
      items: [
        { icon: Heart, label: 'Connected Devices', desc: '2 devices connected', action: true },
        { icon: Calendar, label: 'Export Health Records', desc: 'Download PDF/CSV', action: true },
        { icon: Shield, label: 'Insurance Info', desc: 'BlueCross BlueShield', action: true },
      ]
    }
  ]

  return (
    <div className="p-8 max-w-[1000px] mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isEditing ? 'bg-coral text-white' : 'bg-white shadow-soft text-slate-600 hover:shadow-card'}`}
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-8 shadow-soft mb-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img src="/avatars/user-avatar.jpg" alt="Profile" className="w-24 h-24 rounded-3xl object-cover ring-4 ring-coral/10" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center shadow-coral">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  className="text-xl font-bold text-slate-800 border-b border-slate-200 focus:border-coral focus:outline-none bg-transparent pb-1"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                    className="text-sm text-slate-500 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30"
                  />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className="text-sm text-slate-500 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral/30"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-800 mb-1">{profile.name}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {profile.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {profile.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {profile.address}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          {[
            { icon: Calendar, label: 'Born', value: profile.birthDate },
            { icon: Droplets, label: 'Blood Type', value: profile.bloodType },
            { icon: Ruler, label: 'Height', value: profile.height },
            { icon: Weight, label: 'Weight', value: profile.weight },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{stat.label}</p>
                <p className="text-sm font-semibold text-slate-700">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {healthStats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="text-xs text-slate-400 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${stat.bg} ${stat.color} font-medium`}>{stat.status}</span>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="space-y-6">
        {settingsSections.map((section, si) => (
          <div key={si} className="bg-white rounded-3xl p-6 shadow-soft">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item, ii) => (
                <button key={ii} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  {item.toggle && (
                    <div className="w-11 h-6 bg-coral rounded-full relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                    </div>
                  )}
                  {item.action && <ChevronRight className="w-4 h-4 text-slate-300" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
