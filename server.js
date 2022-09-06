// @ts-check

// "use strict";
/* ============================================
Imports
============================================*/
const express = require("express");
const Container = require("./utils/container");
const { Router } = express;
const axios = require("axios").default;




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
app.set("views", "./views");

const routerFrontEnd = Router();
app.use("/", routerFrontEnd);




// app.use(express.static(__dirname + "/../dist"));


routerFrontEnd.get("/", async (req,res) => {
    const products = await axios.get("http://localhost:8080/api/products")
    // console.log(products.data)
    // console.log(Object.keys(products))
    // .then(res => res.json())
    // .then(product => {
    res.render("pages/index", {
        title: "Homepage",
        products: products.data
    })
})

routerFrontEnd.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await axios.get(`http://localhost:8080/api/products/${id}`);
        // console.log(Object.keys(product) )
        res.render("pages/product", {
            title: `Product ID: ${req.params.id}`,
            product: product.data 
        })
    } catch (err) {
        console.log(err)
    }
    
})