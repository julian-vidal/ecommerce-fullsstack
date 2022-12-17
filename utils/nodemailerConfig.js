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

const newUserAdminEmail = async (first_name, last_name, email, address, age, phone_number) => {
    try {
        const emailSettings = {
            to: ADMIN_EMAIL,
            from: REMOTE_USER,
            subject: `New customer registered: ${first_name} ${last_name} (${email})`,
            html: `
                Hi,<br><br>
                A new customer registered:<br>
                Name: ${first_name} ${last_name}<br>
                Email: ${email}<br>
                Address: ${address}<br>
                Age: ${age}<br>
                Phone Number: ${phone_number}
            `
        }
        const res = await transporter.sendMail(emailSettings)
        logger.log("info", `Response of sending an email to admin: ${res.response}`)
    } catch(error){
        logger.log("error", error)
    }
}


module.exports = {
    newUserAdminEmail,
}