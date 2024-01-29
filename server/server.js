const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();
const connectDB = require('./db/db');

//Connecting to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/refresh', require('./routes/refresh'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));

//app.use(verifyJWT);


app.use((req,res,next) => {
    console.log("REQUEST: " + JSON.stringify(req.body));
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully');
    app.listen(4000, () => {console.log("Server is running on port 4000")});
});