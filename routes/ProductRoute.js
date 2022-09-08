
const { Router } = require("express");
const {getAllProducts, getOneProduct, insertProduct,updateProduct, deleteProduct } = require("../controllers/ProductController");

const routerProducts = Router();


routerProducts.get("/", getAllProducts );
routerProducts.get("/:id", getOneProduct );
routerProducts.post("/", insertProduct );
routerProducts.put("/:id", updateProduct );
routerProducts.delete("/:id", deleteProduct );

module.exports = routerProducts