const {validationResult} = require('express-validator');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
        res.status(422);
        res.send({message: errors.array()});
        return;
    }

    let {username, password} = req.body;

    userModel.getUser(username, password)
        .then(result => {
            //user exists and password matches, create and send JWT
            if (result.length > 0) {
                const token = jwt.sign({sub: result[0].idUser, email: username}, 
                                        process.env.SECRET_PHRASE,
                                        { expiresIn: process.env.TOKEN_EXPIRATION });
                res.status(200).send({ token, username });
            } else {
                next({
                    message : 'Invalid Username or Password',
                    status : 401    
                });
            }
        })
        .catch(error => {
            console.log(error);
            next({message : error.sqlMessage});
        });
}