const { Router } = require("express");
const {getAllCarts, getOneCart, insertCart, deleteCart, getProducts, addProduct, deleteProduct, addProductFrontEnd} = require("../controllers/CartController");

const routerCarts = Router();

routerCarts.get("/", getAllCarts);
routerCarts.get("/:id", getOneCart);
routerCarts.post("/", insertCart);
routerCarts.delete("/:id", deleteCart);
routerCarts.get("/:id/products", getProducts);
routerCarts.post("/:id/products", addProduct);
routerCarts.post("/products", addProductFrontEnd);
routerCarts.delete("/:id/products/:idProd", deleteProduct);


module.exports = routerCarts;