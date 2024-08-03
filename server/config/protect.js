// const jwt = require('jsonwebtoken');
// const jwtDecode = require('jwt-decode');
// const asyncHandler = require('express-async-handler');
// const User = require('../models/auth');

// //middleware for checking user authorization
// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Get token from header
//             token = req.headers.authorization.split(' ')[1];

//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Get user from the token
//             req.user = await User.findById(decoded.id).select('-password');

//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401);
//             throw new Error('Not authorized, token failed');
//         }
//     }

//     if (!token) {
//         res.status(401);
//         throw new Error('Not authorized, no token');
//     }
// });
// module.exports = protect ;



// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/auth');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log(`Token received: ${token}`);

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(`Decoded token: ${JSON.stringify(decoded)}`);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            console.log(`User attached to req: ${req.user}`);

            next();
        } catch (error) {
            console.error(`Token verification error: ${error}`);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = protect;
