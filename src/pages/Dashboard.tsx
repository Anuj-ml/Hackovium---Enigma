import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import gsap from 'gsap'
import {
  Heart, Droplets, Footprints, Flame
} from 'lucide-react'

function DonutChart({ value, max, color, size = 140 }: { value: number; max: number; color: string; size?: number }) {
  const percentage = (value / max) * 100
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const chartRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(chartRef.current,
        { strokeDashoffset: circumference },
        { strokeDashoffset, duration: 1.5, ease: 'power3.out' }
      )
    }
  }, [])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <circle
          ref={chartRef}
          cx="60" cy="60" r="54" fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-slate-800">{value}</span>
        <span className="text-xs text-slate-400">kcal</span>
      </div>
    </div>
  )
}

function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current, { height: 0 }, { height: `${pct}%`, duration: 1, ease: 'power3.out', delay: 0.3 })
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium text-slate-500">{value}g</span>
      <div className="w-8 h-24 bg-slate-100 rounded-full relative overflow-hidden">
        <div ref={barRef} className="absolute bottom-0 w-full rounded-full" style={{ backgroundColor: color, height: 0 }} />
      </div>
      <span className="text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
    </div>
  )
}

function LineChart() {
  const data = [62, 64, 61, 65, 63, 66, 64]
  const min = Math.min(...data) - 2
  const max = Math.max(...data) + 2
  const width = 380
  const height = 120
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((d - min) / (max - min)) * height
  }))
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97066" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97066" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f97066" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#f97066" strokeWidth="2" />
            {i === 4 && (
              <g>
                <rect x={p.x - 20} y={p.y - 28} width="40" height="18" rx="6" fill="#f97066" />
                <text x={p.x} y={p.y - 15} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">{data[i]}kg</text>
              </g>
            )}
          </g>
        ))}
        {/* X-axis labels */}
        {['22 Aug', '23 Aug', '24 Aug', '25 Aug', '26 Aug', '27 Aug', '28 Aug'].map((d, i) => (
          <text key={d} x={(i / 6) * width} y={height + 20} textAnchor="middle" fill="#94a3b8" fontSize="10">{d}</text>
        ))}
      </svg>
      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" /> Highest Weight</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300" /> Lowest Weight</span>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, unit, color, delay }: { icon: any; label: string; value: string; unit: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay }
      )
    }
  }, [])

  return (
    <div ref={ref} className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-shadow cursor-default">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: color + '20' }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className="text-lg font-bold text-slate-800">{value}<span className="text-xs font-normal text-slate-400 ml-1">{unit}</span></p>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { appointments, workouts } = useApp()
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)
  const [calories] = useState({ consumed: 605, burned: 980, goal: 1200 })

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [])

  const meals = [
    { name: 'Breakfast', desc: 'Oats, banana and milk', cal: 325 },
    { name: 'Lunch', desc: 'Vegetable Salad', cal: 280 },
    { name: 'Dinner', desc: 'Chicken breast, rice', cal: 360 },
  ]

  return (
    <div className="p-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div ref={headerRef} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-coral fill-coral" /> Good Morning, Alex
          </h1>
          <p className="text-sm text-slate-400 mt-1">Here's your health overview for today</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:shadow-card transition-shadow relative"
          >
            <Bell className="w-5 h-5 text-slate-500" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-coral rounded-full border-2 border-white" />
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full overflow-hidden shadow-soft"
          >
            <img src="/avatars/user-avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Intake */}
        <div className="col-span-3 space-y-6">
          {/* Intake Counters */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Intake Counters</h2>
            <p className="text-xs text-slate-400 mb-4">Supplements Stats</p>

            {/* Meals */}
            <div className="space-y-3 mb-4">
              {meals.map((meal) => (
                <div key={meal.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{meal.name}</p>
                    <p className="text-xs text-slate-400">{meal.desc}</p>
                  </div>
                  <span className="text-sm font-semibold text-coral">{meal.cal} <span className="text-xs font-normal text-slate-400">kcal</span></span>
                </div>
              ))}
            </div>

            {/* Donut Chart */}
            <div className="flex justify-center mb-4">
              <DonutChart value={Math.round((calories.consumed / calories.goal) * 360)} max={360} color="#f97066" />
            </div>

            {/* Macro Bars */}
            <div className="flex justify-center gap-6">
              <MacroBar label="Carbs" value={124} max={200} color="#f97066" />
              <MacroBar label="Protein" value={87} max={150} color="#22d3ee" />
              <MacroBar label="Fat" value={42} max={80} color="#fbbf24" />
            </div>
          </div>
        </div>

        {/* Center Column - Activity */}
        <div className="col-span-6 space-y-6">
          {/* Workout Stats */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Activity Tracking</h2>
            <p className="text-xs text-slate-400 mb-4">Exercise analysis data</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-slate-500">Workout Statistics</span>
              <span className="text-xs text-slate-400">22 Aug - 28 Aug, 2023</span>
            </div>
            <LineChart />
          </div>

          {/* Today's Achievement */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Today's Achievement</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard icon={Heart} label="Heart Rate" value="78" unit="bpm" color="#f97066" delay={0.1} />
              <StatCard icon={Droplets} label="Water Intake" value="1250" unit="ml" color="#22d3ee" delay={0.2} />
              <StatCard icon={Footprints} label="Walking" value="4532" unit="steps" color="#a78bfa" delay={0.3} />
              <StatCard icon={Flame} label="Calorie" value="980" unit="kcal" color="#fbbf24" delay={0.4} />
            </div>
          </div>
        </div>

        {/* Right Column - Workouts & Appointments */}
        <div className="col-span-3 space-y-6">
          {/* Workouts */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Workouts</h2>
                <p className="text-xs text-slate-400">Workouts stats</p>
              </div>
            </div>
            <div className="space-y-3">
              {workouts.map((w) => (
                <div key={w.id} className={`p-4 rounded-2xl ${w.color.split(' ')[0]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs opacity-70">{w.type}</span>
                    <Flame className="w-3 h-3 opacity-50" />
                  </div>
                  <p className="font-semibold text-sm mb-1">{w.name}</p>
                  <div className="flex items-center justify-between text-xs opacity-70">
                    <span>{w.calories} kcal</span>
                    <span>{w.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Appointments</h2>
              <button onClick={() => navigate('/find-doctor')} className="text-xs text-coral font-medium hover:underline">See All</button>
            </div>
            <div className="space-y-3">
              {appointments.slice(0, 2).map((apt) => (
                <div key={apt.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  onClick={() => navigate('/chat')}>
                  <img src={apt.doctorImage} alt={apt.doctorName} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{apt.doctorName}</p>
                    <p className="text-xs text-slate-400">{apt.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-coral">{apt.time}</p>
                    <p className="text-[10px] text-slate-400">{apt.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Bell(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  )
}
