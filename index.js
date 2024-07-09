const express = require('express');

const sequelize = require('./config/db');

const trainRoute = require('./routes/trainRoute');
const userRoute = require('./routes/userRoute');

const bookingRoute = require('./routes/bookingRoute')
const adminRoute = require('./routes/adminRoute');

const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();


app.use(bodyParser.json());


app.use('/api/admin', adminRoute);
app.use('/api/users', userRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/trains', trainRoute);


sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log('DB connected...');
    });
}).catch(err => {
    console.error('DB notconnected...', err);
});