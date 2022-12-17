

// Router
const {Router} = require("express")
const {isLoggedIn, isLoggedOut, passportLogin, upload: multer} = require("../utils/middlewares")
const passport = require("passport")
require("../utils/passport")

const {index, singleProduct, getSignup, getLogin, account, logout, error, postLogin, postSignup} = require("../controllers/FrontEndController") 
const routerFrontEnd = Router()

// GET Requests
routerFrontEnd.get("/", index )
routerFrontEnd.get("/product/:id", singleProduct )
routerFrontEnd.get("/login", isLoggedIn, getLogin)
routerFrontEnd.get("/signup", isLoggedIn, getSignup)
routerFrontEnd.get("/signup", isLoggedIn, getSignup)
routerFrontEnd.get("/account", isLoggedOut, account)
routerFrontEnd.get("/logout", isLoggedOut, logout)
routerFrontEnd.get("/error", error)


// POST Requests

routerFrontEnd.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/error",
        failureMessage: "Invalid username or password",
        usernameField: "email",
        passwordField: "password"
    }),
    postLogin
)


// routerFrontEnd.post("/login",passportLogin,postLogin)



// Without multer

routerFrontEnd.post(
    "/signup",
    passport.authenticate("signup", {
        failureRedirect: "/error",
        // failureMessage: "User already exists",
        usernameField: "email",
        passwordField: "password"
    }),
    postSignup
)


// With multer
/*
routerFrontEnd.post(
    "/signup",
    [
        passport.authenticate("signup", {
            failureRedirect: "/error",
            // failureMessage: "User already exists",
            usernameField: "email",
            passwordField: "password"
        }),
        multer.single("photo")
    ],
    postSignup
)
*/
module.exports = routerFrontEnd