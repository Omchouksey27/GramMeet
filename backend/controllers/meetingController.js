// const Meeting = require('../models/Meeting');
// const User = require('../models/User');
// const Notification = require('../models/Notification');
// const { sendMeetingNotification } = require('../services/emailService');

// const scheduleMeeting = async (req, res) => {
//   try {
//     const meeting = await Meeting.create({
//       ...req.body,
//       scheduledBy: req.user._id,
//     });

//     const members = await User.find({ isActive: true });
//     const io = req.app.get('io');

//     for (const user of members) {
//       try {
//         await sendMeetingNotification(user, meeting);
//       } catch (e) {
//         console.error('Email failed for', user.email, e.message);
//       }
//       const note = await Notification.create({
//         recipient: user._id,
//         message: `New meeting scheduled: "${meeting.title}" on ${new Date(meeting.date).toLocaleDateString()}`,
//         messageHi: `नई बैठक निर्धारित: "${meeting.title}" तारीख ${new Date(meeting.date).toLocaleDateString('hi-IN')}`,
//         type: 'meeting_scheduled',
//         meeting: meeting._id,
//       });
//       io.to(user._id.toString()).emit('notification', note);
//     }

//     // Broadcast meeting update to ALL connected clients
//     io.emit('meeting_update', { type: 'created', meeting });

//     meeting.notificationSent = true;
//     await meeting.save();

//     res.status(201).json(meeting);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const getMeetings = async (req, res) => {
//   try {
//     const { status, date, month, year } = req.query;
//     const filter = {};
//     if (status) filter.status = status;
//     if (year) {
//       const y = parseInt(year);
//       filter.date = { $gte: new Date(y, 0, 1), $lt: new Date(y + 1, 0, 1) };
//     }
//     if (month && year) {
//       const m = parseInt(month) - 1;
//       const y = parseInt(year);
//       filter.date = { $gte: new Date(y, m, 1), $lt: new Date(y, m + 1, 1) };
//     }
//     if (date) {
//       const d = new Date(date);
//       filter.date = { $gte: d, $lt: new Date(d.getTime() + 86400000) };
//     }
//     const meetings = await Meeting.find(filter)
//       .populate('scheduledBy', 'name')
//       .sort({ date: -1 });
//     res.json(meetings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getMeetingById = async (req, res) => {
//   try {
//     const meeting = await Meeting.findById(req.params.id).populate('scheduledBy', 'name');
//     if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
//     res.json(meeting);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateMeeting = async (req, res) => {
//   try {
//     const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     const io = req.app.get('io');
//     // Broadcast update to all clients
//     io.emit('meeting_update', { type: 'updated', meeting });
//     res.json(meeting);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const deleteMeeting = async (req, res) => {
//   try {
//     await Meeting.findByIdAndDelete(req.params.id);
//     const io = req.app.get('io');
//     // Broadcast deletion to all clients
//     io.emit('meeting_update', { type: 'deleted', meetingId: req.params.id });
//     res.json({ message: 'Meeting deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { scheduleMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting };

const Meeting = require('../models/Meeting');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { sendMeetingNotification } = require('../services/emailService');

const scheduleMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create({
      ...req.body,
      scheduledBy: req.user._id,
    });

    const io = req.app.get('io');

    // Emit meeting update immediately so dashboards refresh instantly
    io.emit('meeting_update', { type: 'created', meeting });

    // Send emails and notifications in background (don't await — don't block response)
    setImmediate(async () => {
      try {
        const members = await User.find({ isActive: true });
        for (const user of members) {
          try {
            await sendMeetingNotification(user, meeting);
          } catch (e) {
            console.error('Email failed for', user.email, ':', e.message);
          }
          try {
            const note = await Notification.create({
              recipient: user._id,
              message: `New meeting: "${meeting.title}" on ${new Date(meeting.date).toLocaleDateString()}`,
              messageHi: `नई बैठक: "${meeting.title}"`,
              type: 'meeting_scheduled',
              meeting: meeting._id,
            });
            io.to(user._id.toString()).emit('notification', note);
          } catch (e) {
            console.error('Notification failed:', e.message);
          }
        }
        await Meeting.findByIdAndUpdate(meeting._id, { notificationSent: true });
      } catch (e) {
        console.error('Background notification error:', e.message);
      }
    });

    // Respond immediately — don't wait for emails
    return res.status(201).json(meeting);
  } catch (err) {
    console.error('Schedule meeting error:', err.message);
    return res.status(400).json({ message: err.message });
  }
};

const getMeetings = async (req, res) => {
  try {
    const { status, date, month, year } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (year && !month) {
      const y = parseInt(year);
      filter.date = { $gte: new Date(y, 0, 1), $lt: new Date(y + 1, 0, 1) };
    }
    if (month && year) {
      const m = parseInt(month) - 1;
      const y = parseInt(year);
      filter.date = { $gte: new Date(y, m, 1), $lt: new Date(y, m + 1, 1) };
    }
    if (date) {
      const d = new Date(date);
      filter.date = { $gte: d, $lt: new Date(d.getTime() + 86400000) };
    }
    const meetings = await Meeting.find(filter)
      .populate('scheduledBy', 'name')
      .sort({ date: -1 });
    return res.json(meetings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id).populate('scheduledBy', 'name');
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    return res.json(meeting);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    const io = req.app.get('io');
    io.emit('meeting_update', { type: 'updated', meeting });
    return res.json(meeting);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    const io = req.app.get('io');
    io.emit('meeting_update', { type: 'deleted', meetingId: req.params.id });
    return res.json({ message: 'Meeting deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  scheduleMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting
};