// attendanceRoutes.js
const router = require('express').Router();
const { markAttendance, getMeetingAttendance, getMemberAttendance, getDefaulters } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.post('/mark', allowRoles('sachiv'), markAttendance);
router.get('/meeting/:meetingId', getMeetingAttendance);
router.get('/member/:memberId', getMemberAttendance);
router.get('/member', getMemberAttendance); // own record
router.get('/defaulters', allowRoles('sachiv'), getDefaulters);
module.exports = router;