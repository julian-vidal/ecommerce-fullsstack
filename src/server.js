// @ts-check

"use strict";
// Server setup
const express = require("express");
const app = express();
const PORT = 8080;
const { Router } = express;
const routerProducts = Router();
const Container = require("./utils/container");
const products = new Container("./products.json");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProducts);
app.use(express.static(__dirname + "/dist"));
const server = app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
server.on("error", err => console.log());



routerProducts.get("/", (req, res) => {
    try {
        (async () => {
            res.json(await products.readFile());
        })()
    }
    catch (err) {
        console.log(err);
    }
});


routerProducts.post("/", (req,res) => {
    try {
        const product = req.body;
        product.price = parseFloat(product.price);
        product.stock = parseInt(product.stock);
        product.timestamp = Date.now();
        products.save(product);
        res.json(product);
    } catch(error) {
        res.json({error})
    }
})
