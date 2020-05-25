const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const {validateTodo} = require('../validators/validateTodo');
const verifyJwt = require('../middleware/authorization');

// use middleware to verify JWT is valid
router.use(verifyJwt);

router.get('/', todoController.getAllTodos);

router.get('/:id(\\d+)', todoController.getTodoById);

router.post('/', validateTodo, todoController.createTodo);

router.put('/:id(\\d+)', validateTodo, todoController.updateTodo);

router.delete('/:id(\\d+)', todoController.deleteTodo);


exports.todoRouter = router;