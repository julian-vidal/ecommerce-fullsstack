require("dotenv").config();
const CartDaoLocal = require("../dao/CartDaoLocal");
const CartDaoMongo = require("../dao/CartDaoMongo");



const MODE = process.env.MODE;

let CartDao;

switch(MODE) {
    case "MONGO":
        CartDao = CartDaoMongo
        break;
    case "FIREBASE":
        break;
    default:
        CartDao = CartDaoLocal
}

const getAll = () => {
    return CartDao.find()
}

const getOne = id => {
    return CartDao.findOne(id)
}

const insert = userId => {
    return CartDao.insert(userId)
}

const remove = id => {
    return CartDao.remove(id)
}

const getProducts = id => {
    return CartDao.getProducts(id)
}

const addProduct = (id, productId, qty) => {
    return CartDao.addProduct(id, productId, qty)
}

const deleteProduct = (id, idProd) => {
    return CartDao.deleteProduct(id, idProd)
}

module.exports = {
    getAll,
    getOne,
    insert,
    remove,
    getProducts,
    addProduct,
    deleteProduct
}