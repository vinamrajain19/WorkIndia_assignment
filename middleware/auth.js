const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {


    const token = req.header('Authorization')?.replace('Bearer ', '');


    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded_token;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

const isAdmin = (req, res, next) => {

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can access this.' });
    }
    next();
};

module.exports = { authMiddleware, isAdmin };