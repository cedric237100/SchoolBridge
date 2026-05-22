const express = require('express');
const router = express.Router();
const { 
    getProfiles, 
    getProfileById, 
    updateProfile, 
    uploadCV,
    approveProfile 
} = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getProfiles);
router.get('/:id', getProfileById);
router.put('/', protect, authorize('tutor'), updateProfile);
router.post('/upload-cv', protect, authorize('tutor'), upload.single('cv'), uploadCV);
router.put('/:id/approve', protect, authorize('admin'), approveProfile);

module.exports = router;
