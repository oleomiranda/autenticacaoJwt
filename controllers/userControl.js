const db = require("../database/sql")
const bcrypt = require("bcryptjs")
const {createJwt} = require("../controllers/jwtConfig")
module.exports = {
    signup: (req, res) => {
        const { name, email, password, passwordConfirm } = req.body

        let erros = 0
        if (email == undefined || email == null || !email) { erros += 1 }
        if (name == undefined || name == null || !name) { erros += 1 }
        if (password == undefined || password == null || !password) { erros += 1 }
        if (passwordConfirm == undefined || passwordConfirm == null || !passwordConfirm) { erros += 1 }
        if (erros > 0) { return res.render("signup", { message: "Todos os campos são obrigatorios" }) }
        if (password !== passwordConfirm) { return res.render("signup", { message: "As senhas nao batem" }) }

        db.query("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
            if (user.length > 0) {
                return res.render("login", { message: "Voce ja esta cadastrado" })
            } else {
                const hashedPassword = bcrypt.hashSync(password, 8)
                db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, user) => {
                    if (err) {
                        return res.render("signup", { message: "Houve um erro tente novamente" })
                    } else {
                        const maxAge = 2 * 24 * 60 * 60 * 1000 
                        const token = createJwt(user.insertId)
                        res.cookie("jwt", token, {maxAge:maxAge, httpOnly: true, secure: true})
                        return res.redirect("/smoothies")
                    }

                })
            }
        })
    }
}