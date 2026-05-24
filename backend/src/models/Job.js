const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class_level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expected_wages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subjects: {
        type: DataTypes.JSON, // Array of subjects needed
    },
    status: {
        type: DataTypes.ENUM('open', 'filled', 'closed'),
        defaultValue: 'open'
    }
}, {
    underscored: true
});

User.hasMany(Job, { foreignKey: 'parent_id' });
Job.belongsTo(User, { foreignKey: 'parent_id' });

module.exports = Job;
