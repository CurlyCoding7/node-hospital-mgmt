const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const hospitalRoutes = require('./routes/hospital.js');
const patientRoutes = require('./routes/patient');
const psychiatristRoutes = require('./routes/psychiatrist');



dotenv.config();




const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error;
    }
    };
    
    mongoose.connection.on("disconnected", () => {
        console.log("mongoDB disconnected!")
    })
    
    mongoose.connection.on("connected", () => {
        console.log("mongoDB connected!")
    })

connect();


// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/hospital', hospitalRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/psychiatrist', psychiatristRoutes);


app.listen(5000, () => {
    console.log("Server is running!")
})