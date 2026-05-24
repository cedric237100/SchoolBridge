const Job = require('../models/Job');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.createJob = async (req, res) => {
    try {
        const { title, description, location, class_level, expected_wages, subjects } = req.body;
        const job = await Job.create({
            parent_id: req.user.id,
            title,
            description,
            location,
            class_level,
            expected_wages,
            subjects
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
            include: [{ model: User, attributes: ['username', 'email'] }]
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

        // Simple matching logic: overlapping subjects
        const tutorSubjects = profile.subjects || [];
        
        const jobs = await Job.findAll({
            where: {
                status: 'open',
                // This is a simplified check for JSON overlap in MySQL/Sequelize
                // In production, you'd use a more robust JSON search or a junction table
            }
        });

        // Manual filtering for demonstration (assuming subjects is an array)
        const recommendedJobs = jobs.filter(job => {
            const jobSubjects = job.subjects || [];
            return jobSubjects.some(s => tutorSubjects.includes(s));
        });

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

        if (!lastJob) {
            // If no job posted, just return top approved tutors
            const topTutors = await Profile.findAll({ where: { is_approved: true }, limit: 5 });
            return res.json(topTutors);
        }

        const jobSubjects = lastJob.subjects || [];
        const tutors = await Profile.findAll({ 
            where: { is_approved: true },
            include: [{ model: User, attributes: ['username'] }]
        });

        const recommendedTutors = tutors.filter(t => {
            const tutorSubjects = t.subjects || [];
            return tutorSubjects.some(s => jobSubjects.includes(s));
        });

        res.json(recommendedTutors);
    } catch (error) {
        res.status(500).json({ message: 'Tutor recommendations failed', error: error.message });
    }
};
