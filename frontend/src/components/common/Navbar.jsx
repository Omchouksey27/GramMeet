// // import { useAuth } from '../../context/AuthContext';
// // import { useTranslation } from 'react-i18next';
// // import LanguageToggle from './LanguageToggle';
// // import NotificationBell from './NotificationBell';

// // export default function Navbar() {
// //   const { user, logout } = useAuth();
// //   const { t } = useTranslation();

// //   return (
// //     <nav className="bg-white border-b px-6 py-3 flex justify-between items-center">
// //       <div className="flex items-center gap-2">
// //         <span className="text-2xl">🌾</span>
// //         <div>
// //           <h1 className="text-lg font-bold text-green-800">GramMeet</h1>
// //           <p className="text-xs text-gray-400">ग्राम पंचायत बैठक प्रणाली</p>
// //         </div>
// //       </div>
// //       <div className="flex items-center gap-4">
// //         <LanguageToggle />
// //         <NotificationBell />
// //         <div className="flex items-center gap-2">
// //           <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
// //             {user?.name?.charAt(0).toUpperCase()}
// //           </div>
// //           <div className="hidden md:block">
// //             <p className="text-sm font-medium text-gray-800">{user?.name}</p>
// //             <p className="text-xs text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
// //           </div>
// //         </div>
// //         <button
// //           onClick={logout}
// //           className="text-sm text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
// //         >
// //           {t('logout')}
// //         </button>
// //       </div>
// //     </nav>
// //   );
// // }



// import { useAuth } from '../../context/AuthContext';
// import { useTranslation } from 'react-i18next';
// import LanguageToggle from './LanguageToggle';
// import NotificationBell from './NotificationBell';

// export default function Navbar() {
//   const { user } = useAuth();
//   const { t } = useTranslation();

//   return (
//     // pt-14 on mobile to account for the fixed top bar
//     <nav className="bg-white border-b px-4 md:px-6 py-3 flex justify-between items-center mt-14 md:mt-0">
//       <div className="hidden md:flex items-center gap-2">
//         <span className="text-xl">🌾</span>
//         <div>
//           <h1 className="text-base font-bold text-green-800">GramMeet</h1>
//           <p className="text-xs text-gray-400">ग्राम पंचायत बैठक प्रणाली</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-3 ml-auto">
//         <LanguageToggle />
//         <NotificationBell />
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
//             {user?.name?.charAt(0).toUpperCase()}
//           </div>
//           <div className="hidden md:block">
//             <p className="text-sm font-medium text-gray-800">{user?.name}</p>
//             <p className="text-xs text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }



import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FiChevronDown,
  FiShield,
} from 'react-icons/fi';

import LanguageToggle from './LanguageToggle';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <motion.nav
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between mt-14 md:mt-0 shadow-sm"
    >
      {/* FLOATING BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 8, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
          }}
          className="absolute top-2 left-20 w-16 h-16 bg-[#0A21C0]/10 rounded-3xl blur-2xl"
        />

        <motion.div
          animate={{
            y: [0, 12, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
          }}
          className="absolute right-24 top-0 w-20 h-20 bg-[#141619]/10 rounded-full blur-3xl"
        />
      </div>

      {/* LEFT SECTION */}
      <div className="relative z-10 flex items-center gap-4">
        {/* LOGO */}
        <motion.div
  whileHover={{
    scale: 1.02,
  }}
  className="flex items-center gap-3 transition-all duration-300"
>
          <div className="relative">
            <div className="absolute inset-0 bg-[#0A21C0] blur-xl opacity-30 rounded-full"></div>

            <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-[#141619] via-[#2C2E3A] to-[#0A21C0] flex items-center justify-center shadow-xl">
              <span className="text-2xl">
                🌾
              </span>
            </div>
          </div>

          {/* BRAND */}
          <div className="hidden sm:block">
            <h1 className="text-xl font-black bg-gradient-to-r from-[#141619] to-[#0A21C0] bg-clip-text text-transparent tracking-tight">
              GramMeet
            </h1>

            <p className="text-xs text-gray-400 font-medium">
              ग्राम पंचायत बैठक प्रणाली
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative z-10 flex items-center gap-2 md:gap-4 ml-auto">
        {/* LANGUAGE */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden sm:block"
        >
          <LanguageToggle />
        </motion.div>

        {/* NOTIFICATIONS */}
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
        >
          <NotificationBell />
        </motion.div>

        {/* USER CARD */}
        <motion.div
          whileHover={{
            y: -2,
          }}
          className="flex items-center gap-3 bg-[#F7F8FC] border border-gray-200 rounded-2xl px-3 md:px-4 py-2 shadow-sm hover:shadow-lg transition-all"
        >
          {/* AVATAR */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#0A21C0] blur-lg opacity-40 rounded-full"></div>

            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#141619] to-[#0A21C0] flex items-center justify-center text-white text-sm font-bold shadow-lg">
              {user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>
          </div>

          {/* USER INFO */}
          <div className="hidden md:block leading-tight">
            <p className="text-sm font-semibold text-[#141619]">
              {user?.name}
            </p>

            <div className="flex items-center gap-1 mt-0.5">
              <FiShield className="text-[#0A21C0] text-xs" />

              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.replace(
                  '_',
                  ' '
                )}
              </p>
            </div>
          </div>

          {/* DROPDOWN ICON */}
          <FiChevronDown className="hidden md:block text-gray-400 text-sm" />
        </motion.div>

        {/* MOBILE LANGUAGE */}
        <div className="sm:hidden">
          <LanguageToggle />
        </div>
      </div>

      {/* BOTTOM GLOW */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0A21C0]/40 to-transparent"></div>
    </motion.nav>
  );
}