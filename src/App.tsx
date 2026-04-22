import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import HealthCalendar from './pages/HealthCalendar'
import FindDoctor from './pages/FindDoctor'
import DoctorChat from './pages/DoctorChat'
import VideoCall from './pages/VideoCall'
import MedicalDashboard from './pages/MedicalDashboard'
import HealthTests from './pages/HealthTests'
import Notifications from './pages/Notifications'
import Emergency from './pages/Emergency'
import Profile from './pages/Profile'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<HealthCalendar />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/chat" element={<DoctorChat />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/medical-dashboard" element={<MedicalDashboard />} />
          <Route path="/health-tests" element={<HealthTests />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
