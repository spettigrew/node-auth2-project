const bcrypt = require("bcryptjs")
const express = require("express")
const userModel = require("../users/user-model")
const restricted = require("../middleware/restricted")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
    const savedUser = await userModel.add(req.body)
    return res.status(201).json(savedUser)
    } catch (err) {
        next()
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findBy({ username })
        .first()
        
        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            req.session.user = user; //send cookie with this user information.

            return res.status(200).json({ message: `Welcome ${user.username}!`, })
        } else {
            return res.status(401).json({ message: "Invalid credentials", })
        }
    } catch (err) {
        next(err)
    }
})

router.get("/protected", restricted(), async (req, res, next) => {
    try {
        return res.status(200).json({ message: "You are authorized", })

    } catch (err) {
        next(err)
    }
})

router.get("/logout", restricted(), (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err)
        } else {
            return res.status(200).json({ message: "Successfully logged out." })
        }
    })
})


module.exports = router