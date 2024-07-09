const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Train = require('./train');

const Booking = sequelize.define('Booking', {
    bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    trainId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('vacant', 'booked'),
        defaultValue: 'vacant',
    },
});




Booking.belongsTo(Train, { foreignKey: 'trainId', targetKey: 'trainId' });



module.exports = Booking;