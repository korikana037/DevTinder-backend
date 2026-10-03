const express = require('express');
const  connectDb  = require('./config/database');
const authRouter = require("./routes/authRouter");
const profileRouter = require('./routes/profileRouter');
const requestRouter = require('./routes/requestRouter');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/profile', profileRouter);



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