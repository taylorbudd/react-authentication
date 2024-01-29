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

    console.log("USER IN DATABASE: " + userInDb)

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

            userInDb.refreshToken = refreshToken;
            
            res.cookie("token", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            res.status(200).json({
                message: "User logged in",
                user: userInDb,
                token: accessToken,
            });
        }
    }else{
        throw new Error("Invalid username or password");
    }

}

const logoutUser = async (req, res) => {
    console.log("IM LOGGING OUT")
    console.log("REQ: " + req);
    const cookies = req.cookies;
    console.log("COOKIES: " + JSON.stringify(cookies));
    if(!cookies?.token) return res.status(401);
    const refreshToken = cookies.token;

    const user = await User.findOne({ refreshToken }).exec();
    if(!user){
        res.clearCookie("token", {httpOnly: true, sameSite: "none", secure: true});
        return res.sendStatus(204);
    }

    console.log("USER: " + JSON.stringify(user));

    user.refreshToken = "";
    const result = await user.save();
    console.log("RESULT: " + result);

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