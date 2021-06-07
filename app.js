const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config()
const db = require("./database/sql")
const userControl = require("./controllers/userControl")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static("public"))
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({defaultLayout:false}))


app.get("/", (req, res) => {
    res.render("home")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", userControl.signup)

app.get("/login", (req, res) => {
    res.render("login")
})


app.get("/smoothies", (req, res) => {
    res.render("smoothies")
})

app.listen(8081, console.log('RODANDO...'))