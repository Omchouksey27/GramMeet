// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useAuth } from '../../context/AuthContext';

// const sachivLinks = [
//   { to: '/sachiv', label: 'dashboard', icon: '🏠' },
//   { to: '/sachiv/meetings', label: 'meetings', icon: '📅' },
//   { to: '/sachiv/members', label: 'members', icon: '👥' },
//   { to: '/sachiv/attendance', label: 'attendance', icon: '✅' },
//   { to: '/sachiv/analytics', label: 'analytics', icon: '📊' },
//   { to: '/sachiv/reports', label: 'reports', icon: '📄' },
//   { to: '/sachiv/defaulters', label: 'defaulters', icon: '⚠️' },
//   { to: '/sachiv/team', label: 'Team', icon: '👨‍👩‍👧‍👦' },
// ];

// const memberLinks = [
//   { to: '/member', label: 'dashboard', icon: '🏠' },
//   { to: '/member/meetings', label: 'meetings', icon: '📅' },
//   { to: '/member/attendance', label: 'my_attendance', icon: '✅' },
//   { to: '/member/reports', label: 'reports', icon: '📄' },
// ];

// export default function Sidebar() {
//   const { t } = useTranslation();
//   const { user, logout } = useAuth();
//   const links = user?.role === 'sachiv' ? sachivLinks : memberLinks;
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const NavLinks = ({ onClickLink }) => (
//     <>
//       {links.map(({ to, label, icon }) => (
//         <NavLink
//           key={to}
//           to={to}
//           end={to.split('/').length === 2}
//           onClick={onClickLink}
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-4 py-2.5 text-sm transition rounded-lg mx-2 mb-0.5 ${
//               isActive
//                 ? 'bg-green-600 font-semibold text-white'
//                 : 'text-green-100 hover:bg-green-700 hover:text-white'
//             }`
//           }
//         >
//           <span className="text-base">{icon}</span>
//           <span>{t(label)}</span>
//         </NavLink>
//       ))}
//     </>
//   );

//   return (
//     <>
//       {/* ── Mobile top bar ───────────────────────────── */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-green-800 text-white flex items-center justify-between px-4 py-3 shadow-lg">
//         <div className="flex items-center gap-2">
//           <span className="text-xl">🌾</span>
//           <div>
//             <h1 className="text-base font-bold leading-tight">GramMeet</h1>
//             <p className="text-xs text-green-300 leading-tight">{user?.name}</p>
//           </div>
//         </div>
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="p-2 rounded-lg hover:bg-green-700 transition focus:outline-none"
//           aria-label="Toggle menu"
//         >
//           {mobileOpen ? (
//             // X icon
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           ) : (
//             // Hamburger icon
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* ── Mobile overlay ───────────────────────────── */}
//       {mobileOpen && (
//         <div
//           className="md:hidden fixed inset-0 z-40 bg-black/50"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* ── Mobile drawer ────────────────────────────── */}
//       <div className={`md:hidden fixed top-0 left-0 h-full w-64 z-50 bg-green-800 text-white transform transition-transform duration-300 ease-in-out ${
//         mobileOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <div className="p-4 border-b border-green-700 mt-2">
//           <div className="flex items-center gap-2">
//             <span className="text-2xl">🌾</span>
//             <div>
//               <h1 className="text-lg font-bold">GramMeet</h1>
//               <p className="text-xs text-green-300">ग्राम पंचायत बैठक प्रणाली</p>
//             </div>
//           </div>
//           <div className="mt-3 flex items-center gap-2 bg-green-700 rounded-lg px-3 py-2">
//             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-sm">
//               {user?.name?.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <p className="text-sm font-medium">{user?.name}</p>
//               <p className="text-xs text-green-300 capitalize">{user?.role?.replace('_', ' ')}</p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 py-3 overflow-y-auto">
//           <NavLinks onClickLink={() => setMobileOpen(false)} />
//         </nav>

//         <div className="p-3 border-t border-green-700">
//           <button
//             onClick={() => { logout(); setMobileOpen(false); }}
//             className="w-full py-2.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition font-medium"
//           >
//             🚪 {t('logout')}
//           </button>
//         </div>
//       </div>

//       {/* ── Desktop sidebar ──────────────────────────── */}
//       <aside className="hidden md:flex w-56 min-h-screen bg-green-800 text-white flex-col flex-shrink-0">
//         <div className="p-4 border-b border-green-700">
//           <div className="flex items-center gap-2">
//             <span className="text-2xl">🌾</span>
//             <div>
//               <h1 className="text-lg font-bold">GramMeet</h1>
//               <p className="text-xs text-green-300">ग्राम पंचायत बैठक</p>
//             </div>
//           </div>
//           <div className="mt-3 bg-green-700 rounded-lg px-3 py-2">
//             <p className="text-sm font-medium truncate">{user?.name}</p>
//             <p className="text-xs text-green-300 capitalize">{user?.role?.replace('_', ' ')}</p>
//           </div>
//         </div>

//         <nav className="flex-1 py-3 overflow-y-auto">
//           <NavLinks onClickLink={() => {}} />
//         </nav>

//         <div className="p-3 border-t border-green-700">
//           <button
//             onClick={logout}
//             className="w-full py-2.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg transition font-medium"
//           >
//             🚪 {t('logout')}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiCheckSquare,
  FiBarChart2,
  FiFileText,
  FiAlertTriangle,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight,
} from 'react-icons/fi';

import { motion, AnimatePresence } from 'framer-motion';

const sachivLinks = [
  { to: '/sachiv', label: 'dashboard', icon: FiHome },
  { to: '/sachiv/meetings', label: 'meetings', icon: FiCalendar },
  { to: '/sachiv/members', label: 'members', icon: FiUsers },
  { to: '/sachiv/attendance', label: 'attendance', icon: FiCheckSquare },
  { to: '/sachiv/analytics', label: 'analytics', icon: FiBarChart2 },
  { to: '/sachiv/reports', label: 'reports', icon: FiFileText },
  { to: '/sachiv/defaulters', label: 'defaulters', icon: FiAlertTriangle },
  { to: '/sachiv/team', label: 'Team', icon: FiUsers },
];

const memberLinks = [
  { to: '/member', label: 'dashboard', icon: FiHome },
  { to: '/member/meetings', label: 'meetings', icon: FiCalendar },
  { to: '/member/attendance', label: 'my_attendance', icon: FiCheckSquare },
  { to: '/member/reports', label: 'reports', icon: FiFileText },
];

export default function Sidebar() {
  const { t } = useTranslation();

  const { user, logout } = useAuth();

  const links =
    user?.role === 'sachiv'
      ? sachivLinks
      : memberLinks;

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const NavLinks = ({
    onClickLink,
  }) => (
    <div className="space-y-1.5">
      {links.map(
        ({
          to,
          label,
          icon: Icon,
        }) => (
          <NavLink
            key={to}
            to={to}
            end={
              to.split('/').length === 2
            }
            onClick={onClickLink}
            className={({
              isActive,
            }) =>
              `group relative flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#141619] via-[#2C2E3A] to-[#0A21C0] text-white shadow-xl'
                  : 'text-gray-500 hover:bg-[#F4F6FB] hover:text-[#141619]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'bg-[#EEF2FF] text-[#0A21C0]'
                    }`}
                  >
                    <Icon className="text-lg" />
                  </div>

                  <span className="text-sm font-semibold">
                    {t(label)}
                  </span>
                </div>

                <FiChevronRight
                  className={`text-sm transition-all ${
                    isActive
                      ? 'translate-x-1 text-white'
                      : 'text-gray-400 group-hover:translate-x-1'
                  }`}
                />
              </>
            )}
          </NavLink>
        )
      )}
    </div>
  );

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#0A21C0]/20 blur-xl rounded-full"></div>

            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#141619] via-[#2C2E3A] to-[#0A21C0] flex items-center justify-center shadow-xl">
              🌾
            </div>
          </div>

          <div>
            <h1 className="text-lg font-black bg-gradient-to-r from-[#141619] to-[#0A21C0] bg-clip-text text-transparent">
              GramMeet
            </h1>

            <p className="text-xs text-gray-400">
              {user?.name}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          className="w-11 h-11 rounded-2xl bg-[#F4F6FB] border border-gray-200 flex items-center justify-center text-[#141619]"
        >
          {mobileOpen ? (
            <FiX className="text-xl" />
          ) : (
            <FiMenu className="text-xl" />
          )}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setMobileOpen(false)
            }
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <motion.div
        initial={false}
        animate={{
          x: mobileOpen
            ? 0
            : -320,
        }}
        transition={{
          type: 'spring',
          damping: 25,
        }}
        className="md:hidden fixed top-0 left-0 z-50 h-full w-[290px] bg-white border-r border-gray-200 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* FLOATING EFFECT */}
        <div className="absolute top-10 right-0 w-40 h-40 bg-[#0A21C0]/10 rounded-full blur-3xl"></div>

        {/* HEADER */}
        <div className="relative p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#0A21C0]/20 blur-xl rounded-full"></div>

              <div className="relative w-14 h-14 rounded-3xl bg-gradient-to-br from-[#141619] via-[#2C2E3A] to-[#0A21C0] flex items-center justify-center text-2xl text-white shadow-xl">
                🌾
              </div>
            </div>

            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-[#141619] to-[#0A21C0] bg-clip-text text-transparent">
                GramMeet
              </h1>

              <p className="text-xs text-gray-400">
                ग्राम पंचायत बैठक
              </p>
            </div>
          </div>

          {/* USER CARD */}
          <div className="mt-5 bg-[#F7F8FC] border border-gray-200 rounded-3xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#141619] to-[#0A21C0] flex items-center justify-center text-white font-bold shadow-lg">
              {user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-[#141619] truncate">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.replace(
                  '_',
                  ' '
                )}
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks
            onClickLink={() =>
              setMobileOpen(false)
            }
          />
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all shadow-lg"
          >
            <FiLogOut />

            {t('logout')}
          </button>
        </div>
      </motion.div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex relative w-[280px] min-h-screen bg-white border-r border-gray-200 flex-col overflow-hidden">
        {/* FLOATING VISUALS */}
        <div className="absolute top-16 right-0 w-52 h-52 bg-[#0A21C0]/10 rounded-full blur-3xl"></div>

        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
          }}
          className="absolute top-40 right-8 w-16 h-16 rounded-3xl bg-gradient-to-br from-[#0A21C0] to-[#243BFF] opacity-10 blur-sm"
        />

        {/* HEADER */}
        <div className="relative p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#0A21C0]/20 blur-xl rounded-full"></div>

              <div className="relative w-14 h-14 rounded-3xl bg-gradient-to-br from-[#141619] via-[#2C2E3A] to-[#0A21C0] flex items-center justify-center text-2xl text-white shadow-2xl">
                🌾
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-[#141619] to-[#0A21C0] bg-clip-text text-transparent">
                GramMeet
              </h1>

              <p className="text-xs text-gray-400">
                पंचायत प्रबंधन प्रणाली
              </p>
            </div>
          </div>

          {/* USER */}
          <div className="mt-6 bg-[#F7F8FC] border border-gray-200 rounded-[24px] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#141619] to-[#0A21C0] flex items-center justify-center text-white font-bold shadow-lg">
                {user?.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-[#141619] truncate">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-500 capitalize">
                  {user?.role?.replace(
                    '_',
                    ' '
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="relative flex-1 overflow-y-auto px-4 py-5">
          <NavLinks
            onClickLink={() => {}}
          />
        </nav>

        {/* FOOTER */}
        <div className="relative p-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 text-white font-semibold text-sm transition-all shadow-xl"
          >
            <FiLogOut />

            {t('logout')}
          </button>
        </div>
      </aside>
    </>
  );
}