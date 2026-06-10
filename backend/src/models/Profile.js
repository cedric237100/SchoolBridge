const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    full_name: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.TEXT,
    },
    pedagogy: {
        type: DataTypes.ENUM('francophone', 'anglophone', 'both'),
        defaultValue: 'both'
    },
    classes: {
        type: DataTypes.JSON, // Array of class IDs
    },
    subjects: {
        type: DataTypes.JSON, // Array of subject IDs
    },
    experience_years: {
        type: DataTypes.INTEGER,
    },
    hourly_rate: {
        type: DataTypes.INTEGER, // in CFA
        defaultValue: 0
    },
    whatsapp_number: {
        type: DataTypes.STRING,
    },
    cv_url: {
        type: DataTypes.STRING,
    },
    is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    underscored: true
});

User.hasOne(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Profile;
