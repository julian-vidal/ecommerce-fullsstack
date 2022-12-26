require("dotenv").config();

const SessionDaoMongo = require("../dao/SessionDaoMongo")

const {MODE} = process.env;

let SessionDao;

SessionDao = SessionDaoMongo

const getUserId = id => {
    return SessionDao.getUserId(id)
}

module.exports = {
    getUserId
}