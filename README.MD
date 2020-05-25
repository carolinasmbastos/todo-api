# Todo-api

This is a CRUD API that allows users to read, create, update and delete *todo* list items.

## Endpoints

| Endpoint  | Description |
| ------------- | ------------- |
| POST /login | Authenticate user and retrieve an API token that must be sent to access the *todo* API endpoints. |
| POST /api/todo | Create a new *todo* item for the authenticated user. |
| PUT /api/todo/{id} | Update the *todo* item identified by id. Only the *todo* owner can update it. |
| DELETE /api/todo/{id} | Delete the *todo* item identified by id. Only the *todo* owner can delete it. |
| GET /api/todo/{id} | Get the *todo* item identified by id |
| GET /api/todo | Get all the *todo* items. This endpoint accepts the following optional parameters as filters: description and/or category. E.g. /api/todo?description=groceries or /api/todo?category=shopping |


## Installation instructions

1. Create a new database and user in mysql.
2. Execute the script file /db/setup/DBSetup.sql to create tables.
3. Install dependencies:
```
npm install
```
4. Create a .env file in the project root folder to setup DB connection properties and JWT configuration. E.g.:
```
DB_HOST="localhost"
DB_NAME="todos"
DB_PORT="8889"
DB_USER="todos"
DB_PASS="todos"
SECRET_PHRASE="Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world."
TOKEN_EXPIRATION="1h"
```
5. Start the server:
```
npm start
```

## Tests

To run test cases
```
npm test
```

## Contact

carolinasmbastos@gmail.com
