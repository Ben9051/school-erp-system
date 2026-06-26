import React from 'react'

interface SchoolInfo {
  name: string
  motto: string
  mission: string
  vision: string
}

interface FooterProps {
  schoolInfo: SchoolInfo
}

export default function Footer({ schoolInfo }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 px-6 py-4 mt-8">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <div>
          <p className="font-semibold text-white">{schoolInfo.name}</p>
          <p className="text-xs text-slate-500">Motto: {schoolInfo.motto}</p>
        </div>
        <div className="text-right">
          <p className="text-xs">© 2024 School ERP System</p>
          <p className="text-xs">All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
