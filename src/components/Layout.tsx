import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f1f4f7]">
      <Sidebar />
      <main className="flex-1 ml-20">
        <Outlet />
      </main>
    </div>
  )
}
