
const express = require("express")
const userModel = require("./user-model")
const restricted = require("../middleware/restricted")

const router = express.Router()

router.get("/", restricted, async (req, res, next) => {
    try {
        const users = await userModel.find()

        return res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})


module.exports = router