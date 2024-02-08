const User = require('../model/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

async function handleRefreshToken(req, res){
    const cookies = req.cookies;
    if(!cookies?.token){
        return res.status(401).send("No token");
    }

    const refreshToken = cookies.token;

    const user = await User.findOne({refreshToken: refreshToken});

    if(!user) return res.status(403).send("No user");

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || user.username !== decoded.username) return res.status(403).send("Invalid token");
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