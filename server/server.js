const { MongoClient } = require('mongodb');
const express = require('express');
const UserController = require('./controller/userController');

require('./db/db');

const DB = "react-login-db";
const COLLECTION = "react-login-collection";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.post('/register', UserController.registerUser);

// Basic retrival of a single user
async function run(){
    try {
        const db = client.db(DB);
        const collection = db.collection(COLLECTION);

        const query = { username: 'Taylor' };
        const user = await collection.findOne(query);

        console.log("USER: " + JSON.stringify(user));
    } catch (error) {
        console.log(error);
    } finally{
        await client.close();
    }
}






app.listen(4000, () => {console.log("Server is running on port 4000")});