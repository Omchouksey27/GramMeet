const SibApiV3Sdk = require('@getbrevo/brevo');
const apiInstance = require('../config/brevo');

const sendEmail = async (toEmail, toName, subject, htmlContent) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      email: process.env.EMAIL_USER || 'omchouksey27@gmail.com',
      name: 'GramMeet',
    };
    sendSmtpEmail.to = [{ email: toEmail, name: toName }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully to:', toEmail);
    return true;
  } catch (err) {
    console.error('Email failed for', toEmail, ':', err.message);
    return false;
  }
};

const sendMeetingNotification = async (user, meeting) => {
  const meetingDate = new Date(meeting.date).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const subject = 'GramMeet: New Meeting Scheduled - ' + meeting.title;

  const html = 
    `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:#166534;padding:24px 32px">
        <h1 style="color:#ffffff;margin:0;font-size:22px">GramMeet</h1>
        <p style="color:#bbf7d0;margin:4px 0 0;font-size:13px">Gram Panchayat Meeting System</p>
      </div>
      <div style="padding:32px">
        <p style="color:#374151;font-size:15px">Dear <strong></strong>,</p>
        <p style="color:#374151;font-size:14px">A new Gram Panchayat meeting has been scheduled. Please find the details below:</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;width:35%">MEETING TITLE</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px;font-weight:600"></td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px">DATE AND TIME</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px"></td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px">VENUE</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px"></td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px">TOPICS</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px"></td>
          </tr>
          
        </table>
        <div style="background:#fef9c3;border:1px solid #fde047;padding:14px;border-radius:8px;margin:20px 0">
          <p style="margin:0;color:#854d0e;font-size:13px">Please make sure to attend the meeting on time.</p>
        </div>
        <p style="color:#6b7280;font-size:13px;margin-top:24px">
          Regards,<br>
          <strong style="color:#166534">GramMeet System</strong><br>
          Gram Panchayat Administration
        </p>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center">
        <p style="margin:0;color:#9ca3af;font-size:12px">GramMeet - Digitizing Gram Panchayat Meetings for a Better India</p>
      </div>
    </div>`
  ;

  await sendEmail(user.email, user.name, subject, html);
};

const sendReminder = async (user, meeting, type) => {
  const timeLabel = type === '30min' ? '30 minutes' : '24 hours';
  const isUrgent = type === '30min';

  const meetingDate = new Date(meeting.date).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const subject = 'GramMeet Reminder: Meeting in ' + timeLabel + ' - ' + meeting.title;

  const html = 
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:;padding:24px 32px">
        <h1 style="color:#ffffff;margin:0;font-size:22px">
          
        </h1>
        <p style="color:;margin:4px 0 0;font-size:13px">GramMeet Notification</p>
      </div>
      <div style="padding:32px">
        <div style="background:;border-left:4px solid ;padding:16px;border-radius:6px;margin-bottom:24px">
          <p style="margin:0;color:;font-weight:bold;font-size:16px">
            Meeting starts in !
          </p>
        </div>
        <p style="color:#374151;font-size:15px">Dear <strong></strong>,</p>
        <p style="color:#374151;font-size:14px">This is a reminder for your upcoming Gram Panchayat meeting.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;width:35%">MEETING</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px;font-weight:600"></td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px">DATE AND TIME</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px"><strong></strong></td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px">VENUE</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px"></td>
          </tr>
        </table>
        
        <p style="color:#6b7280;font-size:13px;margin-top:24px">
          Regards,<br/>
          <strong style="color:#166534">GramMeet System</strong>
        </p>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center">
        <p style="margin:0;color:#9ca3af;font-size:12px">GramMeet - Digitizing Gram Panchayat Meetings</p>
      </div>
    </div>
  ;

  await sendEmail(user.email, user.name, subject, html);
};

module.exports = { sendMeetingNotification, sendReminder };
