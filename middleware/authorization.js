const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_PHRASE;

const verifyJwt = (req, res, next) => {
    let token = (req.headers.authorization != undefined 
                        ? req.headers.authorization.split(' ')[1]
                        : '');

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            next({ status: 401, message: err });
        } else {
            //if token is valid, add user loged in to the request
            req.body.idUser = decoded.sub;
            next();
        }
    });
};

module.exports = verifyJwt;
