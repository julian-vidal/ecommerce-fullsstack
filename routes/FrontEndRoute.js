// Router
const {Router} = require("express")
const {isLoggedIn, isLoggedOut, passportLogin, passportSignup, upload: multer} = require("../utils/middlewares")
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
routerFrontEnd.post("/login",passportLogin,postLogin)
routerFrontEnd.post("/signup",[multer.single("photo"),passportSignup,],postSignup)


module.exports = routerFrontEnd