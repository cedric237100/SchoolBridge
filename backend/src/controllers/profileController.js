const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll({
            where: { is_approved: true },
            include: [{ model: User, attributes: ['username', 'email'] }]
        });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Fetching profiles failed', error: error.message });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username', 'email'] }]
        });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Fetching profile failed', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { full_name, bio, pedagogy, classes, subjects, experience_years, hourly_rate, whatsapp_number } = req.body;
    try {
        let profile = await Profile.findOne({ where: { user_id: req.user.id } });
        
        const profileData = {
            full_name,
            bio,
            pedagogy: pedagogy || 'both',
            classes: classes || [],
            subjects: subjects || [],
            experience_years: experience_years || 0,
            hourly_rate: hourly_rate || 0,
            whatsapp_number
        };

        if (profile) {
            profile = await profile.update(profileData);
        } else {
            profile = await Profile.create({ 
                user_id: req.user.id, 
                ...profileData
            });
        }
        
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Update profile failed', error: error.message });
    }
};

exports.uploadCV = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Please upload a file' });
        
        let profile = await Profile.findOne({ where: { user_id: req.user.id } });
        const cvUrl = `/uploads/cvs/${req.file.filename}`;
        
        if (profile) {
            profile = await profile.update({ cv_url: cvUrl });
        } else {
            profile = await Profile.create({ user_id: req.user.id, cv_url: cvUrl });
        }
        
        res.json({ message: 'CV uploaded successfully', cv_url: cvUrl });
    } catch (error) {
        res.status(500).json({ message: 'CV upload failed', error: error.message });
    }
};

exports.approveProfile = async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        
        profile.is_approved = true;
        await profile.save();
        
        res.json({ message: 'Profile approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Approval failed', error: error.message });
    }
};
