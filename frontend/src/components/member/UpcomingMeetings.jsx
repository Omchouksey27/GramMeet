// import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function UpcomingMeetings() {
//   const { t, i18n } = useTranslation();
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/meetings?status=upcoming')
//       .then(({ data }) => setMeetings(data))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return (
//     <div className="flex items-center justify-center py-12">
//       <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );

//   if (meetings.length === 0) return (
//     <div className="text-center py-12 text-gray-400">
//       <p className="text-4xl mb-3">📅</p>
//       <p className="text-sm">No upcoming meetings scheduled</p>
//     </div>
//   );

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold text-gray-800">{t('upcoming')} {t('meetings')}</h2>
//       {meetings.map((m) => {
//         const meetingDate = new Date(m.date);
//         const now = new Date();
//         const diffMs = meetingDate - now;
//         const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//         const diffDays = Math.floor(diffHrs / 24);

//         let countdown = '';
//         if (diffDays > 0) countdown = `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
//         else if (diffHrs > 0) countdown = `${diffHrs} hour${diffHrs > 1 ? 's' : ''} remaining`;
//         else countdown = 'Starting soon';

//         return (
//           <div key={m._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-800 text-base">{m.title}</h3>
//                 <div className="mt-2 space-y-1">
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <span>📅</span>
//                     <span>
//                       {meetingDate.toLocaleString(
//                         i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
//                         { dateStyle: 'full', timeStyle: 'short' }
//                       )}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <span>📍</span>
//                     <span>{m.venue}</span>
//                   </div>
//                   {m.topics?.length > 0 && (
//                     <div className="flex items-start gap-2 text-sm text-gray-500">
//                       <span>📋</span>
//                       <span>{m.topics.join(', ')}</span>
//                     </div>
//                   )}
//                   {m.description && (
//                     <div className="flex items-start gap-2 text-sm text-gray-500">
//                       <span>📝</span>
//                       <span>{m.description}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="ml-4 text-right">
//                 <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
//                   {countdown}
//                 </span>
//               </div>
//             </div>
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

export default function UpcomingMeetings() {
  const { t, i18n } = useTranslation();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { subscribeMeetingUpdates } = useSocket();

  const load = useCallback(() => {
    api.get('/meetings?status=upcoming')
      .then(({ data }) => setMeetings(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    const unsub = subscribeMeetingUpdates(() => {
      load();
    });
    return unsub;
  }, [load, subscribeMeetingUpdates]);

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (meetings.length === 0) return (
    <div className="text-center py-12 text-gray-400">
      <p className="text-4xl mb-3">📅</p>
      <p className="text-sm">No upcoming meetings scheduled</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{t('upcoming')} {t('meetings')}</h2>
      {meetings.map((m) => {
        const meetingDate = new Date(m.date);
        const diffMs = meetingDate - new Date();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHrs / 24);
        let countdown = '';
        if (diffDays > 0) countdown = `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
        else if (diffHrs > 0) countdown = `${diffHrs} hour${diffHrs > 1 ? 's' : ''} remaining`;
        else countdown = 'Starting soon';

        return (
          <div key={m._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-base">{m.title}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>📅</span>
                    <span>{meetingDate.toLocaleString(
                      i18n.language === 'hi' ? 'hi-IN' : 'en-IN',
                      { dateStyle: 'full', timeStyle: 'short' }
                    )}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>📍</span><span>{m.venue}</span>
                  </div>
                  {m.topics?.length > 0 && (
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <span>📋</span><span>{m.topics.join(', ')}</span>
                    </div>
                  )}
                  {m.description && (
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <span>📝</span><span>{m.description}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-4 text-right">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  {countdown}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}