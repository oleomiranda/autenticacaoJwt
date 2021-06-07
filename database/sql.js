const sql = require("mysql2")
const db = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

db.connect((err, succes) => {
    if (succes) { console.log('Conectado ao DB') }
    if (err) { console.log("DEU ERRO => ", err) }
})



module.exports = db