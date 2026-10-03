const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error ("Not a avalid gender");
            }
        }
    },
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevTinder@123");
    return token;
};

userSchema.methods.validatePassword = async function(password) {
    const user = this;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};