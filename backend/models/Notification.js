const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  messageHi: { type: String },
  type: { type: String, enum: ['meeting_scheduled', 'reminder_24h', 'reminder_1h', 'report_ready'] },
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);