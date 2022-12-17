const {hashPassword} = require("../utils/bcrypt")

const {getAll, getOne, insert,update,remove} = require("../models/UserModel")

const logger = require("../utils/loggerConfig")


const getOneUser = async (email, res) => {
    try {
        return await getOne(email)
    } catch (error) {
        logger.log("error", error)
        return
    }
}

const createUser = async (req, res) => {
    const {first_name, last_name, email, password, address, age,phone_number,photo} = req.body

    try{
        const existingUser = await getOneUser(email)

        if(existingUser){
            logger.log("error", `User already exists`)
            return
        }

        const user =  await insert({
            first_name,
            last_name,
            email,
            password: hashPassword(password),
            address,
            age,
            phone_number,
            photo,
            role: "CUSTOMER"
        })

        return user

    } catch (err){
        logger.log("error", `Error at controllers/UserController.js createUser function. ${err}`)   
    }
}
module.exports = {   
    getOneUser,
    createUser
}