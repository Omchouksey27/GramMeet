// memberRoutes.js
const router = require('express').Router();
const { getMembers, createMember, updateMember, deleteMember } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.use(protect, allowRoles('sachiv'));
router.get('/', getMembers);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);
module.exports = router;