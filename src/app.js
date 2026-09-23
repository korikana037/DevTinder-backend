const express = require('express');

const app = express();

app.use('/test', (req, res) => {
    res.send('hello');
});

app.use(
    '/user',
    (req, res, next) => {
        console.log('hanling the 1st response');
        next();
    });

// app.get('/user', (req, res) => {
    // res.send({firstname: 'sandeep', lastname : 'korikana'});
// });

app.post('/user', (req, res) => {
    res.send('user saved successfuly to db');
});
app.put('/user', (req, res) => {
    res.send('user updated/replaced successfuly to db');
});
app.patch('/user', (req, res) => {
    res.send('user partially updated successfuly in db');
});
app.delete('/user', (req, res) => {
    res.send('user deleted from db');
});

app.listen(3000, () => {
    console.log('server is running successfully at port 3000');
});