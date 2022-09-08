const dotenv = require("dotenv");
const ProductDaoLocal = require("../dao/ProductDaoLocal");
const ProductDaoMongo = require("../dao/ProductDaoMongo")

// import dotenv from "dotenv";
// import * as ProductDaoLocal from "../dao/ProductDaoLocal";

dotenv.config()

const MODE = process.env.MODE;

let ProductDao;

switch(MODE) {
    case "MONGO":
        ProductDao = ProductDaoMongo
        break;
    case "FIREBASE":
        break;
    default:   
        ProductDao = ProductDaoLocal;
}

const getAll = () => {
    return ProductDao.find();
}

const getOne = id => {
    return ProductDao.findOne(id)
}

const insert = product => {
    return ProductDao.insert(product)
}

const update = (id, product) => {
    return ProductDao.update(id, product)
}

const remove = id => {
    return ProductDao.remove(id)
}

module.exports = {
    getAll,
    getOne,
    insert,
    update,
    remove
}