const db = require("../database/sql")
const bcrypt = require("bcryptjs")
const createJwt = require("../controllers/createJwt")
module.exports = {
    signup: (req, res) => {
        const { name, email, password, passwordConfirm } = req.body

        let errors = 0
        if (email == undefined || email == null || !email) { errors += 1 }
        if (name == undefined || name == null || !name) { errors += 1 }
        if (password == undefined || password == null || !password) { errors += 1 }
        if (passwordConfirm == undefined || passwordConfirm == null || !passwordConfirm) { errors += 1 }
        if (errors > 0) { return res.render("signup", { message: "Todos os campos são obrigatorios" }) }
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
                        res.cookie("jwt", token, { maxAge: maxAge, httpOnly: true, secure: true })
                        return res.redirect("/smoothies")
                    }

                })
            }
        })
    },

    login: (req, res) => {
        const { email, password } = req.body
        if (email == undefined || email == null || !email) { return res.render("login", { message: "Preencha todos os campos" }) }
        if (password == undefined || password == null || !password) { return res.render("login", { message: "Preencha todos os campos" }) }

        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (err) {
                return res.render("login", { message: "Houve algum erro, tente novamente" })
            } else {

                const maxAge = 2 * 24 * 60 * 60 * 1000
                const token = await createJwt(user[0].id)
                res.cookie("jwt", token, { maxAge: maxAge, httpOnly: true, secure: true })
                return res.redirect("/smoothies")

            }
        })

    }
}