import React, { useState } from 'react'
import { TrendingUp, Users, BookOpen, Briefcase } from 'lucide-react'

export default function OverviewDashboard() {
  // Mock data
  const stats = [
    { label: 'Total Students', value: '1,240', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Teachers', value: '48', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Support Staff', value: '18', icon: Briefcase, color: 'bg-purple-500' },
    { label: 'Classes', value: '16', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  const classDistribution = [
    { name: 'Form 1', students: 310, percentage: 25 },
    { name: 'Form 2', students: 295, percentage: 24 },
    { name: 'Form 3', students: 318, percentage: 26 },
    { name: 'Form 4', students: 317, percentage: 25 },
  ]

  return (
    <div className="space-y-8">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Population Distribution Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Student Distribution by Form</h2>
        <div className="space-y-4">
          {classDistribution.map((cls, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 font-medium">{cls.name}</span>
                <span className="text-slate-400 text-sm">{cls.percentage}% ({cls.students} students)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${cls.percentage * 2.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-3">Total Enrollment</h3>
          <p className="text-3xl font-bold text-blue-400">1,240</p>
          <p className="text-slate-400 text-sm mt-2">Across all forms</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-3">Faculty Count</h3>
          <p className="text-3xl font-bold text-green-400">48</p>
          <p className="text-slate-400 text-sm mt-2">Active teaching staff</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-3">System Status</h3>
          <p className="text-3xl font-bold text-green-500">●</p>
          <p className="text-slate-400 text-sm mt-2">All systems operational</p>
        </div>
      </div>
    </div>
  )
}
