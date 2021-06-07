const jwt = require("jsonwebtoken")

module.exports = function createJwt(id) {
    const maxAge = 2 * 24 * 60 * 60
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: maxAge })
}