const express = require('express');

const profileRouter = express.Router();

const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validations');

profileRouter.get('/view', userAuth,  async(req, res) => {
    try{
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.send('Error: '+ error.message);
    }
});

profileRouter.patch('/edit', userAuth,  async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error ('Invalid Edit Request');
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.send('updated the user successfully');

    } catch (error) {
        res.send('could not update the user '+ error.messgae)
    }
})
//chnage password - verify old password and create new password.

//forget password - email authentication

module.exports = profileRouter;