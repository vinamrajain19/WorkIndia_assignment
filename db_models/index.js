const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const User = require('./user')(sequelize, DataTypes);
const Train = require('./train');
const Booking = require('./booking', sequelize, DataTypes);

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => console.log('This error occurred', error));

module.exports = {
    sequelize,
    User,
    Train,
    Booking,
};
