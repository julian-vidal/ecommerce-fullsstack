const { Router } = require("express");

const {getAllOrders, getOneOrder, insertOrder} = require("../controllers/OrderController")

const routerOrders = Router();

routerOrders.get("/", getAllOrders);
routerOrders.get("/:id", getOneOrder);
routerOrders.post("/", insertOrder);

module.exports = routerOrders