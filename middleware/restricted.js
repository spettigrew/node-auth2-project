module.exports = (req, res, next) => {
    if (!req.session && !req.session.user) {
        res.status(401).json({ message: "Incorrect credentials provided." })
    } else {
        next()
    }
}
// user is on a session after a successful login. Restricts access to resources using middleware with sessions.