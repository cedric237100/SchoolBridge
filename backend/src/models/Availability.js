const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Profile = require('./Profile');

const Availability = sequelize.define('Availability', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Profile,
            key: 'id'
        }
    },
    day_of_week: {
        type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

Profile.hasMany(Availability, { foreignKey: 'profile_id' });
Availability.belongsTo(Profile, { foreignKey: 'profile_id' });

module.exports = Availability;
