require("dotenv").config()
const mongoose = require("mongoose")

const {MONGO_URL} = process.env

if(MONGO_URL) {
  mongoose.connect(MONGO_URL)
}

const ChatSchema = new mongoose.Schema({
  email: {type: String},
  type: {type: String},
  message: {type: String}
}, {timestamps: true})

const Chat = mongoose.model("chats", ChatSchema)

const find = async() => {
  return await Chat.find()
}

const findByEmail = async email => {
  return await Chat.find({email})
}

const insert = async (message, type, email) => {
  const newChat = {
    message,
    type,
    email
  }
  const chat = new Chat(newChat)
  return await chat.save()
}

module.exports = {
  find,
  findByEmail,
  insert
}