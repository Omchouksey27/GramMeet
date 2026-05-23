const User = require('../models/User');

const getMembers = async (req, res) => {
  const members = await User.find({ role: { $in: ['ward_member', 'sarpanch'] } }).select('-password');
  res.json(members);
};

const createMember = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member removed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getMembers, createMember, updateMember, deleteMember };