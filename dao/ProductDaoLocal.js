const Container = require("../utils/container");
const products = new Container("./products.json");

const find = async () => {
    return await products.readFile()
}

const findOne = async id => {
    id = parseInt(id);
    return await products.getById(id, "product")
}

const insert = async newProduct => {
    newProduct.price = parseFloat(newProduct.price);
    newProduct.stock = parseInt(newProduct.stock);
    return await products.save(newProduct, "product")
}


const update = async (id, product) => {
    id = parseInt(id);
    product.id = id;
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock);
    return await products.updateById(product, id, "product")
}

const remove = async id => {
    id = parseInt(id);
    return await products.deleteById(id, "product")
}

module.exports = {
    find,
    findOne,
    insert,
    update,
    remove
}