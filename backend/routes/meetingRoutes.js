// // meetingRoutes.js
// const router = require('express').Router();
// const { scheduleMeeting, getMeetings, getMeetingById, updateMeeting } = require('../controllers/meetingController');
// const { protect } = require('../middleware/authMiddleware');
// const { allowRoles } = require('../middleware/roleMiddleware');

// router.use(protect);
// router.get('/', getMeetings);
// router.get('/:id', getMeetingById);
// router.post('/', allowRoles('sachiv'), scheduleMeeting);
// router.put('/:id', allowRoles('sachiv'), updateMeeting);
// router.delete('/:id', allowRoles('sachiv'), async (req, res) => {
//   try {
//     await require('../models/Meeting').findByIdAndDelete(req.params.id);
//     res.json({ message: 'Meeting deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// module.exports = router;

const router = require('express').Router();
const {
  scheduleMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting
} = require('../controllers/meetingController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.get('/', getMeetings);
router.get('/:id', getMeetingById);
router.post('/', allowRoles('sachiv'), scheduleMeeting);
router.put('/:id', allowRoles('sachiv'), updateMeeting);
router.delete('/:id', allowRoles('sachiv'), deleteMeeting);

module.exports = router;