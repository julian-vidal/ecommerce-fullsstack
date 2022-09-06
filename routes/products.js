const { Router } = require("express");
const routerProducts = Router();
const dotenv = require("dotenv");
dotenv.config();
const IS_ADMIN = true;

const MODE = process.env.MODE

// const MONGO_DBNAME = process.env.MONGO_DBNAME;
// console.log(`MONGO_DBNAME = ${MONGO_DBNAME}`)


switch(MODE) {
    case "local":
        const Container = require("../utils/container");
        const products = new Container("./products.json");
        routerProducts.get("/", async (req, res) => {
            try {
                res.json(await products.readFile());
            }
            catch (err) {
                console.log(err);
            }
        });
        
        
        routerProducts.get("/:id", async (req, res) => {    
            try {
                const id = parseInt(req.params.id);
                const response = await products.getById(id, "product")
                res.json(response)
            }
            catch (err) {
                console.log(err);
            }
        });
        
        
        routerProducts.post("/", async (req,res) => {
            if (IS_ADMIN) {
                try {            
                    const product = req.body;
                    product.price = parseFloat(product.price);
                    product.stock = parseInt(product.stock);
                    const response = await products.save(product, "product");
                    res.json({response});
                } catch(error) {
                    res.json({error})
                }
            } else {
                res.json({error: PERMSSION_ERROR_MSG})
            }
        })
        
        routerProducts.put("/:id", async (req,res) => {
            if (IS_ADMIN) {
                try{
                    const id = parseInt(req.params.id);
                    let product = req.body;
                    product.id = id;
                    product.price = parseFloat(product.price);
                    product.stock = parseInt(product.stock);
                    const response = await products.updateById(product, id, "product");
                    res.json({response});
                } catch(error) {
                    res.json({error})
                }
            } else {
                res.json({error: PERMSSION_ERROR_MSG})
            }      
        })
        
        routerProducts.delete("/:id", async (req,res) => {
            if (IS_ADMIN) {
                try {
                    const id = parseInt(req.params.id);
                    const response = await products.deleteById(id, "product");
                    res.json({response})
                } catch (error) {
                    res.json({error})
                }
            } else {
                res.json({error: PERMSSION_ERROR_MSG})
            }
        
        })
        break;
    case "mongo":
        const containerMongo = require("../controllers/mongo/product");
        const products2 = new containerMongo("product")
        console.log(products2)

        routerProducts.get("/", async (req, res) => {
            try {
                res.json("This is Mongo");
            }
            catch (err) {
                console.log(err);
            }
        });
        break;
}


module.exports = routerProducts;