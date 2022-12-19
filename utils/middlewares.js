// Imports
const compression = require("compression")
const passport = require("passport")
require("../utils/passport")
const multer = require("multer")

// Check if contact is logged in, if not redirects to the login page
const isLoggedOut = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect("/login")
    }
    next()
}

// Check if contact is logged in, if yes redirects to the account page
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect("/account")
    }
    next()
}

// Gzip
const gzipMiddleware = compression()

// Passport 
const passportLogin = passport.authenticate("login", {
    failureRedirect: "/error",
    failureMessage: "Invalid username or password",
    usernameField: "email",
    passwordField: "password"
})

const passportSignup = passport.authenticate("signup", {
    failureRedirect: "/error",
    failureMessage: "User already exists",
    usernameField: "email",
    passwordField: "password"
})


// Multer
let storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null, "public/uploads")
    },
    filename: function(req,file,cb) {
        console.log("Executing filename", file);
        let extension = file.originalname.split(".")[file.originalname.length-1]
        cb(null, `${req.body.email}.${extension}`)
    }
})


let upload = multer({storage})



module.exports = {
    isLoggedIn,
    isLoggedOut,
    gzipMiddleware,
    passportLogin,
    passportSignup,
    upload
}