require('dotenv').config();
const mongoose = require('mongoose');
const { DB_NAME } = require('constants');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected !! DB Host: ${connection.connection.host}`)
    } catch (error) {
        console.log("Error: " + error);
        process.exit(1);
    }
}

module.exports = connectDB;
