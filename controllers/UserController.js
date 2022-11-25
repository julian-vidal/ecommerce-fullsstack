const UserModel = require("../models/UserModel")
const logger = require("../utils/loggerConfig")


const User = UserModel.User

const getAllUsers = async (req,res) => {
    try {

    } catch (err) {
        
    }
}

const getOneUser = async email => {
    try {
        return await UserModel.getOne(email)
    } catch (error) {
        logger.log("error", error)
        return
    }
}

module.exports = {
    User,
    getOneUser
}