// const Brevo = require('@getbrevo/brevo');

// let apiInstance = null;

// if (!process.env.BREVO_API_KEY) {
//   console.error('BREVO_API_KEY is not set');
// } else {
//   apiInstance = new Brevo.TransactionalEmailsApi();
//   apiInstance.authentications = {
//     'api-key': { type: 'apiKey', in: 'header', name: 'api-key', apiKey: process.env.BREVO_API_KEY }
//   };
//   console.log('Brevo API configured successfully');
// }

// module.exports = apiInstance;

// Using axios to call Brevo API directly — no SDK needed
const axios = require('axios');

const sendBrevoEmail = async (toEmail, toName, subject, htmlContent) => {
  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY not set');
    return false;
  }

  try {
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          email: process.env.EMAIL_USER || 'omchouksey27@gmail.com',
          name: 'GramMeet',
        },
        to: [{ email: toEmail, name: toName }],
        subject: subject,
        htmlContent: htmlContent,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Email sent to:', toEmail);
    return true;
  } catch (err) {
    console.error('Brevo API error for', toEmail, ':', err.response?.data || err.message);
    return false;
  }
};

module.exports = { sendBrevoEmail };