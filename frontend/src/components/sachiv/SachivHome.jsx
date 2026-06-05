import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSocket } from "../../context/SocketContext";
import api from "../../api/axios";
import logo from "../../assets/gramMeetLogo.png";

export default function SachivHome() {
  const { i18n } = useTranslation();
  const { subscribeMeetingUpdates } = useSocket();
  const [stats, setStats] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    Promise.all([
      api.get("/reports/analytics"),
      api.get("/meetings?status=upcoming"),
    ])
      .then(([analyticsRes, meetingsRes]) => {
        setStats(analyticsRes.data);
        setUpcoming(meetingsRes.data.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    // Real-time update — reload when any meeting changes
    const unsub = subscribeMeetingUpdates(() => load());
    return unsub;
  }, [load, subscribeMeetingUpdates]);

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <div className="w-9 h-9 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

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
  //               {
  //                 label: 'Defaulters',
  //                 value: stats.memberAnalytics?.filter((m) => parseFloat(m.percentage) < 50).length || 0,
  //                 color: 'bg-red-50',
  //                 text: 'text-red-600',
  //               },
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
  //               const countdown =
  //                 diffDays > 0 ? `${diffDays}d remaining`
  //                 : diffHrs > 0 ? `${diffHrs}h remaining`
  //                 : 'Starting soon';

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
  //             <a
  //               key={path}
  //               href={path}
  //               className="bg-white rounded-xl border shadow-sm p-4 text-center hover:border-green-400 hover:shadow-md transition cursor-pointer block"
  //             >
  //               <p className="text-2xl mb-2">{icon}</p>
  //               <p className="text-xs font-medium text-gray-700">{label}</p>
  //             </a>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#050A44] via-[#0A21C0] to-[#050A44] p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 ">
          <div className="flex items-center h-19 gap-4">
            <img
              src={logo}
              alt="GramMeet Logo"
              className="h-14 w-14 object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">GramMeet Dashboard</h2>

          <p className="text-[#B3B4BD] mt-3 max-w-2xl">
            Manage meetings, attendance, members, notifications and reports
            efficiently from one place.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#0A21C0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Statistics */}
          {stats && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-[#141619]">
                  Dashboard Overview
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {[
                  {
                    label: "Total Meetings",
                    value: stats.totalMeetings,
                    icon: "📅",
                  },
                  {
                    label: "Attendance",
                    value: `${stats.overallPercentage}%`,
                    icon: "📊",
                  },
                  {
                    label: "Members",
                    value: stats.memberAnalytics?.length || 0,
                    icon: "👥",
                  },
                  {
                    label: "Defaulters",
                    value:
                      stats.memberAnalytics?.filter(
                        (m) => parseFloat(m.percentage) < 50,
                      ).length || 0,
                    icon: "⚠️",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="group bg-white border border-[#B3B4BD]/20 rounded-[28px] p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-[#B3B4BD]">{card.label}</p>

                        <h3 className="text-4xl font-bold text-[#141619] mt-3">
                          {card.value}
                        </h3>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#050A44] to-[#0A21C0] flex items-center justify-center text-2xl text-white shadow-lg">
                        {card.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Meetings */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[#141619]">
                Upcoming Meetings
              </h3>

              <span className="px-4 py-2 rounded-full bg-[#0A21C0]/10 text-[#0A21C0] text-sm font-semibold">
                {upcoming.length} Scheduled
              </span>
            </div>

            {upcoming.length === 0 ? (
              <div className="bg-white rounded-[28px] border border-[#B3B4BD]/20 p-12 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-[#0A21C0]/10 flex items-center justify-center text-4xl mb-4">
                  📅
                </div>

                <h4 className="font-semibold text-[#141619]">
                  No Upcoming Meetings
                </h4>

                <p className="text-[#B3B4BD] mt-2 text-sm">
                  Schedule your next meeting from the Meetings section.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map((m) => {
                  const diffMs = new Date(m.date) - new Date();

                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

                  const countdown =
                    diffDays > 0
                      ? `${diffDays}d remaining`
                      : diffHrs > 0
                        ? `${diffHrs}h remaining`
                        : "Starting Soon";

                  return (
                    <div
                      key={m._id}
                      className="bg-white rounded-[28px] border border-[#B3B4BD]/20 p-6 shadow-lg hover:shadow-2xl hover:border-[#0A21C0]/30 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-lg text-[#141619]">
                            {m.title}
                          </h4>

                          <p className="text-[#2C2E3A] text-sm mt-2">
                            📅{" "}
                            {new Date(m.date).toLocaleString(
                              i18n.language === "hi" ? "hi-IN" : "en-IN",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
                            )}
                          </p>

                          <p className="text-[#2C2E3A] text-sm mt-1">
                            📍 {m.venue}
                          </p>
                        </div>

                        <div className="px-4 py-2 rounded-full bg-[#0A21C0]/10 text-[#0A21C0] text-sm font-semibold whitespace-nowrap">
                          {countdown}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-bold text-[#141619] mb-5">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  label: "Schedule Meeting",
                  icon: "📅",
                  path: "/sachiv/meetings",
                },
                {
                  label: "Add Member",
                  icon: "👥",
                  path: "/sachiv/members",
                },
                {
                  label: "Mark Attendance",
                  icon: "✅",
                  path: "/sachiv/attendance",
                },
                {
                  label: "View Reports",
                  icon: "📄",
                  path: "/sachiv/reports",
                },
              ].map(({ label, icon, path }) => (
                <a
                  key={path}
                  href={path}
                  className="group bg-white border border-[#B3B4BD]/20 rounded-[28px] p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-[#0A21C0]/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#050A44] to-[#0A21C0] flex items-center justify-center text-3xl shadow-lg">
                    {icon}
                  </div>

                  <p className="mt-4 text-center font-semibold text-[#141619] group-hover:text-[#0A21C0] transition-colors">
                    {label}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
