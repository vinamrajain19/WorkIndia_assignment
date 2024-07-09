const express = require('express');
const router = express.Router();


const { authMiddleware } = require('../middleware/auth');
const Booking = require('../db_models/booking');
const Train = require('../db_models/train');
const { Op } = require('sequelize');


router.use(authMiddleware);



// book train endpoint
router.post('/book', async (req, res) => {


    const { trainId, source, destination } = req.body;

    if (!trainId || !source || !destination) {
        return res.status(400).json({ status: 'ERROR', message: 'Missing required fields!' });
    }

    let transaction;

    try {

        transaction = await Train.sequelize.transaction();


        const train = await Train.findOne({
            where: { trainId, source, destination },
            lock: transaction.LOCK.UPDATE,
            transaction,
        });

        if (!train) {
            await transaction.rollback();
            return res.status(404).json({ status: 'ERROR', message: 'Train not found!' });
        }

        if (train.totalSeats <= 0) {
            await transaction.rollback();
            return res.status(400).json({ status: 'NO_SEATS', message: 'No seats available!' });
        }

        train.totalSeats -= 1;


        await train.save({ transaction });

        const booking = await Booking.create(
            {
                trainId,
                status: 'booked',
                source,
                destination,
            },
            { transaction }
        );

        await transaction.commit();

        return res.status(201).json({ status: 'SUCCESS', bookingId: booking.bookingId });

    } catch (error) {
        if (transaction) await transaction.rollback();
        return res.status(500).json({ status: 'ERROR', message: error.message });
    }
});

router.use(authMiddleware);


// get bookings details by Id
router.get('/:bookingId', async (req, res) => {


    const { bookingId } = req.params;

    try {


        const booking = await Booking.findByPk(bookingId, {
            include: [{ model: Train, attributes: ['trainName', 'trainId'] }],
        });


        console.log(booking);

        if (!booking) {
            return res.status(404).json({ status: 'ERROR', message: 'Booking not found!' });
        }

        const { source, destination, status } = booking;

        const { trainName, trainId } = booking.Train;

        const bookingDetails = {
            source,
            destination,
            trainName,
            trainId,
            status: status,
        };

        return res.status(200).json({ status: 'SUCCESS', bookingDetails });
    } catch (error) {
        return res.status(500).json({ status: 'ERROR', message: error.message });
    }
});


module.exports = router;