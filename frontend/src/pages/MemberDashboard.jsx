import { Routes, Route, NavLink } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import UpcomingMeetings from '../components/member/UpcomingMeetings';
import MeetingHistory from '../components/member/MeetingHistory';
import MyAnalytics from '../components/member/MyAnalytics';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import downloadPDF from '../utils/downloadPDF';

// ─────────────────────────────────────────
// HOME — Quick overview for member
// ─────────────────────────────────────────
// function Home() {
//   const { t, i18n } = useTranslation();
//   const { user } = useAuth();
//   const [upcoming, setUpcoming] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([
//       api.get('/meetings?status=upcoming'),
//       api.get('/attendance/member'),
//     ]).then(([meetingsRes, statsRes]) => {
//       setUpcoming(meetingsRes.data.slice(0, 3));
//       setStats(statsRes.data);
//     }).finally(() => setLoading(false));
//   }, []);

//   if (loading) return (
//     <div className="flex justify-center py-12">
//       <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       {/* Welcome banner */}
//       <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-5 text-white">
//         <h2 className="text-lg font-semibold">
//           🙏 {i18n.language === 'hi' ? 'नमस्ते' : 'Welcome'}, {user?.name}
//         </h2>
//         <p className="text-green-100 text-sm mt-1 capitalize">
//           {user?.role?.replace('_', ' ')}
//           {user?.wardArea ? ` — ${user.wardArea}` : ''}
//         </p>
//       </div>

//       {/* Stats */}
//       {stats && (
//         <div className="grid grid-cols-3 gap-4">
//           <div className="bg-white rounded-xl border shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
//             <p className="text-xs text-gray-500 mt-1">{t('total_meetings')}</p>
//           </div>
//           <div className="bg-green-50 rounded-xl border border-green-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-bold text-green-700">{stats.present}</p>
//             <p className="text-xs text-gray-500 mt-1">{t('present')}</p>
//           </div>
//           <div className={`rounded-xl border shadow-sm p-4 text-center ${
//             parseFloat(stats.percentage) >= 75
//               ? 'bg-blue-50 border-blue-100'
//               : 'bg-yellow-50 border-yellow-100'
//           }`}>
//             <p className={`text-2xl font-bold ${
//               parseFloat(stats.percentage) >= 75 ? 'text-blue-700' : 'text-yellow-600'
//             }`}>
//               {stats.percentage}%
//             </p>
//             <p className="text-xs text-gray-500 mt-1">{t('my_attendance')}</p>
//           </div>
//         </div>
//       )}

//       {/* Defaulter alert */}
//       {stats && stats.absent >= 3 && (
//         <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
//           <span className="text-xl">⚠️</span>
//           <div>
//             <p className="font-semibold text-red-700 text-sm">{t('defaulters')}</p>
//             <p className="text-xs text-red-500 mt-0.5">
//               You have been absent {stats.absent} times and are marked as an attendance defaulter.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Upcoming meetings preview */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-700 mb-3">
//           {t('upcoming')} {t('meetings')}
//         </h3>
//         {upcoming.length === 0 ? (
//           <div className="bg-white rounded-xl border p-6 text-center text-gray-400 text-sm">
//             No upcoming meetings scheduled.
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {upcoming.map((m) => {
//               const diffMs = new Date(m.date) - new Date();
//               const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//               const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//               const countdown = diffDays > 0
//                 ? `${diffDays}d remaining`
//                 : diffHrs > 0
//                 ? `${diffHrs}h remaining`
//                 : 'Starting soon';

//               return (
//                 <div key={m._id} className="bg-white rounded-xl border shadow-sm p-4">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="font-medium text-gray-800">{m.title}</p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         📅 {new Date(m.date).toLocaleString(
//                           i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//                           { dateStyle: 'medium', timeStyle: 'short' }
//                         )}
//                       </p>
//                       <p className="text-xs text-gray-500">📍 {m.venue}</p>
//                     </div>
//                     <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
//                       {countdown}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

function Home() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { subscribeMeetingUpdates } = useSocket();
  const [upcoming, setUpcoming] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    Promise.all([
      api.get('/meetings?status=upcoming'),
      api.get('/attendance/member'),
    ]).then(([meetingsRes, statsRes]) => {
      setUpcoming(meetingsRes.data.slice(0, 3));
      setStats(statsRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const unsub = subscribeMeetingUpdates(() => load());
    return unsub;
  }, [load, subscribeMeetingUpdates]);

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-5 text-white">
        <h2 className="text-lg font-semibold">
          🙏 {i18n.language === 'hi' ? 'नमस्ते' : 'Welcome'}, {user?.name}
        </h2>
        <p className="text-green-100 text-sm mt-1 capitalize">
          {user?.role?.replace('_', ' ')}
          {user?.wardArea ? ` — ${user.wardArea}` : ''}
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-1">{t('total_meetings')}</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.present}</p>
            <p className="text-xs text-gray-500 mt-1">{t('present')}</p>
          </div>
          <div className={`rounded-xl border shadow-sm p-4 text-center ${
            parseFloat(stats.percentage) >= 75
              ? 'bg-blue-50 border-blue-100'
              : 'bg-yellow-50 border-yellow-100'
          }`}>
            <p className={`text-2xl font-bold ${
              parseFloat(stats.percentage) >= 75 ? 'text-blue-700' : 'text-yellow-600'
            }`}>{stats.percentage}%</p>
            <p className="text-xs text-gray-500 mt-1">{t('my_attendance')}</p>
          </div>
        </div>
      )}

      {stats && stats.absent >= 3 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-semibold text-red-700 text-sm">{t('defaulters')}</p>
            <p className="text-xs text-red-500 mt-0.5">
              You have been absent {stats.absent} times.
            </p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-3">
          {t('upcoming')} {t('meetings')}
        </h3>
        {upcoming.length === 0 ? (
          <div className="bg-white rounded-xl border p-6 text-center text-gray-400 text-sm">
            No upcoming meetings scheduled.
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((m) => {
              const diffMs = new Date(m.date) - new Date();
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
              const countdown = diffDays > 0
                ? `${diffDays}d remaining`
                : diffHrs > 0 ? `${diffHrs}h remaining` : 'Starting soon';
              return (
                <div key={m._id} className="bg-white rounded-xl border shadow-sm p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{m.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      📅 {new Date(m.date).toLocaleString(
                        i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
                        { dateStyle: 'medium', timeStyle: 'short' }
                      )} | 📍 {m.venue}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium whitespace-nowrap ml-2">
                    {countdown}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────
// MEETINGS — Tabs for upcoming + history
// ─────────────────────────────────────────
function Meetings() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('upcoming');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{t('meetings')}</h2>
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setTab('upcoming')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === 'upcoming'
              ? 'border-green-700 text-green-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          📅 {t('upcoming')}
        </button>
        <button
          onClick={() => setTab('history')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
            tab === 'history'
              ? 'border-green-700 text-green-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          📂 {t('past')}
        </button>
      </div>
      {tab === 'upcoming' ? <UpcomingMeetings /> : <MeetingHistory />}
    </div>
  );
}

// ─────────────────────────────────────────
// REPORTS — Download PDF of past meetings
// ─────────────────────────────────────────
function Reports() {
  const { t, i18n } = useTranslation();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/meetings?status=completed')
      .then(({ data }) => setMeetings(data))
      .finally(() => setLoading(false));
  }, []);

  const downloadPDF = (id) => {
    const token = localStorage.getItem('token');
    // window.open(`http://localhost:5000/api/reports/pdf/${id}?token=${token}`, '_blank');
    downloadPDF(m._id, m.title);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{t('reports')}</h2>
      <p className="text-sm text-gray-500">Download PDF reports of completed meetings.</p>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : meetings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-4xl mb-3">📄</p>
          <p className="text-gray-500 text-sm">No completed meetings yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((m) => (
            <div key={m._id} className="bg-white rounded-xl border shadow-sm p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{m.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  📅 {new Date(m.date).toLocaleDateString(
                    i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
                    { dateStyle: 'medium' }
                  )} &nbsp;|&nbsp; 📍 {m.venue}
                </p>
                {m.conclusion && (
                  <p className="text-xs text-green-600 mt-1">✓ {m.conclusion}</p>
                )}
              </div>
              <button
                onClick={() => downloadPDF(m._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition flex items-center gap-1.5"
              >
                ⬇️ {t('download_report')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────
export default function MemberDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/attendance" element={<MyAnalytics />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}