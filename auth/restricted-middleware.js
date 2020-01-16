module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({ message: "Incorrect credentials provided." })
    }
}
// user is on a session after a successful login. Restricts access to resources using middleware with sessions.