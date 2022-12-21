require("dotenv").config();
const mongoose = require("mongoose");

const {MONGO_URL} = process.env

if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
}

const SessionSchema = new mongoose.Schema({
    expires: {type: Object},
    session: {type: String }
})

const Session = mongoose.model("sessions", SessionSchema)

const findOne = async id => {
    try {
        console.log(`findOne DAO: ${id} `)
        const isValid = mongoose.Types.ObjectId.isValid(id)
        console.log({isValid})
        const _id = new mongoose.Types.ObjectId(id)
        // console.log(`id = ${_id}`);
        // console.log(`typeof id: ${typeof id}`)
        const res = await Session.findOne({_id})
        console.log("res:", res);
        return res
    } catch (error) {
        console.log(error)
    }
    // console.log("Hello")
    
}

module.exports = {
    findOne
}