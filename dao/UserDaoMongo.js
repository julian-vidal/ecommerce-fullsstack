require("dotenv").config()
const mongoose = require("mongoose")

const {MONGO_URL} = process.env

if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
}

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: false },
    last_name: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: false},
    age: {type: Number, required: false },
    phone_number:{type: String, required: false},
    photo: {type: String, required: false},
    role: {type: String, required: false}
}, {timestamps: true})

const User = mongoose.model("users", UserSchema)

const find = async() => {
    return await User.find()
}

const findOne = async email => {
    return await User.findOne({email})
}

const insert = async newUser => {
    if(newUser.age) {
        newUser.age = parseInt(newUser.age)
    }
    const user = new User(newUser)
    return await user.save()
}

const update = async (id, user) => {
    const {first_name,last_name,email,password,address,age,phone_number,photo,role} = user
    id = mongoose.Types.ObjectId(id)

    return await User.updateOne({
        _id: id
    }, {
        $set: {
            first_name,
            last_name,
            email,
            password,
            address,
            age,
            phone_number,
            photo, 
            role
        }
    })
}

const remove = async id => {
    id = mongoose.Types.ObjectId(id)

    return await User.deleteOne({
        _id: id
    })
}

module.exports = {
    find,
    findOne,
    insert,
    update,
    remove
}

// module.exports = User