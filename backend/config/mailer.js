const nodemailer = require('nodemailer');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailHost = process.env.EMAIL_HOST || 'smtp-relay.brevo.com';
const emailPort = parseInt(process.env.EMAIL_PORT) || 587;

console.log('=== EMAIL CONFIG ===');
console.log('HOST:', emailHost);
console.log('PORT:', emailPort);
console.log('USER:', emailUser || 'NOT SET');
console.log('PASS:', emailPass ? 'SET (' + emailPass.length + ' chars)' : 'NOT SET');
console.log('===================');

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Email connection failed:', error.message);
    console.error('Check EMAIL_USER and EMAIL_PASS in environment');
  } else {
    console.log('Email server ready to send');
  }
});

module.exports = transporter;
