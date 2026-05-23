// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');

// // const protect = async (req, res, next) => {
// //   let token = req.headers.authorization?.split(' ')[1];
// //   if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = await User.findById(decoded.id).select('-password');
// //     next();
// //   } catch {
// //     res.status(401).json({ message: 'Token invalid' });
// //   }
// // };

// // module.exports = { protect };


// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   // Accept token from Authorization header OR query param (for PDF downloads)
//   let token =
//     req.headers.authorization?.split(' ')[1] ||
//     req.query.token;

//   if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch {
//     res.status(401).json({ message: 'Token invalid' });
//   }
// };

// module.exports = { protect };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = { protect };