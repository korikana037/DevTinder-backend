const express = require('express');
const  connectDb  = require('./config/database');
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validations');
const bcrypt = require('bcrypt');


const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
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

app.get('/user', async (req, res) => {
    const userMail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userMail}).exec();
        if (!user){
            res.status(404).send('user not found');
        }else{
            res.send(user);
        } 
    }catch(error){
        res.send('something went wrong')
    }
});

app.get('/feed', async (req, res) => {
    try {
        const users = User.find({});
        res.send(users); 
    } catch (error) {
        res.send('seomething went wrong');
    }
});

app.delete('/user', async(req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send('user deleted successfully');
    } catch (error) {
        res.status(400).send('seomething went wrong');
    }
})

app.patch('/user/:userId', async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [ "firstName", "lastName", "gender"]
    const isUpdateAllowed = Object.keys(data).every((k) => {
       return ALLOWED_UPDATES.includes(k)
    });
    if (!(isUpdateAllowed)){
        throw new Error ('Not allowed. update is performing on restricted fileds.')
    }
        await User.findByIdAndUpdate({_id: userId}, data, {
            runValidators: true,
        });
        res.send('user updated successfully');
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})


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