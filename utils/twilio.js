require("dotenv").config()
const twilio = require("twilio")

const {TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER, TWILIO_WAP_NUMBER, MY_NUMBER} = process.env


const client = twilio(TWILIO_SID, TWILIO_TOKEN)

const smsMessage = {
    from: TWILIO_NUMBER,
    //to: MY_NUMBER, -> This is sent from the server
    body: "We received your order, it's been processed"
}

const wapMessage = {
    from: `whatsapp:${TWILIO_WAP_NUMBER}`,
    to: `whatsapp:${MY_NUMBER}`,
    //body: "Image test", -> Sent from the server (new order from ${first_name} ${last_name})
}

const sendMessage = async messageOptions => {
    try {
        const res = await client.messages.create(messageOptions)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    smsMessage,
    wapMessage,
    sendMessage
}