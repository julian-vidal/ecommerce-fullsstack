require("dotenv").config()

const UserDaoMongo = require("../dao/UserDaoMongo")


UserDao = UserDaoMongo

// const User = UserDao.User

const getAll = () => {
    return UserDao.find()
}

const getOne = email => {
    return UserDao.findOne(email)
}

const insert = user => {
    return UserDao.insert(user)
}

const update = (id, user) => {
    return UserDao.update(id, user)
}

const remove = id => {
    return UserDao.remove(id)
}

module.exports = {
    getAll,
    getOne,
    insert,
    update,
    remove
}