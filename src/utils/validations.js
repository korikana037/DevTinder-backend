const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error ('name is not valid');
    } else if (!validator.isEmail(emailId)) {
        throw new Error ('emailId is not valid');
    }
};

module.exports = {
    validateSignUpData,
};