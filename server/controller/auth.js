// // controllers/userController.js
// const User = require('../models/auth');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const register = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).send('Missing values');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ username,email, password: hashedPassword, role });
//     await newUser.save();

//     res.status(201).send('User registered');
//   } catch (error) {
//     res.status(500).send('Error registering user');
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).send('Missing values');
//     }

//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).send('Invalid credentials');
//     }

//     const token = jwt.sign({ id: user._id, role: user.role, username:username }, 'your_jwt_secret', { expiresIn: '1d' });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).send('Error logging in');
//   }
// };

// module.exports = {
//   register,
//   login,
// };




const asyncHandler = require("express-async-handler");
const User = require('../models/auth');
const generateToken = require("../config/generatetoken");
const bcrypt = require('bcryptjs');

const register = asyncHandler(async (req, res) => {
    const { username, email, role, password } = req.body;

    if (!username || !email || !role || !password) {
        res.status(400);
        throw new Error("Please enter all the fields.");
    }

    const userNameExist = await User.findOne({ username });
    const userEmailExist = await User.findOne({ email });

    if (userNameExist || userEmailExist) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,role, email, password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role:user.role,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("User not found");
    }
});


const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Please enter all the fields.");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user),
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

module.exports = {
  register,
  login,
};



