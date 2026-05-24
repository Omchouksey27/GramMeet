const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
  credentials: false,
};

module.exports = corsOptions;


// const corsOptions = {
//   origin: function (origin, callback) {
//     const allowed = [
//       'http://localhost:5173',
//       'http://localhost:3000',
//       process.env.FRONTEND_URL,
//       'https://gram-meet.vercel.app/login', // your actual Vercel URL
//     ].filter(Boolean);

//     if (!origin || allowed.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   exposedHeaders: ['Content-Disposition'],
//   credentials: true,
// };

// module.exports = corsOptions;