const User = require('../model/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

function handleRefreshToken(req, res){
    const cookies = req.cookies
    if(!cookies?.token) return res.status(401);

    console.log("REFRESH TOKEN: " + cookies.token);
    const refreshToken = cookies.token;

    const user = User.find({refreshToken: refreshToken});

    if(!user) return res.status(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || user.username !== decoded.username) return res.status(403);
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "30s",
                }
            );
            res.json({ accessToken })
        }
    );
}



module.exports = {
    handleRefreshToken,
}