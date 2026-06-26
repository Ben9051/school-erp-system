import React, { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface TeacherFormProps {
  onClose: () => void
}

const AVAILABLE_SUBJECTS = [
  'Mathematics',
  'English',
  'Chemistry',
  'Physics',
  'Biology',
  'History',
  'Geography',
  'CRE',
  'Kiswahili',
  'Computer Science',
  'Business Studies',
  'Economics',
]

const TEACHER_ROLES = [
  'General Teacher',
  'Class Teacher',
  'Head Master',
  'Deputy Head Master',
  'Examination Officer',
  'Discipline Master',
  'Sports & Welfare',
  'HOD Mathematics',
  'HOD Sciences',
  'HOD Humanities',
  'HOD Technicals',
]

export default function TeacherForm({ onClose }: TeacherFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tscNumber: '',
    idNumber: '',
    subjects: [] as string[],
    role: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.tscNumber || !formData.idNumber || !formData.role) {
      setError('Please fill all required fields')
      return
    }

    if (formData.subjects.length === 0) {
      setError('Please select at least one subject')
      return
    }

    console.log('Teacher form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Teacher Registered Successfully!</h3>
        <p className="text-slate-400">{formData.firstName} {formData.lastName} has been added to the system.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="teacher@school.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+254712345678"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">TSC Number *</label>
          <input
            type="text"
            name="tscNumber"
            value={formData.tscNumber}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="TSC/123456"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">ID Number *</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="National ID"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Teacher Role *</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select role</option>
          {TEACHER_ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Subjects to Teach * (select at least one)</label>
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_SUBJECTS.map(subject => (
            <label key={subject} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-700 rounded">
              <input
                type="checkbox"
                checked={formData.subjects.includes(subject)}
                onChange={() => toggleSubject(subject)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-slate-300">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      {formData.subjects.length > 0 && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-400">Selected: {formData.subjects.join(', ')}</p>
        </div>
      )}

      <div className="flex gap-3 pt-6">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Register Teacher
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
