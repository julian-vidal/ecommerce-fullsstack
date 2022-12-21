require("dotenv").config();

const SessionDaoMongo = require("../dao/SessionDaoMongo")

const {MODE} = process.env;

let SessionDao;

SessionDao = SessionDaoMongo

const getOne = id => {
    return SessionDao.findOne(id)
}

module.exports = {
    getOne
}