const compression = require("compression")

const isLoggedOut = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    next()
}

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect("/account")
    }
    next()
}

const gzipMiddleware = compression()

module.exports = {
    isLoggedIn,
    isLoggedOut,
    gzipMiddleware
}