const mongoose = require('mongoose');
const User = require('../model/user');

async function registerUser(req, res){
    try {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.user,
            password: req.body.password,
        });

        const result = await newUser.save();
        console.log(result);

        if(!result){
            throw new Error("Something went wrong");
        }

        setTimeout(() => {
            res.status(200).json({
                message: "User created",
                user: result,
            });
        });

    } catch (error) {
        console.log(error);
        return false;  
    }
};

module.exports = {
    registerUser
}