const express = require('express');
const  connectDb  = require('./config/database');
const User = require('./models/user');
const app = express();

app.post('/signup', async (req, res) => {
    const userObj = {
        fisrtName: 'kedia',
        lastName: 'chey',
        emailId: 'abc@gmail.com',
        password: 'abc@123',
    };
    const user = new User(userObj);
    try {
        await user.save();
        res.send('user added successfully!');
    } catch(err){
        res.status(400).send('error saving the user');
    }
});

connectDb()
    .then(() => {
        console.log('connected to the database successfully');
        app.listen(7000, () => {
            console.log('server is running successfully at port 7000');
        });
    })
    .catch((err) => {
        console.error('Database cannot be connected');
    });