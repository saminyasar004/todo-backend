# **ToDo App**

User based todo app.

## Schema

**User**

-   `\_id`
-   `name`
-   `email` _unique_
-   `password`
-   `role` - [admin, user]
-   `accountStatus` - [pending, active, rejected]

**ToDo**

-   `\_id`
-   `title` _unique_
-   `description`
-   `todoStatus` - [incomplete, inProgress, complete]
-   `authorId`

## API Router Endpoints

**Admin**

_Authorization and JWT Token require_

-   `/api/v1/admin/u/all` - **GET** - Return all users
-   `/api/v1/admin/u/:userId` - **PATCH** - Only edit accountStatus and role

**User**

-   `/api/v1/u/register` - **POST** - Register a new user and return a JWT token
-   `/api/v1/u/login` - **GET** - Login a user by JWT token
-   `/api/v1/u/logout` - **GET** - Expire the JWT for a logged in user
-   `/api/v1/u/update` - **PATCH** - Update acceptable information of a user

**ToDo**

_All routes below only works for the logged in user_

-   `/api/v1/t/new` - **POST** - Creates a new ToDo
-   `/api/v1/t/:todoId` - **GET** - Get a single ToDo
-   `/api/v1/t/all` - **GET** - Get all ToDos
-   `/api/v1/t/:todoId` - **PATCH** - Update acceptable information of the requested ToDo
-   `/api/v1/t/:todoId` - **DELETE** - Delete the requested ToDo
