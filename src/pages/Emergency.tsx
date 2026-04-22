import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Phone, MapPin, Clock, Ambulance, HeartPulse, Shield,
  ChevronRight, AlertTriangle, Navigation, User, X
} from 'lucide-react'

export default function Emergency() {
  const [countdown, setCountdown] = useState(5)
  const [isCounting, setIsCounting] = useState(false)
  const [showEmergencyActive, setShowEmergencyActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setIsCounting(false)
      setShowEmergencyActive(true)
      setCountdown(5)
    }
  }, [isCounting, countdown])

  const emergencyContacts = [
    { name: 'Dr. Jhony Grille', role: 'Primary Physician', phone: '+1 212 923 1406', image: '/avatars/dr-jhony.jpg' },
    { name: 'City Emergency', role: '911 Services', phone: '911', image: null },
    { name: 'Poison Control', role: '24/7 Hotline', phone: '+1 800 222 1222', image: null },
  ]

  const nearbyHospitals = [
    { name: 'Manhattan General Hospital', distance: '1.2 km', eta: '4 min', address: '170 William Street, New York' },
    { name: 'Canberra Medical Center', distance: '2.8 km', eta: '8 min', address: '155 Forest Gate, New York' },
    { name: 'St. Mary\'s Emergency', distance: '3.5 km', eta: '12 min', address: '432 Healthcare Ave, New York' },
  ]

  return (
    <div className="p-8 max-w-[1440px] mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Emergency SOS</h1>
        <p className="text-sm text-slate-400">One-tap emergency assistance with location sharing</p>
      </div>

      {/* SOS Button */}
      <div className="flex flex-col items-center mb-10">
        <button
          onClick={() => setIsCounting(true)}
          disabled={isCounting || showEmergencyActive}
          className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all ${
            showEmergencyActive
              ? 'bg-red-500 shadow-[0_0_60px_rgba(239,68,68,0.5)]'
              : isCounting
              ? 'bg-amber-500 scale-95'
              : 'bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.5)] hover:scale-105'
          }`}
        >
          {/* Ripple rings */}
          {!isCounting && !showEmergencyActive && (
            <>
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20" />
              <span className="absolute -inset-4 rounded-full border-2 border-red-200 animate-pulse opacity-40" />
            </>
          )}
          {isCounting ? (
            <>
              <span className="text-5xl font-bold text-white">{countdown}</span>
              <span className="text-sm text-white/80 mt-1">Tap to cancel</span>
            </>
          ) : showEmergencyActive ? (
            <>
              <AlertTriangle className="w-10 h-10 text-white mb-1" />
              <span className="text-lg font-bold text-white">ACTIVE</span>
              <span className="text-xs text-white/80">Help is on the way</span>
            </>
          ) : (
            <>
              <Phone className="w-10 h-10 text-white mb-2" />
              <span className="text-xl font-bold text-white">SOS</span>
              <span className="text-xs text-white/80 mt-1">Hold for 5 seconds</span>
            </>
          )}
        </button>

        {isCounting && (
          <button
            onClick={() => { setIsCounting(false); setCountdown(5) }}
            className="mt-4 px-6 py-2 bg-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
        )}

        {showEmergencyActive && (
          <button
            onClick={() => setShowEmergencyActive(false)}
            className="mt-4 px-6 py-2 bg-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-300 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Resolve Emergency
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <div className="bg-white rounded-3xl p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-coral" /> Emergency Contacts
          </h2>
          <div className="space-y-3">
            {emergencyContacts.map((contact, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                {contact.image ? (
                  <img src={contact.image} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Ambulance className="w-5 h-5 text-red-500" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{contact.name}</p>
                  <p className="text-xs text-slate-400">{contact.role}</p>
                </div>
                <a href={`tel:${contact.phone}`} className="w-10 h-10 rounded-full bg-coral flex items-center justify-center hover:bg-coral-dark transition-colors shadow-coral">
                  <Phone className="w-4 h-4 text-white" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div className="bg-white rounded-3xl p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-coral" /> Nearby Hospitals
          </h2>
          <div className="space-y-3">
            {nearbyHospitals.map((hospital, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-700">{hospital.name}</h3>
                  <span className="text-xs text-coral font-medium">{hospital.distance}</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{hospital.address}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" /> {hospital.eta}
                    </span>
                    <span className="flex items-center gap-1">
                      <Ambulance className="w-3 h-3" /> Open 24/7
                    </span>
                  </div>
                  <button className="text-xs text-coral font-medium hover:underline flex items-center gap-1">
                    Directions <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Info Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {[
          { icon: HeartPulse, label: 'Blood Type', value: 'O+', color: 'text-rose-500', bg: 'bg-rose-50' },
          { icon: Shield, label: 'Allergies', value: 'Penicillin', color: 'text-amber-500', bg: 'bg-amber-50' },
          { icon: User, label: 'Emergency Contact', value: '+1 212 555 0199', color: 'text-cyan-500', bg: 'bg-cyan-50' },
          { icon: Clock, label: 'Last Checkup', value: '14 Aug 2023', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-soft">
            <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center mb-3`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <p className="text-xs text-slate-400 mb-1">{item.label}</p>
            <p className="text-sm font-bold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
