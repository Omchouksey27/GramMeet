const Attendance = require('../models/Attendance');
const User = require('../models/User');

const markAttendance = async (req, res) => {
  try {
    const { meetingId, attendanceData } = req.body;
    // attendanceData: [{ memberId, status }]

    const ops = attendanceData.map(({ memberId, status }) => ({
      updateOne: {
        filter: { meeting: meetingId, member: memberId },
        update: { $set: { status, markedBy: req.user._id, markedAt: new Date() } },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(ops);
    res.json({ message: 'Attendance marked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMeetingAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ meeting: req.params.meetingId })
      .populate('member', 'name role wardArea email');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMemberAttendance = async (req, res) => {
  try {
    const memberId = req.params.memberId || req.user._id;
    const records = await Attendance.find({ member: memberId })
      .populate('meeting', 'title date venue status');

    const total = records.length;
    const present = records.filter((r) => r.status === 'present').length;
    const percentage = total ? ((present / total) * 100).toFixed(1) : 0;

    res.json({ records, total, present, absent: total - present, percentage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDefaulters = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 3;
    const members = await User.find({ role: { $in: ['ward_member', 'sarpanch'] } });

    const defaulters = [];
    for (const member of members) {
      const absences = await Attendance.countDocuments({
        member: member._id,
        status: 'absent',
      });
      if (absences >= threshold) {
        defaulters.push({ ...member.toObject(), absentCount: absences });
      }
    }

    res.json(defaulters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { markAttendance, getMeetingAttendance, getMemberAttendance, getDefaulters };