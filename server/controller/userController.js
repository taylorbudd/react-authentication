const mongoose = require('mongoose');
const User = require('../model/user');

async function registerUser(req, res){
    //getting user data from request body and returning error if user or password is missing
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password) return res.status(400).json({'message': 'Username and password are required'});
    
    //checking if user already exists
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.status(409).json({'message': 'Username already exists'});

    //creating new user
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

async function getUser(req, res){
    try {
        const cookies = req.cookies;
        console.log("COOKIES: " + JSON.stringify(cookies));
        if(!cookies?.token){
            return res.status(401).send("No token");
        }
        const refreshToken = cookies.token;
        const user = await User.findOne({refreshToken: refreshToken}).exec();
        console.log("USER: " + JSON.stringify(user));
        if(!user){
            return res.status(404).json({message: "User not found"});
        }else{
            res.status(200).json({user: user});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    registerUser,
    getUser,
    //viewUserProfile,
}