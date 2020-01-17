const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

// import routers
const dbConfig = require("./data/db-config")
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    // name: "cookie",  //default name is sid (hackers will know we're using sessions) Not necessary to rename the cookie.
    resave: false, //do not re-create the cookie. Save it.
    saveUninitialized: false, //GDPR laws against setting cookies automatically. Once user opts to save, change to true.
    secret: "this is a secret cookie",
    cookie: {
        httpOnly: true, //this cookie can not be accessed through JS.
        maxAge: 1000 * 60 * 60 * 24, 
        // 1 day, then the cookie will expire
        secure: false, //change when you go into production = true
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true,
    }),
}))
 
require("dotenv").config()

// import api endpoints, router files
server.use("/users", userRouter)
server.use("/auth", authRouter)

server.get("/", (req, res, next) => {
    res.json({ message: "Welcome, coder."})
})

server.use((err, req, res, next) => {
    console.log("Error:", err)
    res.status(500).json({ message: "Incorrect, check your work." })
})

module.exports = server;