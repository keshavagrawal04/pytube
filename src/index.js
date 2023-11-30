require('dotenv').config({ path: './env' });
const app = require('./app');
const connectDB = require("./db");

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("MONGODB Connection FAILED: " + error)
    });
