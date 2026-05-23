const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['present', 'absent'], default: 'absent' },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  markedAt: { type: Date },
}, { timestamps: true });

attendanceSchema.index({ meeting: 1, member: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);