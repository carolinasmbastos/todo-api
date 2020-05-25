const request = require('supertest');
const app = require('../app');
const userModel = require('../model/userModel')

beforeAll((done) => {
    user = {
        username : 'user@todo.com',
        password : '1234'
    }
    userModel.addUser(user.username, user.password)
        .then(result => {
            user.idUser = result.insertId;
            done();
        })
        .catch(error => {
            throw new Error(error);
        })
});

describe('Todo List API Test Suite', () => {

    test('User Login', done => {
        request(app)
        .post('/login')
        .send(user)
        .end((err, response) => {
            token = response.body.token; // save the token!
            done();
        });
    });

    test('Create a new todo', done => {
        request(app)
            .post('/api/todo')
            .set('Authorization', `Bearer ${token}`)
            .send({
                description : 'New Todo',
                category : 'task'
            })
            .then(response => {
                expect(response.statusCode).toBe(201);
                expect(response.body).toHaveProperty('idTodo');
                idTodo = response.body.idTodo;
                expect(idTodo).toBeGreaterThan(0);
                done();  
            })
    });

    test('Update a todo', done => {
        updatedTodo = {
            description : 'Todo Updated by test',
            category : 'shopping'
        };
        request(app)
            .put(`/api/todo/${idTodo}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTodo)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('idTodo');
                expect(response.body.description).toBe(updatedTodo.description);
                done();  
            })
    });

    test('Get a todo', done => {
        request(app)
            .get(`/api/todo/${idTodo}`)
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('idTodo');
                expect(response.body.idTodo).toBe(idTodo);
                done();  
            })
    });

    test('Get todo List', done => {
        request(app)
            .get(`/api/todo`)
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            description : updatedTodo.description
                        })
                    ]));
                done();  
            })
    });

    test('Get todo List filtered by description', done => {
        param = 'test';
        request(app)
            .get(`/api/todo?description=${param}`)
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            description : updatedTodo.description
                        })
                    ]));
                done();  
            })
    });

    test('Delete a todo', done => {
        request(app)
            .delete(`/api/todo/${idTodo}`)
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(204);
                done();  
            })
    });
});

afterAll(done => {
    userModel.deleteUser(user.idUser)
        .then(result => {
            done();
        })
        .catch(error => {
            throw new Error(error);
        })
});