const { Router } = require("express");
const Container = require("../utils/container");
const routerProducts = Router();
const products = new Container("./products.json");
const IS_ADMIN = true;


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

module.exports = routerProducts;