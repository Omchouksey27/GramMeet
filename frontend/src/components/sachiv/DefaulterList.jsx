// import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function DefaulterList() {
//   const { t } = useTranslation();
//   const [defaulters, setDefaulters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [threshold, setThreshold] = useState(3);

//   const load = () => {
//     setLoading(true);
//     api.get(`/attendance/defaulters?threshold=${threshold}`)
//       .then(({ data }) => setDefaulters(data))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => { load(); }, [threshold]);

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold text-gray-800">{t('defaulters')}</h2>
//         <div className="flex items-center gap-2">
//           <label className="text-sm text-gray-500">Absent threshold:</label>
//           <select
//             value={threshold}
//             onChange={(e) => setThreshold(parseInt(e.target.value))}
//             className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           >
//             {[2, 3, 4, 5].map((n) => (
//               <option key={n} value={n}>≥ {n} absences</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center py-12">
//           <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : defaulters.length === 0 ? (
//         <div className="text-center py-12 bg-green-50 rounded-xl border border-green-100">
//           <p className="text-4xl mb-3">🎉</p>
//           <p className="text-green-700 font-medium">No defaulters found!</p>
//           <p className="text-sm text-green-500 mt-1">
//             All members have fewer than {threshold} absences.
//           </p>
//         </div>
//       ) : (
//         <>
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
//             <span className="text-2xl">⚠️</span>
//             <div>
//               <p className="font-semibold text-red-700">
//                 {defaulters.length} member{defaulters.length > 1 ? 's' : ''} flagged as defaulter{defaulters.length > 1 ? 's' : ''}
//               </p>
//               <p className="text-sm text-red-500">
//                 These members have been absent {threshold} or more times.
//               </p>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
//                 <tr>
//                   <th className="p-3 text-left">{t('name')}</th>
//                   <th className="p-3 text-left">{t('role')}</th>
//                   <th className="p-3 text-left">{t('ward_area')}</th>
//                   <th className="p-3 text-left">{t('mobile')}</th>
//                   <th className="p-3 text-center">Absences</th>
//                   <th className="p-3 text-center">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {defaulters.map((d) => (
//                   <tr key={d._id} className="border-t hover:bg-red-50 transition">
//                     <td className="p-3 font-medium text-gray-800">{d.name}</td>
//                     <td className="p-3">
//                       <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs capitalize">
//                         {d.role?.replace('_', ' ')}
//                       </span>
//                     </td>
//                     <td className="p-3 text-gray-500">{d.wardArea || '—'}</td>
//                     <td className="p-3 text-gray-500">{d.mobile}</td>
//                     <td className="p-3 text-center">
//                       <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs">
//                         {d.absentCount}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-medium">
//                         Defaulter
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FiAlertTriangle,
  FiPhone,
  FiMapPin,
  FiShield,
  FiUsers,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

import api from '../../api/axios';

export default function DefaulterList() {
  const { t } = useTranslation();

  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(3);

  const load = () => {
    setLoading(true);

    api
      .get(`/attendance/defaulters?threshold=${threshold}`)
      .then(({ data }) => setDefaulters(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [threshold]);

  return (
    <div className="space-y-6">
      {/* TOP HEADER */}
      <div className="bg-gradient-to-r from-[#141619] to-[#2C2E3A] rounded-3xl p-5 md:p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FiAlertTriangle className="text-[#4A63FF]" />
              {t('defaulters')}
            </h2>

            <p className="text-sm text-gray-300 mt-2">
              Members with repeated absence records
            </p>
          </div>

          {/* FILTER */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-sm text-gray-300 whitespace-nowrap">
                Absent threshold
              </label>

              <select
                value={threshold}
                onChange={(e) =>
                  setThreshold(parseInt(e.target.value))
                }
                className="bg-[#141619] border border-[#3A3D4F] text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A21C0]"
              >
                {[2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    ≥ {n} absences
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="bg-white rounded-3xl shadow-lg py-16 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-[#0A21C0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : defaulters.length === 0 ? (
        /* NO DEFAULTERS */
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
          <div className="w-24 h-24 bg-[#0A21C0]/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-5xl">🎉</span>
          </div>

          <h3 className="text-2xl font-bold text-[#141619] mt-6">
            No Defaulters Found
          </h3>

          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            All members currently have fewer than{' '}
            {threshold} absences.
          </p>
        </div>
      ) : (
        <>
          {/* ALERT CARD */}
          <div className="bg-gradient-to-r from-[#0A21C0] to-[#243BFF] rounded-3xl p-5 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <FiShield className="text-2xl" />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    {defaulters.length} member
                    {defaulters.length > 1 ? 's' : ''}{' '}
                    flagged
                  </h3>

                  <p className="text-blue-100 text-sm mt-1">
                    These members were absent {threshold}{' '}
                    or more times.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 px-5 py-3 rounded-2xl">
                <p className="text-xs text-blue-100">
                  Total Defaulters
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {defaulters.length}
                </h2>
              </div>
            </div>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="grid grid-cols-1 lg:hidden gap-4">
            {defaulters.map((d, index) => (
              <motion.div
                key={d._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-[#0A21C0]/10 flex items-center justify-center">
                      <FiUsers className="text-[#0A21C0] text-2xl" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#141619] text-lg">
                        {d.name}
                      </h3>

                      <span className="inline-block mt-1 bg-[#141619]/10 text-[#141619] px-3 py-1 rounded-full text-xs capitalize">
                        {d.role?.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Defaulter
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-[#0A21C0]" />
                    {d.wardArea || '—'}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPhone className="text-[#0A21C0]" />
                    {d.mobile}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between bg-red-50 rounded-2xl p-4">
                  <p className="text-sm text-red-600 font-medium">
                    Absences
                  </p>

                  <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                    {d.absentCount}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-[#141619] text-white">
                  <tr>
                    <th className="p-5 text-left text-sm font-semibold">
                      {t('name')}
                    </th>

                    <th className="p-5 text-left text-sm font-semibold">
                      {t('role')}
                    </th>

                    <th className="p-5 text-left text-sm font-semibold">
                      {t('ward_area')}
                    </th>

                    <th className="p-5 text-left text-sm font-semibold">
                      {t('mobile')}
                    </th>

                    <th className="p-5 text-center text-sm font-semibold">
                      Absences
                    </th>

                    <th className="p-5 text-center text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {defaulters.map((d, index) => (
                    <motion.tr
                      key={d._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b hover:bg-[#0A21C0]/5 transition"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-2xl bg-[#0A21C0]/10 flex items-center justify-center">
                            <FiUsers className="text-[#0A21C0]" />
                          </div>

                          <div>
                            <p className="font-semibold text-[#141619]">
                              {d.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-5">
                        <span className="bg-[#141619]/10 text-[#141619] px-3 py-1 rounded-full text-xs capitalize">
                          {d.role?.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-5 text-gray-600">
                        {d.wardArea || '—'}
                      </td>

                      <td className="p-5 text-gray-600">
                        {d.mobile}
                      </td>

                      <td className="p-5 text-center">
                        <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold">
                          {d.absentCount}
                        </span>
                      </td>

                      <td className="p-5 text-center">
                        <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                          Defaulter
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}