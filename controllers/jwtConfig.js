const jwt = require("jsonwebtoken")

module.exports = {
    createJwt: (userId) => {
        const maxAge = 2 * 24 * 60 * 60 * 1000
        jwt.sign({ userId }, process.env.DB_JWTSECRET, (err, token) => {
            if (token) {
                res.cookie("jwt", token, { httpOnly: true })
            } else {
                return
            }
        })
    }
}