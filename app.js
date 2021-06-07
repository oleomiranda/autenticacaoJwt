const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config()
const db = require("./database/sql")
const userControl = require("./controllers/userControl")
const createJwt = require("./controllers/createJwt")
const { accessControl, userInfo, redirectIfLogged } = require("./helper/accessControl")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({ defaultLayout: false }))

//adiciona o helper de mostrar nome do usuario em todas as rotas 
app.get("*", userInfo)

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/signup", redirectIfLogged, (req, res) => {
    res.render("signup")
})

app.post("/signup", userControl.signup)

app.get("/login", redirectIfLogged, (req, res) => {
    res.render("login")
})

app.post("/login", userControl.login)

app.get("/smoothies", accessControl, (req, res) => {
    res.render("smoothies")
})

app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.redirect("/")
})


app.listen(8081, console.log('RODANDO...'))