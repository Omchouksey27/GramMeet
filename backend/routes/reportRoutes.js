// // reportRoutes.js
// const router = require('express').Router();
// const { getAnalytics, downloadMeetingPDF } = require('../controllers/reportController');
// const { protect } = require('../middleware/authMiddleware');

// router.use(protect);
// router.get('/analytics', getAnalytics);
// router.get('/pdf/:meetingId', downloadMeetingPDF);
// module.exports = router;

const router = require('express').Router();
const { getAnalytics, downloadMeetingPDF } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/analytics', getAnalytics);
router.get('/pdf/:meetingId', downloadMeetingPDF);

module.exports = router;