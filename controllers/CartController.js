const CartModel = require("../models/CartModel");

const getAllCarts = async (req, res) => {
    try {
        const carts = await CartModel.getAll();
        return res.json(carts)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

const getOneCart = async (req,res) => {
    try {
        const cart = await CartModel.getOne(req.params.id)
        return res.json(cart)
    }catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

const insertCart = async (req, res) => {
    try {
        const cart = await CartModel.insert(req.body.userId)
        return res.json(cart)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }

}

const deleteCart = async (req, res) => {
    try {
        const cart = await CartModel.remove(req.params.id)
        return res.json(cart)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

const getProducts = async (req, res) => {
    try {
        const cart = await CartModel.getProducts(req.params.id)
        return res.json(cart)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

const addProduct = async (req, res) => {
    let {id, qty} = req.body

    // console.log({qty})
    try {
        const cart = await CartModel.addProduct(req.params.id, id, qty)
        return res.json(cart)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}


const deleteProduct = async (req,res) => {
    try {
        const cart = await CartModel.deleteProduct(req.params.id, req.params.idProd)
        return res.json(cart)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}


module.exports = {
    getAllCarts,
    getOneCart,
    insertCart,
    deleteCart,
    getProducts,
    addProduct,
    deleteProduct
}