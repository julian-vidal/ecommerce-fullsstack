// Router
const {Router} = require("express")
const {isLoggedIn, isLoggedOut, passportLogin, passportSignup, upload: multer, gzipMiddleware} = require("../utils/middlewares")
// const passport = require("passport")
require("../utils/passport")

const {index, singleProduct, getSignup, getLogin, account, logout, error, postLogin, postSignup} = require("../controllers/FrontEndController") 
const routerFrontEnd = Router()

// GET Requests
routerFrontEnd.get("/", index )
routerFrontEnd.get("/product/:id", gzipMiddleware, singleProduct )
routerFrontEnd.get("/login", [gzipMiddleware, isLoggedIn], getLogin)
routerFrontEnd.get("/signup", [gzipMiddleware, isLoggedIn], getSignup)
routerFrontEnd.get("/signup", [gzipMiddleware,isLoggedIn], getSignup)
routerFrontEnd.get("/account", [gzipMiddleware,isLoggedOut], account)
routerFrontEnd.get("/logout", [gzipMiddleware,isLoggedOut], logout)
routerFrontEnd.get("/error", gzipMiddleware, error)


// POST Requests
routerFrontEnd.post("/login", [gzipMiddleware, passportLogin],postLogin)
routerFrontEnd.post("/signup",[multer.single("photo"),passportSignup, gzipMiddleware],postSignup)


module.exports = routerFrontEnd