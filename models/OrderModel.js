require("dotenv").config()
const OrderDaoMongo = require("../dao/OrderDaoMongo")

const {MODE} = process.env

let OrderDao;

switch(MODE){
  default:
    OrderDao = OrderDaoMongo
}

const getAll = () => {
  return OrderDao.find()
}

const getOne = id => {
  return OrderDao.findOne(id)
}

const insert = (userEmail, products) => {
  return OrderDao.insert(userEmail, products)
}


module.exports = {
  getAll,
  getOne,
  insert
}