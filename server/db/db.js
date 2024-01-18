const Mongoose = require('mongoose');

Mongoose.connect("mongodb+srv://taylorbudd:RY9YEDfEW57aFipB@cluster0.vilpgos.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    dbName: "react-login-db",
})
