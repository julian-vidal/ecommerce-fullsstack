require("dotenv").config()
const mongoose = require("mongoose");
const logger = require("../utils/loggerConfig");
const {MONGO_URL} = process.env
const ProductDaoMongo = require("./ProductDaoMongo")

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
  return await Order.find();
}

const findOne = async id => {
  id = mongoose.Types.ObjectId(id)
  try {
    const order = await Order.findOne({_id: id})  
    for(let i=0; i < order.products.length; i++ ){
      const product = await ProductDaoMongo.findOne(order.products[i].id)
      const _product = {
        qty: order.products[i].qty,
        ...product["_doc"]
      }
      order.products[i] = _product
    }
    return order
  } catch (error) {
    logger.log("error", error)
  }
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