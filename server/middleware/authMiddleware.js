const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');

const authMiddleware = async (req, res, next) => {
    const authorizationHeader = req.headers.Authorization || req.headers.authorization; // Check for both uppercase and lowercase headers

    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        // Extract token by splitting on space, not an empty string
        const token = authorizationHeader.split(' ')[1]; 

        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if (err) {
                return next(new HttpError("Unauthorized. Invalid token.", 403));
            }
            req.user = info;  // Store token info (like user id) in req.user
            next();  // Proceed to next middleware/controller
        });
    } else {
        return next(new HttpError("Unauthorized. No token", 422));
    }
};

module.exports = authMiddleware;
