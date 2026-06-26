import React, { useState, useMemo } from 'react'
import { Search, Eye, X } from 'lucide-react'

interface User {
  id: string
  name: string
  admissionNumber: string
  class: string
  email: string
  phone: string
  type: 'student' | 'teacher' | 'staff'
  enrollmentDate: string
  status: 'active' | 'inactive'
  department?: string
}

export default function UserRegistries() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Mock data
  const mockUsers: User[] = [
    { id: '1', name: 'John Kipchoge', admissionNumber: 'ADM/2022/001', class: 'Form 4 East', email: 'john@school.com', phone: '0712345678', type: 'student', enrollmentDate: '2022-01-15', status: 'active' },
    { id: '2', name: 'Alice Mwangi', admissionNumber: 'ADM/2022/002', class: 'Form 3 West', email: 'alice@school.com', phone: '0712345679', type: 'student', enrollmentDate: '2023-01-15', status: 'active' },
    { id: '3', name: 'Mr. Samuel Kipchoge', admissionNumber: 'TSC/123456', class: 'Mathematics', email: 'samuel@school.com', phone: '0712345680', type: 'teacher', enrollmentDate: '2020-01-15', status: 'active', department: 'Sciences' },
    { id: '4', name: 'Jane Kariuki', admissionNumber: 'ADM/2023/045', class: 'Form 2 East', email: 'jane@school.com', phone: '0712345681', type: 'student', enrollmentDate: '2024-01-15', status: 'active' },
    { id: '5', name: 'Mary Omondi', admissionNumber: 'TSC/654321', class: 'English', email: 'mary@school.com', phone: '0712345682', type: 'teacher', enrollmentDate: '2019-01-15', status: 'active', department: 'Humanities' },
    { id: '6', name: 'Mr. David Kimani', admissionNumber: 'STAFF/001', class: 'General', email: 'david@school.com', phone: '0712345683', type: 'staff', enrollmentDate: '2021-06-15', status: 'active' },
  ]

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return mockUsers
    
    const query = searchQuery.toLowerCase()
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.admissionNumber.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query)
    )
  }, [searchQuery])

  const getUserBadgeColor = (type: string) => {
    switch (type) {
      case 'student':
        return 'bg-blue-500/20 text-blue-300'
      case 'teacher':
        return 'bg-green-500/20 text-green-300'
      case 'staff':
        return 'bg-purple-500/20 text-purple-300'
      default:
        return 'bg-slate-500/20 text-slate-300'
    }
  }

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? 'bg-green-500/20 text-green-300'
      : 'bg-red-500/20 text-red-300'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">User Registries</h1>
        <p className="text-slate-400 mt-2">Search and view user details</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, admission number, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Results Summary */}
      <div className="text-slate-400 text-sm">
        Found <span className="font-semibold text-white">{filteredUsers.length}</span> user(s)
      </div>

      {/* User Ledger */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Reg/Admission No.</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Class/Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className={index !== filteredUsers.length - 1 ? 'border-b border-slate-700' : ''}>
                    <td className="px-6 py-4 text-sm text-white">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{user.admissionNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{user.class}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUserBadgeColor(user.type)}`}>
                        {user.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-400 hover:text-blue-300 p-2 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                    No users found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-semibold text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Full Name</p>
                    <p className="text-white font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">User Type</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getUserBadgeColor(selectedUser.type)}`}>
                      {selectedUser.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Reg/Admission No.</p>
                    <p className="text-white font-medium">{selectedUser.admissionNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-700 pt-6">
                <h3 className="font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Phone</p>
                    <p className="text-white font-medium">{selectedUser.phone}</p>
                  </div>
                </div>
              </div>

              {/* Academic/Department Information */}
              <div className="border-t border-slate-700 pt-6">
                <h3 className="font-semibold text-white mb-4">
                  {selectedUser.type === 'student' ? 'Academic Information' : 'Department Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">{selectedUser.type === 'student' ? 'Class' : 'Class/Subject'}</p>
                    <p className="text-white font-medium">{selectedUser.class}</p>
                  </div>
                  {selectedUser.department && (
                    <div>
                      <p className="text-slate-400 text-sm">Department</p>
                      <p className="text-white font-medium">{selectedUser.department}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Enrollment Date */}
              <div className="border-t border-slate-700 pt-6">
                <p className="text-slate-400 text-sm">Enrollment Date</p>
                <p className="text-white font-medium">{new Date(selectedUser.enrollmentDate).toLocaleDateString()}</p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-slate-700 pt-6 flex gap-3">
                <button
                  onClick={() => alert(`Edit functionality for ${selectedUser.name}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Edit User
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
