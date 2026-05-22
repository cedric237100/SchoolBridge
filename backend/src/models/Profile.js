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
    subjects: {
        type: DataTypes.JSON,
    },
    experience_years: {
        type: DataTypes.INTEGER,
    },
    cv_url: {
        type: DataTypes.STRING,
    },
    is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

User.hasOne(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Profile;
