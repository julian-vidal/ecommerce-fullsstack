const { Router } = require("express");
const Container = require("../utils/container");
const routerCarts = Router();
const carts = new Container("./carts.json");


routerCarts.get("/", (req, res) => {
    (async () =>{
        try {
            res.json(await carts.readFile());
        }
        catch (err) {
            console.log(err);
        }
    })()    
});

routerCarts.get("/:id", (req, res) => {
    (async () =>{
        try {
            const id = parseInt(req.params.id);
            const response = await carts.getById(id, "cart")
            res.json(response)
        }
        catch (err) {
            console.log(err);
        }
    })()
});


routerCarts.post("/", (req,res) => {
    try {
        (async () => {
            const response = await carts.save({products: []}, "cart");
            res.json({response});
        })()
    } catch(error) {
        res.json({error})
    }
})


routerCarts.delete("/:id", (req,res) => {
    try {
        (async () => {
            const id = parseInt(req.params.id);
            const response = await carts.deleteById(id, "cart");
            res.json({response})
        })()
    } catch (error) {
        res.json({error})
    }
})


routerCarts.get("/:id/products", (req, res) => {
    (async () =>{
        try {
            const id = parseInt(req.params.id);
            const response = await carts.getById(id, "cart")
            res.json(response.products)
        }
        catch (err) {
            console.log(err);
        }
    })()
});


routerCarts.post("/:id/products/:idProd", (req,res) => {
    try {
        (async () => {
            const id = parseInt(req.params.id);
            const productId = parseInt(req.params.idProd);
            // const product = req.body;
            let cart = await carts.getById(id, "cart")
            const response = await carts.addProductToCart(productId, id, cart)
            res.json({response});
        })()
    } catch(error) {
        res.json({error})
    }
})

routerCarts.delete("/:id/products/:idProd", (req,res) => {
    try {
        (async () => {
            const idCart = parseInt(req.params.id);
            const idProd = parseInt(req.params.idProd);
            const cart = await carts.getById(idCart, "cart");

            const response = await carts.deleteProductFromCart(idProd, idCart, cart);
            res.json({response})
        })()
    } catch (error) {
        res.json({error})
    }
})


module.exports = routerCarts;