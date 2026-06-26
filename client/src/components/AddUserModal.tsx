import React, { useState } from 'react'
import { X } from 'lucide-react'
import StudentForm from './forms/StudentForm'
import TeacherForm from './forms/TeacherForm'
import WorkerForm from './forms/WorkerForm'

interface AddUserModalProps {
  onClose: () => void
}

type UserType = 'student' | 'teacher' | 'worker' | null

export default function AddUserModal({ onClose }: AddUserModalProps) {
  const [userType, setUserType] = useState<UserType>(null)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800">
          <h2 className="text-2xl font-bold text-white">Add New User</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!userType ? (
            <div className="space-y-4">
              <p className="text-slate-400 mb-6">Select the type of user to register:</p>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setUserType('student')}
                  className="p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition text-left"
                >
                  <h3 className="font-semibold text-white">👤 Student</h3>
                  <p className="text-sm text-slate-400">Register a new student</p>
                </button>
                <button
                  onClick={() => setUserType('teacher')}
                  className="p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition text-left"
                >
                  <h3 className="font-semibold text-white">📚 Teacher</h3>
                  <p className="text-sm text-slate-400">Register a new teacher</p>
                </button>
                <button
                  onClick={() => setUserType('worker')}
                  className="p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition text-left"
                >
                  <h3 className="font-semibold text-white">🛠️ Support Staff</h3>
                  <p className="text-sm text-slate-400">Register support staff (cook, gateman, etc.)</p>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setUserType(null)}
                className="text-blue-400 hover:text-blue-300 text-sm mb-4 flex items-center gap-1"
              >
                ← Back to Selection
              </button>
              {userType === 'student' && <StudentForm onClose={onClose} />}
              {userType === 'teacher' && <TeacherForm onClose={onClose} />}
              {userType === 'worker' && <WorkerForm onClose={onClose} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
