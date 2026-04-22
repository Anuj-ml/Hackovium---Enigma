import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import {
  Heart, Activity, Droplets,
  ChevronDown, MoreHorizontal, ArrowUpRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// ==================== 3D BODY MODEL ====================
function BodyModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15
    }
  })

  // Simplified anatomical parts as meshes
  const bodyParts = [
    // Head
    { pos: [0, 2.8, 0], scale: [0.35, 0.4, 0.35], color: '#e8a090', name: 'Head', label: 'Protein Clamp' },
    // Neck
    { pos: [0, 2.3, 0], scale: [0.15, 0.2, 0.15], color: '#d49080', name: 'Neck' },
    // Torso
    { pos: [0, 1.4, 0], scale: [0.55, 0.7, 0.35], color: '#e8a090', name: 'Torso', label: 'Between Bases' },
    // Left Arm
    { pos: [-0.75, 1.8, 0], scale: [0.15, 0.6, 0.15], color: '#d49080', name: 'Left Arm' },
    // Right Arm
    { pos: [0.75, 1.8, 0], scale: [0.15, 0.6, 0.15], color: '#d49080', name: 'Right Arm' },
    // Left Forearm
    { pos: [-0.75, 1.0, 0], scale: [0.13, 0.5, 0.13], color: '#e8a090', name: 'Left Forearm', label: 'Major Grove' },
    // Right Forearm
    { pos: [0.75, 1.0, 0], scale: [0.13, 0.5, 0.13], color: '#e8a090', name: 'Right Forearm' },
    // Hips
    { pos: [0, 0.6, 0], scale: [0.5, 0.25, 0.3], color: '#c88070', name: 'Hips' },
    // Left Thigh
    { pos: [-0.25, -0.1, 0], scale: [0.2, 0.6, 0.2], color: '#e8a090', name: 'Left Thigh', label: 'Minor Grove' },
    // Right Thigh
    { pos: [0.25, -0.1, 0], scale: [0.2, 0.6, 0.2], color: '#e8a090', name: 'Right Thigh' },
    // Left Calf
    { pos: [-0.25, -0.9, 0], scale: [0.17, 0.55, 0.17], color: '#d49080', name: 'Left Calf' },
    // Right Calf
    { pos: [0.25, -0.9, 0], scale: [0.17, 0.55, 0.17], color: '#d49080', name: 'Right Calf' },
  ]

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main body parts */}
      {bodyParts.map((part, i) => (
        <mesh
          key={i}
          position={part.pos as [number, number, number]}
          scale={part.scale as [number, number, number]}
          onPointerOver={() => setHoveredPart(part.name)}
          onPointerOut={() => setHoveredPart(null)}
        >
          <capsuleGeometry args={[1, 1, 8, 16]} />
          <meshPhysicalMaterial
            color={hoveredPart === part.name ? '#f97066' : part.color}
            roughness={0.4}
            metalness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
          />
          {part.label && (
            <Html position={[1.2, 0, 0]} center style={{ pointerEvents: 'none' }}>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span className="text-[10px] font-medium text-slate-700">{part.label}</span>
                </div>
              </div>
            </Html>
          )}
        </mesh>
      ))}

      {/* Wireframe overlay */}
      <mesh position={[0, 1.4, 0]} scale={[0.6, 0.8, 0.4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe opacity={0.1} transparent />
      </mesh>
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshBasicMaterial color="#e2e8f0" wireframe />
    </mesh>
  )
}

// ==================== MAIN PAGE ====================
export default function MedicalDashboard() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('Overview')
  const tabs = ['Overview', 'Documents', 'Message', 'Labs']

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [])

  const vitals = [
    { label: 'Blood Glucose', value: '98/56', unit: 'mg/dL', status: 'Good', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Heart Rate', value: '108', unit: 'Bpm', status: 'Normal', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
  ]

  const upcomingAppointments = [
    { time: '11:30 AM', name: 'Albert Smith', age: '08 years old', type: '01/20' },
    { time: '12:30 PM', name: 'Adilson', age: '06 years old', type: '01/20' },
  ]

  return (
    <div className="p-8 max-w-[1440px] mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
            <Activity className="w-5 h-5 text-coral" />
          </div>
          <span className="text-lg font-bold text-slate-800">Medcure</span>
        </div>
        <div className="flex items-center gap-3">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-navy text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab === 'Overview' && <Activity className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/find-doctor')} className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card">
            <span className="text-slate-500 text-lg">🔍</span>
          </button>
          <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card relative">
            <span className="text-slate-500">🔔</span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-coral rounded-full border-2 border-white" />
          </button>
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 bg-white rounded-full pl-1 pr-3 py-1 shadow-soft">
            <img src="/avatars/user-avatar.jpg" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-700">Albert Drobo</p>
              <p className="text-[10px] text-slate-400">@alexanderyuo</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Medical Dashboard</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Vitals */}
        <div className="col-span-3 space-y-4">
          {/* Blood Status */}
          <div className="bg-white rounded-3xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-medium text-slate-600">Blood Status</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-medium">Normal</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 mb-3">130<span className="text-lg text-slate-400">/80</span></p>
            {/* Heart rate line */}
            <svg viewBox="0 0 200 50" className="w-full">
              <path d="M0 25 L30 25 L40 10 L50 40 L60 25 L80 25 L90 15 L100 35 L110 25 L140 25 L150 5 L160 45 L170 25 L200 25"
                fill="none" stroke="#f97066" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Hemoglobin */}
          <div className="bg-white rounded-3xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-medium text-slate-600">Hemoglobin Level</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded-full font-medium">Normal</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 mb-3">19.3<span className="text-sm text-slate-400">/gdl</span></p>
            <svg viewBox="0 0 200 40" className="w-full">
              <path d="M0 30 Q50 10 100 20 T200 15" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="100" cy="20" r="3" fill="#22d3ee" />
            </svg>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-3xl p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Upcoming</h3>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-700">{apt.time}</p>
                    <p className="text-[10px] text-slate-400">{apt.type}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <img src={`/avatars/${i === 0 ? 'dr-jhony' : 'dr-sofia'}.jpg`} alt={apt.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-medium text-slate-700">{apt.name}</p>
                        <p className="text-[10px] text-slate-400">{apt.age}</p>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-coral">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/find-doctor')} className="w-full mt-4 py-3 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-xl text-sm font-semibold text-slate-800 flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
              Book an Appointment <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center - 3D Body */}
        <div className="col-span-5 relative">
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl shadow-soft h-[640px] relative overflow-hidden">
            <Canvas shadows camera={{ position: [0, 1, 6], fov: 35 }}>
              <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={40} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
              <directionalLight position={[-3, 3, 2]} intensity={0.4} color="#f97066" />
              <Suspense fallback={<LoadingFallback />}>
                <BodyModel />
                <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={8} blur={2} />
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>

            {/* Bottom scale */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <span className="text-xs text-slate-400 font-mono">3.8 nm</span>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-4">
          {/* Vital Cards */}
          <div className="grid grid-cols-2 gap-4">
            {vitals.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-full ${v.bg} flex items-center justify-center`}>
                    <v.icon className={`w-4 h-4 ${v.color}`} />
                  </div>
                  <button className="text-slate-300 hover:text-slate-500">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-1">{v.label}</p>
                <p className="text-xl font-bold text-slate-800">{v.value}<span className="text-xs text-slate-400 font-normal">/{v.unit}</span></p>
                <p className={`text-[10px] ${v.status === 'Good' ? 'text-emerald-500' : 'text-amber-500'} mt-1`}>- {v.status}</p>
              </div>
            ))}
          </div>

          {/* Heart Rate Gauge */}
          <div className="bg-white rounded-3xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-medium text-slate-600">Heart Rate</span>
              </div>
              <button className="text-slate-300 hover:text-slate-500">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 120" className="w-48">
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97066" />
                    <stop offset="50%" stopColor="#f97066" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                {/* Background arc */}
                <path d="M20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
                {/* Value arc */}
                <path d="M20 100 A 80 80 0 0 1 140 40" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" />
                {/* Ticks */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
                  const angle = Math.PI + (i / 8) * Math.PI
                  const x1 = 100 + 70 * Math.cos(angle)
                  const y1 = 100 + 70 * Math.sin(angle)
                  const x2 = 100 + 80 * Math.cos(angle)
                  const y2 = 100 + 80 * Math.sin(angle)
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="2" />
                })}
                {/* Heart icon */}
                <text x="100" y="75" textAnchor="middle" fontSize="16">❤️</text>
                <text x="100" y="95" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e293b">80</text>
                <text x="100" y="108" textAnchor="middle" fontSize="8" fill="#94a3b8">BPM</text>
                <text x="100" y="118" textAnchor="middle" fontSize="6" fill="#94a3b8">Normal Heart Rate</text>
              </svg>
            </div>
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> High</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Medium</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Normal</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Low</span>
            </div>
          </div>

          {/* Cardiovascular System */}
          <div className="bg-white rounded-3xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Cardiovascular System</h3>
                <p className="text-[10px] text-slate-400">Total average heart bpm</p>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-full text-[10px] font-medium text-amber-600">
                Heart Rate <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-slate-800">78</span>
              <span className="text-xs text-emerald-500 font-medium mb-1">2%</span>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 2 L10 8 L2 8 Z" fill="#10b981" /></svg>
            </div>
            <p className="text-[10px] text-slate-400 mb-4">Average BPM</p>
            {/* Bar chart */}
            <div className="flex items-end justify-between gap-2 h-20">
              {[65, 45, 80, 55, 70, 48, 75, 60, 85, 50, 72, 58].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i === 2 || i === 6 ? '#f97066' : i === 8 ? '#22d3ee' : '#e2e8f0' }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-400">
              <span>89%</span>
              <span>89%</span>
              <span>78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
