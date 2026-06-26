import React from 'react'
import {
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  ArrowRightLeft,
  ChevronLeft,
  Download,
  Settings,
} from 'lucide-react'

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: any) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ activeModule, onModuleChange, isOpen, onClose }: SidebarProps) {
  const modules = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Registries', icon: Users },
    { id: 'terms', label: 'Term Dates & Events', icon: Calendar },
    { id: 'broadcast', label: 'Info Broadcaster', icon: MessageSquare },
    { id: 'reports', label: 'Reports Center', icon: FileText },
    { id: 'advanced-reports', label: 'Report Generator', icon: Download },
    { id: 'clearouts', label: 'Clearouts & Transfers', icon: ArrowRightLeft },
    { id: 'settings', label: 'School Settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 w-64 h-screen bg-slate-800 border-r border-slate-700 p-6 transition-transform duration-300 z-50 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <button
                key={module.id}
                onClick={() => {
                  onModuleChange(module.id)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeModule === module.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{module.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="text-xs text-slate-500 text-center pt-4 border-t border-slate-700">
          School ERP Admin v1.0
        </div>
      </aside>
    </>
  )
}
