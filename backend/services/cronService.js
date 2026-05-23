// const cron = require('node-cron');
// const Meeting = require('../models/Meeting');
// const User = require('../models/User');
// const Notification = require('../models/Notification');
// const { sendReminder } = require('./emailService');

// const startCronJobs = (io) => {
//   // Check every 15 minutes for upcoming reminders
//   cron.schedule('*/15 * * * *', async () => {
//     const now = new Date();
//     const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
//     const in1h = new Date(now.getTime() + 60 * 60 * 1000);
//     const buffer = 15 * 60 * 1000; // 15 min window

//     const meetings = await Meeting.find({
//       status: 'upcoming',
//       date: { $gte: now },
//     });

//     const members = await User.find({ isActive: true });

//     for (const meeting of meetings) {
//       const diffMs = meeting.date - now;

//       // 24-hour reminder
//       if (
//         !meeting.reminder24Sent &&
//         diffMs <= 24 * 60 * 60 * 1000 + buffer &&
//         diffMs >= 24 * 60 * 60 * 1000 - buffer
//       ) {
//         for (const user of members) {
//           await sendReminder(user, meeting, '24h');
//           const note = await Notification.create({
//             recipient: user._id,
//             message: `Reminder: Meeting "${meeting.title}" is tomorrow.`,
//             messageHi: `अनुस्मारक: बैठक "${meeting.title}" कल है।`,
//             type: 'reminder_24h',
//             meeting: meeting._id,
//           });
//           io.to(user._id.toString()).emit('notification', note);
//         }
//         meeting.reminder24Sent = true;
//         await meeting.save();
//       }

//       // 1-hour reminder
//       if (
//         !meeting.reminder1Sent &&
//         diffMs <= 60 * 60 * 1000 + buffer &&
//         diffMs >= 60 * 60 * 1000 - buffer
//       ) {
//         for (const user of members) {
//           await sendReminder(user, meeting, '1h');
//           const note = await Notification.create({
//             recipient: user._id,
//             message: `Reminder: Meeting "${meeting.title}" is in 1 hour.`,
//             messageHi: `अनुस्मारक: बैठक "${meeting.title}" 1 घंटे में है।`,
//             type: 'reminder_1h',
//             meeting: meeting._id,
//           });
//           io.to(user._id.toString()).emit('notification', note);
//         }
//         meeting.reminder1Sent = true;
//         await meeting.save();
//       }
//     }
//   });
// };

// module.exports = { startCronJobs };


const cron = require('node-cron');
const Meeting = require('../models/Meeting');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { sendReminder } = require('./emailService');

const startCronJobs = (io) => {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    const now = new Date();
    const buffer = 6 * 60 * 1000; // 6 min buffer

    const meetings = await Meeting.find({ status: 'upcoming', date: { $gte: now } });
    const members = await User.find({ isActive: true });

    for (const meeting of meetings) {
      const diffMs = meeting.date - now;

      // 24-hour reminder
      if (
        !meeting.reminder24Sent &&
        diffMs <= 24 * 60 * 60 * 1000 + buffer &&
        diffMs >= 24 * 60 * 60 * 1000 - buffer
      ) {
        for (const user of members) {
          try { await sendReminder(user, meeting, '24h'); } catch (e) { console.error(e.message); }
          const note = await Notification.create({
            recipient: user._id,
            message: `Reminder: Meeting "${meeting.title}" is tomorrow.`,
            messageHi: `अनुस्मारक: बैठक "${meeting.title}" कल है।`,
            type: 'reminder_24h',
            meeting: meeting._id,
          });
          io.to(user._id.toString()).emit('notification', note);
        }
        meeting.reminder24Sent = true;
        await meeting.save();
        console.log(`24h reminder sent for: ${meeting.title}`);
      }

      // 30-minute reminder (replaces 1 hour)
      if (
        !meeting.reminder1Sent &&
        diffMs <= 30 * 60 * 1000 + buffer &&
        diffMs >= 30 * 60 * 1000 - buffer
      ) {
        for (const user of members) {
          try { await sendReminder(user, meeting, '30min'); } catch (e) { console.error(e.message); }
          const note = await Notification.create({
            recipient: user._id,
            message: `🚨 Meeting "${meeting.title}" starts in 30 minutes!`,
            messageHi: `🚨 बैठक "${meeting.title}" 30 मिनट में शुरू होगी!`,
            type: 'reminder_1h',
            meeting: meeting._id,
          });
          io.to(user._id.toString()).emit('notification', note);
        }
        meeting.reminder1Sent = true;
        await meeting.save();
        console.log(`30min reminder sent for: ${meeting.title}`);
      }
    }
  });

  console.log('Cron jobs started — checking every 5 minutes');
};

module.exports = { startCronJobs };