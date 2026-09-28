const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            throw new Error ('invalid token');
        }
        const decodedObj = await jwt.verify(token, "DevTinder@123");
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error ('no user exists');
        }
        req.user = user;
        next();
    } catch (error) {
        res.send('ERROR: '+ error.message);
    }
};

module.exports = {
    userAuth,
}