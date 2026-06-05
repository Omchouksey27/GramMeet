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
    ciphers: 'SSLv3',
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error('=== EMAIL VERIFY FAILED ===');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('===========================');
  } else {
    console.log('=== EMAIL SERVER READY ===');
    console.log('Emails will be sent successfully');
    console.log('==========================');
  }
});

module.exports = transporter;
