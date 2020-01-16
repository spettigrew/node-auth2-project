express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())

require("dotenv").config()

// import routers
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")

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