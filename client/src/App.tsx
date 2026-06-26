import React, { useState } from 'react'
import {
  LogOut,
  Plus,
  Menu,
  X
} from 'lucide-react'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import OverviewDashboard from './modules/OverviewDashboard'
import UserRegistries from './modules/UserRegistries'
import TermDatesScheduling from './modules/TermDatesScheduling'
import GlobalInfoBroadcaster from './modules/GlobalInfoBroadcaster'
import AcademicReportCenter from './modules/AcademicReportCenter'
import ClearoutsTransfers from './modules/ClearoutsTransfers'
import SchoolSettings from './modules/SchoolSettings'
import ReportGenerator from './modules/ReportGenerator'
import AddUserModal from './components/AddUserModal'

interface MockUser {
  email: string
  role: 'admin' | 'teacher' | 'student'
  title: string
}

interface SchoolInfo {
  name: string
  motto: string
  mission: string
  vision: string
}

type ModuleType =
  | 'overview'
  | 'users'
  | 'terms'
  | 'broadcast'
  | 'reports'
  | 'clearouts'
  | 'advanced-reports'
  | 'settings'

export default function App() {
  const [user] = useState<MockUser>({
    email: 'admin009@school.com',
    role: 'admin',
    title: 'Head Administrator'
  })

  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: 'Nairobi High School',
    motto: 'Excellence Through Education',
    mission: 'To provide quality education that empowers students with knowledge, skills, and values for national development.',
    vision: 'A centre of academic excellence producing globally competitive graduates.',
  })

  const [activeModule, setActiveModule] = useState<ModuleType>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showAddUserModal, setShowAddUserModal] = useState(false)

  const handleLogout = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-400 hover:text-white p-2 lg:hidden"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-white">School ERP Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
                Add New User
              </button>
              <div className="text-sm text-slate-400">
                {user.email} • <span className="text-yellow-400 font-semibold">{user.role.toUpperCase()}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 p-2 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dynamic Module Content */}
          <div className="flex-1 overflow-auto p-6">
            {activeModule === 'overview' && <OverviewDashboard />}
            {activeModule === 'users' && <UserRegistries />}
            {activeModule === 'terms' && <TermDatesScheduling />}
            {activeModule === 'broadcast' && <GlobalInfoBroadcaster />}
            {activeModule === 'reports' && <AcademicReportCenter />}
            {activeModule === 'clearouts' && <ClearoutsTransfers />}
            {activeModule === 'advanced-reports' && <ReportGenerator />}
            {activeModule === 'settings' && <SchoolSettings onSchoolInfoChange={setSchoolInfo} />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer schoolInfo={schoolInfo} />

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUserModal onClose={() => setShowAddUserModal(false)} />
      )}
    </div>
  )
}
