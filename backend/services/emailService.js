// const transporter = require('../config/mailer');

// const sendMeetingNotification = async (user, meeting) => {
//   const isHindi = user.preferredLanguage === 'hi';
//   const subject = isHindi
//     ? `ग्राम सभा बैठक सूचना: ${meeting.title}`
//     : `GramMeet Meeting Notice: ${meeting.title}`;

//   const body = isHindi
//     ? `प्रिय ${user.name},\n\nएक नई ग्राम पंचायत बैठक निर्धारित की गई है।\n\nविषय: ${meeting.title}\nतारीख: ${new Date(meeting.date).toLocaleString('hi-IN')}\nस्थान: ${meeting.venue}\nविषय-सूची: ${meeting.topics.join(', ')}\n\nकृपया समय पर उपस्थित रहें।\n\nधन्यवाद`
//     : `Dear ${user.name},\n\nA new Gram Panchayat meeting has been scheduled.\n\nTitle: ${meeting.title}\nDate: ${new Date(meeting.date).toLocaleString()}\nVenue: ${meeting.venue}\nTopics: ${meeting.topics.join(', ')}\n\nPlease be present on time.\n\nThank you`;

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: user.email,
//     subject,
//     text: body,
//   });
// };

// const sendReminder = async (user, meeting, type) => {
//   const isHindi = user.preferredLanguage === 'hi';
//   const timeLabel = type === '24h'
//     ? (isHindi ? '24 घंटे' : '24 hours')
//     : (isHindi ? '1 घंटे' : '1 hour');

//   const subject = isHindi
//     ? `अनुस्मारक: बैठक ${timeLabel} में`
//     : `Reminder: Meeting in ${timeLabel}`;

//   const body = isHindi
//     ? `प्रिय ${user.name},\nयाद दिलाया जाता है कि बैठक "${meeting.title}" ${timeLabel} में है।\nस्थान: ${meeting.venue}\nतारीख: ${new Date(meeting.date).toLocaleString('hi-IN')}`
//     : `Dear ${user.name},\nReminder: Meeting "${meeting.title}" is in ${timeLabel}.\nVenue: ${meeting.venue}\nDate: ${new Date(meeting.date).toLocaleString()}`;

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: user.email,
//     subject,
//     text: body,
//   });
// };

// module.exports = { sendMeetingNotification, sendReminder };


const transporter = require('../config/mailer');

const sendMeetingNotification = async (user, meeting) => {
  const isHindi = user.preferredLanguage === 'hi';
  const meetingDate = new Date(meeting.date).toLocaleString('en-IN', {
    dateStyle: 'full', timeStyle: 'short'
  });

  const subject = `GramMeet: New Meeting Scheduled — ${meeting.title}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:#166534;padding:24px 32px">
        <h1 style="color:#ffffff;margin:0;font-size:22px">🌾 GramMeet</h1>
        <p style="color:#bbf7d0;margin:4px 0 0;font-size:13px">Gram Panchayat Meeting System</p>
      </div>
      <div style="padding:32px">
        <div style="background:#f0fdf4;border-left:4px solid #166534;padding:16px;border-radius:6px;margin-bottom:24px">
          <p style="margin:0;color:#166534;font-weight:bold;font-size:15px">📅 New Meeting Scheduled</p>
        </div>
        <p style="color:#374151;font-size:15px">Dear <strong>${user.name}</strong>,</p>
        <p style="color:#374151;font-size:14px">A new Gram Panchayat meeting has been scheduled. Please find the details below:</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase;width:35%">Meeting Title</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px;font-weight:600">${meeting.title}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase">Date & Time</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px">${meetingDate}</td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase">Venue</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px">📍 ${meeting.venue}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase">Topics</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px">${meeting.topics?.join(', ') || 'N/A'}</td>
          </tr>
          ${meeting.description ? `
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase">Description</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px">${meeting.description}</td>
          </tr>` : ''}
        </table>
        <div style="background:#fef9c3;border:1px solid #fde047;padding:14px;border-radius:8px;margin:20px 0">
          <p style="margin:0;color:#854d0e;font-size:13px">⚠️ Please make sure to attend the meeting on time. Your presence is important for the development of our village.</p>
        </div>
        <p style="color:#6b7280;font-size:13px;margin-top:24px">Regards,<br><strong style="color:#166534">GramMeet System</strong><br>Gram Panchayat Administration</p>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center">
        <p style="margin:0;color:#9ca3af;font-size:12px">🌾 GramMeet — Digitizing Gram Panchayat Meetings</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"GramMeet" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject,
    html,
  });
};

const sendReminder = async (user, meeting, type) => {
  const timeLabel = type === '24h' ? '24 hours' : type === '30min' ? '30 minutes' : '1 hour';
  const urgency = type === '30min' ? '🚨 Starting Soon!' : '⏰ Reminder';

  const meetingDate = new Date(meeting.date).toLocaleString('en-IN', {
    dateStyle: 'full', timeStyle: 'short'
  });

  const subject = `GramMeet ${urgency}: Meeting "${meeting.title}" in ${timeLabel}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:${type === '30min' ? '#dc2626' : '#166534'};padding:24px 32px">
        <h1 style="color:#ffffff;margin:0;font-size:22px">🌾 GramMeet</h1>
        <p style="color:${type === '30min' ? '#fecaca' : '#bbf7d0'};margin:4px 0 0;font-size:13px">${urgency}</p>
      </div>
      <div style="padding:32px">
        <div style="background:${type === '30min' ? '#fef2f2' : '#f0fdf4'};border-left:4px solid ${type === '30min' ? '#dc2626' : '#166534'};padding:16px;border-radius:6px;margin-bottom:24px">
          <p style="margin:0;color:${type === '30min' ? '#dc2626' : '#166534'};font-weight:bold;font-size:16px">
            ${type === '30min' ? '🚨' : '⏰'} Meeting starts in <strong>${timeLabel}</strong>!
          </p>
        </div>
        <p style="color:#374151;font-size:15px">Dear <strong>${user.name}</strong>,</p>
        <p style="color:#374151;font-size:14px">This is a reminder for the upcoming Gram Panchayat meeting.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase;width:35%">Meeting</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px;font-weight:600">${meeting.title}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase">Date & Time</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px"><strong>${meetingDate}</strong></td>
          </tr>
          <tr style="background:#f9fafb">
            <td style="padding:12px 16px;font-weight:bold;color:#6b7280;font-size:12px;text-transform:uppercase">Venue</td>
            <td style="padding:12px 16px;color:#111827;font-size:14px">📍 ${meeting.venue}</td>
          </tr>
        </table>
        ${type === '30min' ? `
        <div style="background:#fef2f2;border:2px solid #dc2626;padding:16px;border-radius:8px;text-align:center">
          <p style="margin:0;color:#dc2626;font-weight:bold;font-size:15px">🚨 Please leave NOW to reach on time!</p>
        </div>` : `
        <div style="background:#fef9c3;border:1px solid #fde047;padding:14px;border-radius:8px">
          <p style="margin:0;color:#854d0e;font-size:13px">⚠️ Please make arrangements to attend the meeting on time.</p>
        </div>`}
        <p style="color:#6b7280;font-size:13px;margin-top:24px">Regards,<br><strong style="color:#166534">GramMeet System</strong></p>
      </div>
      <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center">
        <p style="margin:0;color:#9ca3af;font-size:12px">🌾 GramMeet — Digitizing Gram Panchayat Meetings</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"GramMeet" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject,
    html,
  });
};

module.exports = { sendMeetingNotification, sendReminder };