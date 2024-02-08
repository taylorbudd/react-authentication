const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();
const connectDB = require('./db/db');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');


//Connecting to MongoDB
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/refresh', require('./routes/refresh'));

//private routes
app.use('/', verifyJWT, require('./routes/home'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies) to be sent in the request
    next();
});

app.options('*', (req, res) => {
    res.status(200)
        .header('Access-Control-Allow-Credentials', 'true') // Make sure to include this header in the response
        .end();
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully');
    app.listen(4000, () => {console.log("Server is running on port 4000")});
});