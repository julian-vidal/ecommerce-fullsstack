const ChatModel = require("../models/ChatModel")

const getAllChats = async(req,res) => {
  try {
    const chats = await ChatModel.getAll()
    return res.json(chats)
  } catch (error) {
    return res
      .status(400)
      .json({error})
  }
}

const getByEmail = async(req,res) => {
  console.log(req.params.email)
  try {
    const chats = await ChatModel.getByEmail(req.params.email)
    return res.json(chats)
  } catch (error) {
    return res
      .status(400)
      .json({error})
  }
}

const insertMessage = async (req,res) => {

  const {message, type, email} = req.body

  if(!message || !type || !email) {
    return res
    .status(400)
    .json({error: "message, type, and email are required"})
  }

  try {
    const msg = await ChatModel.insert(message, type, email)
    return res
      .status(201)
      .json(msg)

    
  } catch (error) {
    return res
      .status(400)
      .json({error})
  }
}

module.exports = {
  getAllChats,
  getByEmail,
  insertMessage
}