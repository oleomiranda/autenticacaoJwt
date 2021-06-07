const jwt = require("jsonwebtoken")

module.exports = {
    createJwt: (userId) => {
        return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "2d"})
    }
}