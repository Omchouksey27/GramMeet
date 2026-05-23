
// import { Routes, Route } from 'react-router-dom';
// import { useSocket } from '../context/SocketContext'; 
// import Sidebar from '../components/common/Sidebar';
// import Navbar from '../components/common/Navbar';
// import AnalyticsPanel from '../components/sachiv/AnalyticsPanel';
// import MeetingForm from '../components/sachiv/MeetingForm';
// import AttendanceMarker from '../components/sachiv/AttendanceMarker';
// import MemberForm from '../components/sachiv/MemberForm';
// import DefaulterList from '../components/sachiv/DefaulterList';
// import { useTranslation } from 'react-i18next';
// import { useState, useEffect, useCallback } from 'react';
// import api from '../api/axios';
// import downloadPDF from '../utils/downloadPDF';

// // ─────────────────────────────────────────
// // CONFIRM DIALOG
// // ─────────────────────────────────────────
// function ConfirmDialog({ message, onConfirm, onCancel }) {
//   return (
//     <div style={{
//       position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
//       zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
//     }}>
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
//         <div className="text-center mb-4">
//           <span className="text-5xl">⚠️</span>
//         </div>
//         <p className="text-gray-800 font-bold text-center text-lg mb-2">Are you sure?</p>
//         <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">{message}</p>
//         <div className="flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 border border-gray-300 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500 transition"
//           >
//             Yes, Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // MEETING CARD
// // ─────────────────────────────────────────
// function MeetingCard({ m, i18n, t, onEdit, onAttendance, onStatusUpdate, onDelete }) {
//   return (
//     <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
//       <div className="flex justify-between items-start gap-4">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap">
//             <h3 className="font-semibold text-gray-800">{m.title}</h3>
//             <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//               m.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
//               m.status === 'completed' ? 'bg-green-100 text-green-700' :
//               'bg-red-100 text-red-700'
//             }`}>
//               {m.status}
//             </span>
//           </div>
//           <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
//             <span>📅 {new Date(m.date).toLocaleString(
//               i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//               { dateStyle: 'medium', timeStyle: 'short' }
//             )}</span>
//             <span>📍 {m.venue}</span>
//           </div>
//           {m.topics?.length > 0 && (
//             <p className="text-xs text-gray-400 mt-1.5">📋 {m.topics.join(', ')}</p>
//           )}
//           {m.conclusion && (
//             <p className="text-xs text-green-600 mt-1">✓ {m.conclusion}</p>
//           )}
//         </div>
//         <div className="flex flex-col gap-2 shrink-0">
//           <button onClick={() => onEdit(m)}
//             className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
//             ✏️ Edit
//           </button>
//           <button onClick={() => onAttendance(m)}
//             className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition">
//             ✅ Attendance
//           </button>
//           {m.status === 'upcoming' && (
//             <button onClick={() => onStatusUpdate(m._id, 'completed')}
//               className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition">
//               ✓ Mark Done
//             </button>
//           )}
//           <button onClick={() => onDelete(m)}
//             className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition">
//             🗑️ Remove
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // HOME — Dashboard summary
// // ─────────────────────────────────────────
// function Home() {
//   const { i18n } = useTranslation();
//   const [stats, setStats] = useState(null);
//   const [upcoming, setUpcoming] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([
//       api.get('/reports/analytics'),
//       api.get('/meetings?status=upcoming'),
//     ]).then(([analyticsRes, meetingsRes]) => {
//       setStats(analyticsRes.data);
//       setUpcoming(meetingsRes.data.slice(0, 3));
//     }).finally(() => setLoading(false));
//   }, []);

//   if (loading) return (
//     <div className="flex justify-center py-16">
//       <div className="w-9 h-9 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   return (
//     <div className="space-y-7">
//       {/* Welcome banner */}
//       <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-6 text-white shadow-md">
//         <h2 className="text-xl font-bold">🌾 GramMeet — Sachiv Dashboard</h2>
//         <p className="text-green-100 text-sm mt-1.5">
//           Manage meetings, members, attendance and reports from here.
//         </p>
//       </div>

//       {/* Summary stats */}
//       {stats && (
//         <div>
//           <h3 className="text-base font-semibold text-gray-700 mb-3">Overview</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { label: 'Total Meetings', value: stats.totalMeetings, color: 'bg-white', text: 'text-gray-800' },
//               { label: 'Overall Attendance', value: `${stats.overallPercentage}%`, color: 'bg-blue-50', text: 'text-blue-700' },
//               { label: 'Total Members', value: stats.memberAnalytics?.length || 0, color: 'bg-green-50', text: 'text-green-700' },
//               { label: 'Defaulters', value: stats.memberAnalytics?.filter(m => parseFloat(m.percentage) < 50).length || 0, color: 'bg-red-50', text: 'text-red-600' },
//             ].map((s) => (
//               <div key={s.label} className={`${s.color} rounded-xl border shadow-sm p-4 text-center`}>
//                 <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
//                 <p className="text-xs text-gray-500 mt-1">{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Upcoming meetings preview */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-700 mb-3">Next Upcoming Meetings</h3>
//         {upcoming.length === 0 ? (
//           <div className="bg-white rounded-xl border p-6 text-center text-gray-400 text-sm">
//             No upcoming meetings. Go to Meetings tab to schedule one.
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {upcoming.map((m) => {
//               const diffMs = new Date(m.date) - new Date();
//               const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//               const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//               const countdown = diffDays > 0 ? `${diffDays}d remaining`
//                 : diffHrs > 0 ? `${diffHrs}h remaining` : 'Starting soon';
//               return (
//                 <div key={m._id} className="bg-white rounded-xl border shadow-sm p-4 flex justify-between items-center">
//                   <div>
//                     <p className="font-medium text-gray-800">{m.title}</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       📅 {new Date(m.date).toLocaleString(
//                         i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//                         { dateStyle: 'medium', timeStyle: 'short' }
//                       )} &nbsp;|&nbsp; 📍 {m.venue}
//                     </p>
//                   </div>
//                   <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
//                     {countdown}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Quick actions */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           {[
//             { label: 'Schedule Meeting', icon: '📅', path: '/sachiv/meetings' },
//             { label: 'Add Member', icon: '👥', path: '/sachiv/members' },
//             { label: 'Mark Attendance', icon: '✅', path: '/sachiv/attendance' },
//             { label: 'View Reports', icon: '📄', path: '/sachiv/reports' },
//           ].map(({ label, icon, path }) => (
//             <a key={path} href={path}
//               className="bg-white rounded-xl border shadow-sm p-4 text-center hover:border-green-400 hover:shadow-md transition cursor-pointer block">
//               <p className="text-2xl mb-2">{icon}</p>
//               <p className="text-xs font-medium text-gray-700">{label}</p>
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // MEETINGS — Upcoming + Completed tabs
// // ─────────────────────────────────────────
// // function Meetings() {
// //   const { t, i18n } = useTranslation();
// //   const [tab, setTab] = useState('upcoming');
// //   const [upcomingMeetings, setUpcomingMeetings] = useState([]);
// //   const [completedMeetings, setCompletedMeetings] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editMeeting, setEditMeeting] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedMeeting, setSelectedMeeting] = useState(null);
// //   const [showAttendance, setShowAttendance] = useState(false);
// //   const [deleteTarget, setDeleteTarget] = useState(null);
// //   const [search, setSearch] = useState('');

// //   const load = () => {
// //     setLoading(true);
// //     Promise.all([
// //       api.get('/meetings?status=upcoming'),
// //       api.get('/meetings?status=completed'),
// //     ]).then(([upRes, compRes]) => {
// //       setUpcomingMeetings(upRes.data);
// //       setCompletedMeetings(compRes.data);
// //     }).finally(() => setLoading(false));
// //   };

// //   useEffect(() => { load(); }, []);

// //   const handleStatusUpdate = async (id, status) => {
// //     await api.put(`/meetings/${id}`, { status });
// //     load();
// //   };

// //   const handleDelete = async () => {
// //     await api.delete(`/meetings/${deleteTarget._id}`);
// //     setDeleteTarget(null);
// //     load();
// //   };

// //   const filterList = (list) =>
// //     list.filter((m) =>
// //       search
// //         ? m.title.toLowerCase().includes(search.toLowerCase()) ||
// //           m.venue.toLowerCase().includes(search.toLowerCase())
// //         : true
// //     );

// //   const currentList = tab === 'upcoming'
// //     ? filterList(upcomingMeetings)
// //     : filterList(completedMeetings);

// //   return (
// //     <div className="space-y-5">
// //       {deleteTarget && (
// //         <ConfirmDialog
// //           message={`This will permanently remove "${deleteTarget.title}". This action cannot be undone.`}
// //           onConfirm={handleDelete}
// //           onCancel={() => setDeleteTarget(null)}
// //         />
// //       )}

// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h2 className="text-xl font-bold text-gray-800">{t('meetings')}</h2>
// //           <p className="text-sm text-gray-500 mt-0.5">
// //             {upcomingMeetings.length} upcoming · {completedMeetings.length} completed
// //           </p>
// //         </div>
// //         <button
// //           onClick={() => { setShowForm(true); setEditMeeting(null); setShowAttendance(false); }}
// //           className="bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition"
// //         >
// //           + {t('schedule_meeting')}
// //         </button>
// //       </div>

// //       {/* Tabs */}
// //       <div className="flex gap-0 border-b">
// //         <button
// //           onClick={() => setTab('upcoming')}
// //           className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
// //             tab === 'upcoming'
// //               ? 'border-green-700 text-green-700'
// //               : 'border-transparent text-gray-500 hover:text-gray-700'
// //           }`}
// //         >
// //           📅 Upcoming
// //           <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
// //             tab === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
// //           }`}>
// //             {upcomingMeetings.length}
// //           </span>
// //         </button>
// //         <button
// //           onClick={() => setTab('completed')}
// //           className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
// //             tab === 'completed'
// //               ? 'border-green-700 text-green-700'
// //               : 'border-transparent text-gray-500 hover:text-gray-700'
// //           }`}
// //         >
// //           ✅ Completed
// //           <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
// //             tab === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
// //           }`}>
// //             {completedMeetings.length}
// //           </span>
// //         </button>
// //       </div>

// //       {/* Search */}
// //       <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 shadow-sm">
// //         <span className="text-gray-400">🔍</span>
// //         <input
// //           type="text"
// //           placeholder="Search by title or venue..."
// //           className="flex-1 text-sm outline-none bg-transparent"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         {search && (
// //           <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">✕</button>
// //         )}
// //       </div>

// //       {/* Schedule / Edit Form */}
// //       {(showForm || editMeeting) && (
// //         <div className="bg-white rounded-xl border shadow-sm p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h3 className="text-base font-semibold text-gray-700">
// //               {editMeeting ? 'Edit Meeting' : t('schedule_meeting')}
// //             </h3>
// //             <button onClick={() => { setShowForm(false); setEditMeeting(null); }}
// //               className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
// //           </div>
// //           <MeetingForm
// //             existing={editMeeting}
// //             onSuccess={() => { setShowForm(false); setEditMeeting(null); load(); }}
// //           />
// //         </div>
// //       )}

// //       {/* Attendance Panel */}
// //       {showAttendance && selectedMeeting && (
// //         <div className="bg-white rounded-xl border shadow-sm p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <div>
// //               <h3 className="font-semibold text-gray-800">{t('mark_attendance')} — {selectedMeeting.title}</h3>
// //               <p className="text-xs text-gray-500 mt-0.5">
// //                 {new Date(selectedMeeting.date).toLocaleString()} — {selectedMeeting.venue}
// //               </p>
// //             </div>
// //             <button onClick={() => { setShowAttendance(false); setSelectedMeeting(null); }}
// //               className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
// //           </div>
// //           <AttendanceMarker meetingId={selectedMeeting._id} />
// //         </div>
// //       )}

// //       {/* Empty state */}
// //       {!loading && currentList.length === 0 && (
// //         <div className="text-center py-14 bg-white rounded-xl border">
// //           <p className="text-5xl mb-3">{tab === 'upcoming' ? '📅' : '✅'}</p>
// //           <p className="text-gray-500 text-sm">
// //             {tab === 'upcoming'
// //               ? 'No upcoming meetings. Click "+ Schedule Meeting" to add one.'
// //               : 'No completed meetings yet.'}
// //           </p>
// //         </div>
// //       )}

// //       {loading ? (
// //         <div className="flex justify-center py-12">
// //           <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
// //         </div>
// //       ) : (
// //         <div className="space-y-3">
// //           {currentList.map((m) => (
// //             <MeetingCard
// //               key={m._id} m={m} i18n={i18n} t={t}
// //               onEdit={(m) => {
// //                 setEditMeeting(m); setShowForm(false); setShowAttendance(false);
// //                 window.scrollTo({ top: 0, behavior: 'smooth' });
// //               }}
// //               onAttendance={(m) => {
// //                 setSelectedMeeting(m); setShowAttendance(true);
// //                 setShowForm(false); setEditMeeting(null);
// //               }}
// //               onStatusUpdate={handleStatusUpdate}
// //               onDelete={(m) => setDeleteTarget(m)}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// function Meetings() {
//   const { t, i18n } = useTranslation();
//   const { subscribeMeetingUpdates } = useSocket();
//   const [tab, setTab] = useState('upcoming');
//   const [upcomingMeetings, setUpcomingMeetings] = useState([]);
//   const [completedMeetings, setCompletedMeetings] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editMeeting, setEditMeeting] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);
//   const [showAttendance, setShowAttendance] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [search, setSearch] = useState('');

//   const load = useCallback(() => {
//     setLoading(true);
//     Promise.all([
//       api.get('/meetings?status=upcoming'),
//       api.get('/meetings?status=completed'),
//     ]).then(([upRes, compRes]) => {
//       setUpcomingMeetings(upRes.data);
//       setCompletedMeetings(compRes.data);
//     }).catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     load();
//     const unsub = subscribeMeetingUpdates(() => load());
//     return unsub;
//   }, [load, subscribeMeetingUpdates]);

//   const handleStatusUpdate = async (id, status) => {
//     await api.put(`/meetings/${id}`, { status });
//     // No need to call load() — socket will trigger it
//   };

//   const handleDelete = async () => {
//     await api.delete(`/meetings/${deleteTarget._id}`);
//     setDeleteTarget(null);
//     // No need to call load() — socket will trigger it
//   };

//   const filterList = (list) =>
//     list.filter((m) =>
//       search
//         ? m.title.toLowerCase().includes(search.toLowerCase()) ||
//           m.venue.toLowerCase().includes(search.toLowerCase())
//         : true
//     );

//   const currentList = tab === 'upcoming'
//     ? filterList(upcomingMeetings)
//     : filterList(completedMeetings);

//   return (
//     <div className="space-y-5">
//       {deleteTarget && (
//         <ConfirmDialog
//           message={`This will permanently remove "${deleteTarget.title}". This cannot be undone.`}
//           onConfirm={handleDelete}
//           onCancel={() => setDeleteTarget(null)}
//         />
//       )}

//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">{t('meetings')}</h2>
//           <p className="text-sm text-gray-500 mt-0.5">
//             {upcomingMeetings.length} upcoming · {completedMeetings.length} completed
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             setShowForm(true);
//             setEditMeeting(null);
//             setShowAttendance(false);
//           }}
//           className="bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition"
//         >
//           + {t('schedule_meeting')}
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b">
//         {[
//           { key: 'upcoming', label: 'Upcoming', icon: '📅', count: upcomingMeetings.length },
//           { key: 'completed', label: 'Completed', icon: '✅', count: completedMeetings.length },
//         ].map(({ key, label, icon, count }) => (
//           <button
//             key={key}
//             onClick={() => setTab(key)}
//             className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
//               tab === key
//                 ? 'border-green-700 text-green-700'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//             }`}
//           >
//             {icon} {label}
//             <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
//               tab === key ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//             }`}>
//               {count}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 shadow-sm">
//         <span className="text-gray-400">🔍</span>
//         <input
//           type="text"
//           placeholder="Search by title or venue..."
//           className="flex-1 text-sm outline-none bg-transparent"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         {search && (
//           <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">✕</button>
//         )}
//       </div>

//       {/* Schedule / Edit Form */}
//       {(showForm || editMeeting) && (
//         <div className="bg-white rounded-xl border shadow-sm p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-base font-semibold text-gray-700">
//               {editMeeting ? 'Edit Meeting' : t('schedule_meeting')}
//             </h3>
//             <button
//               onClick={() => { setShowForm(false); setEditMeeting(null); }}
//               className="text-gray-400 hover:text-gray-600 text-xl"
//             >✕</button>
//           </div>
//           <MeetingForm
//             existing={editMeeting}
//             onSuccess={() => {
//               setShowForm(false);
//               setEditMeeting(null);
//               // load() not needed — socket triggers it
//             }}
//           />
//         </div>
//       )}

//       {/* Attendance Panel */}
//       {showAttendance && selectedMeeting && (
//         <div className="bg-white rounded-xl border shadow-sm p-6">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="font-semibold text-gray-800">
//                 {t('mark_attendance')} — {selectedMeeting.title}
//               </h3>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 {new Date(selectedMeeting.date).toLocaleString()} — {selectedMeeting.venue}
//               </p>
//             </div>
//             <button
//               onClick={() => { setShowAttendance(false); setSelectedMeeting(null); }}
//               className="text-gray-400 hover:text-gray-600 text-xl"
//             >✕</button>
//           </div>
//           <AttendanceMarker meetingId={selectedMeeting._id} />
//         </div>
//       )}

//       {/* Empty state */}
//       {!loading && currentList.length === 0 && (
//         <div className="text-center py-14 bg-white rounded-xl border">
//           <p className="text-5xl mb-3">{tab === 'upcoming' ? '📅' : '✅'}</p>
//           <p className="text-gray-500 text-sm">
//             {tab === 'upcoming'
//               ? 'No upcoming meetings. Click "+ Schedule Meeting" to add one.'
//               : 'No completed meetings yet.'}
//           </p>
//         </div>
//       )}

//       {/* Meetings list */}
//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {currentList.map((m) => (
//             <MeetingCard
//               key={m._id}
//               m={m}
//               i18n={i18n}
//               t={t}
//               onEdit={(m) => {
//                 setEditMeeting(m);
//                 setShowForm(false);
//                 setShowAttendance(false);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }}
//               onAttendance={(m) => {
//                 setSelectedMeeting(m);
//                 setShowAttendance(true);
//                 setShowForm(false);
//                 setEditMeeting(null);
//               }}
//               onStatusUpdate={handleStatusUpdate}
//               onDelete={(m) => setDeleteTarget(m)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // MEMBERS
// // ─────────────────────────────────────────
// function Members() {
//   const { t } = useTranslation();
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editMember, setEditMember] = useState(null);
//   const [search, setSearch] = useState('');
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const load = () => {
//     setLoading(true);
//     api.get('/members').then(({ data }) => setMembers(data)).finally(() => setLoading(false));
//   };
//   useEffect(() => { load(); }, []);

//   const handleDelete = async () => {
//     await api.delete(`/members/${deleteTarget._id}`);
//     setDeleteTarget(null);
//     load();
//   };

//   const filtered = members.filter((m) =>
//     m.name.toLowerCase().includes(search.toLowerCase()) ||
//     m.wardArea?.toLowerCase().includes(search.toLowerCase()) ||
//     m.role.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="space-y-5">
//       {deleteTarget && (
//         <ConfirmDialog
//           message={`This will permanently remove member "${deleteTarget.name}".`}
//           onConfirm={handleDelete}
//           onCancel={() => setDeleteTarget(null)}
//         />
//       )}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">{t('members')}</h2>
//           <p className="text-sm text-gray-500 mt-0.5">{members.length} total members</p>
//         </div>
//         <button onClick={() => { setShowForm(true); setEditMember(null); }}
//           className="bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition">
//           + {t('add_member')}
//         </button>
//       </div>

//       {(showForm || editMember) && (
//         <div className="bg-white rounded-xl border shadow-sm p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-base font-semibold text-gray-700">
//               {editMember ? 'Edit Member' : t('add_member')}
//             </h3>
//             <button onClick={() => { setShowForm(false); setEditMember(null); }}
//               className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
//           </div>
//           <MemberForm existing={editMember}
//             onSuccess={() => { setShowForm(false); setEditMember(null); load(); }} />
//         </div>
//       )}

//       <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 shadow-sm">
//         <span className="text-gray-400">🔍</span>
//         <input type="text" placeholder="Search by name, ward, role..."
//           className="flex-1 text-sm outline-none bg-transparent"
//           value={search} onChange={(e) => setSearch(e.target.value)} />
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : filtered.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-xl border">
//           <p className="text-4xl mb-3">👥</p>
//           <p className="text-gray-500 text-sm">No members found.</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
//               <tr>
//                 {['Name', 'Email', 'Mobile', 'Role', 'Ward Area', 'Actions'].map(h => (
//                   <th key={h} className="p-3 text-left">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((m) => (
//                 <tr key={m._id} className="border-t hover:bg-gray-50 transition">
//                   <td className="p-3 font-medium text-gray-800">{m.name}</td>
//                   <td className="p-3 text-gray-500">{m.email}</td>
//                   <td className="p-3 text-gray-500">{m.mobile}</td>
//                   <td className="p-3">
//                     <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
//                       m.role === 'sarpanch' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
//                     }`}>
//                       {m.role.replace('_', ' ')}
//                     </span>
//                   </td>
//                   <td className="p-3 text-gray-500">{m.wardArea || '—'}</td>
//                   <td className="p-3">
//                     <div className="flex gap-2">
//                       <button onClick={() => { setEditMember(m); setShowForm(false); }}
//                         className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
//                         ✏️ Edit
//                       </button>
//                       <button onClick={() => setDeleteTarget(m)}
//                         className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">
//                         🗑️ Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // ATTENDANCE — Sort + Filter
// // ─────────────────────────────────────────
// function Attendance() {
//   const { i18n } = useTranslation();
//   const [meetings, setMeetings] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ status: '', month: '', year: '', search: '' });
//   const [sortBy, setSortBy] = useState('date_desc');

//   useEffect(() => {
//     api.get('/meetings').then(({ data }) => setMeetings(data)).finally(() => setLoading(false));
//   }, []);

//   const filtered = meetings.filter((m) => {
//     const d = new Date(m.date);
//     return (
//       (filters.status ? m.status === filters.status : true) &&
//       (filters.month ? d.getMonth() + 1 === parseInt(filters.month) : true) &&
//       (filters.year ? d.getFullYear() === parseInt(filters.year) : true) &&
//       (filters.search
//         ? m.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//           m.venue.toLowerCase().includes(filters.search.toLowerCase())
//         : true)
//     );
//   });

//   const sorted = [...filtered].sort((a, b) => {
//     if (sortBy === 'date_asc') return new Date(a.date) - new Date(b.date);
//     if (sortBy === 'date_desc') return new Date(b.date) - new Date(a.date);
//     if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
//     if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
//     return 0;
//   });

//   const hasFilters = filters.status || filters.month || filters.year || filters.search;

//   return (
//     <div className="space-y-5">
//       {!selected ? (
//         <>
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">Mark Attendance</h2>
//             <p className="text-sm text-gray-500 mt-0.5">Select a meeting to mark or update attendance.</p>
//           </div>

//           <div className="bg-white rounded-xl border shadow-sm p-4 space-y-3">
//             <div className="flex flex-wrap gap-3 items-center">
//               <div className="flex items-center gap-2 flex-1 min-w-48 border rounded-lg px-3 py-2">
//                 <span className="text-gray-400 text-sm">🔍</span>
//                 <input type="text" placeholder="Search meetings..."
//                   className="flex-1 text-sm outline-none bg-transparent"
//                   value={filters.search}
//                   onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
//               </div>
//               <select className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
//                 <option value="">All Status</option>
//                 <option value="upcoming">Upcoming</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <select className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })}>
//                 <option value="">All Months</option>
//                 {Array.from({ length: 12 }, (_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(2000, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
//                 <option value="">All Years</option>
//                 {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
//               </select>
//               {hasFilters && (
//                 <button onClick={() => setFilters({ status: '', month: '', year: '', search: '' })}
//                   className="text-sm text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition">
//                   ✕ Clear
//                 </button>
//               )}
//             </div>
//             <div className="flex items-center gap-2 pt-2 border-t flex-wrap">
//               <span className="text-xs text-gray-500 font-medium">Sort:</span>
//               {[
//                 { value: 'date_desc', label: '📅 Newest' },
//                 { value: 'date_asc', label: '📅 Oldest' },
//                 { value: 'title_asc', label: '🔤 A→Z' },
//                 { value: 'title_desc', label: '🔤 Z→A' },
//               ].map((opt) => (
//                 <button key={opt.value} onClick={() => setSortBy(opt.value)}
//                   className={`text-xs px-3 py-1.5 rounded-lg border transition ${
//                     sortBy === opt.value
//                       ? 'bg-green-700 text-white border-green-700'
//                       : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
//                   }`}>
//                   {opt.label}
//                 </button>
//               ))}
//               <span className="text-xs text-gray-400 ml-auto">{sorted.length} meetings</span>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           ) : sorted.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl border">
//               <p className="text-4xl mb-3">📅</p>
//               <p className="text-gray-500 text-sm">No meetings match your filters.</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {sorted.map((m) => (
//                 <div key={m._id} onClick={() => setSelected(m)}
//                   className="bg-white rounded-xl border shadow-sm p-4 cursor-pointer hover:border-green-400 hover:shadow-md transition">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-medium text-gray-800">{m.title}</p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         📅 {new Date(m.date).toLocaleString(
//                           i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//                           { dateStyle: 'medium', timeStyle: 'short' }
//                         )} &nbsp;|&nbsp; 📍 {m.venue}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                         m.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
//                         m.status === 'completed' ? 'bg-green-100 text-green-700' :
//                         'bg-red-100 text-red-700'
//                       }`}>{m.status}</span>
//                       <span className="text-green-600 font-bold">→</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="bg-white rounded-xl border shadow-sm p-6">
//           <div className="flex justify-between items-center mb-5">
//             <div>
//               <h3 className="font-semibold text-gray-800 text-base">{selected.title}</h3>
//               <p className="text-sm text-gray-500 mt-0.5">
//                 📅 {new Date(selected.date).toLocaleString()} &nbsp;|&nbsp; 📍 {selected.venue}
//               </p>
//             </div>
//             <button onClick={() => setSelected(null)}
//               className="text-sm border px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
//               ← Back
//             </button>
//           </div>
//           <AttendanceMarker meetingId={selected._id} />
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // REPORTS — Upcoming + Completed tabs
// // ─────────────────────────────────────────
// function ConclusionEditor({ meeting, onSave, onCancel }) {
//   const [conclusion, setConclusion] = useState(meeting.conclusion || '');
//   const [actions, setActions] = useState(meeting.actionsTaken?.join('\n') || '');
//   return (
//     <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="font-semibold text-gray-800">Update — {meeting.title}</h3>
//         <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
//       </div>
//       <div>
//         <label className="text-xs font-medium text-gray-500 block mb-1">Conclusion</label>
//         <textarea className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           rows={3} value={conclusion} onChange={(e) => setConclusion(e.target.value)}
//           placeholder="Write the conclusion..." />
//       </div>
//       <div>
//         <label className="text-xs font-medium text-gray-500 block mb-1">Actions Taken (one per line)</label>
//         <textarea className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           rows={4} value={actions} onChange={(e) => setActions(e.target.value)}
//           placeholder="Road repair assigned&#10;Water supply fixed" />
//       </div>
//       <div className="flex gap-3">
//         <button
//           onClick={() => onSave(meeting._id, conclusion, actions.split('\n').filter(a => a.trim()))}
//           className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-600 transition">
//           Save
//         </button>
//         <button onClick={onCancel}
//           className="border px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// function Reports() {
//   const { i18n } = useTranslation();
//   const [tab, setTab] = useState('completed');
//   const [upcomingMeetings, setUpcomingMeetings] = useState([]);
//   const [completedMeetings, setCompletedMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editMeeting, setEditMeeting] = useState(null);
//   const [filters, setFilters] = useState({ year: '', month: '', date: '' });

//   const load = () => {
//     setLoading(true);
//     const params = new URLSearchParams(
//       Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
//     );
//     Promise.all([
//       api.get(`/meetings?status=upcoming&${params}`),
//       api.get(`/meetings?status=completed&${params}`),
//     ]).then(([upRes, compRes]) => {
//       setUpcomingMeetings(upRes.data);
//       setCompletedMeetings(compRes.data);
//     }).finally(() => setLoading(false));
//   };

//   useEffect(() => { load(); }, [filters]);

//   const downloadPDF = (id) => {
//     const token = localStorage.getItem('token');
//     // window.open(`http://localhost:5000/api/reports/pdf/${id}?token=${token}`, '_blank');
//       onClick=() => downloadPDF(m._id, m.title);
//   };

//   const currentList = tab === 'completed' ? completedMeetings : upcomingMeetings;
//   const hasFilters = filters.year || filters.month || filters.date;

//   return (
//     <div className="space-y-5">
//       <h2 className="text-xl font-bold text-gray-800">Reports</h2>

//       {/* Filter bar */}
//       <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-wrap gap-3 items-end">
//         <div>
//           <label className="text-xs text-gray-500 block mb-1">Year</label>
//           <select className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
//             <option value="">All Years</option>
//             {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
//           </select>
//         </div>
//         <div>
//           <label className="text-xs text-gray-500 block mb-1">Month</label>
//           <select className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })}>
//             <option value="">All Months</option>
//             {Array.from({ length: 12 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {new Date(2000, i).toLocaleString('default', { month: 'long' })}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="text-xs text-gray-500 block mb-1">Specific Date</label>
//           <input type="date"
//             className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
//         </div>
//         {hasFilters && (
//           <button onClick={() => setFilters({ year: '', month: '', date: '' })}
//             className="text-sm text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition">
//             ✕ Clear
//           </button>
//         )}
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-0 border-b">
//         <button onClick={() => setTab('completed')}
//           className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
//             tab === 'completed' ? 'border-green-700 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'
//           }`}>
//           ✅ Completed Reports
//           <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
//             tab === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//           }`}>{completedMeetings.length}</span>
//         </button>
//         <button onClick={() => setTab('upcoming')}
//           className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
//             tab === 'upcoming' ? 'border-green-700 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'
//           }`}>
//           📅 Upcoming Schedules
//           <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
//             tab === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//           }`}>{upcomingMeetings.length}</span>
//         </button>
//       </div>

//       {/* Edit conclusion */}
//       {editMeeting && (
//         <ConclusionEditor
//           meeting={editMeeting}
//           onSave={async (id, conclusion, actionsTaken) => {
//             await api.put(`/meetings/${id}`, { conclusion, actionsTaken });
//             setEditMeeting(null);
//             load();
//           }}
//           onCancel={() => setEditMeeting(null)}
//         />
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : currentList.length === 0 ? (
//         <div className="text-center py-14 bg-white rounded-xl border">
//           <p className="text-5xl mb-3">{tab === 'completed' ? '📄' : '📅'}</p>
//           <p className="text-gray-500 text-sm">
//             {tab === 'completed' ? 'No completed meetings found.' : 'No upcoming meetings found.'}
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {currentList.map((m) => (
//             <div key={m._id} className="bg-white rounded-xl border shadow-sm p-5">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-800">{m.title}</h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     📅 {new Date(m.date).toLocaleString(
//                       i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//                       { dateStyle: 'medium', timeStyle: 'short' }
//                     )} &nbsp;|&nbsp; 📍 {m.venue}
//                   </p>
//                   {m.topics?.length > 0 && (
//                     <p className="text-xs text-gray-400 mt-1">📋 {m.topics.join(', ')}</p>
//                   )}
//                   {m.conclusion && (
//                     <p className="text-xs text-green-600 mt-1">✓ {m.conclusion}</p>
//                   )}
//                   {m.actionsTaken?.length > 0 && (
//                     <p className="text-xs text-blue-600 mt-1">
//                       ⚡ {m.actionsTaken.length} action{m.actionsTaken.length > 1 ? 's' : ''} taken
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-2 ml-4">
//                   {tab === 'completed' && (
//                     <>
//                       <button onClick={() => setEditMeeting(m)}
//                         className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
//                         ✏️ Update
//                       </button>
//                       <button onClick={() => downloadPDF(m._id)}
//                         className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-500 transition">
//                         ⬇️ PDF
//                       </button>
//                     </>
//                   )}
//                   {tab === 'upcoming' && (
//                     <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-lg text-center">
//                       Scheduled
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // TEAM — Team members + Developer section
// // ─────────────────────────────────────────
// function Team() {
//   const teamMembers = [
//     {
//       name: 'Lavkesh Chouksey',
//       designation: 'Sachiv (Secretary)',
//       description: 'Manages all gram panchayat meetings, records, attendance and official documentation.',
//       avatar: 'https://scontent.fidr1-2.fna.fbcdn.net/v/t39.30808-6/504373419_3186288658194138_6329434379893574036_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VHkd8LOH2o0Q7kNvwEZeBVi&_nc_oc=Adrju3IvzVFoUhgPYxlwlLaJVSfPTKnlv_OTpcpEcAzsieWJnu7Tf8QKGU1_6l7n5gvYHD20-PW4R3pp0DPa0EPt&_nc_zt=23&_nc_ht=scontent.fidr1-2.fna&_nc_gid=oCRT-5Yl9CqhyebzYx-y-g&_nc_ss=7b2a8&oh=00_Af5KsnFL-B7RrjS4ffQNvhavghy7cM92njK1zMciMP2B2g&oe=6A12F44C',
//       role: 'sachiv',
//       badge: '🏛️',
//     },
//     {
//       name: 'Shrashti Devi',
//       designation: 'Sarpanch (Village Head)',
//       description: 'Elected head of the Gram Panchayat. Presides over all gram sabha meetings and decisions.',
//       avatar: 'https://scontent.fidr1-1.fna.fbcdn.net/v/t39.30808-1/460156364_1730511227685984_3726225591327570918_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=s6-XPz8_JLwQ7kNvwEogLub&_nc_oc=Adr6mnBqQKpVVbWrwfirTb6UrEfS5eXGdFjMdbrTHA9C1hapW05fmuifp3g8r90p0e1LhAU3uPlGam2IXJFDvFSU&_nc_zt=24&_nc_ht=scontent.fidr1-1.fna&_nc_gid=hJInbGQcsrIrWXFAx15j1g&_nc_ss=7b2a8&oh=00_Af4I51U6IyS_cL5FGhPhYfiHMn-wgZ6cNSF5et9Gl6CYpA&oe=6A12EC6B',
//       role: 'sarpanch',
//       badge: '👑',
//     },
//     {
//       name: 'Raju Prasad',
//       designation: 'Ward Member — Ward 1',
//       description: 'Elected representative of Ward 1. Raises local issues in gram sabha and works for ward development.',
//       avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Raju+Prasad&backgroundColor=0369a1&fontFamily=Arial&fontSize=38',
//       role: 'ward_member',
//       badge: '🏘️',
//     },
//   ];

//   return (
//     <div className="space-y-10">
//       {/* Team header */}
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Our Team</h2>
//         <p className="text-sm text-gray-500 mt-2">
//           Meet the people who manage and run the Gram Panchayat
//         </p>
//       </div>

//       {/* Team cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {teamMembers.map((member) => (
//           <div key={member.name}
//             className="bg-white rounded-2xl border shadow-sm p-6 text-center hover:shadow-lg transition group">
//             <div className="relative inline-block mb-4">
//               <img
//                 src={member.avatar}
//                 alt={member.name}
//                 className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md group-hover:scale-105 transition"
//               />
//               <span className="absolute bottom-0 right-0 text-2xl">{member.badge}</span>
//             </div>
//             <h3 className="font-bold text-gray-800 text-base">{member.name}</h3>
//             <p className={`text-xs font-semibold mt-1 px-3 py-1 rounded-full inline-block ${
//               member.role === 'sachiv'
//                 ? 'bg-green-100 text-green-700'
//                 : member.role === 'sarpanch'
//                 ? 'bg-purple-100 text-purple-700'
//                 : 'bg-blue-100 text-blue-700'
//             }`}>
//               {member.designation}
//             </p>
//             <p className="text-xs text-gray-500 mt-3 leading-relaxed">{member.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Divider */}
//       <div className="flex items-center gap-4">
//         <div className="flex-1 h-px bg-gray-200"></div>
//         <span className="text-xs text-gray-400 uppercase tracking-widest">Developer</span>
//         <div className="flex-1 h-px bg-gray-200"></div>
//       </div>

//       {/* Developer section */}
//       <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 rounded-2xl p-8 text-white shadow-lg">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           {/* Developer photo */}
//           <div className="shrink-0">
//             <div className="relative">
//               <img
//                 src="https://media.licdn.com/dms/image/v2/D4D03AQH2SZisOZ8EoA/profile-displayphoto-shrink_400_400/B4DZU9Cyv.HkAg-/0/1740485900333?e=1781136000&v=beta&t=I7QNfPn9kV1eUKsb2GUnzHZLKQF51mRTtyE4WIL2o5E"
//                 alt="Om Chouksey"
//                 className="w-32 h-32 rounded-2xl border-4 border-white/30 shadow-xl"
//               />
//               <span className="absolute -bottom-2 -right-2 bg-white text-green-700 text-lg rounded-xl px-2 py-0.5 shadow font-bold">
//                 👨‍💻
//               </span>
//             </div>
//           </div>

//           {/* Developer info */}
//           <div className="flex-1 text-center md:text-left">
//             <div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
//               Full Stack Developer
//             </div>
//             <h3 className="text-2xl font-bold">Om Chouksey</h3>
//             <p className="text-green-200 text-sm mt-1">
//               Developer & Designer of GramMeet
//             </p>
//             <p className="text-green-100 text-sm mt-3 leading-relaxed max-w-lg">
//               Passionate about building digital solutions for rural governance.
//               GramMeet is designed to bring transparency and efficiency
//               to Gram Panchayat meetings across India.
//             </p>

//             {/* Tech stack badges */}
//             <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
//               {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Socket.io'].map((tech) => (
//                 <span key={tech}
//                   className="bg-white/15 text-white text-xs px-3 py-1 rounded-full border border-white/20">
//                   {tech}
//                 </span>
//               ))}
//             </div>

//             {/* Contact links */}
//             <div className="flex gap-3 mt-5 justify-center md:justify-start">
//               <a href="mailto:omchouksey27@gmail.com"
//                 className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition text-white text-xs px-4 py-2 rounded-xl">
//                 📧 omchouksey27@gmail.com
//               </a>
//               <a href="tel:9753481900"
//                 className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition text-white text-xs px-4 py-2 rounded-xl">
//                 📱 9753481900
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Footer note */}
//         <div className="mt-8 pt-6 border-t border-white/20 text-center">
//           <p className="text-green-200 text-xs">
//             🌾 GramMeet — Digitizing Gram Panchayat Meetings for a Better India &nbsp;|&nbsp;
//             Built with ❤️ for rural governance
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // MAIN EXPORT
// // ─────────────────────────────────────────
// export default function SachivDashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden min-w-0">
//         <Navbar />
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/meetings" element={<Meetings />} />
//             <Route path="/members" element={<Members />} />
//             <Route path="/attendance" element={<Attendance />} />
//             <Route path="/analytics" element={<AnalyticsPanel />} />
//             <Route path="/reports" element={<Reports />} />
//             <Route path="/defaulters" element={<DefaulterList />} />
//             <Route path="/team" element={<Team />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import SachivHome from '../components/sachiv/SachivHome';
import SachivMeetings from '../components/sachiv/SachivMeetings';
import SachivMembers from '../components/sachiv/SachivMembers';
import SachivAttendance from '../components/sachiv/SachivAttendance';
import SachivReports from '../components/sachiv/SachivReports';
import SachivTeam from '../components/sachiv/SachivTeam';
import AnalyticsPanel from '../components/sachiv/AnalyticsPanel';
import DefaulterList from '../components/sachiv/DefaulterList';

export default function SachivDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/"           element={<SachivHome />} />
            <Route path="/meetings"   element={<SachivMeetings />} />
            <Route path="/members"    element={<SachivMembers />} />
            <Route path="/attendance" element={<SachivAttendance />} />
            <Route path="/analytics"  element={<AnalyticsPanel />} />
            <Route path="/reports"    element={<SachivReports />} />
            <Route path="/defaulters" element={<DefaulterList />} />
            <Route path="/team"       element={<SachivTeam />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}