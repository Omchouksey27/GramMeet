// import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function MeetingHistory() {
//   const { t, i18n } = useTranslation();
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(null);
//   const [attendanceMap, setAttendanceMap] = useState({});

//   useEffect(() => {
//     api.get('/meetings?status=completed')
//       .then(({ data }) => setMeetings(data))
//       .finally(() => setLoading(false));
//   }, []);

//   const toggleExpand = async (meetingId) => {
//     if (expanded === meetingId) {
//       setExpanded(null);
//       return;
//     }
//     setExpanded(meetingId);
//     if (!attendanceMap[meetingId]) {
//       const { data } = await api.get(`/attendance/meeting/${meetingId}`);
//       setAttendanceMap((prev) => ({ ...prev, [meetingId]: data }));
//     }
//   };

//   const downloadPDF = (meetingId) => {
//     const token = localStorage.getItem('token');
//     window.open(`http://localhost:5000/api/reports/pdf/${meetingId}?token=${token}`, '_blank');
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center py-12">
//       <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   if (meetings.length === 0) return (
//     <div className="text-center py-12 text-gray-400">
//       <p className="text-4xl mb-3">📂</p>
//       <p className="text-sm">No past meetings found</p>
//     </div>
//   );

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold text-gray-800">{t('past')} {t('meetings')}</h2>
//       {meetings.map((m) => {
//         const isOpen = expanded === m._id;
//         const attendance = attendanceMap[m._id] || [];
//         const present = attendance.filter((a) => a.status === 'present').length;
//         const pct = attendance.length
//           ? ((present / attendance.length) * 100).toFixed(0)
//           : null;

//         return (
//           <div key={m._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//             <div
//               className="p-5 cursor-pointer hover:bg-gray-50 transition"
//               onClick={() => toggleExpand(m._id)}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-800">{m.title}</h3>
//                   <div className="flex flex-wrap gap-3 mt-2">
//                     <span className="text-xs text-gray-500 flex items-center gap-1">
//                       📅 {new Date(m.date).toLocaleDateString(
//                         i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//                         { dateStyle: 'medium' }
//                       )}
//                     </span>
//                     <span className="text-xs text-gray-500 flex items-center gap-1">
//                       📍 {m.venue}
//                     </span>
//                     {pct !== null && (
//                       <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
//                         parseInt(pct) >= 75 ? 'bg-green-100 text-green-700' :
//                         parseInt(pct) >= 50 ? 'bg-yellow-100 text-yellow-700' :
//                         'bg-red-100 text-red-700'
//                       }`}>
//                         {t('attendance')}: {pct}%
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 ml-4">
//                   <button
//                     onClick={(e) => { e.stopPropagation(); downloadPDF(m._id); }}
//                     className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-500 transition"
//                   >
//                     {t('download_report')}
//                   </button>
//                   <span className="text-gray-400 text-lg">{isOpen ? '▲' : '▼'}</span>
//                 </div>
//               </div>
//             </div>

//             {isOpen && (
//               <div className="border-t px-5 py-4 bg-gray-50 space-y-3">
//                 {m.topics?.length > 0 && (
//                   <div>
//                     <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('topic')}</p>
//                     <ul className="space-y-1">
//                       {m.topics.map((topic, i) => (
//                         <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
//                           <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                           {topic}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {m.conclusion && (
//                   <div>
//                     <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('conclusion')}</p>
//                     <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border">{m.conclusion}</p>
//                   </div>
//                 )}

//                 {m.actionsTaken?.length > 0 && (
//                   <div>
//                     <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('actions_taken')}</p>
//                     <ul className="space-y-1">
//                       {m.actionsTaken.map((action, i) => (
//                         <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
//                           <span className="text-green-600">✓</span>
//                           {action}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {attendance.length > 0 && (
//                   <div>
//                     <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('attendance')}</p>
//                     <div className="grid grid-cols-2 gap-2">
//                       {attendance.map((a) => (
//                         <div key={a._id} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
//                           a.status === 'present' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
//                         }`}>
//                           <span>{a.status === 'present' ? '✓' : '✗'}</span>
//                           <span>{a.member?.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../context/SocketContext';
import api from '../../api/axios';

export default function MeetingHistory() {
  const { t, i18n } = useTranslation();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [attendanceMap, setAttendanceMap] = useState({});
  const { subscribeMeetingUpdates } = useSocket();

  const load = useCallback(() => {
    api.get('/meetings?status=completed')
      .then(({ data }) => setMeetings(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const unsub = subscribeMeetingUpdates(() => load());
    return unsub;
  }, [load, subscribeMeetingUpdates]);

  const toggleExpand = async (meetingId) => {
    if (expanded === meetingId) { setExpanded(null); return; }
    setExpanded(meetingId);
    if (!attendanceMap[meetingId]) {
      const { data } = await api.get(`/attendance/meeting/${meetingId}`);
      setAttendanceMap((prev) => ({ ...prev, [meetingId]: data }));
    }
  };

  const handleDownload = async (meetingId, meetingTitle) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/reports/pdf/${meetingId}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `meeting-${meetingTitle}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('PDF download failed: ' + err.message);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (meetings.length === 0) return (
    <div className="text-center py-12 text-gray-400">
      <p className="text-4xl mb-3">📂</p>
      <p className="text-sm">No past meetings found</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{t('past')} {t('meetings')}</h2>
      {meetings.map((m) => {
        const isOpen = expanded === m._id;
        const attendance = attendanceMap[m._id] || [];
        const present = attendance.filter((a) => a.status === 'present').length;
        const pct = attendance.length ? ((present / attendance.length) * 100).toFixed(0) : null;

        return (
          <div key={m._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 cursor-pointer hover:bg-gray-50 transition" onClick={() => toggleExpand(m._id)}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{m.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      📅 {new Date(m.date).toLocaleDateString(
                        i18n.language === 'hi' ? 'hi-IN' : 'en-IN', { dateStyle: 'medium' }
                      )}
                    </span>
                    <span className="text-xs text-gray-500">📍 {m.venue}</span>
                    {pct !== null && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        parseInt(pct) >= 75 ? 'bg-green-100 text-green-700' :
                        parseInt(pct) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {t('attendance')}: {pct}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDownload(m._id, m.title); }}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-500 transition"
                  >
                    ⬇️ PDF
                  </button>
                  <span className="text-gray-400 text-lg">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
            </div>

            {isOpen && (
              <div className="border-t px-5 py-4 bg-gray-50 space-y-3">
                {m.topics?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('topic')}</p>
                    <ul className="space-y-1">
                      {m.topics.map((topic, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>{topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {m.conclusion && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('conclusion')}</p>
                    <p className="text-sm text-gray-700 bg-white rounded-lg p-3 border">{m.conclusion}</p>
                  </div>
                )}
                {m.actionsTaken?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('actions_taken')}</p>
                    <ul className="space-y-1">
                      {m.actionsTaken.map((action, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="text-green-600">✓</span>{action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {attendance.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('attendance')}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {attendance.map((a) => (
                        <div key={a._id} className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                          a.status === 'present' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                        }`}>
                          <span>{a.status === 'present' ? '✓' : '✗'}</span>
                          <span>{a.member?.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}