const Container = require("../utils/container");
const carts = new Container("./carts.json");

const find = async () => {
    return await carts.readFile()
}

const findOne = async id => {
    id = parseInt(id);
    return await carts.getById(id, "cart")
}

const insert = async newCart => {
    newCart.products= []
    return await carts.save(newCart, "cart")
}

const remove = async id => {
    id = parseInt(id)
    return await carts.deleteById(id, "cart")
}

const getProducts = async id => {
    id = parseInt(id)
    const response = await carts.getById(id, "cart")
    return response.products
}

const addProduct = async (id, idProd) => {
    id = parseInt(id)
    idProd = parseInt(idProd)
    const cart = await carts.getById(id, "cart")
    return await carts.addProductToCart(idProd, id, cart)
}

const deleteProduct = async (id, idProd) => {
    id = parseInt(id)
    idProd = parseInt(idProd)
    const cart = await carts.getById(id, "cart")
    return await carts.deleteProductFromCart(id, idProd, cart)
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