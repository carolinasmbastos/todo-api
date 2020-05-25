const {body} = require('express-validator');

exports.validateUser = [
    body('username', 'Username is mandatory').exists(),
    body('username', 'Username is invalid').isEmail(),
    body('username', 'Username is must be less than').isLength({ max: 100 }),
    body('password', 'Password is mandatory').exists(),
    body('password', 'Password cannot be empty').not().isEmpty(),
    body('password', 'Password must have more than 4 characters and less than 8 characters').isLength({ min: 4, max: 8 })
];
