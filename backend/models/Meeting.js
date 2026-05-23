const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  topics: [{ type: String }],
  description: { type: String },
  scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  actionsTaken: [{ type: String }],
  conclusion: { type: String },
  notificationSent: { type: Boolean, default: false },
  reminder24Sent: { type: Boolean, default: false },
  reminder1Sent: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);