const { sequelize } = require('./db');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Job = require('../models/Job');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        console.log('🔄 Seeding database...');

        // Truncate existing data (disable foreign key checks first)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await Job.destroy({ truncate: true, cascade: true });
        await Profile.destroy({ truncate: true, cascade: true });
        await User.destroy({ truncate: true, cascade: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('🧹 Cleaned existing tables.');

        const plainPassword = 'Password123';

        // 1. Create Users
        const paul = await User.create({
            username: 'paul_tutor',
            email: 'paul@test.com',
            password: plainPassword,
            role: 'tutor'
        });

        const florence = await User.create({
            username: 'florence_tutor',
            email: 'florence@test.com',
            password: plainPassword,
            role: 'tutor'
        });

        const jean = await User.create({
            username: 'jean_tutor',
            email: 'jean@test.com',
            password: plainPassword,
            role: 'tutor'
        });

        const marie = await User.create({
            username: 'marie_parent',
            email: 'marie@test.com',
            password: plainPassword,
            role: 'parent'
        });

        const john = await User.create({
            username: 'john_parent',
            email: 'john@test.com',
            password: plainPassword,
            role: 'parent'
        });

        const admin = await User.create({
            username: 'admin_sb',
            email: 'admin@schoolbridge.cm',
            password: plainPassword,
            role: 'admin'
        });

        console.log('👥 Created Users.');

        // 2. Create Profiles for Tutors
        await Profile.create({
            user_id: paul.id,
            full_name: 'Paul Nkemdirim',
            bio: 'Professeur de Mathématiques avec 5 ans d\'expérience dans les lycées de Douala. Spécialisé en préparation au Baccalauréat C/D/TI.',
            pedagogy: 'francophone',
            classes: ['terminale', 'premiere'],
            subjects: ['mathematiques', 'physique_chimie'],
            experience_years: 5,
            hourly_rate: 4000,
            whatsapp_number: '237699999999',
            is_approved: true,
            is_premium: true,
            city: 'Douala'
        });

        await Profile.create({
            user_id: florence.id,
            full_name: 'Florence Tsafack',
            bio: 'Experienced High School science teacher. Passionate about helping students crack GCE Ordinary and Advanced Level Chemistry/Biology.',
            pedagogy: 'anglophone',
            classes: ['upper_sixth', 'lower_sixth', 'form_5'],
            subjects: ['chemistry', 'biology'],
            experience_years: 3,
            hourly_rate: 5000,
            whatsapp_number: '237688888888',
            is_approved: true,
            is_premium: false,
            city: 'Yaoundé'
        });

        await Profile.create({
            user_id: jean.id,
            full_name: 'Jean Kamga',
            bio: 'Bilingual Math and Statistics tutor. Teaching both BEPC and GCE Ordinary Level preparations.',
            pedagogy: 'both',
            classes: ['3eme', 'form_5', 'sil', 'class_1'],
            subjects: ['mathematiques', 'maths'],
            experience_years: 4,
            hourly_rate: 3500,
            whatsapp_number: '237677777777',
            is_approved: true,
            is_premium: true,
            city: 'Bafoussam'
        });

        console.log('📝 Created Profiles.');

        // 3. Create Job postings for Parents
        await Job.create({
            parent_id: marie.id,
            title: 'Recherche répétiteur de Mathématiques Terminale',
            description: 'Besoin urgent d\'un tuteur qualifié pour accompagner mon fils en classe de Terminale D à Bastos. Cours le samedi et le mercredi soir.',
            location: 'Bastos, Yaoundé',
            pedagogy: 'francophone',
            class_level: 'terminale',
            expected_wages: 50000,
            subjects: ['mathematiques'],
            whatsapp_number: '237611111111',
            status: 'open',
            is_featured: false
        });

        await Job.create({
            parent_id: john.id,
            title: 'Chemistry tutor for GCE Advanced Level',
            description: 'Looking for a dedicated chemistry tutor for home coaching of an Upper Sixth student in Bonapriso. Focus on organic chemistry sections.',
            location: 'Bonapriso, Douala',
            pedagogy: 'anglophone',
            class_level: 'upper_sixth',
            expected_wages: 60000,
            subjects: ['chemistry'],
            whatsapp_number: '237622222222',
            status: 'open',
            is_featured: true
        });

        console.log('💼 Created Job Postings.');

        console.log('✅ Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        process.exit(1);
    }
}

seed();
