const express = require('express');

const app = express();

const { adminAuth, userAuth } = require('./middlewares/auth') 



app.listen(3000, () => {
    console.log('server is running successfully at port 3000');
});