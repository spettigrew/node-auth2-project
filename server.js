express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")

// import routers
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")

const server = express()

const sessionConfig = {
    name: "cookie",  //default name is sid (hackers will know we're using sessions)
    secret: "this is a secret cookie",
    cookie: {
        maxAge: 1000 * 30, 
        // 1 sec * 30 sec only, then the cookie will expire
        secure: false, //change when you go into production = true
        httpOnly: true, //this cookie can not be accessed through JS.
    },
    resave: false, //do not re-create the cookie. Save it.
    saveUninitialized: false, //GDPR laws against setting cookies automatically. Once user opts to save, change to true.
};


server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session(sessionConfig))

require("dotenv").config()


// import api endpoints, router files
server.use("/users", userRouter)
server.use("/auth", authRouter)

server.get("/", (req, res, next) => {
    res.json({ message: "Welcome, coder."})
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Incorrect, check your work." })
})

module.exports = server;