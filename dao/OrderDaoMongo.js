require("dotenv").config()
const mongoose = require("mongoose");
const logger = require("../utils/loggerConfig");
const {MONGO_URL} = process.env

if (MONGO_URL) {
  mongoose.connect(MONGO_URL)
}


const OrderSchema = new mongoose.Schema({
  products: {type: Array, required: true },
  status: {type: String, required: true},
  userEmail: {type: String, required: true}
}, {timestamps: true})

const Order = mongoose.model("orders", OrderSchema)

const find = async() => {
  return await Order.find()
}

const findOne = async id => {
  id = mongoose.Types.ObjectId(id)
  return await Cart.findOne({_id: id})
}


const insert = async (userEmail, products) => {
  const newOrder = {
    products,
    status: "generated",
    userEmail
  }

  const order = new Order(newOrder)
  return await order.save(order)  
 
}

module.exports = {
  find,
  findOne,
  insert
}