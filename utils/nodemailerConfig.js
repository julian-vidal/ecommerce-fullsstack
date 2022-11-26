require("dotenv").config()
const nodemailer = require("nodemailer")

const logger = require("./loggerConfig")

const {REMOTE_HOST, REMOTE_PORT, REMOTE_USER, REMOTE_PASSWORD, ADMIN_EMAIL} = process.env


const transporter = nodemailer.createTransport({
    host: REMOTE_HOST,
    port: REMOTE_PORT,
    auth: {
        user: REMOTE_USER,
        pass: REMOTE_PASSWORD,
    }
});


const newUserAdminEmail = {
    to: ADMIN_EMAIL,
    from: REMOTE_USER,
}

const sendEmail2Admin = async emailSettings => {
    try {
        const res = await transporter.sendMail(emailSettings)
        logger.log("info", `Response of sending an email to admin: ${res.response}`)
    } catch(error){
        logger.log("error", error)
    }
}


module.exports = {
    newUserAdminEmail,
    sendEmail2Admin,
}