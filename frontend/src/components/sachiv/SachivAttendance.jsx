import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AttendanceMarker from './AttendanceMarker';
import api from '../../api/axios';

export default function SachivAttendance() {
  const { i18n } = useTranslation();
  const [meetings, setMeetings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', month: '', year: '', search: '' });
  const [sortBy, setSortBy] = useState('date_desc');

  useEffect(() => {
    api.get('/meetings')
      .then(({ data }) => setMeetings(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = meetings.filter((m) => {
    const d = new Date(m.date);
    return (
      (filters.status ? m.status === filters.status : true) &&
      (filters.month ? d.getMonth() + 1 === parseInt(filters.month) : true) &&
      (filters.year ? d.getFullYear() === parseInt(filters.year) : true) &&
      (filters.search
        ? m.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          m.venue.toLowerCase().includes(filters.search.toLowerCase())
        : true)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date_asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'date_desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
    if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
    return 0;
  });

  const hasFilters = filters.status || filters.month || filters.year || filters.search;

  return (
    <div className="space-y-5">
      {!selected ? (
        <>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Mark Attendance</h2>
            <p className="text-sm text-gray-500 mt-0.5">Select a meeting to mark or update attendance.</p>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-4 space-y-3">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 flex-1 min-w-48 border rounded-lg px-3 py-2">
                <span className="text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search meetings..."
                  className="flex-1 text-sm outline-none bg-transparent"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                value={filters.month}
                onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              >
                <option value="">All Months</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              >
                <option value="">All Years</option>
                {[2023, 2024, 2025, 2026].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {hasFilters && (
                <button
                  onClick={() => setFilters({ status: '', month: '', year: '', search: '' })}
                  className="text-sm text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t flex-wrap">
              <span className="text-xs text-gray-500 font-medium">Sort:</span>
              {[
                { value: 'date_desc', label: '📅 Newest' },
                { value: 'date_asc', label: '📅 Oldest' },
                { value: 'title_asc', label: '🔤 A→Z' },
                { value: 'title_desc', label: '🔤 Z→A' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                    sortBy === opt.value
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <span className="text-xs text-gray-400 ml-auto">{sorted.length} meetings</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border">
              <p className="text-4xl mb-3">📅</p>
              <p className="text-gray-500 text-sm">No meetings match your filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map((m) => (
                <div
                  key={m._id}
                  onClick={() => setSelected(m)}
                  className="bg-white rounded-xl border shadow-sm p-4 cursor-pointer hover:border-green-400 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{m.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        📅 {new Date(m.date).toLocaleString(
                          i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
                          { dateStyle: 'medium', timeStyle: 'short' }
                        )} &nbsp;|&nbsp; 📍 {m.venue}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        m.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        m.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>{m.status}</span>
                      <span className="text-green-600 font-bold">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-semibold text-gray-800 text-base">{selected.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                📅 {new Date(selected.date).toLocaleString()} &nbsp;|&nbsp; 📍 {selected.venue}
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-sm border px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
            >
              ← Back
            </button>
          </div>
          <AttendanceMarker meetingId={selected._id} />
        </div>
      )}
    </div>
  );
}