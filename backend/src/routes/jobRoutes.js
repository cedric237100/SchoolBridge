const express = require('express');
const router = express.Router();
const { 
    createJob, 
    getJobs, 
    getRecommendationsForTutor,
    getRecommendationsForParent 
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('parent'), createJob);
router.get('/', getJobs);
router.get('/recommendations/tutor', protect, authorize('tutor'), getRecommendationsForTutor);
router.get('/recommendations/parent', protect, authorize('parent'), getRecommendationsForParent);

module.exports = router;
