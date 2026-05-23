import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import api from '../../api/axios';

export default function MyAnalytics() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/attendance/member')
      .then(({ data }) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!data) return null;

  const isDefaulter = data.absent >= 3;

  const pieData = [
    { name: t('present'), value: data.present, color: '#16a34a' },
    { name: t('absent'), value: data.absent, color: '#ef4444' },
  ];

  const barData = data.records.map((r, i) => ({
    name: `M${i + 1}`,
    fullName: r.meeting?.title || 'Meeting',
    status: r.status === 'present' ? 1 : 0,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">{t('my_attendance')} {t('analytics')}</h2>

      {/* Defaulter warning */}
      {isDefaulter && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-red-700">{t('defaulters')}</p>
            <p className="text-sm text-red-500 mt-0.5">
              You have been absent {data.absent} times. Members absent 3 or more times
              are marked as attendance defaulters.
            </p>
          </div>
        </div>
      )}

      {!isDefaulter && data.total > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-green-700">Good Attendance</p>
            <p className="text-sm text-green-500 mt-0.5">
              You are not an attendance defaulter. Keep it up!
            </p>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-gray-800">{data.total}</p>
          <p className="text-xs text-gray-500 mt-1">{t('total_meetings')}</p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-100 p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-green-700">{data.present}</p>
          <p className="text-xs text-gray-500 mt-1">{t('present')}</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-100 p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-red-600">{data.absent}</p>
          <p className="text-xs text-gray-500 mt-1">{t('absent')}</p>
        </div>
        <div className={`rounded-xl border p-4 text-center shadow-sm ${
          parseFloat(data.percentage) >= 75
            ? 'bg-blue-50 border-blue-100'
            : parseFloat(data.percentage) >= 50
            ? 'bg-yellow-50 border-yellow-100'
            : 'bg-red-50 border-red-100'
        }`}>
          <p className={`text-3xl font-bold ${
            parseFloat(data.percentage) >= 75 ? 'text-blue-700' :
            parseFloat(data.percentage) >= 50 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {data.percentage}%
          </p>
          <p className="text-xs text-gray-500 mt-1">{t('my_attendance')}</p>
        </div>
      </div>

      {data.total > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pie chart */}
          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Attendance Split</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Meeting-wise Attendance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis
                  domain={[0, 1]}
                  ticks={[0, 1]}
                  tickFormatter={(v) => v === 1 ? 'P' : 'A'}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(v) => v === 1 ? 'Present' : 'Absent'}
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ''}
                />
                <Bar dataKey="status" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.status === 1 ? '#16a34a' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Detailed records table */}
      {data.records.length > 0 && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700">Detailed Record</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="p-3 text-left">{t('meetings')}</th>
                  <th className="p-3 text-left">{t('date')}</th>
                  <th className="p-3 text-left">{t('venue')}</th>
                  <th className="p-3 text-center">{t('attendance')}</th>
                </tr>
              </thead>
              <tbody>
                {data.records.map((r, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">
                      {r.meeting?.title || 'N/A'}
                    </td>
                    <td className="p-3 text-gray-500">
                      {r.meeting?.date
                        ? new Date(r.meeting.date).toLocaleDateString('en-IN')
                        : 'N/A'}
                    </td>
                    <td className="p-3 text-gray-500">{r.meeting?.venue || 'N/A'}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        r.status === 'present'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {r.status === 'present' ? t('present') : t('absent')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}