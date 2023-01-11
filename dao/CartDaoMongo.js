require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../utils/loggerConfig");
const ProductDaoMongo = require("./ProductDaoMongo");
const SessionDaoMongo = require("./SessionDaoMongo");
const UserDaoMongo = require("./UserDaoMongo")

const {MONGO_URL} = process.env

// let db;

if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
}

const CartSchema = new mongoose.Schema({
    products: {type: Array, required: true},
    user: {type: String, required: true}
}, {timestamps: true})

const Cart = mongoose.model("carts", CartSchema)

const find = async() => {
    return await Cart.find()
}

const findOne = async id => {
    id = mongoose.Types.ObjectId(id)
    try {
        const cart = await Cart.findOne({_id: id})
        for(let i=0; i< cart.products.length; i++){
            const product = await ProductDaoMongo.findOne(cart.products[i].id)
            const _product = {
                qty: cart.products[i].qty,
                ...product["_doc"]
            }
            cart.products[i] = _product
        }
        return cart
    } catch (error) {
        logger.log("error", error)
    }
}

// Creates a new cart object
const insert = async (userId, products) => {
    let user = userId;
    // console.log({userId});
    
    if(typeof userId === "undefined") {
        user = "anonymus"
    }
   
    let newCart = {
        user,
        products
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

const associateCartToUser = async userId => {
    let cartId = await insert(userId)
    cartId = JSON.stringify(cartId)
    cartId = JSON.parse(cartId)
    cartId = cartId._id
    await UserDaoMongo.saveCartId(userId, cartId)
    return cartId
}

const logProductAdded = (qty, productId, cartId) => {
    if(qty > 1) {
        logger.log("info", `${qty} units of the product ID${productId} were added to the cart Id ${cartId}`)
        return
    } 
    logger.log("info", `${qty} unit of the product ID${productId} was added to the cart Id ${cartId}`)
}

const addProductFrontEnd = async (sessionID, productId, qty) => {
    const userId = await SessionDaoMongo.getUserId(sessionID)
    
    if(typeof userId === "undefined"){
        console.log(`The user isn't logged in`);
    } else {
        const user = await UserDaoMongo.findById(userId)
        let cartId = user.cart_id

        if(typeof cartId === "undefined") {
            console.log("Estamos en el if");
            cartId = await associateCartToUser(userId)
            await addProduct(cartId,productId,qty)
            logProductAdded(qty, productId, cartId)
        } else {
            const cart = await findOne(cartId)
            if(cart === null ) {
                cartId = await associateCartToUser(userId)
                await addProduct(cartId,productId,qty)
                logProductAdded(qty, productId, cartId)
                return
            }
            await addProduct(cartId,productId,qty)
            logProductAdded(qty, productId, cartId)
        }
    }
}


const deleteProduct = async (id, productId) =>{
    id = mongoose.Types.ObjectId(id)
    let cart = await findOne(id)
    cart = Cart(cart)

    if(cart.products.length > 0) {
        let existingProduct = cart.products.find(product => product._id == productId)

        if (existingProduct){    
            const indexToUpdate = cart.products.findIndex(product => product._id === productId )
            cart.products.splice(indexToUpdate, 1)
            return await cart.save()
        } 
    }
/*
    return await Cart.updateOne({
        _id: id
    }, {
        $pull : {
            products: {_id:idProd}
        }
    })

    */
}

module.exports = {
    find,
    findOne,
    insert,
    remove,
    getProducts,
    addProduct,
    deleteProduct,
    addProductFrontEnd
}