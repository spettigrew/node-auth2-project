const bcrypt = require("bcryptjs")
const express = require("express")
const userModel = require("../users/user-model")

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
        }
    } catch (err) {
        next()
    }
})

router.get("/logout",  (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                return res.json({ message: "Can not logout."})
            } else {
                return res.status(200).json({ message: "Logout successful." })
            }
        })
    } else {
        return res.status(200).json({ message: "The End." }) //if there is no session to begin with.
    }
}) 

module.exports = router