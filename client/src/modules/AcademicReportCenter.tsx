import React, { useState } from 'react'
import { FileText, Download, Printer } from 'lucide-react'

export default function AcademicReportCenter() {
  const [selectedReport, setSelectedReport] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')

  const masterReports = [
    { id: 'all-students', label: 'All Students in School', count: '1,240' },
    { id: 'all-teachers', label: 'All Teachers in School', count: '48' },
    { id: 'all-classes', label: 'All Classes in School', count: '16' },
    { id: 'all-staff', label: 'All Support Staff', count: '18' },
  ]

  const filterOptions = {
    form: [
      { value: 'form1', label: 'Form 1 Students', count: '310' },
      { value: 'form2', label: 'Form 2 Students', count: '295' },
      { value: 'form3', label: 'Form 3 Students', count: '318' },
      { value: 'form4', label: 'Form 4 Students', count: '317' },
    ],
    department: [
      { value: 'math', label: 'Mathematics Department', count: '8 teachers' },
      { value: 'sciences', label: 'Sciences Department', count: '12 teachers' },
      { value: 'humanities', label: 'Humanities Department', count: '18 teachers' },
      { value: 'technicals', label: 'Technicals Department', count: '10 teachers' },
    ],
  }

  const handlePrint = () => {
    if (!selectedReport) {
      alert('Please select a report to print')
      return
    }
    alert(`Printing: ${masterReports.find(r => r.id === selectedReport)?.label}`)
  }

  const handleDownload = () => {
    if (!selectedReport) {
      alert('Please select a report to download')
      return
    }
    alert(`Downloading: ${masterReports.find(r => r.id === selectedReport)?.label}`)
  }

  return (
    <div className="space-y-6">
      {/* Master Report Selection */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Master Reports</h2>
        
        <div className="space-y-2 mb-6">
          {masterReports.map(report => (
            <label
              key={report.id}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-700/50 rounded-lg transition"
            >
              <input
                type="radio"
                name="report"
                value={report.id}
                checked={selectedReport === report.id}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-4 h-4 accent-blue-600"
              />
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">{report.label}</p>
                <p className="text-slate-400 text-sm">{report.count} records</p>
              </div>
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            <Printer className="w-5 h-5" />
            Print Report
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            <Download className="w-5 h-5" />
            Download (PDF)
          </button>
        </div>
      </div>

      {/* Filtered Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students by Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Students by Form</h3>
          
          <div className="space-y-2 mb-4">
            {filterOptions.form.map(item => (
              <button
                key={item.value}
                onClick={() => alert(`Generating report: ${item.label}`)}
                className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition flex items-center justify-between group"
              >
                <div>
                  <p className="text-white font-medium group-hover:text-blue-300">{item.label}</p>
                  <p className="text-slate-400 text-sm">{item.count}</p>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Teachers by Department */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Teachers by Department</h3>
          
          <div className="space-y-2 mb-4">
            {filterOptions.department.map(item => (
              <button
                key={item.value}
                onClick={() => alert(`Generating report: ${item.label}`)}
                className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition flex items-center justify-between group"
              >
                <div>
                  <p className="text-white font-medium group-hover:text-green-300">{item.label}</p>
                  <p className="text-slate-400 text-sm">{item.count}</p>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-green-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recently Generated Reports</h2>
        
        <div className="space-y-2">
          {[
            { name: 'All Students Report', date: 'Today 10:30 AM', file: 'Students_2024.pdf' },
            { name: 'Teachers List', date: 'Yesterday 3:15 PM', file: 'Teachers_2024.pdf' },
            { name: 'Form 4 Class Report', date: '2 days ago', file: 'Form4_ClassList.pdf' },
          ].map((report, index) => (
            <div
              key={index}
              className="p-3 bg-slate-700/50 rounded-lg flex items-center justify-between hover:bg-slate-700 transition"
            >
              <div>
                <p className="text-white font-medium">{report.name}</p>
                <p className="text-slate-400 text-sm">{report.date} • {report.file}</p>
              </div>
              <Download className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
