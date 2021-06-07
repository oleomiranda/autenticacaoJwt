const db = require("../database/sql")
const bcrypt = require("bcryptjs")

module.exports = {
    signup: (req, res) => {
        const {name, email, password, passwordConfirm} = req.body
        const hashedPassword = bcrypt.hashSync(password, 8)
        if(email != undefined || email != null || !email){
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
                if(user.length > 0){
                    return res.render("login", {message: "Voce ja esta cadastrado"})
                }else{
                    if(password !== passwordConfirm){
                        return res.render("signup", {message: "As senhas nao batem"})
                    }

                    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, success) => {
                        if(err){
                            return res.render("signup", {message: "Houve um erro tente novamente"})
                        }
                        return res.redirect("/smoothies")
                    })

                }
            })
        }else{
            res.render("signup", {message: "Todos os campos são obrigatorios"})
        }

    }
}