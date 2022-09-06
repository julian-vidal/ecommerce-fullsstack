const {Schema, model} = require("mongoose");

const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true },
    stock: {type: Number, required: true},
    sku: {type: String, required: true}
}, {timestamps: true});

const Product = model("product", ProductSchema);

module.exports = {
    Product,
    ProductSchema
}