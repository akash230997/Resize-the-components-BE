require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/dataRoutes');

const MONGO_URL = process.env.MONGODB;
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/', apiRoutes);

app.get('/', (req, res) => {
    res.send("Helloworld!! This is my First Server.js")
})


mongoose.
    connect(MONGO_URL)
    .then(() => {
        console.log("Connected To MongoDB");
        app.listen(PORT, () => {
            console.log("Backend run")
        })
    }).catch((error) => {
        console.log("Error:", error);
    })