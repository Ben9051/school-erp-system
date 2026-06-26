import React, { useState, useMemo } from 'react'
import { Search, Download, Filter, Calendar } from 'lucide-react'

interface User {
  id: string
  name: string
  type: 'student' | 'teacher' | 'staff'
  email: string
  phone: string
  class?: string
  department?: string
  enrollmentDate: string
}

const mockUsers: User[] = [
  { id: '1', name: 'John Kipchoge', type: 'student', email: 'john@school.com', phone: '0712345678', class: 'Form 4 East', enrollmentDate: '2022-01-15' },
  { id: '2', name: 'Alice Mwangi', type: 'student', email: 'alice@school.com', phone: '0712345679', class: 'Form 3 West', enrollmentDate: '2023-01-15' },
  { id: '3', name: 'Samuel Kipchoge', type: 'teacher', email: 'samuel@school.com', phone: '0712345680', department: 'Mathematics', enrollmentDate: '2020-01-15' },
  { id: '4', name: 'Jane Kariuki', type: 'student', email: 'jane@school.com', phone: '0712345681', class: 'Form 2 East', enrollmentDate: '2024-01-15' },
  { id: '5', name: 'Mary Omondi', type: 'teacher', email: 'mary@school.com', phone: '0712345682', department: 'English', enrollmentDate: '2019-01-15' },
]

const REPORT_TYPES = [
  { value: 'personal', label: 'Personal Profile Report' },
  { value: 'academic', label: 'Academic Performance Report' },
  { value: 'attendance', label: 'Attendance Report' },
  { value: 'conduct', label: 'Conduct/Discipline Report' },
  { value: 'finance', label: 'Financial Statement' },
  { value: 'transcript', label: 'Transcript (Students)' },
  { value: 'credentials', label: 'Credentials (Teachers)' },
  { value: 'custom', label: 'Custom Report' },
]

export default function ReportGenerator() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [reportType, setReportType] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [customFields, setCustomFields] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query)
    )
  }, [searchQuery])

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setSearchQuery('')
  }

  const handleGenerateReport = async () => {
    if (!selectedUser || !reportType) {
      alert('Please select a user and report type')
      return
    }

    setIsGenerating(true)
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const reportData = {
      user: selectedUser,
      type: reportType,
      dateRange: fromDate || toDate ? `${fromDate} to ${toDate}` : 'All time',
      customFields: customFields || 'Standard fields',
      generatedAt: new Date().toLocaleString(),
    }

    console.log('Generated Report:', reportData)
    alert(`Report Generated!\n\nType: ${reportType}\nUser: ${selectedUser.name}\n\nDownloading ${selectedUser.name}_${reportType}_${new Date().getTime()}.pdf`)
    
    setIsGenerating(false)
    setSelectedUser(null)
    setReportType('')
    setCustomFields('')
    setFromDate('')
    setToDate('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Advanced Report Generator</h1>
        <p className="text-slate-400 mt-2">Generate comprehensive reports for any user in the system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Search Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Select User</h2>
          
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="max-h-64 overflow-y-auto space-y-1">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="w-full text-left p-2 hover:bg-slate-700 rounded transition"
                    >
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-slate-400 text-xs">{user.type} • {user.email}</p>
                    </button>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm text-center py-2">No users found</p>
                )}
              </div>
            )}

            {/* Selected User Display */}
            {selectedUser && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 font-semibold text-sm">{selectedUser.name}</p>
                <p className="text-green-400/70 text-xs">{selectedUser.type.toUpperCase()}</p>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-green-400 hover:text-green-300 text-xs mt-1 underline"
                >
                  Change user
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Report Options Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Report Options</h2>
          
          <div className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-900 text-white px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select report type</option>
                {REPORT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Date Range (if not custom) */}
            {reportType !== 'custom' && reportType !== 'personal' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Date Range (Optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full bg-slate-900 text-white px-3 py-2 rounded text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">From</p>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full bg-slate-900 text-white px-3 py-2 rounded text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500 mt-1">To</p>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Fields */}
            {reportType === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Custom Fields</label>
                <textarea
                  value={customFields}
                  onChange={(e) => setCustomFields(e.target.value)}
                  placeholder="Enter comma-separated fields to include in the report..."
                  rows={3}
                  className="w-full bg-slate-900 text-white px-3 py-2 rounded text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview & Action Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Generate</h2>
          
          {selectedUser && reportType ? (
            <div className="space-y-4">
              {/* Report Preview */}
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <p className="text-white font-semibold text-sm mb-2">Report Summary</p>
                <div className="space-y-1 text-xs text-slate-300">
                  <p><span className="text-slate-400">User:</span> {selectedUser.name}</p>
                  <p><span className="text-slate-400">Type:</span> {REPORT_TYPES.find(t => t.value === reportType)?.label}</p>
                  {(fromDate || toDate) && (
                    <p><span className="text-slate-400">Range:</span> {fromDate} to {toDate}</p>
                  )}
                  <p><span className="text-slate-400">Format:</span> PDF</p>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {isGenerating ? 'Generating...' : 'Generate & Download'}
              </button>

              {/* Info */}
              <p className="text-xs text-slate-400 text-center">
                Report will be saved as PDF file to your downloads folder
              </p>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Select a user and report type to generate</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-lg font-bold text-white mb-4">Recently Generated Reports</h2>
        
        <div className="space-y-2">
          {[
            { user: 'John Kipchoge', type: 'Academic Performance', date: 'Today 2:30 PM' },
            { user: 'Alice Mwangi', type: 'Personal Profile', date: 'Today 11:15 AM' },
            { user: 'Samuel Kipchoge', type: 'Credentials', date: 'Yesterday 4:45 PM' },
            { user: 'Mary Omondi', type: 'Attendance', date: '2 days ago' },
          ].map((report, index) => (
            <div
              key={index}
              className="p-3 bg-slate-700/50 rounded-lg flex items-center justify-between hover:bg-slate-700 transition"
            >
              <div>
                <p className="text-white font-medium text-sm">{report.user}</p>
                <p className="text-slate-400 text-xs">{report.type} • {report.date}</p>
              </div>
              <Download className="w-4 h-4 text-blue-400 hover:text-blue-300 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
