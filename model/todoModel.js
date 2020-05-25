const {cp} = require('../db/connection.js');
const {query} = require('../db/promise-mysql.js');

exports.getAllTodos = (description, category) => {

    description = (description == undefined ? '' : description);
    category = (category == undefined ? '' : category);

    let sql = `select 
                    idTodo, description, category, 
                    idUser
                from todo
                where
                    description like ${cp.escape(`%${description}%`)}
                and 
                    category like ${cp.escape(`%${category}%`)}`;

    return query(cp, sql);
}

exports.getTodoById = (idTodo) => {

    let sql = `select 
                    idTodo, description, category, 
                    idUser
                from todo where idTodo = ${idTodo}`;

    return query(cp, sql);
}

exports.createTodo = (todo) => {
    let sql = `insert into todo 
                    (description, 
                    category, 
                    idUser) 
                values (
                    ${cp.escape(todo.description)},
                    ${cp.escape(todo.category)},
                    ${cp.escape(todo.idUser)})`;

    return query(cp, sql);
}

exports.updateTodo = (todo) => {
    let sql = `update todo
                set description = ${cp.escape(todo.description)},
                    category = ${cp.escape(todo.category)}
                where idTodo = ${cp.escape(todo.idTodo)}`;

    return query(cp, sql);
}

exports.deleteTodo = (idTodo) => {
    let sql = `delete from todo where idTodo = ${cp.escape(idTodo)}`;

    return query(cp, sql);
}