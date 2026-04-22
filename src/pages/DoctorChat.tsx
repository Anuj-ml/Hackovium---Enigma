import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useApp } from '../context/AppContext'
import {
  Search, Phone, Video, MoreHorizontal, Send, Paperclip,
  Mic, Play, ShoppingCart, MapPin, Mail, Star
} from 'lucide-react'

export default function DoctorChat() {
  const { doctors, messages, sendMessage } = useApp()
  const navigate = useNavigate()
  const [activeDoctor, setActiveDoctor] = useState(doctors[0])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Doctors')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages[activeDoctor.id]])

  useEffect(() => {
    if (chatContainerRef.current) {
      gsap.fromTo(chatContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [activeDoctor])

  const handleSend = () => {
    if (!inputText.trim()) return
    sendMessage(activeDoctor.id, {
      id: `m-${Date.now()}`,
      senderId: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    })
    setInputText('')

    // Simulate doctor reply
    setTimeout(() => {
      const replies = [
        "I understand. Let me review your latest test results and get back to you.",
        "That's great progress! Keep following the medication schedule.",
        "Please make sure to stay hydrated and take your medication on time.",
        "I recommend scheduling a follow-up appointment next week.",
        "Your blood pressure readings look stable. Continue with the current regimen."
      ]
      sendMessage(activeDoctor.id, {
        id: `m-${Date.now() + 1}`,
        senderId: activeDoctor.id,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      })
    }, 2000)
  }

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        sendMessage(activeDoctor.id, {
          id: `m-${Date.now()}`,
          senderId: 'user',
          text: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'voice',
          audioUrl: '#'
        })
      }, 3000)
    }
  }

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const doctorMessages = messages[activeDoctor.id] || []

  const tabs = ['Doctors', 'Facilities', 'Hospitals']

  return (
    <div className="h-screen flex">
      {/* Left Panel - Contact List */}
      <div className="w-[340px] bg-white border-r border-slate-100 flex flex-col">
        <div className="p-5 border-b border-slate-50">
          <h1 className="text-xl font-bold text-slate-800 mb-1">My Contacts</h1>
          <p className="text-xs text-slate-400 mb-4">Connect for your better health.</p>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/30"
            />
          </div>
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === tab ? 'bg-coral/10 text-coral' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredDoctors.map(doc => (
            <button
              key={doc.id}
              onClick={() => setActiveDoctor(doc)}
              className={`w-full flex items-center gap-3 p-4 text-left transition-all ${activeDoctor.id === doc.id ? 'bg-coral/5 border-l-3 border-coral' : 'hover:bg-slate-50 border-l-3 border-transparent'}`}
            >
              <div className="relative">
                <img src={doc.image} alt={doc.name} className="w-11 h-11 rounded-full object-cover" />
                {doc.available && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${activeDoctor.id === doc.id ? 'text-coral' : 'text-slate-700'}`}>{doc.name}</p>
                <p className="text-xs text-slate-400 truncate">{doc.specialty} | {doc.hospital}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center - Chat */}
      <div className="flex-1 flex flex-col bg-[#f8f9fc]" ref={chatContainerRef}>
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src={activeDoctor.image} alt={activeDoctor.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="text-sm font-semibold text-slate-800">{activeDoctor.name}</h3>
              <p className="text-xs text-slate-400">{activeDoctor.specialty} | {activeDoctor.hospital}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/video-call')} className="w-9 h-9 rounded-full bg-coral/10 flex items-center justify-center hover:bg-coral/20">
              <Phone className="w-4 h-4 text-coral" />
            </button>
            <button onClick={() => navigate('/video-call')} className="w-9 h-9 rounded-full bg-cyan/10 flex items-center justify-center hover:bg-cyan/20">
              <Video className="w-4 h-4 text-cyan-600" />
            </button>
            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {doctorMessages.map((msg) => {
            if (msg.type === 'text') {
              const isUser = msg.senderId === 'user'
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${isUser ? 'bg-coral text-white rounded-br-md' : 'bg-white shadow-soft rounded-bl-md'}`}>
                    <p className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-slate-700'}`}>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${isUser ? 'text-white/60' : 'text-slate-400'}`}>{msg.timestamp}</p>
                  </div>
                </div>
              )
            }

            if (msg.type === 'voice') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-coral text-white px-4 py-3 rounded-2xl rounded-br-md max-w-[70%]">
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-white" />
                      </button>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 20 }, (_, i) => (
                          <div key={i} className="w-0.5 bg-white/60 rounded-full" style={{ height: `${8 + Math.sin(i * 0.8) * 12}px` }} />
                        ))}
                      </div>
                      <span className="text-xs text-white/60">0:08</span>
                    </div>
                  </div>
                </div>
              )
            }

            if (msg.type === 'prescription' && msg.prescription) {
              return (
                <div key={msg.id} className="flex justify-start">
                  <div className="bg-white shadow-soft rounded-2xl rounded-bl-md p-4 max-w-[80%]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Medicine Recommendation</p>
                        <p className="text-xs text-slate-400">Prescription</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {msg.prescription.medicines.map((med, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                          <div>
                            <p className="text-sm text-slate-700">{med.name}</p>
                            <p className="text-xs text-slate-400">{med.dosage}</p>
                          </div>
                          <span className="text-sm font-medium text-slate-600">{med.qty} Nos.</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50">Check Out</button>
                      <button className="flex-1 py-2 rounded-xl bg-coral text-white text-xs font-medium hover:bg-coral-dark">Order Now</button>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
              <Paperclip className="w-4 h-4 text-slate-500" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Write your message..."
                className="w-full px-4 py-3 bg-slate-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 pr-12"
              />
              <button
                onClick={handleVoiceMessage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-coral text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-coral text-white flex items-center justify-center hover:bg-coral-dark transition-colors shadow-coral"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Doctor Info */}
      <div className="w-[300px] bg-white border-l border-slate-100 p-5">
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <img src={activeDoctor.image} alt={activeDoctor.name} className="w-20 h-20 rounded-2xl object-cover" />
            <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-medium rounded-full">
              Available
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-800">{activeDoctor.name}</h3>
          <p className="text-xs text-coral mb-1">MD Physician | {activeDoctor.specialty}</p>
          <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
            <MapPin className="w-3 h-3" /> California, United States
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">6.1k</p>
            <p className="text-[10px] text-slate-400">Patients</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">2.8k</p>
            <p className="text-[10px] text-slate-400">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800 flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{activeDoctor.rating}
            </p>
            <p className="text-[10px] text-slate-400">Rating</p>
          </div>
        </div>

        {/* About */}
        <div className="mb-6">
          <p className="text-xs text-slate-500 leading-relaxed">{activeDoctor.about}</p>
          <button className="text-xs text-coral font-medium mt-1 hover:underline">Read More</button>
        </div>

        {/* Contact */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <Phone className="w-4 h-4 text-slate-400" />
            {activeDoctor.phone}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <Mail className="w-4 h-4 text-slate-400" />
            {activeDoctor.email}
          </div>
        </div>

        {/* Hospitals */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Organizations / Hospitals</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-coral" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700">Manhattan Hospital</p>
                <p className="text-[10px] text-slate-400">170 William Street, New York, NY 10038</p>
                <div className="flex gap-2 mt-2">
                  <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <MapPin className="w-3 h-3 text-slate-400" />
                  </button>
                  <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <Phone className="w-3 h-3 text-slate-400" />
                  </button>
                  <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <Mail className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-700">Canberra Medical Center</p>
                <p className="text-[10px] text-slate-400">155 Forest Gate, New York, NY 10040</p>
                <div className="flex gap-2 mt-2">
                  <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <MapPin className="w-3 h-3 text-slate-400" />
                  </button>
                  <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <Phone className="w-3 h-3 text-slate-400" />
                  </button>
                  <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <Mail className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
