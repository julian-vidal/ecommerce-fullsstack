// Router
const {Router} = require("express")
const {isLoggedIn, isLoggedOut, passportLogin, passportSignup, upload: multer, gzipMiddleware} = require("../utils/middlewares")
// const passport = require("passport")
require("../utils/passport")

const {index, singleProduct, getSignup, getLogin, account, logout, error, postLogin, postSignup, getChat } = require("../controllers/FrontEndController") 
const routerFrontEnd = Router()

// GET Requests
routerFrontEnd.get("/", [gzipMiddleware, isLoggedOut], index )
routerFrontEnd.get("/product/:id", [gzipMiddleware, isLoggedOut], singleProduct )
routerFrontEnd.get("/login", [gzipMiddleware, isLoggedIn], getLogin)
routerFrontEnd.get("/signup", [gzipMiddleware, isLoggedIn], getSignup)
routerFrontEnd.get("/account", [gzipMiddleware,isLoggedOut], account)
routerFrontEnd.get("/logout", [gzipMiddleware,isLoggedOut], logout)
routerFrontEnd.get("/chat", [gzipMiddleware, isLoggedOut], getChat )
routerFrontEnd.get("/error", gzipMiddleware, error)


// POST Requests
routerFrontEnd.post("/login", [gzipMiddleware, passportLogin],postLogin)
routerFrontEnd.post("/signup",[multer.single("photo"),passportSignup, gzipMiddleware],postSignup)


module.exports = routerFrontEnd