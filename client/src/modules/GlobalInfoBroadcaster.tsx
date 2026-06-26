import React, { useState } from 'react'
import { MessageSquare, Mail, Phone, Send, CheckCircle } from 'lucide-react'

export default function GlobalInfoBroadcaster() {
  const [audience, setAudience] = useState('all')
  const [message, setMessage] = useState('')
  const [useSms, setUseSms] = useState(true)
  const [useEmail, setUseEmail] = useState(true)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const audienceOptions = [
    { value: 'all', label: 'Entire Institution', recipients: '1,240 students + 48 teachers + 18 staff' },
    { value: 'parents', label: 'All Parents/Guardians', recipients: '~1,240 parent contacts' },
    { value: 'teachers', label: 'Faculty Only', recipients: '48 teachers' },
    { value: 'students', label: 'Students Only', recipients: '1,240 students' },
    { value: 'form1', label: 'Form 1 Students', recipients: '310 students' },
    { value: 'form4', label: 'Form 4 Students', recipients: '317 students' },
  ]

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim() || (!useSms && !useEmail)) {
      alert('Please enter a message and select at least one delivery method')
      return
    }

    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Broadcasting:', {
      audience,
      message,
      useSms,
      useEmail,
    })

    setSubmitted(true)
    setMessage('')
    setLoading(false)
    
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {submitted && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-400 font-semibold">Message Broadcast Successfully!</p>
            <p className="text-sm text-green-400/80">Your message has been queued for delivery via selected channels.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="space-y-6">
        {/* Audience Selection */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Target Audience</h2>
          
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            {audienceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.recipients})
              </option>
            ))}
          </select>

          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400">
            {audienceOptions.find(o => o.value === audience)?.recipients} recipients will receive this message
          </div>
        </div>

        {/* Message Composition */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Compose Message</h2>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here. It will be sent to all selected recipients..."
            rows={6}
            className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          
          <div className="mt-2 text-slate-400 text-sm">
            {message.length} / 500 characters
          </div>
        </div>

        {/* Delivery Channels */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Delivery Channels</h2>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-700/50 rounded-lg transition">
              <input
                type="checkbox"
                checked={useEmail}
                onChange={(e) => setUseEmail(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">Email Delivery</p>
                <p className="text-slate-400 text-sm">Send via school email system</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-700/50 rounded-lg transition">
              <input
                type="checkbox"
                checked={useSms}
                onChange={(e) => setUseSms(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <Phone className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">SMS Broadcast</p>
                <p className="text-slate-400 text-sm">Send via SMS gateway</p>
              </div>
            </label>
          </div>

          {(!useSms && !useEmail) && (
            <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 text-sm">
              Please select at least one delivery channel
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading || !message.trim() || (!useSms && !useEmail)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          {loading ? 'Sending...' : 'Broadcast Message'}
        </button>
      </form>
    </div>
  )
}
