const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

async function loginUser(req, res){
    const userLoggingIn = new User({
        username: req.body.user,
        password: req.body.password,
    });

    const userInDb = await getUser("", userLoggingIn.username);

    if(userInDb){
        const isMatch = userInDb.compareHash(userLoggingIn.password, userInDb.password);
        if(!isMatch){
            throw new Error("Not a match");
        }else{            
            const accessToken = jwt.sign(
                {username: userInDb.username},
                process.env.ACCESS_TOKEN_SECRET, 
                {
                    expiresIn: "30s",
                }
            );
            const refreshToken = jwt.sign(
                {username: userInDb.username},
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            await User.updateOne({ _id: userInDb._id }, { $set: { refreshToken: refreshToken } });
            
            res.cookie("token", refreshToken, {httpOnly: true, maxAge: 120000, sameSite: "none", secure: true});
            res.status(200).json({
                message: "User logged in",
                user: userInDb,
                token: accessToken,
            });
        }
    }else{
        res.status(401).json({message: "Invalid username or password"});
    }

}

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.token) return res.status(401);
    
    const refreshToken = cookies.token;

    const user = await User.findOne({ refreshToken }).exec();
    if(!user){
        res.clearCookie("token", {httpOnly: true, sameSite: "none", secure: true});
        return res.sendStatus(204);
    }

    const result = await user.updateOne({ _id: user._id }, { $set: { refreshToken: "" } });

    res.clearCookie("token", {httpOnly: true, sameSite: "none", secure: true});
    res.sendStatus(204); 
}

//private functions

async function getUser(userID = "", username = ""){
    try {
        if(userID !== ""){
            const user = await User.$where()
            return user;
        }else if(username !== ""){
            return await User.findOne({username: username});
        } else{

        }
    } catch (error) {
        
    }
}

module.exports = {
    loginUser,
    logoutUser,
}