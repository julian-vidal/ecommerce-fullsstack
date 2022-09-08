const ProductModel = require("../models/ProductModel");

const getAllProducts = async (req,res) => {
    try {
        const products = await ProductModel.getAll();
        return res.json(products)
    } catch (err) {
        return res
            .status(400)
            .json({err})
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await ProductModel.getOne(req.params.id)
        return res.json(product)
    } catch (err) {
        return res
            .status(400)
            .json({err})

    }
}

const insertProduct = async (req, res) => {
    try {
        const product = await ProductModel.insert(req.body)
        return res.json(product)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.update(req.params.id, req.body)
        return res.json(product)
    } catch (err) {
        return res
            .status(400)
            .json({err})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.remove(req.params.id)
        return res.json(product)
    } catch(err) {
        return res
            .status(400)
            .json({err})
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct
}