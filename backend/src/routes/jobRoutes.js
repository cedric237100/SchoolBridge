const express = require('express');
const router = express.Router();
const { 
    createJob, 
    getJobs, 
    getRecommendationsForTutor,
    getRecommendationsForParent,
    processPayment
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('parent'), createJob);
router.get('/', getJobs);
router.get('/recommendations/tutor', protect, authorize('tutor'), getRecommendationsForTutor);
router.get('/recommendations/parent', protect, authorize('parent'), getRecommendationsForParent);
router.post('/pay', protect, processPayment);

module.exports = router;
