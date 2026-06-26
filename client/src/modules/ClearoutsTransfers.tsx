import React, { useState } from 'react'
import { Search, FileText, Download, AlertCircle } from 'lucide-react'

interface StudentRecord {
  id: string
  name: string
  admissionNumber: string
  class: string
  status: 'active' | 'cleared' | 'transferred'
}

export default function ClearoutsTransfers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null)
  const [actionType, setActionType] = useState<'clearance' | 'transfer' | null>(null)
  const [reason, setReason] = useState('')

  // Mock student data
  const mockStudents: StudentRecord[] = [
    { id: '1', name: 'John Kipchoge', admissionNumber: 'ADM/2022/001', class: 'Form 4', status: 'active' },
    { id: '2', name: 'Alice Mwangi', admissionNumber: 'ADM/2022/002', class: 'Form 3', status: 'active' },
    { id: '3', name: 'Jane Kariuki', admissionNumber: 'ADM/2023/045', class: 'Form 2', status: 'cleared' },
    { id: '4', name: 'Mike Okoro', admissionNumber: 'ADM/2023/067', class: 'Form 1', status: 'transferred' },
  ]

  const filteredStudents = searchQuery
    ? mockStudents.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleSelectStudent = (student: StudentRecord) => {
    setSelectedStudent(student)
    setSearchQuery('')
  }

  const handleGenerateDocument = () => {
    if (!selectedStudent || !actionType || !reason) {
      alert('Please fill all fields')
      return
    }

    const documentType = actionType === 'clearance' ? 'Clearance Certificate' : 'Transfer Letter'
    alert(`Generated: ${documentType} for ${selectedStudent.name}`)
    
    // Reset form
    setSelectedStudent(null)
    setActionType(null)
    setReason('')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-medium">Active</span>
      case 'cleared':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">Cleared</span>
      case 'transferred':
        return <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">Transferred</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Student Lookup */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Student Lookup</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or admission number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results Dropdown */}
        {searchQuery && filteredStudents.length > 0 && (
          <div className="mb-4 p-4 bg-slate-700/50 rounded-lg space-y-2 max-h-64 overflow-y-auto">
            {filteredStudents.map(student => (
              <button
                key={student.id}
                onClick={() => handleSelectStudent(student)}
                className="w-full text-left p-2 hover:bg-slate-600 rounded transition"
              >
                <p className="text-white font-medium">{student.name}</p>
                <p className="text-slate-400 text-sm">{student.admissionNumber} • {student.class}</p>
              </button>
            ))}
          </div>
        )}

        {searchQuery && filteredStudents.length === 0 && (
          <div className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 text-sm">
            No students found matching your search
          </div>
        )}

        {/* Selected Student Display */}
        {selectedStudent && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-semibold">{selectedStudent.name}</p>
                <p className="text-slate-400 text-sm">{selectedStudent.admissionNumber} • {selectedStudent.class}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedStudent.status)}
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Panel */}
      {selectedStudent && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Process Clearance/Transfer</h2>

          <div className="space-y-4">
            {/* Action Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Action Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActionType('clearance')}
                  className={`p-3 rounded-lg transition border ${
                    actionType === 'clearance'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Issue Clearance Certificate
                </button>
                <button
                  onClick={() => setActionType('transfer')}
                  className={`p-3 rounded-lg transition border ${
                    actionType === 'transfer'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Generate Transfer Letter
                </button>
              </div>
            </div>

            {/* Reason */}
            {actionType && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {actionType === 'clearance' ? 'Clearance Reason' : 'Transfer Reason'}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    actionType === 'clearance'
                      ? 'e.g., Graduation from Form 4, etc.'
                      : 'e.g., Transfer to another school, etc.'
                  }
                  rows={4}
                  className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            )}

            {/* Generate Button */}
            {actionType && (
              <button
                onClick={handleGenerateDocument}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Generate & Download Document
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recent Documents */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Clearances & Transfers</h2>

        <div className="space-y-2">
          {[
            { student: 'John Kipchoge', type: 'Clearance', date: 'Today', doc: 'Clearance_ADM001.pdf' },
            { student: 'Mary Omondi', type: 'Transfer', date: 'Yesterday', doc: 'Transfer_ADM045.pdf' },
            { student: 'Samuel Kipkemboi', type: 'Clearance', date: '2 days ago', doc: 'Clearance_ADM067.pdf' },
          ].map((item, index) => (
            <div
              key={index}
              className="p-3 bg-slate-700/50 rounded-lg flex items-center justify-between hover:bg-slate-700 transition"
            >
              <div>
                <p className="text-white font-medium">{item.student}</p>
                <p className="text-slate-400 text-sm">{item.type} • {item.date}</p>
              </div>
              <Download className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
