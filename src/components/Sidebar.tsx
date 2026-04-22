import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  MessageCircle,
  Video,
  HeartPulse,
  FlaskConical,
  Bell,
  Phone,
  UserCircle,
  Activity,
} from 'lucide-react'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { path: '/find-doctor', icon: Stethoscope, label: 'Doctors' },
  { path: '/chat', icon: MessageCircle, label: 'Chat' },
  { path: '/video-call', icon: Video, label: 'Video Call' },
  { path: '/medical-dashboard', icon: HeartPulse, label: 'Vitals' },
  { path: '/health-tests', icon: FlaskConical, label: 'Lab Tests' },
  { path: '/notifications', icon: Bell, label: 'Alerts' },
  { path: '/emergency', icon: Phone, label: 'Emergency' },
  { path: '/profile', icon: UserCircle, label: 'Profile' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { unreadCount } = useApp()

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-navy flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-rose-400 flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group ${
                isActive
                  ? 'bg-coral text-white shadow-coral'
                  : 'text-slate-400 hover:text-white hover:bg-navy-light'
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
              {item.path === '/notifications' && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              {/* Tooltip */}
              <span className="absolute left-14 bg-navy-dark text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* User Avatar */}
      <div className="mt-auto">
        <img
          src="/avatars/user-avatar.jpg"
          alt="User"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-coral/30"
        />
      </div>
    </aside>
  )
}
