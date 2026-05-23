// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// module.exports = transporter;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Test connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email connection failed:', error.message);
    console.error('Check EMAIL_USER and EMAIL_PASS in .env');
  } else {
    console.log('✅ Email server connected and ready');
  }
});

module.exports = transporter;