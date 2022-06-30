# **Todo App**

Simple Todo app where user can login his account and get access only his todo and their also an admin who have all access to edit, delete, get user's data.

## **Schema**

-   ### User

    -   `_id`
    -   `name`
    -   `email` _unique_
    -   `password`
    -   `role` - [admin, user]
    -   `accountStatus` - [pending, active, rejected]

-   ### Todo

    -   `_id`
    -   `title` _unique_
    -   `description`
    -   `todoStatus` - [incomplete, inProgress, completed]
    -   `authorId`

## **API Router Endpoints**

-   ### Admin

    -   _Authorization and JWT Token require_

    -   `/api/v1/admin/u/all` - **GET** - Return all users
    -   `/api/v1/admin/u/:userId` - **PATCH** - Only edit accountStatus and role

-   ### User

    -   `/api/v1/u/register` - **POST** - Register a new user
    -   `/api/v1/u/login` - **GET** - Login a user and return a JWT token
    -   `/api/v1/u/logout` - **GET** - Expire the JWT for a logged in user
    -   `/api/v1/u/update` - **PATCH** - Update acceptable information [name, password] of a user and authenticate user by JWT token

-   ### Todo

    -   _All routes below only works for the logged in user && Authentication require_

    -   `/api/v1/t/new` - **POST** - Creates a new Todo and authenticate user by JWT token
    -   `/api/v1/t/:todoId` - **GET** - Get a single Todo and authenticate user by JWT token
    -   `/api/v1/t/all` - **GET** - Get all Todos and authenticate user by JWT token
    -   `/api/v1/t/:todoId` - **PATCH** - Update acceptable information of the requested Todo and authenticate user by JWT token
    -   `/api/v1/t/:todoId` - **DELETE** - Delete the requested Todo and authenticate user by JWT token

## **Features**

-   ### Admin

    1. The first user of this system will be an admin
    1. Admin can get all user's data (except password)
    1. Admin can edit an user's accountStatus and role

-   ### User

    1. If the user's accountStatus is pending then user couldn't create any todo untill the admin active this account. only can login.
    1. If the user's accountStatus is rejected then user couldn't login. He must have to contact with the admin through email to activate his account.
