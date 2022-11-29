require ("dotenv").config();
const mongoose = require("mongoose");

const {MONGO_URL} = process.env

if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
}

const ProductSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true },
    stock: {type: Number, required: true},
    sku: {type: String, required: true}
}, {timestamps: true})

const Product = mongoose.model("products", ProductSchema);

const find = async () => {
    return await Product.find()
}

const findOne = async id => {
    id = mongoose.Types.ObjectId(id)
    return await Product.findOne({_id: id})
}

const insert = async newProduct => {
    newProduct.price = parseFloat(newProduct.price);
    newProduct.stock = parseInt(newProduct.stock);
    const product = new Product(newProduct);
    return await product.save();
}

const update = async (id, product) => {
    const {name, description, price, stock, image, sku } = product
    id = mongoose.Types.ObjectId(id)

    return await Product.updateOne({
        _id: id
    }, {
        $set: {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            image,
            sku
        }
    })
}

const remove = async id => {
    id = mongoose.Types.ObjectId(id)
    return await Product.deleteOne({
        _id: id
    })
}

module.exports = {
    find,
    findOne,
    insert,
    update,
    remove
}