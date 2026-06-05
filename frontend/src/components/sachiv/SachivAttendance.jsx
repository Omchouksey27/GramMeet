import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AttendanceMarker from './AttendanceMarker';
import api from '../../api/axios';

export default function SachivAttendance() {
  const { i18n } = useTranslation();
  const [meetings, setMeetings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', month: '', year: '', search: '' });
  const [sortBy, setSortBy] = useState('date_desc');

  useEffect(() => {
    api.get('/meetings')
      .then(({ data }) => setMeetings(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = meetings.filter((m) => {
    const d = new Date(m.date);
    return (
      (filters.status ? m.status === filters.status : true) &&
      (filters.month ? d.getMonth() + 1 === parseInt(filters.month) : true) &&
      (filters.year ? d.getFullYear() === parseInt(filters.year) : true) &&
      (filters.search
        ? m.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          m.venue.toLowerCase().includes(filters.search.toLowerCase())
        : true)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date_asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'date_desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
    if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
    return 0;
  });

  const hasFilters = filters.status || filters.month || filters.year || filters.search;

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
//                 <input
//                   type="text"
//                   placeholder="Search meetings..."
//                   className="flex-1 text-sm outline-none bg-transparent"
//                   value={filters.search}
//                   onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//                 />
//               </div>
//               <select
//                 className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={filters.status}
//                 onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               >
//                 <option value="">All Status</option>
//                 <option value="upcoming">Upcoming</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <select
//                 className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={filters.month}
//                 onChange={(e) => setFilters({ ...filters, month: e.target.value })}
//               >
//                 <option value="">All Months</option>
//                 {Array.from({ length: 12 }, (_, i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {new Date(2000, i).toLocaleString('default', { month: 'long' })}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
//                 value={filters.year}
//                 onChange={(e) => setFilters({ ...filters, year: e.target.value })}
//               >
//                 <option value="">All Years</option>
//                 {[2023, 2024, 2025, 2026].map((y) => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//               {hasFilters && (
//                 <button
//                   onClick={() => setFilters({ status: '', month: '', year: '', search: '' })}
//                   className="text-sm text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition"
//                 >
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
//                 <button
//                   key={opt.value}
//                   onClick={() => setSortBy(opt.value)}
//                   className={`text-xs px-3 py-1.5 rounded-lg border transition ${
//                     sortBy === opt.value
//                       ? 'bg-green-700 text-white border-green-700'
//                       : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
//                   }`}
//                 >
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
//                 <div
//                   key={m._id}
//                   onClick={() => setSelected(m)}
//                   className="bg-white rounded-xl border shadow-sm p-4 cursor-pointer hover:border-green-400 hover:shadow-md transition"
//                 >
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
//             <button
//               onClick={() => setSelected(null)}
//               className="text-sm border px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
//             >
//               ← Back
//             </button>
//           </div>
//           <AttendanceMarker meetingId={selected._id} />
//         </div>
//       )}
//     </div>
//   );
// }
return (
  <div className="space-y-6">
    {!selected ? (
      <>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#141619] tracking-tight">
              Mark Attendance
            </h2>
            <p className="text-slate-500 mt-1">
              Select a meeting to mark or update attendance.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0A21C0]"></span>
            <span className="text-sm font-medium text-slate-600">
              {sorted.length} Meetings
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-[28px] border border-slate-100 shadow-[0_10px_40px_rgba(2,6,23,0.06)] p-5">
          <div className="flex flex-wrap gap-3 items-center">

            {/* Search */}
            <div className="flex items-center gap-3 flex-1 min-w-[260px] border border-slate-100 bg-[#F8FAFF] rounded-2xl px-4 py-3 focus-within:border-[#0A21C0] focus-within:ring-4 focus-within:ring-blue-100 transition-all">
              <span className="text-[#0A21C0]">🔍</span>

              <input
                type="text"
                placeholder="Search meetings..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>

            <select
              className="border border-slate-200 bg-white rounded-2xl px-4 py-3 text-sm text-slate-700 focus:ring-4 focus:ring-blue-100 focus:border-[#0A21C0] focus:outline-none transition-all"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="border border-slate-200 bg-white rounded-2xl px-4 py-3 text-sm text-slate-700 focus:ring-4 focus:ring-blue-100 focus:border-[#0A21C0] focus:outline-none transition-all"
              value={filters.month}
              onChange={(e) =>
                setFilters({ ...filters, month: e.target.value })
              }
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2000, i).toLocaleString('default', {
                    month: 'long',
                  })}
                </option>
              ))}
            </select>

            <select
              className="border border-slate-200 bg-white rounded-2xl px-4 py-3 text-sm text-slate-700 focus:ring-4 focus:ring-blue-100 focus:border-[#0A21C0] focus:outline-none transition-all"
              value={filters.year}
              onChange={(e) =>
                setFilters({ ...filters, year: e.target.value })
              }
            >
              <option value="">All Years</option>
              {[2023, 2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={() =>
                  setFilters({
                    status: '',
                    month: '',
                    year: '',
                    search: '',
                  })
                }
                className="px-4 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all duration-300"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 pt-5 mt-5 border-t border-slate-100 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Sort By
            </span>

            {[
              { value: 'date_desc', label: '📅 Newest' },
              { value: 'date_asc', label: '📅 Oldest' },
              { value: 'title_asc', label: '🔤 A-Z' },
              { value: 'title_desc', label: '🔤 Z-A' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`text-xs px-4 py-2 rounded-xl border transition-all duration-300 ${
                  sortBy === opt.value
                    ? 'bg-gradient-to-r from-[#0A21C0] to-[#1936F7] text-white border-transparent shadow-lg shadow-blue-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-[#0A21C0] hover:border-[#0A21C0]'
                }`}
              >
                {opt.label}
              </button>
            ))}

            <span className="ml-auto text-xs text-slate-400 font-medium">
              {sorted.length} meetings found
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#0A21C0] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : sorted.length === 0 ? (
          <div className="bg-white rounded-[28px] border border-slate-100 shadow-[0_10px_40px_rgba(2,6,23,0.06)] py-20 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 flex items-center justify-center mb-4">
              <span className="text-4xl">📅</span>
            </div>

            <h3 className="text-lg font-semibold text-slate-700">
              No Meetings Found
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              No meetings match your current filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((m) => (
              <div
                key={m._id}
                onClick={() => setSelected(m)}
                className="bg-white rounded-[28px] border border-slate-100 shadow-[0_8px_30px_rgba(2,6,23,0.05)] p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:border-[#0A21C0] hover:shadow-[0_15px_40px_rgba(10,33,192,0.12)]"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-[#141619] group-hover:text-[#0A21C0] transition-colors">
                      {m.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      📅{' '}
                      {new Date(m.date).toLocaleString(
                        i18n.language === 'hi'
                          ? 'hi-IN'
                          : 'en-IN',
                        {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }
                      )}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      📍 {m.venue}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        m.status === 'upcoming'
                          ? 'bg-blue-50 text-[#0A21C0] border-blue-100'
                          : m.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'bg-red-50 text-red-600 border-red-100'
                      }`}
                    >
                      {m.status}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A21C0] to-[#1936F7] flex items-center justify-center shadow-lg shadow-blue-200">
                      <span className="text-white text-lg font-bold">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    ) : (
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_15px_50px_rgba(2,6,23,0.08)] p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-[#141619]">
              {selected.title}
            </h3>

            <p className="text-slate-500 mt-2">
              📅 {new Date(selected.date).toLocaleString()}
            </p>

            <p className="text-slate-500 mt-1">
              📍 {selected.venue}
            </p>
          </div>

          <button
            onClick={() => setSelected(null)}
            className="px-5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-medium hover:bg-blue-50 hover:text-[#0A21C0] hover:border-[#0A21C0] transition-all duration-300"
          >
            ← Back
          </button>
        </div>

        <AttendanceMarker meetingId={selected._id} />
      </div>
    )}
  </div>
);
}