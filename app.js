const express = require('express');
const app = express();
const {authRouter} = require('./routes/authRouter');
const {todoRouter} = require('./routes/todoRouter');
bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/login', authRouter);

app.use('/api/todo', todoRouter);

app.get('*', (req, res, next) => {
    next({status : 404, message : 'Resource Not found.'});
})

let errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status((error.status != undefined ? error.status : '500'));
    res.send(error);
}
app.use(errorHandler);

module.exports = app;