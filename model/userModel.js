const {cp} = require('../db/connection.js');
const {query} = require('../db/promise-mysql.js');

exports.getUser = (username, password) => {
    let sql = `select username, idUser 
                from user
                    where username = ${cp.escape(username)}
                    and password = ${cp.escape(password)}`;

    return query(cp, sql);
}

exports.addUser = (username, password) => {
    let sql = `insert into user
                    (username, password)
                values
                    (${cp.escape(username)}, 
                     ${cp.escape(password)})`;

    return query(cp, sql);
}

exports.deleteUser = (idUser) => {
    let sql = `delete from user where idUser = ${idUser}`;

    return query(cp, sql);
}