const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
    products: {type: Array, required: false}
}, {timestamps: true})

const Cart = model("cart", CartSchema);

module.exports = {
    Cart,
    CartSchema
}