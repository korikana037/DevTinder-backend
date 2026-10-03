const {validateSignUpData} = require('../utils/validations');
const bcrypt = require('bcrypt');
const { User} = require('../models/user');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const {userAuth} = require('../middlewares/auth');


const express = require('express');

const authRouter = express.Router();




authRouter.post('/signup', async (req, res) => {
    try {
        //validate the data
        validateSignUpData(req);
        // encrypt the password: 
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.send('user added successfully!');
    }catch(error){
        res.status(400).send('error saving the user '+ error.message);
    }
});


authRouter.post('/login', async(req, res) => {
    try {
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error ('enter valid email'); 
        }
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error ('No user existed')
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

            //create a jwt token
            const token = await user.getJWT();
            //add the token to cookie and send the response back to user.
            res.cookie('token', token);
            res.send('login successful');
        }else{
            throw new Error("password invalid");
        }

    } catch (error) {
        res.status(400).send('Error '+ error.message );        
    }
});

authRouter.post('/logout', async(req, res)=> {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send();
});


module.exports = authRouter;