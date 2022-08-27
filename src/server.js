// @ts-check

// "use strict";
/* ============================================
Imports
============================================*/
const express = require("express");
const Container = require("./utils/container");
const { Router } = express;




/* ============================================
Server setup
============================================*/

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
server.on("error", err => console.log());

const IS_ADMIN = true;
const PERMSSION_ERROR_MSG = "You don't have permission to perform this action";


/* ============================================
Routes
============================================*/
const routerCarts = require("./routes/carts");
app.use("/api/carts", routerCarts);

const routerProducts = require("./routes/products");
app.use("/api/products", routerProducts);




/* ============================================
EJS setup
============================================*/
app.set("view engine", "ejs");
app.set("views", "./src/views");

const routerFrontEnd = Router();
app.use("/", routerFrontEnd);




app.use(express.static(__dirname + "/../dist"));


routerFrontEnd.get("/",  (req,res) => {
    res.render("pages/index", {
        title: "Homepage",
        message: "This is a message"
    })
})

routerFrontEnd.get("/product/:id", (req, res) => {
    res.render("pages/product", {
        id: req.params.id,
        title: `Product ID: ${req.params.id}`
    })
})