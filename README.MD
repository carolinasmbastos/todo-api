# Todo-api

This is A simple CRUD API, for users to read, create, update and delete todo list items.

## Endpoints

| Endpoint  | Description |
| ------------- | ------------- |
| /login | Autenticate user and retrieve an API token, that must be sent to access /todo endpoints |
| POST /api/todo | Creates a new todo item for the user authenticated |
| PUT /api/todo/{id} | Update the todo item identified by id |
| DELETE /api/todo/{id} | Delete the todo item identified by id |
| GET /api/todo/{id} | GET the todo item identified by id |
| GET /api/todo | GET All the todo items. This endpoint accept optional paramaters as filters: description, category. Ex. /api/todo?description=groceries or /api/todo?category=shopping |



## Installation instructions

1. Create a new database and user in mysql.
2. Run the file /db/setup/DBSetup.sql to create tables.
3. Install dependencies.
```
npm install
```
4. Create .env file in project root folder to setup DB connection properties and JWT configuration. Ex.:
```
DB_HOST="localhost"
DB_NAME="todos"
DB_PORT="8889"
DB_USER="todos"
DB_PASS="todos"
SECRET_PHRASE="Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world."
TOKEN_EXPIRATION="1h"
```
5. Start the Server:
```
npm start
```

## Tests

To Run test cases
```
npm test
```

## Contact

carolinasmbastos@gmail.com