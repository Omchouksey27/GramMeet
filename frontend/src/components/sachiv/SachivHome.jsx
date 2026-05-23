import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../context/SocketContext';
import api from '../../api/axios';

export default function SachivHome() {
  const { i18n } = useTranslation();
  const { subscribeMeetingUpdates } = useSocket();
  const [stats, setStats] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    Promise.all([
      api.get('/reports/analytics'),
      api.get('/meetings?status=upcoming'),
    ]).then(([analyticsRes, meetingsRes]) => {
      setStats(analyticsRes.data);
      setUpcoming(meetingsRes.data.slice(0, 3));
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    // Real-time update — reload when any meeting changes
    const unsub = subscribeMeetingUpdates(() => load());
    return unsub;
  }, [load, subscribeMeetingUpdates]);

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-9 h-9 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-7">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-6 text-white shadow-md">
        <h2 className="text-xl font-bold">🌾 GramMeet — Sachiv Dashboard</h2>
        <p className="text-green-100 text-sm mt-1.5">
          Manage meetings, members, attendance and reports from here.
        </p>
      </div>

      {/* Summary stats */}
      {stats && (
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3">Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Meetings', value: stats.totalMeetings, color: 'bg-white', text: 'text-gray-800' },
              { label: 'Overall Attendance', value: `${stats.overallPercentage}%`, color: 'bg-blue-50', text: 'text-blue-700' },
              { label: 'Total Members', value: stats.memberAnalytics?.length || 0, color: 'bg-green-50', text: 'text-green-700' },
              {
                label: 'Defaulters',
                value: stats.memberAnalytics?.filter((m) => parseFloat(m.percentage) < 50).length || 0,
                color: 'bg-red-50',
                text: 'text-red-600',
              },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-xl border shadow-sm p-4 text-center`}>
                <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming meetings preview */}
      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-3">Next Upcoming Meetings</h3>
        {upcoming.length === 0 ? (
          <div className="bg-white rounded-xl border p-6 text-center text-gray-400 text-sm">
            No upcoming meetings. Go to Meetings tab to schedule one.
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((m) => {
              const diffMs = new Date(m.date) - new Date();
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
              const countdown =
                diffDays > 0 ? `${diffDays}d remaining`
                : diffHrs > 0 ? `${diffHrs}h remaining`
                : 'Starting soon';

              return (
                <div key={m._id} className="bg-white rounded-xl border shadow-sm p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{m.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      📅 {new Date(m.date).toLocaleString(
                        i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
                        { dateStyle: 'medium', timeStyle: 'short' }
                      )} &nbsp;|&nbsp; 📍 {m.venue}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                    {countdown}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Schedule Meeting', icon: '📅', path: '/sachiv/meetings' },
            { label: 'Add Member', icon: '👥', path: '/sachiv/members' },
            { label: 'Mark Attendance', icon: '✅', path: '/sachiv/attendance' },
            { label: 'View Reports', icon: '📄', path: '/sachiv/reports' },
          ].map(({ label, icon, path }) => (
            <a
              key={path}
              href={path}
              className="bg-white rounded-xl border shadow-sm p-4 text-center hover:border-green-400 hover:shadow-md transition cursor-pointer block"
            >
              <p className="text-2xl mb-2">{icon}</p>
              <p className="text-xs font-medium text-gray-700">{label}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}