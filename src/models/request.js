const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: {
            values: ["ignored", "intrested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status`
        }
    }
}, {timestamps: true});

requestSchema.pre('save', function(next){
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ('cannot send connection request to yourself')
    }
    next();
})

const RequestModel = new mongoose.model('RequestModel', requestSchema);

module.exports = RequestModel;