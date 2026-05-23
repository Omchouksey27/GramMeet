// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// const register = async (req, res) => {
//   try {
//     const { name, email, mobile, password, role, wardArea } = req.body;
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Email already exists' });

//     const user = await User.create({ name, email, mobile, password, role, wardArea });
//     res.status(201).json({ token: generateToken(user._id), user: { ...user._doc, password: undefined } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password)))
//       return res.status(400).json({ message: 'Invalid credentials' });

//     res.json({
//       token: generateToken(user._id),
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         wardArea: user.wardArea,
//         preferredLanguage: user.preferredLanguage,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateLanguage = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { preferredLanguage: req.body.language },
//       { new: true }
//     ).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { register, login, updateLanguage };


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const register = async (req, res) => {
  try {
    const { name, email, mobile, password, role, wardArea } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ name, email, mobile, password, role, wardArea });
    await user.save();

    return res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        wardArea: user.wardArea,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        wardArea: user.wardArea,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: err.message });
  }
};

const updateLanguage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { preferredLanguage: req.body.language },
      { new: true }
    ).select('-password');
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, updateLanguage };











