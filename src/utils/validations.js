const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error ('name is not valid');
    } else if (!validator.isEmail(emailId)) {
        throw new Error ('emailId is not valid');
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [fisrtName, lastName, age, gender];
    const isEditAllowed = Object.keys(req.body).every(field => 
        allowedEditFields.includes(field)
    );
    return isEditAllowed;

}
module.exports = {
    validateSignUpData,
    validateEditProfileData,
};