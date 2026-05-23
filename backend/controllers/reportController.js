// const Meeting = require('../models/Meeting');
// const Attendance = require('../models/Attendance');
// const User = require('../models/User');
// const { generateMeetingReport } = require('../services/pdfService');

// const getAnalytics = async (req, res) => {
//   try {
//     const meetings = await Meeting.find({ status: 'completed' });
//     const totalMeetings = meetings.length;

//     let totalPresent = 0, totalRecords = 0;
//     const memberStats = {};

//     for (const meeting of meetings) {
//       const records = await Attendance.find({ meeting: meeting._id }).populate('member', 'name role');
//       records.forEach((r) => {
//         totalRecords++;
//         if (r.status === 'present') totalPresent++;
//         if (r.member) {
//           const id = r.member._id.toString();
//           if (!memberStats[id]) {
//             memberStats[id] = { name: r.member.name, role: r.member.role, present: 0, total: 0 };
//           }
//           memberStats[id].total++;
//           if (r.status === 'present') memberStats[id].present++;
//         }
//       });
//     }

//     const overallPercentage = totalRecords ? ((totalPresent / totalRecords) * 100).toFixed(1) : 0;

//     const memberAnalytics = Object.values(memberStats).map((m) => ({
//       ...m,
//       percentage: m.total ? ((m.present / m.total) * 100).toFixed(1) : 0,
//     }));

//     res.json({ totalMeetings, overallPercentage, memberAnalytics });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const downloadMeetingPDF = async (req, res) => {
//   try {
//     const meeting = await Meeting.findById(req.params.meetingId).populate('scheduledBy', 'name');
//     if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

//     const attendance = await Attendance.find({ meeting: meeting._id }).populate('member', 'name role wardArea');
//     generateMeetingReport(meeting, attendance, res);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getAnalytics, downloadMeetingPDF };



const Meeting = require('../models/Meeting');
const Attendance = require('../models/Attendance');
const { generateMeetingReport } = require('../services/pdfService');

const getAnalytics = async (req, res) => {
  try {
    const meetings = await Meeting.find({ status: 'completed' });
    const totalMeetings = meetings.length;
    let totalPresent = 0, totalRecords = 0;
    const memberStats = {};

    for (const meeting of meetings) {
      const records = await Attendance.find({ meeting: meeting._id }).populate('member', 'name role');
      records.forEach((r) => {
        totalRecords++;
        if (r.status === 'present') totalPresent++;
        if (r.member) {
          const id = r.member._id.toString();
          if (!memberStats[id]) {
            memberStats[id] = { name: r.member.name, role: r.member.role, present: 0, total: 0 };
          }
          memberStats[id].total++;
          if (r.status === 'present') memberStats[id].present++;
        }
      });
    }

    const overallPercentage = totalRecords
      ? ((totalPresent / totalRecords) * 100).toFixed(1) : 0;

    const memberAnalytics = Object.values(memberStats).map((m) => ({
      ...m,
      percentage: m.total ? ((m.present / m.total) * 100).toFixed(1) : 0,
    }));

    res.json({ totalMeetings, overallPercentage, memberAnalytics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const downloadMeetingPDF = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meetingId)
      .populate('scheduledBy', 'name');
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    const attendance = await Attendance.find({ meeting: meeting._id })
      .populate('member', 'name role wardArea');

    // Set headers before streaming
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="meeting-${meeting._id}.pdf"`
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    generateMeetingReport(meeting, attendance, res);
  } catch (err) {
    console.error('PDF error:', err);
    if (!res.headersSent) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { getAnalytics, downloadMeetingPDF };