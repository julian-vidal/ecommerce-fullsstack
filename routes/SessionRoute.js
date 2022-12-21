const {Router} = require("express")

const {getOneSession} = require("../controllers/SessionController")

const routerSession = Router()

routerSession.get("/", getOneSession)

module.exports = routerSession