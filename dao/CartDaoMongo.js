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
    products: {type: Array, required: false},
    user: {type: String, required: false}
}, {timestamps: true})

const Cart = mongoose.model("carts", CartSchema)

const find = async() => {
    return await Cart.find()
}

const findOne = async id => {
    id = mongoose.Types.ObjectId(id)
    return await Cart.findOne({_id: id})
}

// Creates a new cart object
const insert = async userId => {
    let user = userId;
    
    if(typeof userId === "undefined") {
        user = "anonymus"
    }
   
    let newCart = {
        user,
        products: []
    }
    
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

const addProduct = async (id, productId, qty) => {
    id = mongoose.Types.ObjectId(id);
    let cart = await findOne(id)
    cart = Cart(cart)

    if(cart.products.length > 0) {
        let existingProduct = cart.products.find(product => product.id == productId)

        if (existingProduct){    
            const indexToUpdate = cart.products.findIndex(product => product.id === productId )
            cart.products[indexToUpdate].qty += qty
            return await cart.save()
        } 
    }

    cart.products.push({
        id: productId,
        qty
    })
    
    return await cart.save()
    
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