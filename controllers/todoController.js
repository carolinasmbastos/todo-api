const todoModel = require('../model/todoModel');
const {validationResult} = require('express-validator');

exports.getAllTodos = (req, res, next) => {
    let description = req.query.description;
    let category = req.query.category;

    todoModel.getAllTodos(description, category)
        .then(todos => {
            res.status(200).send(todos);
        })
        .catch(error => {
            console.log(error);
            next({message : error.sqlMessage});
        });
}

exports.getTodoById = (req, res, next) => {
    let idTodo = req.params.id;

    todoModel.getTodoById(idTodo)
        .then(result => {
            if (result.length > 0) {
                res.status(200).send(result[0]);
            } else {
                next({
                    message : 'No Todo Found for id: ' + idTodo,
                    status : 404    
                });
            }
        })
        .catch(error => {
            console.log(error);
            next({message : error.sqlMessage});
        });

}

exports.createTodo = (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.status(422);
        res.send({message: errors.array()});
        return;
    }

    let {description, category} = req.body;
    //user loged in
    let idUser = req.body.idUser;

    let todo = {description, category, idUser};

    todoModel.createTodo(todo)
        .then(result => {
            todo.idTodo = result.insertId;
            res.status(201);
            res.send(todo);
        })
        .catch(error => {
            console.log(error);
            next({message : error.sqlMessage});
        });
}

exports.updateTodo = (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.status(422);
        res.send({message: errors.array()});
        return;
    }

    //user loged in
    let idUser = req.body.idUser;
    let idTodo = parseInt(req.params.id);
    let {description, category} = req.body;
    let todo = {idTodo, description, category, idUser};

    todoModel.getTodoById(idTodo)
        .then(result => {
            //only the owner can update his own todo
            if (result.length > 0 && idUser == result[0].idUser) {
                todoModel.updateTodo(todo)
                    .then(update => {                        
                        res.status(200);
                        res.send(todo);
                    })

            } else if (result.length == 0) {
                next({
                    message : 'No Todo Found for id: ' + idTodo,
                    status : 404
                });
            } else {
                next({
                    message : 'No permission to update: ' + idTodo,
                    status : 403   
                });
            }
        })
        .catch(error => {
            console.log(error);
            next({message : error.sqlMessage});
        });
}

exports.deleteTodo = (req, res, next) => {
    //user loged in
    let idUser = req.body.idUser;
    let idTodo = req.params.id;

    todoModel.getTodoById(idTodo)
        .then(result => {
            //only the owner can update his own todo
            if (result.length > 0 && idUser == result[0].idUser) {
                todoModel.deleteTodo(idTodo)
                    .then(deleted => {
                        res.status(204);
                        res.send();
                    })

            } else if (result.length == 0) {
                next({
                    message : 'No Todo Found for id: ' + idTodo,
                    status : 404
                });
            } else {
                next({
                    message : 'No permission to delete: ' + idTodo,
                    status : 403   
                });
            }
        })
        .catch(error => {
            console.log(error);
            next({message : error.sqlMessage});
        });
}