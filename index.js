const express = require('express');
const { connection } = require('./db');
const app = express()
const cors = require("cors");
require("dotenv").config()
const { router } = require("./routes/user.route")
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'https://lucky-parfait-82d7c2.netlify.app/',
    optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json())
app.use("/", router)
app.listen(process.env.port, async (req, res) => {
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("server running at 4500");
})