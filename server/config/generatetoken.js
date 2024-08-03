const jwt = require("jsonwebtoken")

const generateToken = (user) => {
   return jwt.sign({username: user.username,role: user.role, id:user._id},process.env.JWT_SECRET,{ expiresIn: "1d"})
}

module.exports = generateToken;
