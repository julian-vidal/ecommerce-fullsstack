const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ProductDaoMongo = require("./ProductDaoMongo");



dotenv.config()

const MONGO_URL = process.env.MONGO_URL

// let db;

if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
    // db = mongoose.connect(MONGO_URL)
}

const CartSchema = new mongoose.Schema({
    products: {type: Array, required: false}
}, {timestamps: true})

const Cart = mongoose.model("carts", CartSchema)

const find = async() => {
    return await Cart.find()
}

const findOne = async id => {
    id = mongoose.Types.ObjectId(id)
    return await Cart.findOne({_id: id})
}

const insert = async newCart => {
    newCart.products = []
    const cart = new Cart(newCart);
    return await cart.save();
}

const remove = async id => {
    id = mongoose.Types.ObjectId(id)
    return await Cart.deleteOne({
        _id: id
    })
}

const getProducts = async id => {
    id = mongoose.Types.ObjectId(id)
    const response = await Cart.findOne({_id: id})
    return response.products
}

const addProduct = async (id, idProd) => {
    id = mongoose.Types.ObjectId(id);
    idProd = mongoose.Types.ObjectId(idProd)
    const product = await ProductDaoMongo.findOne(idProd)

    return await Cart.updateOne({
        _id: id
    }, {
        $push : {
            products: product
        }
    })
    
}

const deleteProduct = async (id, idProd) =>{
    id = mongoose.Types.ObjectId(id)
    idProd = mongoose.Types.ObjectId(idProd)

    return await Cart.updateOne({
        _id: id
    }, {
        $pull : {
            products: {_id:idProd}
        }
    })
}

module.exports = {
    find,
    findOne,
    insert,
    remove,
    getProducts,
    addProduct,
    deleteProduct
}