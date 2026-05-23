
// import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
// import { io } from 'socket.io-client';
// import { useAuth } from './AuthContext';

// const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const { user } = useAuth();
//   const socketRef = useRef(null);
//   const [notifications, setNotifications] = useState([]);
//   const listenersRef = useRef([]);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:5000', { transports: ['websocket', 'polling'] });

//     if (user) {
//       socketRef.current.emit('join', user._id);
//     }

//     socketRef.current.on('notification', (note) => {
//       setNotifications((prev) => [note, ...prev]);
//     });

//     // Broadcast meeting updates to all registered listeners
//     socketRef.current.on('meeting_update', (data) => {
//       listenersRef.current.forEach((fn) => fn(data));
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [user]);

//   const subscribeMeetingUpdates = useCallback((fn) => {
//     listenersRef.current.push(fn);
//     return () => {
//       listenersRef.current = listenersRef.current.filter((f) => f !== fn);
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ notifications, setNotifications, subscribeMeetingUpdates }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const meetingListenersRef = useRef([]);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      if (user?._id) {
        socket.emit('join', user._id);
      }
    });

    socket.on('notification', (note) => {
      setNotifications((prev) => [note, ...prev]);
    });

    socket.on('meeting_update', (data) => {
      console.log('meeting_update received:', data.type);
      meetingListenersRef.current.forEach((fn) => {
        try { fn(data); } catch (e) { console.error(e); }
      });
    });

    socket.on('disconnect', () => console.log('Socket disconnected'));
    socket.on('connect_error', (e) => console.error('Socket error:', e.message));

    return () => { socket.disconnect(); };
  }, [user]);

  const subscribeMeetingUpdates = useCallback((fn) => {
    meetingListenersRef.current = [...meetingListenersRef.current, fn];
    return () => {
      meetingListenersRef.current = meetingListenersRef.current.filter((f) => f !== fn);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ notifications, setNotifications, subscribeMeetingUpdates }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);