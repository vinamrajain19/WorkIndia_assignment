const { Sequelize } = require('sequelize');


require('dotenv').config();

const sequelize = new Sequelize('railway_db', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});


sequelize.authenticate()
    .then(() => console.log('DB connected...'))
    .catch(err => {
        console.log('DB notconnected...');
        console.log('Error: ', err.message);
        console.log('Details: ', err);
    });



module.exports = sequelize;