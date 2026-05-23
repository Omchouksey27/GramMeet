const Notification = require('../models/Notification');

const getMyNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('meeting', 'title date');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ message: 'Marked all as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMyNotifications, markRead };