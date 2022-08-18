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
Carts Endpoint
============================================*/
const routerCarts = Router();
const carts = new Container("./carts.json");
app.use("/api/carts", routerCarts);


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


routerCarts.post("/:id/products", (req,res) => {
    try {
        (async () => {
            const id = parseInt(req.params.id);
            const product = req.body;
            let cart = await carts.getById(id, "cart")
            const response = await carts.addProductToCart(product, id, cart)
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

            const response = await carts.deleteProductFromCart(idCart, idProd, cart);
            res.json({response})
        })()
    } catch (error) {
        res.json({error})
    }
})

/* ============================================
Products endpoint
============================================*/
const routerProducts = Router();
const products = new Container("./products.json");
app.use("/api/products", routerProducts);


routerProducts.get("/", (req, res) => {
    (async () =>{
        try {
            res.json(await products.readFile());
        }
        catch (err) {
            console.log(err);
        }
    })()    
});


routerProducts.get("/:id", (req, res) => {
    (async () =>{
        try {
            const id = parseInt(req.params.id);
            const response = await products.getById(id, "product")
            res.json(response)
        }
        catch (err) {
            console.log(err);
        }
    })()
});


routerProducts.post("/", (req,res) => {
    if (IS_ADMIN) {
        try {
            (async () => {
                const product = req.body;
                product.price = parseFloat(product.price);
                product.stock = parseInt(product.stock);
                const response = await products.save(product, "product");
                res.json({response});
            })()
        } catch(error) {
            res.json({error})
        }
    } else {
        res.json({error: PERMSSION_ERROR_MSG})
    }
})

routerProducts.put("/:id", (req,res) => {
    if (IS_ADMIN) {
        try{
            (async () => {
                const id = parseInt(req.params.id);
                let product = req.body;
                product.id = id;
                product.price = parseFloat(product.price);
                product.stock = parseInt(product.stock);
                const response = await products.updateById(product, id, "product");
                res.json({response});
            })()
        } catch(error) {
            res.json({error})
        }
    } else {
        res.json({error: PERMSSION_ERROR_MSG})
    }      
})

routerProducts.delete("/:id", (req,res) => {
    if (IS_ADMIN) {
        try {
            (async () => {
                const id = parseInt(req.params.id);
                const response = await products.deleteById(id, "product");
                res.json({response})
            })()
        } catch (error) {
            res.json({error})
        }
    } else {
        res.json({error: PERMSSION_ERROR_MSG})
    }

})



/* ============================================
EJS setup
============================================*/
app.set("view engine", "ejs");
app.set("views", "./src/views");

const routerFrontEnd = Router();
app.use("/", routerFrontEnd);

let myArray = __dirname.split("/")
let dir = "";
for (let i = 1; i < myArray.length - 1; i++){
    dir = dir + "/" + myArray[i];
}

app.use(express.static(dir + "/dist"));


// routerFrontEnd.get("/", (req,res) => {
//     res.render("pages/index", {
//         title: "Homepage",
//         message: "This is a message"
//     })
// })

routerFrontEnd.get("/product/:id", (req, res) => {
    res.render("pages/product", {
        id: req.params.id,
        title: `Product ID: ${req.params.id}`
    })
})