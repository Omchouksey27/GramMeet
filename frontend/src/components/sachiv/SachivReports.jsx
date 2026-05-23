import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../context/SocketContext';
import ConclusionEditor from './ConclusionEditor';
import downloadPDF from '../../utils/downloadPDF';
import api from '../../api/axios';

export default function SachivReports() {
  const { i18n } = useTranslation();
  const { subscribeMeetingUpdates } = useSocket();
  const [tab, setTab] = useState('completed');
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [completedMeetings, setCompletedMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMeeting, setEditMeeting] = useState(null);
  const [filters, setFilters] = useState({ year: '', month: '', date: '' });

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    );
    Promise.all([
      api.get(`/meetings?status=upcoming&${params}`),
      api.get(`/meetings?status=completed&${params}`),
    ]).then(([upRes, compRes]) => {
      setUpcomingMeetings(upRes.data);
      setCompletedMeetings(compRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    load();
    const unsub = subscribeMeetingUpdates(() => load());
    return unsub;
  }, [load, subscribeMeetingUpdates]);

  const currentList = tab === 'completed' ? completedMeetings : upcomingMeetings;
  const hasFilters = filters.year || filters.month || filters.date;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-800">Reports</h2>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Year</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">All Years</option>
            {[2023, 2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Month</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Specific Date</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>
        {hasFilters && (
          <button
            onClick={() => setFilters({ year: '', month: '', date: '' })}
            className="text-sm text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { key: 'completed', label: 'Completed Reports', icon: '✅', count: completedMeetings.length },
          { key: 'upcoming', label: 'Upcoming Schedules', icon: '📅', count: upcomingMeetings.length },
        ].map(({ key, label, icon, count }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
              tab === key
                ? 'border-green-700 text-green-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {icon} {label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              tab === key ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>{count}</span>
          </button>
        ))}
      </div>

      {/* Edit conclusion */}
      {editMeeting && (
        <ConclusionEditor
          meeting={editMeeting}
          onSave={async (id, conclusion, actionsTaken) => {
            await api.put(`/meetings/${id}`, { conclusion, actionsTaken });
            setEditMeeting(null);
            load();
          }}
          onCancel={() => setEditMeeting(null)}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentList.length === 0 ? (
        <div className="text-center py-14 bg-white rounded-xl border">
          <p className="text-5xl mb-3">{tab === 'completed' ? '📄' : '📅'}</p>
          <p className="text-gray-500 text-sm">
            {tab === 'completed' ? 'No completed meetings found.' : 'No upcoming meetings found.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {currentList.map((m) => (
            <div key={m._id} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{m.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    📅 {new Date(m.date).toLocaleString(
                      i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
                      { dateStyle: 'medium', timeStyle: 'short' }
                    )} &nbsp;|&nbsp; 📍 {m.venue}
                  </p>
                  {m.topics?.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">📋 {m.topics.join(', ')}</p>
                  )}
                  {m.conclusion && (
                    <p className="text-xs text-green-600 mt-1">✓ {m.conclusion}</p>
                  )}
                  {m.actionsTaken?.length > 0 && (
                    <p className="text-xs text-blue-600 mt-1">
                      ⚡ {m.actionsTaken.length} action{m.actionsTaken.length > 1 ? 's' : ''} taken
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {tab === 'completed' && (
                    <>
                      <button
                        onClick={() => setEditMeeting(m)}
                        className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                      >
                        ✏️ Update
                      </button>
                      <button
                        onClick={() => downloadPDF(m._id, m.title)}
                        className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-500 transition"
                      >
                        ⬇️ PDF
                      </button>
                    </>
                  )}
                  {tab === 'upcoming' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-lg text-center">
                      Scheduled
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}