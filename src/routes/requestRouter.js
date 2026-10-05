const express = require('express');

const requestRouter = express.Router();

const { authUser } = require('../middlewares/auth');
const RequestModel = require('../model/request');
const { User } = require('../models/user');

profileRouter.post('/request/:status/:toUserId', userAuth, async(req, res) => {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ['ignored', 'intrested'];
    if ((!allowedStatus).includes(status)){
        throw new Error ('status is invalid');
    } ;

    const toUser = await User.findOne(toUserId);
    if(!toUser){
        throw new Error ('user(reciver) deosnt exist')
    };

    const existingConnection = await Request.findOne({
        $or: [
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
        ]
    });
    if(existingConnection){
        throw new Error("connection already exists");
        
    }

    const requestData = new Request({
        fromUserId,
        toUserId,
        status
    });
    await requestData.save();
})

module.exports = requestRouter;

