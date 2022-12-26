const {Router} = require("express")

const {getUserId} = require("../controllers/SessionController")

const routerSession = Router()

routerSession.get("/", getUserId)

module.exports = routerSession