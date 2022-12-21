const SessionModel = require("../models/SessionModel")

const getOneSession = async (req, res) => {
    try {
        console.log("SessionID: " + req.sessionID)
        // console.log(typeof req.sessionID); 
        const session = await SessionModel.getOne(`${req.sessionID}`)
        console.log({session})
        return res.json(session)
    } catch (error) {
        return res
            .status(400)
            .json({error})
    }
}

module.exports = {
    getOneSession
}