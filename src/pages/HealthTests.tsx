import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  ChevronLeft, ChevronRight, Activity, Pill, FlaskConical,
  CalendarDays
} from 'lucide-react'

// ==================== DNA HELIX 3D ====================
function DnaHelix() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const basePairs: { pos: [number, number, number]; rot: [number, number, number] }[] = []
  for (let i = 0; i < 20; i++) {
    const y = (i - 10) * 0.3
    const angle1 = i * 0.6
    const angle2 = angle1 + Math.PI
    const r = 0.6
    basePairs.push(
      { pos: [Math.cos(angle1) * r, y, Math.sin(angle1) * r], rot: [0, -angle1, 0] },
      { pos: [Math.cos(angle2) * r, y, Math.sin(angle2) * r], rot: [0, -angle2, 0] }
    )
  }

  return (
    <group ref={groupRef}>
      {/* Backbone strands */}
      {[-1, 1].map((side) => (
        <mesh key={side}>
          <tubeGeometry args={[
            new THREE.CatmullRomCurve3(
              Array.from({ length: 40 }, (_, i) => {
                const angle = i * 0.3 * side
                const y = (i - 20) * 0.15
                return new THREE.Vector3(Math.cos(angle) * 0.6, y, Math.sin(angle) * 0.6)
              })
            ),
            64, 0.04, 8, false
          ]} />
          <meshPhysicalMaterial color="#94a3b8" roughness={0.3} metalness={0.5} />
        </mesh>
      ))}

      {/* Base pairs */}
      {basePairs.map((bp, i) => (
        <mesh key={i} position={bp.pos} rotation={bp.rot}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
          <meshPhysicalMaterial
            color={i % 4 === 0 ? '#f97066' : i % 4 === 1 ? '#22d3ee' : i % 4 === 2 ? '#fbbf24' : '#a78bfa'}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function HealthTests() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('Tests')
  const filters = ['All', 'Advice', 'Tests', 'Labs', 'Docs']

  const supplements = [
    { id: '01', name: 'OMEGA 3', dosage: '2.5 mg', image: '/avatars/dr-jhony.jpg', color: 'bg-blue-50' },
    { id: '02', name: 'Aflubin', dosage: '200 mg', image: '/avatars/dr-sofia.jpg', color: 'bg-purple-50' },
    { id: '03', name: 'Timestin', dosage: '300 mg', image: '/avatars/dr-benjamin.jpg', color: 'bg-emerald-50' },
    { id: '04', name: 'Vitamin C', dosage: '1.8 mg', image: '/avatars/dr-segnil.jpg', color: 'bg-amber-50' },
  ]

  const testResults = [
    {
      doctor: 'Dr. Wesley Cain',
      specialty: 'Cardiologist',
      image: '/avatars/dr-wesley.jpg',
      test: 'Blood Pressure Test',
      date: '15 Feb',
      chart: 'bar'
    },
    {
      doctor: 'Dr. Sofia Frank',
      specialty: 'Cardiologist',
      image: '/avatars/dr-sofia.jpg',
      test: 'Cardiogram Test',
      date: '28 Feb',
      chart: 'wave'
    },
  ]

  const calendarData = [
    { day: 6, label: 'Mon', events: [{ type: 'test', text: '2 Tests' }] },
    { day: 7, label: 'Tue', events: [{ type: 'pill', text: 'Vitamin C', count: 1 }, { type: 'advice', text: '', count: 1 }] },
    { day: 8, label: 'Wed', events: [{ type: 'pill', text: 'OMEGA 3', count: 1 }, { type: 'test', text: '', count: 2 }] },
    { day: 9, label: 'Thu', events: [{ type: 'pill', text: 'OMEGA 3', count: 2 }, { type: 'test', text: '', count: 2 }] },
    { day: 10, label: 'Fri', active: true, events: [{ type: 'advice', text: '1 Advice' }] },
    { day: 11, label: 'Sat', events: [{ type: 'pill', text: 'Aflubin', count: 2 }, { type: 'test', text: '', count: 2 }] },
    { day: 12, label: 'Sun', events: [{ type: 'pill', text: 'Timestin', count: 1 }, { type: 'test', text: '', count: 1 }] },
  ]

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [])

  return (
    <div className="p-8 max-w-[1440px] mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
            <Activity className="w-5 h-5 text-coral" />
          </div>
          <span className="text-lg font-bold text-slate-800">medit</span>
        </div>
        <div className="flex items-center gap-2">
          {['grid', 'file', 'calendar', 'bell', 'settings'].map((icon, i) => (
            <button key={icon} className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card text-slate-500">
              {i === 0 && <span className="grid grid-cols-2 gap-0.5"><span className="w-1 h-1 rounded-full bg-slate-500" /><span className="w-1 h-1 rounded-full bg-slate-500" /><span className="w-1 h-1 rounded-full bg-slate-500" /><span className="w-1 h-1 rounded-full bg-slate-500" /></span>}
              {i === 1 && <FlaskConical className="w-4 h-4" />}
              {i === 2 && <CalendarDays className="w-4 h-4" />}
              {i === 3 && <span className="relative"><span className="text-sm">🔔</span><span className="absolute -top-1 -right-1 w-2 h-2 bg-coral rounded-full" /></span>}
              {i === 4 && <span className="text-sm">⚙️</span>}
            </button>
          ))}
        </div>
        <button onClick={() => navigate('/profile')} className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-700">Hugo Olafsson</p>
            <p className="text-[10px] text-slate-400">hugo@project.io</p>
          </div>
          <img src="/avatars/user-avatar.jpg" alt="Profile" className="w-9 h-9 rounded-full object-cover" />
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left - Tests */}
        <div className="col-span-5">
          <div className="flex items-center gap-4 mb-6">
            <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card">
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 leading-tight">Personal<br />Tests and<br />Analysis</h1>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === f ? 'bg-slate-200 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Test Cards */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {testResults.map((test, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 shadow-soft min-w-[220px]">
                <div className="flex items-center gap-2 mb-3">
                  <img src={test.image} alt={test.doctor} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{test.doctor}</p>
                    <p className="text-[10px] text-slate-400">{test.specialty}</p>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-0.5">{test.test}</h3>
                <p className="text-xs text-slate-400 mb-4">{test.date}</p>
                {/* Mini chart */}
                {test.chart === 'bar' ? (
                  <svg viewBox="0 0 120 40" className="w-full">
                    {Array.from({ length: 12 }, (_, i) => (
                      <rect key={i} x={i * 10} y={40 - (15 + Math.sin(i * 0.8) * 15)} width="6" height={15 + Math.sin(i * 0.8) * 15} rx="2" fill={i === 5 ? '#f97066' : '#e2e8f0'} />
                    ))}
                  </svg>
                ) : (
                  <svg viewBox="0 0 120 40" className="w-full">
                    <path d={`M0 20 ${Array.from({ length: 20 }, (_, i) => `L${i * 6} ${20 + Math.sin(i * 0.8) * 12}`).join(' ')}`}
                      fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center - DNA */}
        <div className="col-span-4">
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl shadow-soft h-[400px] relative">
            <div className="absolute top-6 left-6 z-10">
              <p className="text-xs text-slate-400">Structure</p>
              <p className="text-3xl font-bold text-slate-800">B</p>
              <p className="text-lg text-slate-600">23.3</p>
              <p className="text-xs text-slate-400">Angstrom</p>
            </div>
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <directionalLight position={[-3, -2, 3]} intensity={0.3} color="#22d3ee" />
              <DnaHelix />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
            {/* Side icons */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              <button className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-slate-400 hover:text-coral">
                <Activity className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-slate-400 hover:text-coral">
                <FlaskConical className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-slate-400 hover:text-coral">
                <Pill className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right - Supplements */}
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 leading-tight">Your<br />Vitamin<br />Supplements</h2>
            <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card">
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {supplements.map((sup) => (
              <div key={sup.id} className={`${sup.color} rounded-2xl p-4 text-center hover:shadow-soft transition-shadow cursor-pointer`}>
                <p className="text-[10px] text-slate-400 mb-1">{sup.id}</p>
                <p className="text-xs font-bold text-slate-700 mb-0.5">{sup.name}</p>
                <p className="text-[10px] text-slate-400 mb-3">{sup.dosage}</p>
                <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-sm flex items-center justify-center">
                  <Pill className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Strip */}
      <div className="mt-6 bg-white rounded-3xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>
            <h3 className="text-sm font-semibold text-slate-700">October, 2022</h3>
            <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-3">
          {calendarData.map((day, i) => (
            <div key={i} className={`p-3 rounded-2xl ${day.active ? 'bg-orange-400 text-white' : 'bg-slate-50'}`}>
              <p className={`text-xs mb-2 ${day.active ? 'text-white/70' : 'text-slate-400'}`}>{day.label}</p>
              <p className={`text-lg font-bold mb-2 ${day.active ? 'text-white' : 'text-slate-800'}`}>{day.day}</p>
              <div className="space-y-1">
                {day.events?.map((ev, j) => (
                  <div key={j} className="flex items-center gap-1">
                    {ev.type === 'pill' && <Pill className={`w-3 h-3 ${day.active ? 'text-white/70' : 'text-cyan-500'}`} />}
                    {ev.type === 'test' && <FlaskConical className={`w-3 h-3 ${day.active ? 'text-white/70' : 'text-amber-500'}`} />}
                    {ev.type === 'advice' && <Activity className={`w-3 h-3 ${day.active ? 'text-white/70' : 'text-emerald-500'}`} />}
                    <span className={`text-[10px] ${day.active ? 'text-white/80' : 'text-slate-500'}`}>{ev.text}</span>
                    {'count' in ev && ev.count != null && (
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${day.active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>{ev.count}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
