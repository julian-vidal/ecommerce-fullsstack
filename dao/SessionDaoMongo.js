require("dotenv").config();
const mongoose = require("mongoose");

const {MONGO_URL} = process.env

if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
}

const SessionSchema = new mongoose.Schema({
    expires: {type: Object},
    session: {type: String },
    _id: {type: String}
})

const Session = mongoose.model("sessions", SessionSchema)

const getUserId = async id => {
    try {
        const res = await Session.findOne({_id:id})
        const passport = JSON.parse(res.session)
        // console.log({user: passport.user._id}); 
        return passport.user._id
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    getUserId
}