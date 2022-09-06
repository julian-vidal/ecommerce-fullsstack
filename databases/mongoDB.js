const mongoose = require("mongoose");

dotenv.config();


const MONGO_DBNAME = process.env.MONGO_DBNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_HOST = process.env.MONGO_HOST;

const connection = async () => {
    await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}`)
}

module.exports = connection;