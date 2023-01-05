const OrderModel = require("../models/OrderModel");

const getAllOrders = async (req, res) => {
  try {
      const orders = await OrderModel.getAll();
      return res.json(orders)
  } catch(err) {
      return res
          .status(400)
          .json({err})
  }
}

const getOneOrder = async (req,res) => {
  try {
      const order = await OrderModel.getOne(req.params.id)
      return res.json(order)
  }catch(err) {
      return res
          .status(400)
          .json({err})
  }
}

const insertOrder = async (req, res) => {
  const {userID, products} = req.body
  console.log({userID})
  console.log({products})

  if(!userID || !products ){
    return res
    .status(400)
    .json({error: "userID and products are required"})
  }

  try {
      const order = await OrderModel.insert(userID, products)
      return res
      .status(201)
      .json(order)
  } catch(err) {
    console.log(err);
      return res
          .status(400)
          .json({err})
  }
}


module.exports = {
  getAllOrders,
  getOneOrder,
  insertOrder
}