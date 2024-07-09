const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const authMiddleware = require('../middleware/auth');
const { User } = require('../db_models');


// Register endpoint
router.post('/register', async (req, res) => {

    try {
        const { username, email, password, role } = req.body;

        const exists = await User.findOne({ where: { email } });

        if (exists) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const hashed = await bcrypt.hash(password, 20);

        const newUser = await User.create({ username, email, password: hashed, role });


        console.log('New User has been added :', newUser.toJSON());

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Error in registration : ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Login endpoint
router.post("/login", async (req, res) => {


    try {


        const user = await User.findOne({ where: { email: req.body.email } });


        if (!user) {
            return res.status(200).send({ message: "User does not exist!", success: false });
        }


        const hashPassword = await bcrypt.compare(req.body.password, user.password);

        if (!hashPassword) {
            return res.status(200).send({ message: "Invalid password!", success: false });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });


        res.send({
            message: "User logged in successfully!",
            success: true,
            data: token,
        });
    } catch (error) {
        res.status(500).send({ message: error.message, data: error, success: false });
    }
});



module.exports = router;