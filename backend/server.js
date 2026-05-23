// require('dotenv').config();
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const { startCronJobs } = require('./services/cronService');

// connectDB();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: process.env.FRONTEND_URL, methods: ['GET', 'POST'] },
// });

// app.use(cors({ origin: process.env.FRONTEND_URL }));
// app.use(express.json());

// // Make io accessible in controllers via req.app.get('io')
// app.set('io', io);

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/members', require('./routes/memberRoutes'));
// app.use('/api/meetings', require('./routes/meetingRoutes'));
// app.use('/api/attendance', require('./routes/attendanceRoutes'));
// app.use('/api/reports', require('./routes/reportRoutes'));
// app.use('/api/notifications', require('./routes/notificationRoutes'));

// // Socket.io — each user joins their own room by userId
// io.on('connection', (socket) => {
//   socket.on('join', (userId) => socket.join(userId));
//   socket.on('disconnect', () => {});
// });

// startCronJobs(io);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const { startCronJobs } = require('./services/cronService');
const corsOptions = require('./config/cors');

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors(corsOptions));
app.use(express.json());
app.set('io', io);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/meetings', require('./routes/meetingRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });
  socket.on('disconnect', () => {});
});

startCronJobs(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));