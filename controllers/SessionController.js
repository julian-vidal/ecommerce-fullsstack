const SessionModel = require("../models/SessionModel")

const getUserId = async (req, res) => {
    try {
        return await SessionModel.getUserId(req.sessionID)
    } catch (error) {
        return res
            .status(400)
            .json({error})
    }
}

module.exports = {
    getUserId
}