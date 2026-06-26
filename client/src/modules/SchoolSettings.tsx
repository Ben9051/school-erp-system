import React, { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'

interface SchoolSettingsProps {
  onSchoolInfoChange: (info: any) => void
}

export default function SchoolSettings({ onSchoolInfoChange }: SchoolSettingsProps) {
  const [formData, setFormData] = useState({
    name: 'Nairobi High School',
    motto: 'Excellence Through Education',
    mission: 'To provide quality education that empowers students with knowledge, skills, and values for national development.',
    vision: 'A centre of academic excellence producing globally competitive graduates.',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    onSchoolInfoChange(formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">School Settings</h1>
        <p className="text-slate-400 mt-2">Manage school information and branding</p>
      </div>

      {submitted && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-400 font-semibold">Settings Updated Successfully!</p>
            <p className="text-sm text-green-400/80">School information has been saved.</p>
          </div>
        </div>
      )}

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
        {/* School Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">School Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-500 mt-1">This name appears in the footer and all official documents</p>
        </div>

        {/* Motto */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">School Motto</label>
          <input
            type="text"
            name="motto"
            value={formData.motto}
            onChange={handleChange}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-500 mt-1">Brief statement representing school values</p>
        </div>

        {/* Mission */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Mission Statement</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            rows={3}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="text-xs text-slate-500 mt-1">Description of the school's purpose and objectives</p>
        </div>

        {/* Vision */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Vision Statement</label>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            rows={3}
            className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="text-xs text-slate-500 mt-1">Long-term aspirations and goals of the school</p>
        </div>

        {/* Preview */}
        <div className="pt-6 border-t border-slate-700">
          <h3 className="font-semibold text-white mb-4">Preview</h3>
          <div className="bg-slate-900 p-4 rounded-lg space-y-2">
            <p className="font-bold text-blue-400">{formData.name}</p>
            <p className="text-slate-400 text-sm italic">"{formData.motto}"</p>
            <p className="text-slate-400 text-xs">Mission: {formData.mission.substring(0, 100)}...</p>
            <p className="text-slate-400 text-xs">Vision: {formData.vision.substring(0, 100)}...</p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
