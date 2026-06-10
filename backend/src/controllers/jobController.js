const Job = require('../models/Job');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.createJob = async (req, res) => {
    try {
        const { title, description, location, pedagogy, class_level, expected_wages, subjects, whatsapp_number } = req.body;
        const job = await Job.create({
            parent_id: req.user.id,
            title,
            description,
            location,
            pedagogy: pedagogy || 'francophone',
            class_level,
            expected_wages,
            subjects: subjects || [],
            whatsapp_number
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Job creation failed', error: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: { status: 'open' },
            include: [{ model: User, attributes: ['username', 'email'] }],
            order: [
                ['is_featured', 'DESC'],
                ['createdAt', 'DESC']
            ]
        });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Fetching jobs failed', error: error.message });
    }
};

exports.getRecommendationsForTutor = async (req, res) => {
    try {
        const profile = await Profile.findOne({ where: { user_id: req.user.id } });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const tutorSubjects = profile.subjects || [];
        const tutorClasses = profile.classes || [];
        const tutorPedagogy = profile.pedagogy || 'both';
        
        const jobs = await Job.findAll({
            where: { status: 'open' },
            include: [{ model: User, attributes: ['username', 'email'] }]
        });

        // Match algorithm:
        // 1. Pedagogy overlap
        // 2. Class level overlap
        // 3. Subject overlap
        const recommendedJobs = jobs.filter(job => {
            const pedagogyMatches = (tutorPedagogy === 'both' || tutorPedagogy === job.pedagogy);
            if (!pedagogyMatches) return false;

            const classMatches = tutorClasses.includes(job.class_level);
            if (!classMatches) return false;

            const jobSubjects = job.subjects || [];
            const subjectMatches = jobSubjects.some(s => tutorSubjects.includes(s));
            return subjectMatches;
        });

        // Sort: featured jobs first
        recommendedJobs.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));

        res.json(recommendedJobs);
    } catch (error) {
        res.status(500).json({ message: 'Recommendations failed', error: error.message });
    }
};

exports.getRecommendationsForParent = async (req, res) => {
    try {
        const lastJob = await Job.findOne({ 
            where: { parent_id: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        const tutors = await Profile.findAll({ 
            where: { is_approved: true },
            include: [{ model: User, attributes: ['username', 'email'] }]
        });

        if (!lastJob) {
            // Return premium tutors first, then others
            tutors.sort((a, b) => (b.is_premium ? 1 : 0) - (a.is_premium ? 1 : 0));
            return res.json(tutors.slice(0, 10));
        }

        const jobSubjects = lastJob.subjects || [];
        const jobClass = lastJob.class_level;
        const jobPedagogy = lastJob.pedagogy;

        const recommendedTutors = tutors.filter(t => {
            const pedagogyMatches = (t.pedagogy === 'both' || t.pedagogy === jobPedagogy);
            if (!pedagogyMatches) return false;

            const tutorClasses = t.classes || [];
            const classMatches = tutorClasses.includes(jobClass);
            if (!classMatches) return false;

            const tutorSubjects = t.subjects || [];
            const subjectMatches = tutorSubjects.some(s => jobSubjects.includes(s));
            return subjectMatches;
        });

        // Sort by premium first
        recommendedTutors.sort((a, b) => (b.is_premium ? 1 : 0) - (a.is_premium ? 1 : 0));

        res.json(recommendedTutors);
    } catch (error) {
        res.status(500).json({ message: 'Tutor recommendations failed', error: error.message });
    }
};

// Mock Mobile Money payment controller
exports.processPayment = async (req, res) => {
    try {
        const { type, jobId, phoneNumber } = req.body;
        if (!phoneNumber) return res.status(400).json({ message: 'Phone number required' });

        if (type === 'premium') {
            const profile = await Profile.findOne({ where: { user_id: req.user.id } });
            if (!profile) return res.status(404).json({ message: 'Profile not found' });
            profile.is_premium = true;
            await profile.save();
            return res.json({ message: 'Subscription activated! Premium status granted.', profile });
        } else if (type === 'featured') {
            if (!jobId) return res.status(400).json({ message: 'Job ID required' });
            const job = await Job.findOne({ where: { id: jobId, parent_id: req.user.id } });
            if (!job) return res.status(404).json({ message: 'Job not found' });
            job.is_featured = true;
            await job.save();
            return res.json({ message: 'Job featured successfully! Your posting is bumped.', job });
        } else {
            return res.status(400).json({ message: 'Invalid payment type' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Payment processing failed', error: error.message });
    }
};
