const {body} = require('express-validator');

exports.validateTodo = [
    body('description', 'Description is mandatory').exists(),
    body('description', 'Description cannot be empty').not().isEmpty(),
    body('description', 'Description must be less than 500 chars').isLength({ min: 0, max: 500 }),
    body('category', 'Category is mandatory').exists(),
    body('category', 'Category cannot be empty').not().isEmpty(),
    body('category', 'Category must be less than 45 chars').isLength({ min: 0, max: 45 })
];