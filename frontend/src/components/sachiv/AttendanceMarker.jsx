// import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function AttendanceMarker({ meetingId }) {
//   const { t } = useTranslation();
//   const [members, setMembers] = useState([]);
//   const [attendance, setAttendance] = useState({});

//   useEffect(() => {
//     api.get('/members').then(({ data }) => {
//       setMembers(data);
//       const init = {};
//       data.forEach((m) => (init[m._id] = 'absent'));
//       setAttendance(init);
//     });
//     api.get(`/attendance/meeting/${meetingId}`).then(({ data }) => {
//       const existing = {};
//       data.forEach((r) => (existing[r.member._id] = r.status));
//       setAttendance((prev) => ({ ...prev, ...existing }));
//     });
//   }, [meetingId]);

//   const toggle = (id) =>
//     setAttendance((prev) => ({ ...prev, [id]: prev[id] === 'present' ? 'absent' : 'present' }));

//   const submit = async () => {
//     const attendanceData = Object.entries(attendance).map(([memberId, status]) => ({
//       memberId, status,
//     }));
//     await api.post('/attendance/mark', { meetingId, attendanceData });
//     alert('Attendance saved!');
//   };

//   return (
//     <div className="space-y-2">
//       {members.map((m) => (
//         <div
//           key={m._id}
//           className="flex items-center justify-between p-3 border rounded-lg"
//         >
//           <div>
//             <p className="text-sm font-medium">{m.name}</p>
//             <p className="text-xs text-gray-500">{m.role} — {m.wardArea}</p>
//           </div>
//           <button
//             onClick={() => toggle(m._id)}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
//               attendance[m._id] === 'present'
//                 ? 'bg-green-100 text-green-800'
//                 : 'bg-red-100 text-red-700'
//             }`}
//           >
//             {attendance[m._id] === 'present' ? t('present') : t('absent')}
//           </button>
//         </div>
//       ))}
//       <button
//         onClick={submit}
//         className="w-full bg-green-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 mt-2"
//       >
//         {t('save')}
//       </button>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
  FiUsers,
} from 'react-icons/fi';

import api from '../../api/axios';

export default function AttendanceMarker({ meetingId }) {
  const { t } = useTranslation();

  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    api.get('/members').then(({ data }) => {
      setMembers(data);

      const init = {};
      data.forEach((m) => (init[m._id] = 'absent'));

      setAttendance(init);
    });

    api.get(`/attendance/meeting/${meetingId}`).then(({ data }) => {
      const existing = {};

      data.forEach((r) => (existing[r.member._id] = r.status));

      setAttendance((prev) => ({
        ...prev,
        ...existing,
      }));
    });
  }, [meetingId]);

  const toggle = (id) =>
    setAttendance((prev) => ({
      ...prev,
      [id]:
        prev[id] === 'present'
          ? 'absent'
          : 'present',
    }));

  const submit = async () => {
    const attendanceData = Object.entries(attendance).map(
      ([memberId, status]) => ({
        memberId,
        status,
      })
    );

    await api.post('/attendance/mark', {
      meetingId,
      attendanceData,
    });

    alert('Attendance saved!');
  };

  const totalPresent = Object.values(attendance).filter(
    (v) => v === 'present'
  ).length;

  return (
    <div className="space-y-6">
      {/* TOP HEADER */}
      <div className="bg-gradient-to-r from-[#141619] to-[#2C2E3A] rounded-3xl p-5 md:p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold">
              Attendance Management
            </h2>

            <p className="text-gray-300 text-sm mt-1">
              Mark meeting attendance for members
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
              <p className="text-xs text-gray-300">
                Total Members
              </p>

              <h3 className="text-xl font-bold mt-1">
                {members.length}
              </h3>
            </div>

            <div className="bg-[#0A21C0] px-5 py-3 rounded-2xl shadow-lg">
              <p className="text-xs text-blue-100">
                Present
              </p>

              <h3 className="text-xl font-bold mt-1">
                {totalPresent}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* MEMBERS LIST */}
      <div className="space-y-4">
        {members.map((m, index) => (
          <motion.div
            key={m._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -2 }}
            className="bg-white border border-gray-100 rounded-3xl p-4 md:p-5 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#0A21C0]/10 flex items-center justify-center">
                  <FiUsers className="text-[#0A21C0] text-2xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#141619] text-base md:text-lg">
                    {m.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
                    <span className="capitalize bg-gray-100 px-2 py-1 rounded-lg">
                      {m.role}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiMapPin className="text-xs" />
                      {m.wardArea}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => toggle(m._id)}
                className={`min-w-[130px] flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  attendance[m._id] === 'present'
                    ? 'bg-[#0A21C0] text-white shadow-lg hover:scale-105'
                    : 'bg-[#141619]/10 text-[#141619] hover:bg-[#141619] hover:text-white'
                }`}
              >
                {attendance[m._id] === 'present' ? (
                  <>
                    <FiCheckCircle className="text-lg" />
                    {t('present')}
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-lg" />
                    {t('absent')}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <div className="sticky bottom-4">
        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-[#0A21C0] to-[#243BFF] text-white py-4 rounded-3xl font-semibold text-base shadow-xl hover:scale-[1.01] transition-all duration-300"
        >
          {t('save')} Attendance
        </button>
      </div>
    </div>
  );
}