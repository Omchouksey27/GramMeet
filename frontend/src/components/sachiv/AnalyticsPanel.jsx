// import { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function AnalyticsPanel() {
//   const { t } = useTranslation();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     api.get('/reports/analytics').then(({ data }) => setData(data));
//   }, []);

//   if (!data) return <p className="text-sm text-gray-400">Loading...</p>;

//   const chartData = data.memberAnalytics.map((m) => ({
//     name: m.name.split(' ')[0],
//     attendance: parseFloat(m.percentage),
//   }));

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-3 gap-4">
//         <div className="bg-green-50 rounded-xl p-4 text-center">
//           <p className="text-2xl font-bold text-green-700">{data.totalMeetings}</p>
//           <p className="text-xs text-gray-500 mt-1">{t('total_meetings')}</p>
//         </div>
//         <div className="bg-blue-50 rounded-xl p-4 text-center">
//           <p className="text-2xl font-bold text-blue-700">{data.overallPercentage}%</p>
//           <p className="text-xs text-gray-500 mt-1">{t('overall_attendance')}</p>
//         </div>
//         <div className="bg-red-50 rounded-xl p-4 text-center">
//           <p className="text-2xl font-bold text-red-600">
//             {data.memberAnalytics.filter((m) => parseFloat(m.percentage) < 50).length}
//           </p>
//           <p className="text-xs text-gray-500 mt-1">{t('defaulters')}</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border p-4">
//         <h3 className="text-sm font-medium mb-3">{t('analytics')} — Member-wise</h3>
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" tick={{ fontSize: 11 }} />
//             <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
//             <Tooltip formatter={(v) => `${v}%`} />
//             <Bar dataKey="attendance" radius={[4, 4, 0, 0]}>
//               {chartData.map((entry, i) => (
//                 <Cell
//                   key={i}
//                   fill={entry.attendance >= 75 ? '#16a34a' : entry.attendance >= 50 ? '#f59e0b' : '#ef4444'}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white rounded-xl border overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
//             <tr>
//               <th className="p-3 text-left">{t('name')}</th>
//               <th className="p-3 text-left">{t('role')}</th>
//               <th className="p-3 text-center">{t('present')}</th>
//               <th className="p-3 text-center">{t('attendance')}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.memberAnalytics.map((m, i) => (
//               <tr key={i} className="border-t hover:bg-gray-50">
//                 <td className="p-3 font-medium">{m.name}</td>
//                 <td className="p-3 text-gray-500">{m.role}</td>
//                 <td className="p-3 text-center">{m.present}/{m.total}</td>
//                 <td className="p-3 text-center">
//                   <span
//                     className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                       parseFloat(m.percentage) >= 75
//                         ? 'bg-green-100 text-green-700'
//                         : parseFloat(m.percentage) >= 50
//                         ? 'bg-yellow-100 text-yellow-700'
//                         : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {m.percentage}%
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiCheckCircle,
  FiAlertTriangle,
} from 'react-icons/fi';

import api from '../../api/axios';

export default function AnalyticsPanel() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/reports/analytics').then(({ data }) => setData(data));
  }, []);

  if (!data)
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-10 w-10 rounded-full border-4 border-[#0A21C0] border-t-transparent animate-spin"></div>
      </div>
    );

  const chartData = data.memberAnalytics.map((m) => ({
    name: m.name.split(' ')[0],
    attendance: parseFloat(m.percentage),
  }));

  const defaulters = data.memberAnalytics.filter(
    (m) => parseFloat(m.percentage) < 50
  ).length;

  return (
    <div className="space-y-6">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Total Meetings */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-[#141619] text-white rounded-3xl p-5 shadow-lg border border-[#2C2E3A]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">
                {t('total_meetings')}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {data.totalMeetings}
              </h2>
            </div>

            <div className="bg-[#0A21C0]/20 p-3 rounded-2xl">
              <FiUsers className="text-[#4A63FF] text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Attendance */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-gradient-to-br from-[#0A21C0] to-[#1E3AFF] text-white rounded-3xl p-5 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100">
                {t('overall_attendance')}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {data.overallPercentage}%
              </h2>
            </div>

            <div className="bg-white/20 p-3 rounded-2xl">
              <FiCheckCircle className="text-white text-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Defaulters */}
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-[#2C2E3A] text-white rounded-3xl p-5 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">
                {t('defaulters')}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {defaulters}
              </h2>
            </div>

            <div className="bg-red-500/20 p-3 rounded-2xl">
              <FiAlertTriangle className="text-red-400 text-2xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* CHART SECTION */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold text-[#141619]">
              {t('analytics')}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Member-wise attendance overview
            </p>
          </div>
        </div>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#666' }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#666' }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: 'rgba(10,33,192,0.08)' }}
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
                formatter={(v) => `${v}%`}
              />

              <Bar
                dataKey="attendance"
                radius={[10, 10, 0, 0]}
                barSize={35}
              >
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.attendance >= 75
                        ? '#0A21C0'
                        : entry.attendance >= 50
                        ? '#4A63FF'
                        : '#2C2E3A'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#141619] text-white">
              <tr>
                <th className="p-4 text-left text-sm font-semibold">
                  {t('name')}
                </th>

                <th className="p-4 text-left text-sm font-semibold">
                  {t('role')}
                </th>

                <th className="p-4 text-center text-sm font-semibold">
                  {t('present')}
                </th>

                <th className="p-4 text-center text-sm font-semibold">
                  {t('attendance')}
                </th>
              </tr>
            </thead>

            <tbody>
              {data.memberAnalytics.map((m, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-[#141619]">
                    {m.name}
                  </td>

                  <td className="p-4 text-gray-500 capitalize">
                    {m.role}
                  </td>

                  <td className="p-4 text-center font-medium">
                    {m.present}/{m.total}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                        parseFloat(m.percentage) >= 75
                          ? 'bg-[#0A21C0]/10 text-[#0A21C0]'
                          : parseFloat(m.percentage) >= 50
                          ? 'bg-[#4A63FF]/10 text-[#4A63FF]'
                          : 'bg-[#2C2E3A]/10 text-[#2C2E3A]'
                      }`}
                    >
                      {m.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}