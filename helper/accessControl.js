const jwt = require("jsonwebtoken")
const db = require("../database/sql")

module.exports = {
    accessControl: (req, res, next) => { //so usuario logado consegue ver a pagina smoothies
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (decodedToken) {
                    return next()
                }
            })
        } else {
            return res.redirect("/login")
        }
    },

    redirectIfLogged: (req, res, next) => { //Helper que nao mostra pagina para usuario logado usado no login e signup 
        const token = req.cookies.jwt
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (decodedToken) {
                return res.redirect("/")
            } else {
                next()
            }
        })
    },

    userInfo: (req, res, next) => { //mostra nome do usuario 
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                const userId = decodedToken.id
                db.query("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
                    if (err) {
                        res.locals.user = null
                        next()
                    } else {
                        res.locals.user = user[0]
                        next()
                    }
                })
            })
        } else {
            res.locals.user = null
            next()
        }
    }
}