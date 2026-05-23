// authRoutes.js
const router = require('express').Router();
const { register, login, updateLanguage } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/language', protect, updateLanguage);
module.exports = router;