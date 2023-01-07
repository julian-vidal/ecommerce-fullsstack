require("dotenv").config()

const ChatDaoMongo = require("../dao/ChatDaoMongo")

const {MODE} = process.env

let ChatDao;

switch(MODE) {
  default:
    ChatDao = ChatDaoMongo
}

const getAll = () => {
  return ChatDao.find()
}

const getByEmail = (email) => {
  return ChatDao.findByEmail(email)
}

const insert = (message, type, email) => {
  return ChatDao.insert(message, type, email)
}

module.exports = {
  getAll,
  getByEmail,
  insert
}