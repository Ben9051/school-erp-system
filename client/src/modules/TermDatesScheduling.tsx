import React, { useState } from 'react'
import { Calendar, Plus, Trash2 } from 'lucide-react'

interface SchoolEvent {
  id: string
  name: string
  date: string
}

export default function TermDatesScheduling() {
  const [termStart, setTermStart] = useState('2024-01-15')
  const [termEnd, setTermEnd] = useState('2024-04-12')
  const [events, setEvents] = useState<SchoolEvent[]>([
    { id: '1', name: 'Sports Day', date: '2024-02-10' },
    { id: '2', name: 'Mid-Term AGM', date: '2024-02-20' },
    { id: '3', name: 'Prize Giving', date: '2024-04-10' },
  ])
  const [newEventName, setNewEventName] = useState('')
  const [newEventDate, setNewEventDate] = useState('')

  const handleAddEvent = () => {
    if (!newEventName || !newEventDate) return
    
    const newEvent: SchoolEvent = {
      id: Date.now().toString(),
      name: newEventName,
      date: newEventDate,
    }
    
    setEvents([...events, newEvent])
    setNewEventName('')
    setNewEventDate('')
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-8">
      {/* Term Date Configuration */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Academic Term Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Term Commencing Date</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={termStart}
                onChange={(e) => setTermStart(e.target.value)}
                className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Term Closing Date</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={termEnd}
                onChange={(e) => setTermEnd(e.target.value)}
                className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-400">
            Current term: <span className="font-semibold">{termStart}</span> to <span className="font-semibold">{termEnd}</span>
          </p>
        </div>
      </div>

      {/* Event Logging Panel */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Event Calendar</h2>

        {/* Add Event Form */}
        <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
          <h3 className="font-medium text-white mb-4">Add New Event</h3>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Event name"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-2">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{event.name}</p>
                    <p className="text-slate-400 text-sm">{event.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-400 hover:text-red-300 p-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-center py-4">No events scheduled</p>
          )}
        </div>
      </div>
    </div>
  )
}
