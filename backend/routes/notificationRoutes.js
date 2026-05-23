// notificationRoutes.js
const router = require('express').Router();
const { getMyNotifications, markRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getMyNotifications);
router.put('/read', markRead);
module.exports = router;