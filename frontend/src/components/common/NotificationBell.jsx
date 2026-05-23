// import { useState, useEffect, useRef} from 'react';
// import { useSocket } from '../../context/SocketContext';
// import { useAuth } from '../../context/AuthContext';
// import { useTranslation } from 'react-i18next';
// import api from '../../api/axios';

// export default function NotificationBell() {
//   const { notifications, setNotifications } = useSocket();
//   const { user } = useAuth();
//   const { i18n } = useTranslation();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     api.get('/notifications').then(({ data }) => setNotifications(data));
//   }, []);

//   const unread = notifications.filter((n) => !n.isRead).length;

//   const markRead = async () => {
//     await api.put('/notifications/read');
//     setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => { setOpen(!open); if (!open) markRead(); }}
//         className="relative p-2 rounded-full hover:bg-gray-100"
//       >
//         🔔
//         {unread > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             {unread}
//           </span>
//         )}
//       </button>
//       {open && (
//         <div className="absolute right-0 top-10 w-80 bg-white border rounded-xl shadow-lg  max-h-96 overflow-y-auto z-[9999]">
//           {notifications.length === 0 ? (
//             <p className="p-4 text-sm text-gray-500">No notifications</p>
//           ) : (
//             notifications.slice(0, 20).map((n) => (
//               <div
//                 key={n._id}
//                 className={`p-3 border-b text-sm ${n.isRead ? 'text-gray-500' : 'text-gray-800 font-medium bg-blue-50'}`}
//               >
//                 {i18n.language === 'hi' && n.messageHi ? n.messageHi : n.message}
//                 <div className="text-xs text-gray-400 mt-1">
//                   {new Date(n.createdAt).toLocaleString(i18n.language === 'hi' ? 'hi-IN' : 'en-IN')}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


import {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import { FiBell } from 'react-icons/fi';

import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

import api from '../../api/axios';

export default function NotificationBell() {
  const { notifications, setNotifications } =
    useSocket();

  const { user } = useAuth();

  const { i18n } = useTranslation();

  const [open, setOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  // LOAD NOTIFICATIONS
  useEffect(() => {
    api
      .get('/notifications')
      .then(({ data }) =>
        setNotifications(data)
      );
  }, []);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  // UNREAD COUNT
  const unread = notifications.filter(
    (n) => !n.isRead
  ).length;

  // MARK READ
  const markRead = async () => {
    await api.put('/notifications/read');

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      }))
    );
  };

  // TOGGLE DROPDOWN
  const handleToggle = () => {
    setOpen((prev) => !prev);

    if (!open) {
      markRead();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* BELL BUTTON */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="relative h-11 w-11 rounded-2xl bg-[#F7F8FC] border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300"
      >
        <FiBell className="text-[#141619] text-[20px]" />

        {/* BADGE */}
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-lg"
          >
            {unread > 99
              ? '99+'
              : unread}
          </motion.span>
        )}
      </motion.button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute right-0 top-14 w-[290px] sm:w-[320px] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-[9999]"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#141619] via-[#2C2E3A] to-[#0A21C0] px-4 py-3 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">
                    Notifications
                  </h3>

                  <p className="text-[11px] text-blue-100 mt-0.5">
                    Recent updates
                  </p>
                </div>

                <div className="bg-white/10 px-2.5 py-1 rounded-xl text-xs font-semibold">
                  {notifications.length}
                </div>
              </div>
            </div>

            {/* LIST */}
            <div className="max-h-[320px] overflow-y-auto">
              {notifications.length ===
              0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-5 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#0A21C0]/10 flex items-center justify-center mb-3">
                    <FiBell className="text-[#0A21C0] text-2xl" />
                  </div>

                  <h4 className="font-semibold text-[#141619] text-sm">
                    No Notifications
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    You're all caught up.
                  </p>
                </div>
              ) : (
                notifications
                  .slice(0, 20)
                  .map((n) => (
                    <motion.div
                      key={n._id}
                      whileHover={{
                        backgroundColor:
                          '#F7F8FC',
                      }}
                      className={`relative px-4 py-3 border-b border-gray-100 transition-all ${
                        !n.isRead
                          ? 'bg-[#0A21C0]/5'
                          : 'bg-white'
                      }`}
                    >
                      {/* UNREAD DOT */}
                      {!n.isRead && (
                        <span className="absolute left-2 top-5 w-2 h-2 rounded-full bg-[#0A21C0]"></span>
                      )}

                      <div className="pl-3">
                        <p
                          className={`text-[13px] leading-relaxed ${
                            n.isRead
                              ? 'text-gray-600'
                              : 'text-[#141619] font-medium'
                          }`}
                        >
                          {i18n.language ===
                            'hi' &&
                          n.messageHi
                            ? n.messageHi
                            : n.message}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-[10px] text-gray-400">
                            {new Date(
                              n.createdAt
                            ).toLocaleString(
                              i18n.language ===
                                'hi'
                                ? 'hi-IN'
                                : 'en-IN'
                            )}
                          </p>

                          {!n.isRead && (
                            <span className="text-[9px] font-semibold bg-[#0A21C0]/10 text-[#0A21C0] px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}