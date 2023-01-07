const {Router} = require("express")

const {getAllChats, getByEmail, insertMessage } = require("../controllers/ChatController")

const routerChats = Router()

routerChats.get("/", getAllChats)
routerChats.get("/:emails", getByEmail)
routerChats.post("/", insertMessage)

module.exports = routerChats